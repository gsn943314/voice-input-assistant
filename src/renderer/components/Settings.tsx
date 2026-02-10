import React, { useState, useEffect, useCallback } from 'react';
import type { AppSettings } from '../../shared/types';
import { useAppContext } from '../App';
import { ShortcutInput } from './ShortcutInput';

// Debounce hook for performance optimization
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (settings: AppSettings) => void;
}

export const Settings: React.FC<SettingsProps> = ({ isOpen, onClose, onSave }) => {
  const { t, setUILanguage, uiLanguage } = useAppContext();
  
  const [settings, setSettings] = useState<AppSettings>({
    apiKey: '',
    defaultLanguage: 'zh',
    uiLanguage: 'zh',
    shortcuts: {
      startRecording: 'CommandOrControl+Shift+R',
      stopRecording: 'CommandOrControl+Shift+S',
      copyText: 'CommandOrControl+Shift+C',
      clearText: 'CommandOrControl+Shift+X',
    },
    windowOpacity: 0.95,
    historyLimit: 50,
  });

  const [showApiKey, setShowApiKey] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
  // Debounced settings for preview (e.g., opacity changes)
  const debouncedOpacity = useDebounce(settings.windowOpacity, 300);
  
  // Track if settings have been modified
  const [isModified, setIsModified] = useState(false);
  
  // Store original UI language for cancel
  const [originalUILanguage, setOriginalUILanguage] = useState<'zh' | 'en'>('zh');

  // Load settings when component mounts or opens
  useEffect(() => {
    if (isOpen) {
      loadSettings();
      setIsModified(false);
      // Save original UI language
      setOriginalUILanguage(uiLanguage);
    }
  }, [isOpen, uiLanguage]);

  // Apply debounced opacity preview to window
  useEffect(() => {
    if (isOpen && isModified && window.electronAPI) {
      // This would communicate with main process to preview opacity
      // For now, we just debounce the state update
      // window.electronAPI.setWindowOpacity?.(debouncedOpacity);
    }
  }, [debouncedOpacity, isOpen, isModified]);

  const loadSettings = async () => {
    try {
      const loadedSettings = await window.electronAPI.loadSettings();
      setSettings(loadedSettings);
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  };

  const handleSave = async () => {
    // Validate settings
    const errors = validateSettings(settings);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setIsSaving(true);
    try {
      await onSave(settings);
      onClose();
    } catch (error) {
      console.error('Failed to save settings:', error);
      setValidationErrors({ general: 'Failed to save settings' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setValidationErrors({});
    // Restore original UI language
    setUILanguage(originalUILanguage);
    onClose();
  };

  const validateSettings = (settings: AppSettings): Record<string, string> => {
    const errors: Record<string, string> = {};

    // Validate API key format (OpenAI keys start with 'sk-' and have specific length)
    if (settings.apiKey) {
      if (!settings.apiKey.startsWith('sk-')) {
        errors.apiKey = t.errors.apiKeyInvalid;
      } else if (settings.apiKey.length < 20) {
        errors.apiKey = t.errors.apiKeyTooShort;
      }
    }

    // Validate shortcuts
    if (!settings.shortcuts.startRecording) {
      errors.startRecording = t.errors.shortcutRequired;
    } else if (!isValidShortcut(settings.shortcuts.startRecording)) {
      errors.startRecording = t.errors.shortcutInvalid;
    }

    if (!settings.shortcuts.stopRecording) {
      errors.stopRecording = t.errors.shortcutRequired;
    } else if (!isValidShortcut(settings.shortcuts.stopRecording)) {
      errors.stopRecording = t.errors.shortcutInvalid;
    }

    // Check for shortcut conflicts
    if (settings.shortcuts.startRecording && settings.shortcuts.stopRecording) {
      if (settings.shortcuts.startRecording === settings.shortcuts.stopRecording) {
        errors.shortcuts = t.errors.shortcutConflict;
      }
    }

    // Validate window opacity
    if (settings.windowOpacity < 0.5 || settings.windowOpacity > 1) {
      errors.windowOpacity = t.errors.opacityRange;
    }

    // Validate history limit
    if (settings.historyLimit < 1 || settings.historyLimit > 100) {
      errors.historyLimit = t.errors.historyLimitRange;
    }

    return errors;
  };

  // Validate Electron shortcut format
  const isValidShortcut = (shortcut: string): boolean => {
    // Basic validation for Electron accelerator format
    // Valid modifiers: Command, Cmd, Control, Ctrl, CommandOrControl, CmdOrCtrl, Alt, Option, AltGr, Shift, Super
    // Valid keys: A-Z, 0-9, F1-F24, Plus, Space, Tab, etc.
    const modifierPattern = /^(Command|Cmd|Control|Ctrl|CommandOrControl|CmdOrCtrl|Alt|Option|AltGr|Shift|Super)(\+(Command|Cmd|Control|Ctrl|CommandOrControl|CmdOrCtrl|Alt|Option|AltGr|Shift|Super))*\+[A-Z0-9]$/;
    return modifierPattern.test(shortcut);
  };

  // Real-time validation on field change with debouncing
  const handleApiKeyChange = useCallback((value: string) => {
    setSettings(prev => ({ ...prev, apiKey: value }));
    setIsModified(true);
    
    // Clear error when user starts typing
    if (validationErrors.apiKey) {
      setValidationErrors(prev => ({ ...prev, apiKey: '' }));
    }
  }, [validationErrors.apiKey]);

  const handleShortcutChange = useCallback((field: 'startRecording' | 'stopRecording', value: string) => {
    setSettings(prev => ({
      ...prev,
      shortcuts: { ...prev.shortcuts, [field]: value }
    }));
    setIsModified(true);
    
    // Clear related errors
    setValidationErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      delete newErrors.shortcuts;
      
      // Check for conflicts in real-time
      const newShortcuts = { ...settings.shortcuts, [field]: value };
      if (newShortcuts.startRecording && newShortcuts.stopRecording) {
        if (newShortcuts.startRecording === newShortcuts.stopRecording) {
          newErrors.shortcuts = '開始和停止錄音快捷鍵不能相同';
        }
      }
      
      return newErrors;
    });
  }, [settings.shortcuts]);

  // Preview window opacity change with debouncing
  const handleOpacityChange = useCallback((opacity: number) => {
    setSettings(prev => ({ ...prev, windowOpacity: opacity }));
    setIsModified(true);
    
    // 即時預覽透明度
    if (window.electronAPI?.setWindowOpacity) {
      window.electronAPI.setWindowOpacity(opacity);
    }
    
    if (validationErrors.windowOpacity) {
      setValidationErrors(prev => ({ ...prev, windowOpacity: '' }));
    }
  }, [validationErrors.windowOpacity]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl w-full max-w-md border border-gray-700 shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4 flex-shrink-0">
          <h2 className="text-2xl font-bold">{t.settings}</h2>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label={t.cancel}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* General Error */}
        {validationErrors.general && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-200 text-sm">
            {validationErrors.general}
          </div>
        )}

        {/* Settings Form - Scrollable */}
        <div className="space-y-5 overflow-y-auto custom-scrollbar px-6 flex-1">
          {/* API Key */}
          <div>
            <label className="block text-sm font-medium mb-2">
              {t.openAIApiKey}
            </label>
            <div className="relative">
              <input
                type={showApiKey ? 'text' : 'password'}
                value={settings.apiKey}
                onChange={(e) => handleApiKeyChange(e.target.value)}
                placeholder={t.apiKeyPlaceholder}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                aria-label={showApiKey ? 'Hide' : 'Show'}
              >
                {showApiKey ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {validationErrors.apiKey && (
              <p className="mt-1 text-sm text-red-400">{validationErrors.apiKey}</p>
            )}
            <p className="mt-1 text-xs text-gray-400">
              {t.uiLanguage === 'zh' ? '從' : 'Get API key from'} <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">OpenAI {t.uiLanguage === 'zh' ? '平台' : 'Platform'}</a>
            </p>
          </div>

          {/* Language Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">
              {t.defaultLanguage}
            </label>
            <select
              value={settings.defaultLanguage}
              onChange={(e) => setSettings({ ...settings, defaultLanguage: e.target.value as 'zh' | 'en' })}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="zh">{t.chinese}</option>
              <option value="en">{t.english}</option>
            </select>
          </div>

          {/* UI Language Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">
              {t.uiLanguage}
            </label>
            <select
              value={settings.uiLanguage}
              onChange={(e) => {
                const newLang = e.target.value as 'zh' | 'en';
                setSettings({ ...settings, uiLanguage: newLang });
                // 即時預覽：立即切換 UI 語言
                setUILanguage(newLang);
              }}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="zh">{t.chinese}</option>
              <option value="en">{t.english}</option>
            </select>
            <p className="mt-1 text-xs text-gray-400">
              {t.uiLanguage === 'zh' ? '預覽模式：儲存後永久生效' : 'Preview mode: Save to apply permanently'}
            </p>
          </div>

          {/* Window Opacity */}
          <div>
            <label className="block text-sm font-medium mb-2">
              {t.windowOpacity}: {Math.round(settings.windowOpacity * 100)}%
            </label>
            <input
              type="range"
              min="50"
              max="100"
              step="5"
              value={settings.windowOpacity * 100}
              onChange={(e) => handleOpacityChange(parseInt(e.target.value) / 100)}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
            {validationErrors.windowOpacity && (
              <p className="mt-1 text-sm text-red-400">{validationErrors.windowOpacity}</p>
            )}
          </div>

          {/* Shortcuts */}
          <div>
            <label className="block text-sm font-medium mb-2">
              {t.keyboardShortcuts}
            </label>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1">{t.startRecordingShortcut}</label>
                <ShortcutInput
                  value={settings.shortcuts.startRecording}
                  onChange={(value) => handleShortcutChange('startRecording', value)}
                  placeholder="CommandOrControl+Shift+R"
                  error={validationErrors.startRecording}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">{t.stopRecordingShortcut}</label>
                <ShortcutInput
                  value={settings.shortcuts.stopRecording}
                  onChange={(value) => handleShortcutChange('stopRecording', value)}
                  placeholder="CommandOrControl+Shift+S"
                  error={validationErrors.stopRecording}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">{t.copyTextShortcut}</label>
                <ShortcutInput
                  value={settings.shortcuts.copyText}
                  onChange={(value) => handleShortcutChange('copyText', value)}
                  placeholder="CommandOrControl+Shift+C"
                  error={validationErrors.copyText}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">{t.clearTextShortcut}</label>
                <ShortcutInput
                  value={settings.shortcuts.clearText}
                  onChange={(value) => handleShortcutChange('clearText', value)}
                  placeholder="CommandOrControl+Shift+X"
                  error={validationErrors.clearText}
                />
              </div>
            </div>
            {validationErrors.shortcuts && (
              <p className="mt-1 text-sm text-red-400">{validationErrors.shortcuts}</p>
            )}
          </div>

          {/* History Limit */}
          <div>
            <label className="block text-sm font-medium mb-2">
              {t.historyLimit}
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={settings.historyLimit}
              onChange={(e) => {
                setSettings({ ...settings, historyLimit: parseInt(e.target.value) || 50 });
                setValidationErrors({ ...validationErrors, historyLimit: '' });
              }}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {validationErrors.historyLimit && (
              <p className="mt-1 text-sm text-red-400">{validationErrors.historyLimit}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 p-6 pt-4 border-t border-gray-700 flex-shrink-0">
          <button
            onClick={handleCancel}
            className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            disabled={isSaving}
          >
            {t.cancel}
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSaving}
          >
            {isSaving ? t.saving : t.save}
          </button>
        </div>
      </div>
    </div>
  );
};
