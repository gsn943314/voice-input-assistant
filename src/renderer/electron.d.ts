import type { TranscriptionRequest, TranscriptionResponse, AppSettings, TranscriptionHistory } from '../shared/types';

export interface ElectronAPI {
  transcribeAudio: (request: TranscriptionRequest) => Promise<TranscriptionResponse>;
  saveSettings: (settings: AppSettings) => Promise<void>;
  loadSettings: () => Promise<AppSettings>;
  copyToClipboard: (text: string) => Promise<boolean>;
  loadHistory: () => Promise<TranscriptionHistory[]>;
  saveHistory: (history: TranscriptionHistory[]) => Promise<void>;
  clearHistory: () => Promise<void>;
  openSystemPreferences: () => Promise<void>;
  minimizeWindow: () => void;
  closeWindow: () => void;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
    electron: ElectronAPI; // Alias for compatibility
  }
}
