import { contextBridge, ipcRenderer } from 'electron';
import { IPC_CHANNELS } from '../shared/constants.js';
import type { TranscriptionRequest, TranscriptionResponse, AppSettings, TranscriptionHistory } from '../shared/types';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  transcribeAudio: (request: TranscriptionRequest): Promise<TranscriptionResponse> => 
    ipcRenderer.invoke(IPC_CHANNELS.TRANSCRIBE_AUDIO, request),
  
  saveSettings: (settings: AppSettings): Promise<void> => 
    ipcRenderer.invoke(IPC_CHANNELS.SAVE_SETTINGS, settings),
  
  loadSettings: (): Promise<AppSettings> => 
    ipcRenderer.invoke(IPC_CHANNELS.LOAD_SETTINGS),
  
  copyToClipboard: (text: string): Promise<boolean> => 
    ipcRenderer.invoke(IPC_CHANNELS.COPY_TO_CLIPBOARD, text),
  
  loadHistory: (): Promise<TranscriptionHistory[]> => 
    ipcRenderer.invoke(IPC_CHANNELS.LOAD_HISTORY),
  
  saveHistory: (history: TranscriptionHistory[]): Promise<void> => 
    ipcRenderer.invoke(IPC_CHANNELS.SAVE_HISTORY, history),
  
  clearHistory: (): Promise<void> => 
    ipcRenderer.invoke(IPC_CHANNELS.CLEAR_HISTORY),
  
  openSystemPreferences: (): Promise<void> => 
    ipcRenderer.invoke(IPC_CHANNELS.OPEN_SYSTEM_PREFERENCES),
  
  minimizeWindow: (): void => 
    ipcRenderer.send(IPC_CHANNELS.MINIMIZE_WINDOW),
  
  closeWindow: (): void => 
    ipcRenderer.send(IPC_CHANNELS.CLOSE_WINDOW),
});

// Also expose as 'electron' for compatibility
contextBridge.exposeInMainWorld('electron', {
  transcribeAudio: (request: TranscriptionRequest): Promise<TranscriptionResponse> => 
    ipcRenderer.invoke(IPC_CHANNELS.TRANSCRIBE_AUDIO, request),
  
  saveSettings: (settings: AppSettings): Promise<void> => 
    ipcRenderer.invoke(IPC_CHANNELS.SAVE_SETTINGS, settings),
  
  loadSettings: (): Promise<AppSettings> => 
    ipcRenderer.invoke(IPC_CHANNELS.LOAD_SETTINGS),
  
  copyToClipboard: (text: string): Promise<boolean> => 
    ipcRenderer.invoke(IPC_CHANNELS.COPY_TO_CLIPBOARD, text),
  
  loadHistory: (): Promise<TranscriptionHistory[]> => 
    ipcRenderer.invoke(IPC_CHANNELS.LOAD_HISTORY),
  
  saveHistory: (history: TranscriptionHistory[]): Promise<void> => 
    ipcRenderer.invoke(IPC_CHANNELS.SAVE_HISTORY, history),
  
  clearHistory: (): Promise<void> => 
    ipcRenderer.invoke(IPC_CHANNELS.CLEAR_HISTORY),
  
  openSystemPreferences: (): Promise<void> => 
    ipcRenderer.invoke(IPC_CHANNELS.OPEN_SYSTEM_PREFERENCES),
  
  minimizeWindow: (): void => 
    ipcRenderer.send(IPC_CHANNELS.MINIMIZE_WINDOW),
  
  closeWindow: (): void => 
    ipcRenderer.send(IPC_CHANNELS.CLOSE_WINDOW),
});
