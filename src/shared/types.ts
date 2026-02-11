// Shared types between main and renderer processes

export interface AppSettings {
  apiKey: string;
  defaultLanguage: 'zh' | 'en';
  uiLanguage: 'zh' | 'en';  // 介面語言
  shortcuts: {
    startRecording: string;
    stopRecording: string;
    copyText: string;
    clearText: string;
  };
  windowOpacity: number;
  historyLimit: number;
  openDevTools?: boolean;  // 開發者工具（僅開發模式）
}

export interface TranscriptionRequest {
  audioBlob: Buffer | number[];  // Support both Buffer (main process) and number[] (renderer process)
  language?: string;
}

export interface TranscriptionResponse {
  text: string;
  success: boolean;
  error?: string;
}

export interface TranscriptionHistory {
  id: string;
  text: string;
  timestamp: number;
  language: string;
  duration: number;
}

export enum ErrorType {
  MICROPHONE_ACCESS_DENIED = 'MICROPHONE_ACCESS_DENIED',
  API_KEY_INVALID = 'API_KEY_INVALID',
  API_REQUEST_FAILED = 'API_REQUEST_FAILED',
  NETWORK_ERROR = 'NETWORK_ERROR',
  AUDIO_RECORDING_FAILED = 'AUDIO_RECORDING_FAILED',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

export interface AppError {
  type: ErrorType;
  message: string;
  details?: any;
}
