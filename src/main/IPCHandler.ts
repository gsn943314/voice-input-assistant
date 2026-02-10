import { ipcMain, clipboard, shell } from 'electron';
import { IPC_CHANNELS } from '../shared/constants.js';
import { TranscriptionRequest, TranscriptionResponse, AppSettings, ErrorType, TranscriptionHistory } from '../shared/types.js';
import { SettingsManager } from './SettingsManager.js';
import { WhisperClient } from './WhisperClient.js';
import { AudioProcessor } from './AudioProcessor.js';
import { HistoryManager } from './HistoryManager.js';
import { WindowManager } from './WindowManager.js';

export class IPCHandler {
  private settingsManager: SettingsManager;
  private historyManager: HistoryManager;
  private windowManager: WindowManager;
  private whisperClient: WhisperClient | null = null;

  constructor(settingsManager: SettingsManager, historyManager: HistoryManager, windowManager: WindowManager) {
    this.settingsManager = settingsManager;
    this.historyManager = historyManager;
    this.windowManager = windowManager;
    this.initializeWhisperClient();
    this.registerHandlers();
  }

  private initializeWhisperClient(): void {
    const settings = this.settingsManager.load();
    if (settings.apiKey) {
      this.whisperClient = new WhisperClient({
        apiKey: settings.apiKey,
      });
    }
  }

  private updateWhisperClient(apiKey: string): void {
    if (this.whisperClient) {
      this.whisperClient.updateApiKey(apiKey);
    } else {
      this.whisperClient = new WhisperClient({ apiKey });
    }
  }

  private registerHandlers(): void {
    // Handle audio transcription
    ipcMain.handle(
      IPC_CHANNELS.TRANSCRIBE_AUDIO,
      async (_event, request: TranscriptionRequest): Promise<TranscriptionResponse> => {
        return this.handleTranscription(request);
      }
    );

    // Handle settings save
    ipcMain.handle(
      IPC_CHANNELS.SAVE_SETTINGS,
      async (_event, settings: AppSettings): Promise<void> => {
        return this.handleSaveSettings(settings);
      }
    );

    // Handle settings load
    ipcMain.handle(
      IPC_CHANNELS.LOAD_SETTINGS,
      async (): Promise<AppSettings> => {
        return this.handleLoadSettings();
      }
    );

    // Handle clipboard copy
    ipcMain.handle(
      IPC_CHANNELS.COPY_TO_CLIPBOARD,
      async (_event, text: string): Promise<boolean> => {
        return this.handleCopyToClipboard(text);
      }
    );

    // Handle history load
    ipcMain.handle(
      IPC_CHANNELS.LOAD_HISTORY,
      async (): Promise<TranscriptionHistory[]> => {
        return this.handleLoadHistory();
      }
    );

    // Handle history save
    ipcMain.handle(
      IPC_CHANNELS.SAVE_HISTORY,
      async (_event, history: TranscriptionHistory[]): Promise<void> => {
        return this.handleSaveHistory(history);
      }
    );

    // Handle history clear
    ipcMain.handle(
      IPC_CHANNELS.CLEAR_HISTORY,
      async (): Promise<void> => {
        return this.handleClearHistory();
      }
    );

    // Handle open system preferences
    ipcMain.handle(
      IPC_CHANNELS.OPEN_SYSTEM_PREFERENCES,
      async (): Promise<void> => {
        return this.handleOpenSystemPreferences();
      }
    );

    // Handle window minimize
    ipcMain.on(IPC_CHANNELS.MINIMIZE_WINDOW, () => {
      this.windowManager.minimize();
    });

    // Handle window close
    ipcMain.on(IPC_CHANNELS.CLOSE_WINDOW, () => {
      this.windowManager.close();
    });

    // Handle window opacity
    ipcMain.handle(IPC_CHANNELS.SET_WINDOW_OPACITY, async (_event, opacity: number) => {
      this.windowManager.setOpacity(opacity);
    });
  }

  async handleTranscription(request: TranscriptionRequest): Promise<TranscriptionResponse> {
    let cleanup: (() => void) | null = null;
    
    try {
      // Check if API key is configured
      if (!this.whisperClient) {
        return {
          text: '',
          success: false,
          error: 'API key not configured. Please set your OpenAI API key in settings.',
        };
      }

      // Process audio data: convert Blob to Buffer and validate
      const { buffer: audioBuffer, cleanup: cleanupFn } = AudioProcessor.processAudioData(request.audioBlob as any);
      cleanup = cleanupFn;
      
      console.log(`Processing audio file: ${AudioProcessor.getAudioSizeInfo(audioBuffer)}`);

      // Transcribe using Whisper API
      const text = await this.whisperClient.transcribe(audioBuffer, {
        language: request.language,
      });

      return {
        text,
        success: true,
      };
    } catch (error: any) {
      console.error('Transcription error:', error);

      // Handle specific error types
      const errorType = error.type || ErrorType.UNKNOWN_ERROR;
      let errorMessage = error.message || 'An unknown error occurred';

      // Provide user-friendly error messages
      switch (errorType) {
        case ErrorType.API_KEY_INVALID:
          errorMessage = 'Invalid API key. Please check your OpenAI API key in settings.';
          break;
        case ErrorType.NETWORK_ERROR:
          errorMessage = 'Network error. Please check your internet connection and try again.';
          break;
        case ErrorType.AUDIO_RECORDING_FAILED:
          errorMessage = error.message; // Use the specific message from AudioProcessor
          break;
        case ErrorType.API_REQUEST_FAILED:
          errorMessage = error.message; // Use the specific message from WhisperClient
          break;
        default:
          errorMessage = `Transcription failed: ${error.message}`;
      }

      return {
        text: '',
        success: false,
        error: errorMessage,
      };
    } finally {
      // Clean up audio buffer to free memory
      if (cleanup) {
        cleanup();
      }
    }
  }

  async handleSaveSettings(settings: AppSettings): Promise<void> {
    try {
      this.settingsManager.save(settings);
      
      // Update WhisperClient with new API key if it changed
      if (settings.apiKey) {
        this.updateWhisperClient(settings.apiKey);
      }
    } catch (error) {
      console.error('Failed to save settings:', error);
      throw error;
    }
  }

  async handleLoadSettings(): Promise<AppSettings> {
    try {
      return this.settingsManager.load();
    } catch (error) {
      console.error('Failed to load settings:', error);
      throw error;
    }
  }

  async handleCopyToClipboard(text: string): Promise<boolean> {
    try {
      clipboard.writeText(text);
      return true;
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      return false;
    }
  }

  async handleLoadHistory(): Promise<TranscriptionHistory[]> {
    try {
      return this.historyManager.load();
    } catch (error) {
      console.error('Failed to load history:', error);
      return [];
    }
  }

  async handleSaveHistory(history: TranscriptionHistory[]): Promise<void> {
    try {
      this.historyManager.save(history);
    } catch (error) {
      console.error('Failed to save history:', error);
      throw error;
    }
  }

  async handleClearHistory(): Promise<void> {
    try {
      this.historyManager.clear();
    } catch (error) {
      console.error('Failed to clear history:', error);
      throw error;
    }
  }

  async handleOpenSystemPreferences(): Promise<void> {
    try {
      // Open macOS System Preferences for microphone permissions
      if (process.platform === 'darwin') {
        await shell.openExternal('x-apple.systempreferences:com.apple.preference.security?Privacy_Microphone');
      }
    } catch (error) {
      console.error('Failed to open system preferences:', error);
      throw error;
    }
  }
}
