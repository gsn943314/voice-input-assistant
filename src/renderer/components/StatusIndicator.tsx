import React from 'react';
import { useAppContext } from '../App';
import { ErrorType } from '../../shared/types';

export const StatusIndicator: React.FC = () => {
  const { isRecording, isProcessing, error, transcribedText, t } = useAppContext();

  // Determine current status
  const getStatus = () => {
    if (error) return 'error';
    if (isRecording) return 'recording';
    if (isProcessing) return 'processing';
    if (transcribedText) return 'completed';
    return 'ready';
  };

  const status = getStatus();

  // Status configurations
  const statusConfig = {
    ready: {
      icon: (
        <div className="w-3 h-3 bg-gray-500 rounded-full" />
      ),
      text: t.status.ready,
      color: 'text-gray-400',
    },
    recording: {
      icon: (
        <div className="relative">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          <div className="absolute inset-0 w-3 h-3 bg-red-500 rounded-full animate-ping opacity-75" />
        </div>
      ),
      text: t.status.recording,
      color: 'text-red-400',
    },
    processing: {
      icon: (
        <svg
          className="animate-spin h-4 w-4 text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ),
      text: t.status.processing,
      color: 'text-blue-400',
    },
    completed: {
      icon: (
        <svg
          className="w-4 h-4 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ),
      text: t.uiLanguage === 'zh' ? '完成' : 'Completed',
      color: 'text-green-400',
    },
    error: {
      icon: (
        <svg
          className="w-4 h-4 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      text: t.status.error,
      color: 'text-red-400',
    },
  };

  const currentConfig = statusConfig[status];

  // Get user-friendly error message
  const getErrorMessage = () => {
    if (!error) return '';

    switch (error.type) {
      case ErrorType.MICROPHONE_ACCESS_DENIED:
        return '麥克風權限被拒絕。請在系統設定中授予權限。';
      case ErrorType.API_KEY_INVALID:
        return 'API 金鑰無效。請檢查您的設定。';
      case ErrorType.API_REQUEST_FAILED:
        return 'API 請求失敗。請稍後再試。';
      case ErrorType.NETWORK_ERROR:
        return '網路連線錯誤。請檢查您的網路連線。';
      case ErrorType.AUDIO_RECORDING_FAILED:
        return '錄音失敗。請重新嘗試。';
      case ErrorType.UNKNOWN_ERROR:
      default:
        return error.message || '發生未知錯誤。';
    }
  };

  return (
    <div className="w-full transition-all-smooth">
      {/* Status bar */}
      <div className="flex items-center space-x-2 px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 transition-all-smooth">
        {/* Status icon */}
        <div className="flex-shrink-0 transition-all-smooth">
          {currentConfig.icon}
        </div>

        {/* Status text */}
        <div className="flex-1 transition-all-smooth">
          <span className={`text-sm font-medium ${currentConfig.color} transition-colors duration-300`}>
            {t.uiLanguage === 'zh' ? '狀態' : 'Status'}: {currentConfig.text}
          </span>
        </div>
      </div>

      {/* Error message display */}
      {error && (
        <div className="mt-3 p-3 bg-red-900/30 border border-red-700 rounded-lg animate-fade-in">
          <div className="flex items-start space-x-2">
            <svg
              className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <div className="flex-1">
              <p className="text-sm text-red-300 font-medium">
                {getErrorMessage()}
              </p>
              {error.details && (
                <p className="text-xs text-red-400 mt-1 opacity-75">
                  詳細資訊: {error.details.toString()}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Loading animation for processing state */}
      {isProcessing && (
        <div className="mt-3 flex items-center justify-center space-x-2 text-blue-400">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          <span className="text-sm">{t.uiLanguage === 'zh' ? '正在轉換語音...' : 'Converting speech...'}</span>
        </div>
      )}
    </div>
  );
};
