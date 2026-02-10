const { contextBridge, ipcRenderer } = require('electron');

// IPC Channels - 直接定義避免 import 問題
const IPC_CHANNELS = {
  TRANSCRIBE_AUDIO: 'transcribe-audio',
  SAVE_SETTINGS: 'save-settings',
  LOAD_SETTINGS: 'load-settings',
  COPY_TO_CLIPBOARD: 'copy-to-clipboard',
  LOAD_HISTORY: 'load-history',
  SAVE_HISTORY: 'save-history',
  CLEAR_HISTORY: 'clear-history',
  OPEN_SYSTEM_PREFERENCES: 'open-system-preferences',
  MINIMIZE_WINDOW: 'minimize-window',
  CLOSE_WINDOW: 'close-window',
  SET_WINDOW_OPACITY: 'set-window-opacity',
};

console.log('[Preload] Exposing electronAPI...');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  transcribeAudio: (request) => 
    ipcRenderer.invoke(IPC_CHANNELS.TRANSCRIBE_AUDIO, request),
  
  saveSettings: (settings) => 
    ipcRenderer.invoke(IPC_CHANNELS.SAVE_SETTINGS, settings),
  
  loadSettings: () => 
    ipcRenderer.invoke(IPC_CHANNELS.LOAD_SETTINGS),
  
  copyToClipboard: (text) => 
    ipcRenderer.invoke(IPC_CHANNELS.COPY_TO_CLIPBOARD, text),
  
  loadHistory: () => 
    ipcRenderer.invoke(IPC_CHANNELS.LOAD_HISTORY),
  
  saveHistory: (history) => 
    ipcRenderer.invoke(IPC_CHANNELS.SAVE_HISTORY, history),
  
  clearHistory: () => 
    ipcRenderer.invoke(IPC_CHANNELS.CLEAR_HISTORY),
  
  openSystemPreferences: () => 
    ipcRenderer.invoke(IPC_CHANNELS.OPEN_SYSTEM_PREFERENCES),
  
  minimizeWindow: () => 
    ipcRenderer.send(IPC_CHANNELS.MINIMIZE_WINDOW),
  
  closeWindow: () => 
    ipcRenderer.send(IPC_CHANNELS.CLOSE_WINDOW),
  
  setWindowOpacity: (opacity) => 
    ipcRenderer.invoke(IPC_CHANNELS.SET_WINDOW_OPACITY, opacity),
});

console.log('[Preload] electronAPI exposed successfully!');
console.log('[Preload] Available methods:', Object.keys(contextBridge));
