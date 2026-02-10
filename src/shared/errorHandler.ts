import { AppError, ErrorType } from './types';

/**
 * Global error handler for the application
 */
class ErrorHandler {
  private errorLog: Array<{ timestamp: number; error: AppError }> = [];
  private maxLogSize = 100;

  /**
   * Log an error to the internal error log
   */
  logError(error: AppError): void {
    const logEntry = {
      timestamp: Date.now(),
      error
    };

    this.errorLog.push(logEntry);

    // Keep log size under control
    if (this.errorLog.length > this.maxLogSize) {
      this.errorLog.shift();
    }

    // Log to console for debugging
    console.error(`[${new Date(logEntry.timestamp).toISOString()}] ${error.type}:`, error.message, error.details);
  }

  /**
   * Create an AppError from an unknown error
   */
  createError(type: ErrorType, message: string, details?: any): AppError {
    const error: AppError = {
      type,
      message,
      details
    };

    this.logError(error);
    return error;
  }

  /**
   * Handle unknown errors and convert them to AppError
   */
  handleUnknownError(error: unknown): AppError {
    if (this.isAppError(error)) {
      this.logError(error);
      return error;
    }

    let message = 'An unknown error occurred';
    let details: any = undefined;

    if (error instanceof Error) {
      message = error.message;
      details = {
        name: error.name,
        stack: error.stack
      };
    } else if (typeof error === 'string') {
      message = error;
    } else {
      details = error;
    }

    return this.createError(ErrorType.UNKNOWN_ERROR, message, details);
  }

  /**
   * Type guard to check if an error is an AppError
   */
  isAppError(error: unknown): error is AppError {
    return (
      typeof error === 'object' &&
      error !== null &&
      'type' in error &&
      'message' in error &&
      Object.values(ErrorType).includes((error as any).type)
    );
  }

  /**
   * Get the error log
   */
  getErrorLog(): Array<{ timestamp: number; error: AppError }> {
    return [...this.errorLog];
  }

  /**
   * Clear the error log
   */
  clearErrorLog(): void {
    this.errorLog = [];
  }

  /**
   * Get user-friendly error message based on error type
   */
  getUserMessage(error: AppError): string {
    switch (error.type) {
      case ErrorType.MICROPHONE_ACCESS_DENIED:
        return '無法存取麥克風。請在系統設定中授予麥克風權限。';
      case ErrorType.API_KEY_INVALID:
        return 'API 金鑰無效。請檢查您的 OpenAI API 金鑰設定。';
      case ErrorType.API_REQUEST_FAILED:
        return 'API 請求失敗。請稍後再試。';
      case ErrorType.NETWORK_ERROR:
        return '網路連線錯誤。請檢查您的網路連線。';
      case ErrorType.AUDIO_RECORDING_FAILED:
        return '錄音失敗。請重新開始錄音。';
      case ErrorType.UNKNOWN_ERROR:
        return error.message || '發生未知錯誤。';
      default:
        return '發生錯誤。';
    }
  }

  /**
   * Get suggested action based on error type
   */
  getSuggestedAction(error: AppError): string | null {
    switch (error.type) {
      case ErrorType.MICROPHONE_ACCESS_DENIED:
        return '前往系統設定';
      case ErrorType.API_KEY_INVALID:
        return '設定 API 金鑰';
      case ErrorType.API_REQUEST_FAILED:
      case ErrorType.NETWORK_ERROR:
      case ErrorType.AUDIO_RECORDING_FAILED:
        return '重試';
      default:
        return null;
    }
  }
}

// Export singleton instance
export const errorHandler = new ErrorHandler();
