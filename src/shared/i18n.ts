// 國際化翻譯

export type Language = 'zh' | 'en';

export interface Translations {
  // App Title
  appTitle: string;
  
  // Recording Control
  startRecording: string;
  stopRecording: string;
  recording: string;
  processing: string;
  
  // Text Display
  transcribedText: string;
  noTextYet: string;
  copyToClipboard: string;
  copied: string;
  
  // History
  history: string;
  noHistory: string;
  clearHistory: string;
  timeAgo: {
    justNow: string;
    minutesAgo: string;
    hoursAgo: string;
    daysAgo: string;
  };
  
  // Settings
  settings: string;
  openAIApiKey: string;
  apiKeyPlaceholder: string;
  defaultLanguage: string;
  uiLanguage: string;
  chinese: string;
  english: string;
  windowOpacity: string;
  keyboardShortcuts: string;
  startRecordingShortcut: string;
  stopRecordingShortcut: string;
  copyTextShortcut: string;
  clearTextShortcut: string;
  historyLimit: string;
  save: string;
  cancel: string;
  saving: string;
  
  // Errors
  errors: {
    apiKeyInvalid: string;
    apiKeyTooShort: string;
    shortcutRequired: string;
    shortcutInvalid: string;
    shortcutConflict: string;
    opacityRange: string;
    historyLimitRange: string;
    saveFailed: string;
    microphoneAccessDenied: string;
    recordingFailed: string;
    transcriptionFailed: string;
  };
  
  // Status
  status: {
    ready: string;
    recording: string;
    processing: string;
    error: string;
  };
}

export const translations: Record<Language, Translations> = {
  zh: {
    appTitle: '語音輸入助手',
    
    startRecording: '開始錄音',
    stopRecording: '停止錄音',
    recording: '錄音中',
    processing: '處理中',
    
    transcribedText: '轉錄文字',
    noTextYet: '尚無轉錄文字',
    copyToClipboard: '複製到剪貼簿',
    copied: '已複製',
    
    history: '歷史記錄',
    noHistory: '尚無歷史記錄',
    clearHistory: '清空',
    timeAgo: {
      justNow: '剛剛',
      minutesAgo: '分鐘前',
      hoursAgo: '小時前',
      daysAgo: '天前',
    },
    
    settings: '設定',
    openAIApiKey: 'OpenAI API 金鑰',
    apiKeyPlaceholder: 'sk-...',
    defaultLanguage: '預設語言',
    uiLanguage: '介面語言',
    chinese: '中文',
    english: 'English',
    windowOpacity: '視窗透明度',
    keyboardShortcuts: '鍵盤快捷鍵',
    startRecordingShortcut: '開始錄音',
    stopRecordingShortcut: '停止錄音',
    copyTextShortcut: '複製文字',
    clearTextShortcut: '清除文字',
    historyLimit: '歷史記錄數量限制',
    save: '儲存',
    cancel: '取消',
    saving: '儲存中...',
    
    errors: {
      apiKeyInvalid: 'API 金鑰格式無效（應以 sk- 開頭）',
      apiKeyTooShort: 'API 金鑰長度不足',
      shortcutRequired: '請設定快捷鍵',
      shortcutInvalid: '快捷鍵格式無效',
      shortcutConflict: '開始和停止錄音快捷鍵不能相同',
      opacityRange: '視窗透明度必須在 50% 到 100% 之間',
      historyLimitRange: '歷史記錄數量必須在 1 到 100 之間',
      saveFailed: '儲存設定失敗',
      microphoneAccessDenied: '麥克風存取被拒絕',
      recordingFailed: '錄音失敗',
      transcriptionFailed: '轉錄失敗',
    },
    
    status: {
      ready: '就緒',
      recording: '錄音中',
      processing: '處理中',
      error: '錯誤',
    },
  },
  
  en: {
    appTitle: 'Voice Input Assistant',
    
    startRecording: 'Start Recording',
    stopRecording: 'Stop Recording',
    recording: 'Recording',
    processing: 'Processing',
    
    transcribedText: 'Transcribed Text',
    noTextYet: 'No text yet',
    copyToClipboard: 'Copy to Clipboard',
    copied: 'Copied',
    
    history: 'History',
    noHistory: 'No history yet',
    clearHistory: 'Clear',
    timeAgo: {
      justNow: 'Just now',
      minutesAgo: 'minutes ago',
      hoursAgo: 'hours ago',
      daysAgo: 'days ago',
    },
    
    settings: 'Settings',
    openAIApiKey: 'OpenAI API Key',
    apiKeyPlaceholder: 'sk-...',
    defaultLanguage: 'Default Language',
    uiLanguage: 'UI Language',
    chinese: '中文',
    english: 'English',
    windowOpacity: 'Window Opacity',
    keyboardShortcuts: 'Keyboard Shortcuts',
    startRecordingShortcut: 'Start Recording',
    stopRecordingShortcut: 'Stop Recording',
    copyTextShortcut: 'Copy Text',
    clearTextShortcut: 'Clear Text',
    historyLimit: 'History Limit',
    save: 'Save',
    cancel: 'Cancel',
    saving: 'Saving...',
    
    errors: {
      apiKeyInvalid: 'Invalid API key format (should start with sk-)',
      apiKeyTooShort: 'API key is too short',
      shortcutRequired: 'Shortcut is required',
      shortcutInvalid: 'Invalid shortcut format',
      shortcutConflict: 'Start and stop shortcuts cannot be the same',
      opacityRange: 'Opacity must be between 50% and 100%',
      historyLimitRange: 'History limit must be between 1 and 100',
      saveFailed: 'Failed to save settings',
      microphoneAccessDenied: 'Microphone access denied',
      recordingFailed: 'Recording failed',
      transcriptionFailed: 'Transcription failed',
    },
    
    status: {
      ready: 'Ready',
      recording: 'Recording',
      processing: 'Processing',
      error: 'Error',
    },
  },
};

export function getTranslations(language: Language): Translations {
  return translations[language] || translations.zh;
}
