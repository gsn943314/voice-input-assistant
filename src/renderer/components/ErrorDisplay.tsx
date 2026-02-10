import React, { useEffect, useState } from 'react';
import { AppError } from '../../shared/types';
import { errorHandler } from '../../shared/errorHandler';

interface ErrorDisplayProps {
  error: AppError | null;
  onRetry?: () => void;
  onDismiss?: () => void;
  autoHideDuration?: number; // in milliseconds, 0 means no auto-hide
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  onRetry,
  onDismiss,
  autoHideDuration = 5000
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (error) {
      setIsVisible(true);

      // Auto-hide after duration if specified
      if (autoHideDuration > 0) {
        const timer = setTimeout(() => {
          setIsVisible(false);
          if (onDismiss) {
            onDismiss();
          }
        }, autoHideDuration);

        return () => clearTimeout(timer);
      }
    } else {
      setIsVisible(false);
    }
  }, [error, autoHideDuration, onDismiss]);

  if (!error || !isVisible) {
    return null;
  }

  const userMessage = errorHandler.getUserMessage(error);
  const suggestedAction = errorHandler.getSuggestedAction(error);

  const handleAction = () => {
    if (suggestedAction === '重試' && onRetry) {
      onRetry();
    } else if (suggestedAction === '設定 API 金鑰') {
      // This will be handled by parent component to open settings
      if (onRetry) {
        onRetry();
      }
    } else if (suggestedAction === '前往系統設定') {
      // Open system preferences (macOS specific)
      window.electron.openSystemPreferences();
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) {
      onDismiss();
    }
  };

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down">
      <div className="bg-red-50 border border-red-200 rounded-lg shadow-lg p-4 max-w-md">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-sm font-medium text-red-800">錯誤</h3>
            <p className="mt-1 text-sm text-red-700">{userMessage}</p>
            {error.details && (
              <details className="mt-2">
                <summary className="text-xs text-red-600 cursor-pointer hover:text-red-800">
                  詳細資訊
                </summary>
                <pre className="mt-1 text-xs text-red-600 overflow-auto max-h-20">
                  {typeof error.details === 'string'
                    ? error.details
                    : JSON.stringify(error.details, null, 2)}
                </pre>
              </details>
            )}
            {suggestedAction && (
              <div className="mt-3 flex gap-2">
                <button
                  onClick={handleAction}
                  className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                >
                  {suggestedAction}
                </button>
                <button
                  onClick={handleDismiss}
                  className="px-3 py-1 bg-white text-red-600 text-sm rounded border border-red-300 hover:bg-red-50 transition-colors"
                >
                  關閉
                </button>
              </div>
            )}
          </div>
          {!suggestedAction && (
            <button
              onClick={handleDismiss}
              className="ml-3 flex-shrink-0 text-red-400 hover:text-red-600"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;
