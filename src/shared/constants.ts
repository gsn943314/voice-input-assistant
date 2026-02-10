// IPC channel names
export const IPC_CHANNELS = {
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
} as const;

// Default settings
export const DEFAULT_SETTINGS = {
  apiKey: '',
  defaultLanguage: 'zh' as const,
  uiLanguage: 'zh' as const,  // 默認介面語言
  shortcuts: {
    startRecording: 'CommandOrControl+Shift+R',
    stopRecording: 'CommandOrControl+Shift+S',
    copyText: 'CommandOrControl+Shift+C',
    clearText: 'CommandOrControl+Shift+X',
  },
  windowOpacity: 0.95,
  historyLimit: 50,
  openDevTools: false,  // 默認不開啟開發者工具
};
