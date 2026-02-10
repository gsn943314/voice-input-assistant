/// <reference path="./electron.d.ts" />
import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import type { TranscriptionHistory, AppError, TranscriptionResponse } from '../shared/types';
import { AudioRecorder } from './services/AudioRecorder';
import { RecordingControl } from './components/RecordingControl';
import { TextDisplay } from './components/TextDisplay';
import { StatusIndicator } from './components/StatusIndicator';
import { HistoryList } from './components/HistoryList';
import { Settings } from './components/Settings';
import ErrorDisplay from './components/ErrorDisplay';
import { ErrorType } from '../shared/types';
import { errorHandler } from '../shared/errorHandler';
import type { AppSettings } from '../shared/types';
import { getTranslations, type Language, type Translations } from '../shared/i18n';

// Define AppState interface
export interface AppState {
  isRecording: boolean;
  isProcessing: boolean;
  transcribedText: string;
  error: AppError | null;
  history: TranscriptionHistory[];
  recordingDuration: number;
  uiLanguage: Language;
  t: Translations;
}

// Define context actions
interface AppContextValue extends AppState {
  setIsRecording: (value: boolean) => void;
  setIsProcessing: (value: boolean) => void;
  setTranscribedText: (text: string) => void;
  setError: (error: AppError | null) => void;
  addToHistory: (item: TranscriptionHistory) => void;
  clearHistory: () => void;
  setRecordingDuration: (duration: number) => void;
  setUILanguage: (language: Language) => void;
}

// Create context
const AppContext = createContext<AppContextValue | undefined>(undefined);

// Custom hook to use app context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

const App: React.FC = () => {
  // Global state management
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');
  const [error, setError] = useState<AppError | null>(null);
  const [history, setHistory] = useState<TranscriptionHistory[]>([]);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<AppSettings | null>(null);
  
  // UI Language state
  const [uiLanguage, setUILanguage] = useState<Language>('zh');
  const t = getTranslations(uiLanguage);

  // Audio recorder instance
  const audioRecorderRef = useRef<AudioRecorder>(new AudioRecorder());

  // Cleanup audio recorder on unmount
  useEffect(() => {
    return () => {
      if (audioRecorderRef.current) {
        audioRecorderRef.current.dispose();
      }
    };
  }, []);

  // Load history on mount
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const loadedHistory = await window.electronAPI.loadHistory();
        setHistory(loadedHistory);
      } catch (error) {
        console.error('Failed to load history:', error);
      }
    };

    const loadSettings = async () => {
      try {
        const loadedSettings = await window.electronAPI.loadSettings();
        setSettings(loadedSettings);
        // 設定 UI 語言
        if (loadedSettings.uiLanguage) {
          setUILanguage(loadedSettings.uiLanguage);
        }
      } catch (error) {
        console.error('Failed to load settings:', error);
      }
    };

    loadHistory();
    loadSettings();
  }, []);

  // Save history when it changes
  useEffect(() => {
    const saveHistory = async () => {
      try {
        await window.electronAPI.saveHistory(history);
      } catch (error) {
        console.error('Failed to save history:', error);
      }
    };

    // Only save if history is not empty (avoid saving on initial load)
    if (history.length > 0) {
      saveHistory();
    }
  }, [history]);

  // Add to history with limit
  const addToHistory = useCallback((item: TranscriptionHistory) => {
    setHistory(prev => {
      const newHistory = [item, ...prev];
      // Limit history to 50 items (from DEFAULT_SETTINGS)
      return newHistory.slice(0, 50);
    });
  }, []);

  // Global keyboard shortcuts for copy and clear
  useEffect(() => {
    const handleGlobalKeyPress = async (event: KeyboardEvent) => {
      if (!settings) return;

      const isModifier = (event.metaKey || event.ctrlKey);
      
      // Copy text shortcut
      if (isModifier && event.shiftKey && event.key.toUpperCase() === 'C') {
        event.preventDefault();
        if (transcribedText) {
          try {
            await window.electronAPI.copyToClipboard(transcribedText);
          } catch (error) {
            console.error('Failed to copy:', error);
          }
        }
      }
      
      // Clear text shortcut
      if (isModifier && event.shiftKey && event.key.toUpperCase() === 'X') {
        event.preventDefault();
        setTranscribedText('');
      }
    };

    window.addEventListener('keydown', handleGlobalKeyPress);
    return () => {
      window.removeEventListener('keydown', handleGlobalKeyPress);
    };
  }, [settings, transcribedText, setTranscribedText]);

  // Clear history
  const clearHistory = useCallback(async () => {
    try {
      await window.electronAPI.clearHistory();
      setHistory([]);
    } catch (error) {
      console.error('Failed to clear history:', error);
    }
  }, []);

  // Handle recording complete
  const handleRecordingComplete = useCallback(async (audioBlob: Blob, duration: number) => {
    setIsProcessing(true);
    setError(null);

    try {
      // Convert Blob to Uint8Array (works in browser)
      const arrayBuffer = await audioBlob.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      // Convert to regular array for IPC transfer
      const audioData = Array.from(uint8Array);

      // Call Electron API to transcribe
      const response: TranscriptionResponse = await window.electronAPI.transcribeAudio({
        audioBlob: audioData,
        language: settings?.defaultLanguage || 'zh',
      });

      if (response.success && response.text) {
        // 累積文字而不是覆蓋
        setTranscribedText(prev => {
          // 如果之前有文字，加上換行符號
          if (prev && prev.trim().length > 0) {
            return prev + '\n' + response.text;
          }
          return response.text;
        });
        
        // Add to history
        const historyItem: TranscriptionHistory = {
          id: Date.now().toString(),
          text: response.text,
          timestamp: Date.now(),
          language: settings?.defaultLanguage || 'zh',
          duration,
        };
        addToHistory(historyItem);
      } else {
        // Handle API error response
        const apiError = errorHandler.createError(
          ErrorType.API_REQUEST_FAILED,
          response.error || 'Transcription failed'
        );
        setError(apiError);
      }
    } catch (err: any) {
      console.error('Transcription error:', err);
      const appError = errorHandler.handleUnknownError(err);
      setError(appError);
    } finally {
      setIsProcessing(false);
    }
  }, [addToHistory, settings]);

  // Handle copy
  const handleCopy = useCallback((text: string) => {
    console.log('Text copied:', text);
    // Show toast notification
    setToastMessage(t.uiLanguage === 'zh' ? '已複製到剪貼簿' : 'Copied to clipboard');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  }, [t]);

  // Handle history item selection
  const handleSelectHistoryItem = useCallback((item: TranscriptionHistory) => {
    setTranscribedText(item.text);
  }, []);

  // Handle settings save
  const handleSaveSettings = useCallback(async (newSettings: AppSettings) => {
    try {
      await window.electronAPI.saveSettings(newSettings);
      setSettings(newSettings);
      
      // 更新 UI 語言
      if (newSettings.uiLanguage) {
        setUILanguage(newSettings.uiLanguage);
      }
      
      // Apply window opacity immediately
      if (newSettings.windowOpacity !== settings?.windowOpacity) {
        // Note: Window opacity would be handled by main process
        // This is just updating the local state
      }
      
      // Trigger settings update event for other components
      window.dispatchEvent(new CustomEvent('settings-updated', { detail: newSettings }));
    } catch (err) {
      console.error('Failed to save settings:', err);
      const appError = errorHandler.handleUnknownError(err);
      setError(appError);
      throw err;
    }
  }, [settings]);

  // Handle error retry
  const handleErrorRetry = useCallback(() => {
    if (error?.type === ErrorType.API_KEY_INVALID) {
      // Open settings to configure API key
      setIsSettingsOpen(true);
    }
    // Clear error to allow retry
    setError(null);
  }, [error]);

  // Handle error dismiss
  const handleErrorDismiss = useCallback(() => {
    setError(null);
  }, []);

  // Context value
  const contextValue: AppContextValue = {
    isRecording,
    isProcessing,
    transcribedText,
    error,
    history,
    recordingDuration,
    uiLanguage,
    t,
    setIsRecording,
    setIsProcessing,
    setTranscribedText,
    setError,
    addToHistory,
    clearHistory,
    setRecordingDuration,
    setUILanguage,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down">
          <div className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="font-medium">{toastMessage}</span>
          </div>
        </div>
      )}
      
      <div className="h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden">
        {/* Custom Title Bar */}
        <div 
          className="flex items-center justify-between px-4 py-3 bg-gray-900/80 backdrop-blur-sm border-b border-gray-700/50"
          style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}
        >
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 cursor-pointer transition-colors" 
                   style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
                   onClick={() => window.electronAPI?.closeWindow?.()}
                   title={t.uiLanguage === 'zh' ? '關閉' : 'Close'}
              />
              <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 cursor-pointer transition-colors"
                   style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
                   onClick={() => window.electronAPI?.minimizeWindow?.()}
                   title={t.uiLanguage === 'zh' ? '最小化' : 'Minimize'}
              />
              <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 cursor-pointer transition-colors"
                   style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
                   title={t.uiLanguage === 'zh' ? '全螢幕' : 'Fullscreen'}
              />
            </div>
            <span className="text-sm font-medium text-gray-300 ml-2">{t.appTitle}</span>
          </div>
          <div className="text-xs text-gray-500">{t.uiLanguage === 'zh' ? '語音轉文字助手' : 'Voice to Text Assistant'}</div>
        </div>

        {/* Error Display */}
        <ErrorDisplay
          error={error}
          onRetry={handleErrorRetry}
          onDismiss={handleErrorDismiss}
          autoHideDuration={0} // Don't auto-hide errors
        />

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
          <div className="max-w-2xl mx-auto space-y-4">

            {/* Recording Control */}
            <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700/50 shadow-xl">
              <RecordingControl
                audioRecorder={audioRecorderRef.current}
                onRecordingComplete={handleRecordingComplete}
              />
            </div>

            {/* Text Display */}
            <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700/50 shadow-xl">
              <TextDisplay onCopy={handleCopy} />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-gray-700/80 hover:bg-gray-600/80 backdrop-blur-sm rounded-lg transition-all duration-200 hover:scale-105 shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {t.settings}
              </button>
            </div>

            {/* History List */}
            {history.length > 0 && (
              <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700/50 shadow-xl">
                <HistoryList
                  history={history}
                  onSelectItem={handleSelectHistoryItem}
                  onClearHistory={clearHistory}
                />
              </div>
            )}

            {/* Status Indicator */}
            <StatusIndicator />
          </div>
        </div>

        {/* Settings Modal */}
        <Settings
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          onSave={handleSaveSettings}
        />
          </>
        ) : (
          /* Collapsed Icon State */
          <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg cursor-pointer hover:scale-110 transition-transform">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
          </div>
        )}
      </div>
    </AppContext.Provider>
  );
};

export default App;
