import OpenAI from 'openai';
import { ErrorType } from '../shared/types.js';
import fs from 'fs';
import path from 'path';
import { app } from 'electron';

export interface WhisperClientConfig {
  apiKey: string;
  model?: string;
}

export interface TranscriptionOptions {
  language?: string;
  prompt?: string;
}

export class WhisperClient {
  private client: OpenAI | null = null;
  private config: WhisperClientConfig;

  constructor(config: WhisperClientConfig) {
    this.config = config;
    if (config.apiKey) {
      this.initializeClient();
    }
  }

  private initializeClient(): void {
    this.client = new OpenAI({
      apiKey: this.config.apiKey,
    });
  }

  /**
   * Update the API key and reinitialize the client
   */
  updateApiKey(apiKey: string): void {
    this.config.apiKey = apiKey;
    this.initializeClient();
  }

  /**
   * Validate the API key by making a test request
   */
  async validateApiKey(): Promise<boolean> {
    if (!this.config.apiKey) {
      return false;
    }

    try {
      // Make a simple API call to validate the key
      // We'll use the models list endpoint as it's lightweight
      if (!this.client) {
        this.initializeClient();
      }
      
      await this.client!.models.list();
      return true;
    } catch (error: any) {
      // Check if it's an authentication error
      if (error?.status === 401 || error?.code === 'invalid_api_key') {
        return false;
      }
      // For other errors, we'll assume the key might be valid but there's another issue
      console.error('API key validation error:', error);
      return false;
    }
  }

  /**
   * Transcribe audio file to text using Whisper API
   */
  async transcribe(
    audioBuffer: Buffer,
    options?: TranscriptionOptions
  ): Promise<string> {
    if (!this.client) {
      throw new Error('WhisperClient not initialized. Please provide a valid API key.');
    }

    const maxRetries = 3;
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        // Create a temporary file for the audio
        const tempDir = app.getPath('temp');
        const tempFilePath = path.join(tempDir, `audio-${Date.now()}.webm`);
        
        // Write buffer to temporary file
        fs.writeFileSync(tempFilePath, audioBuffer);

        try {
          // Create a readable stream from the file
          const fileStream = fs.createReadStream(tempFilePath);

          // Call Whisper API
          const response = await this.client.audio.transcriptions.create({
            file: fileStream,
            model: this.config.model || 'whisper-1',
            language: options?.language,
            prompt: options?.prompt,
          });

          // Clean up temporary file
          fs.unlinkSync(tempFilePath);

          return response.text;
        } catch (error) {
          // Clean up temporary file even if transcription fails
          if (fs.existsSync(tempFilePath)) {
            fs.unlinkSync(tempFilePath);
          }
          throw error;
        }
      } catch (error: any) {
        lastError = error;

        // Check for specific error types
        if (error?.status === 401 || error?.code === 'invalid_api_key') {
          throw this.createError(
            ErrorType.API_KEY_INVALID,
            'Invalid API key. Please check your OpenAI API key in settings.',
            error
          );
        }

        if (error?.code === 'ENOTFOUND' || error?.code === 'ECONNREFUSED') {
          // Network error - retry
          if (attempt < maxRetries) {
            console.log(`Network error, retrying (${attempt}/${maxRetries})...`);
            await this.delay(1000 * attempt); // Exponential backoff
            continue;
          }
          throw this.createError(
            ErrorType.NETWORK_ERROR,
            'Network error. Please check your internet connection.',
            error
          );
        }

        if (error?.status === 429) {
          // Rate limit - retry with longer delay
          if (attempt < maxRetries) {
            console.log(`Rate limited, retrying (${attempt}/${maxRetries})...`);
            await this.delay(2000 * attempt);
            continue;
          }
          throw this.createError(
            ErrorType.API_REQUEST_FAILED,
            'Rate limit exceeded. Please try again later.',
            error
          );
        }

        // For other errors, don't retry
        if (attempt >= maxRetries) {
          throw this.createError(
            ErrorType.API_REQUEST_FAILED,
            `Failed to transcribe audio: ${error.message || 'Unknown error'}`,
            error
          );
        }
      }
    }

    // This should never be reached, but TypeScript needs it
    throw this.createError(
      ErrorType.API_REQUEST_FAILED,
      `Failed to transcribe audio after ${maxRetries} attempts: ${lastError?.message || 'Unknown error'}`,
      lastError
    );
  }

  /**
   * Create a standardized error object
   */
  private createError(type: ErrorType, message: string, details?: any): Error {
    const error = new Error(message) as Error & { type: ErrorType; details?: any };
    error.type = type;
    error.details = details;
    return error;
  }

  /**
   * Delay helper for retry logic
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
