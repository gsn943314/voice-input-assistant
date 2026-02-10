import React, { useEffect, useState, useCallback } from 'react';
import { useAppContext } from '../App';
import { AudioRecorder } from '../services/AudioRecorder';
import { ErrorType } from '../../shared/types';

interface RecordingControlProps {
  audioRecorder: AudioRecorder;
  onRecordingComplete: (audioBlob: Blob, duration: number) => void;
}

export const RecordingControl: React.FC<RecordingControlProps> = ({
  audioRecorder,
  onRecordingComplete,
}) => {
  const {
    isRecording,
    isProcessing,
    setIsRecording,
    setError,
    recordingDuration,
    setRecordingDuration,
    t,
  } = useAppContext();

  const [startTime, setStartTime] = useState<number>(0);
  const [settings, setSettings] = useState<any>(null);

  // Load settings for shortcuts
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const loadedSettings = await window.electronAPI.loadSettings();
        setSettings(loadedSettings);
      } catch (error) {
        console.error('Failed to load settings:', error);
      }
    };
    
    loadSettings();
    
    // Listen for settings updates
    const handleSettingsUpdate = (event: any) => {
      setSettings(event.detail);
    };
    
    window.addEventListener('settings-updated', handleSettingsUpdate);
    return () => {
      window.removeEventListener('settings-updated', handleSettingsUpdate);
    };
  }, []);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRecording) {
      interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        setRecordingDuration(elapsed);
      }, 100);
    } else {
      setRecordingDuration(0);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRecording, startTime, setRecordingDuration]);

  // Keyboard shortcuts - use settings
  useEffect(() => {
    if (!settings) return;

    const parseShortcut = (shortcut: string) => {
      const parts = shortcut.split('+');
      return {
        needsCtrlOrCmd: parts.includes('CommandOrControl') || parts.includes('Command') || parts.includes('Control'),
        needsShift: parts.includes('Shift'),
        needsAlt: parts.includes('Alt'),
        key: parts[parts.length - 1].toLowerCase(),
      };
    };

    const startShortcut = parseShortcut(settings.shortcuts.startRecording);
    const stopShortcut = parseShortcut(settings.shortcuts.stopRecording);

    const handleKeyPress = (event: KeyboardEvent) => {
      const eventKey = event.key.toLowerCase();

      // Check for start recording shortcut
      if (
        !isRecording &&
        !isProcessing &&
        eventKey === startShortcut.key &&
        (!startShortcut.needsCtrlOrCmd || event.metaKey || event.ctrlKey) &&
        (!startShortcut.needsShift || event.shiftKey) &&
        (!startShortcut.needsAlt || event.altKey)
      ) {
        event.preventDefault();
        handleStartRecording();
      }
      
      // Check for stop recording shortcut
      if (
        isRecording &&
        eventKey === stopShortcut.key &&
        (!stopShortcut.needsCtrlOrCmd || event.metaKey || event.ctrlKey) &&
        (!stopShortcut.needsShift || event.shiftKey) &&
        (!stopShortcut.needsAlt || event.altKey)
      ) {
        event.preventDefault();
        handleStopRecording();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isRecording, isProcessing, settings]);

  const handleStartRecording = useCallback(async () => {
    try {
      setError(null);
      await audioRecorder.startRecording();
      setIsRecording(true);
      setStartTime(Date.now());
    } catch (error: any) {
      console.error('Failed to start recording:', error);
      setError(error);
      setIsRecording(false);
    }
  }, [audioRecorder, setIsRecording, setError]);

  const handleStopRecording = useCallback(async () => {
    try {
      const audioBlob = await audioRecorder.stopRecording();
      const duration = recordingDuration;
      setIsRecording(false);
      onRecordingComplete(audioBlob, duration);
    } catch (error: any) {
      console.error('Failed to stop recording:', error);
      setError({
        type: ErrorType.AUDIO_RECORDING_FAILED,
        message: error.message || 'Failed to stop recording',
        details: error,
      });
      setIsRecording(false);
    }
  }, [audioRecorder, recordingDuration, setIsRecording, setError, onRecordingComplete]);

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Recording button */}
      <button
        onClick={isRecording ? handleStopRecording : handleStartRecording}
        disabled={isProcessing}
        className={`
          relative w-20 h-20 rounded-full flex items-center justify-center
          transition-all duration-300 transform hover:scale-105
          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
          ${isRecording 
            ? 'bg-red-600 hover:bg-red-700 animate-recording-pulse' 
            : 'bg-blue-600 hover:bg-blue-700'
          }
          ${isProcessing ? 'animate-pulse' : ''}
        `}
        aria-label={isRecording ? 'Stop recording' : 'Start recording'}
      >
        {isProcessing ? (
          // Loading spinner
          <svg
            className="animate-spin h-8 w-8 text-white"
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
        ) : isRecording ? (
          // Stop icon
          <div className="w-6 h-6 bg-white rounded-sm" />
        ) : (
          // Microphone icon
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          </svg>
        )}
        
        {/* Pulsating animation ring when recording */}
        {isRecording && (
          <span className="absolute inset-0 rounded-full bg-red-600 animate-ping opacity-75" />
        )}
      </button>

      {/* Recording timer */}
      {isRecording && (
        <div className="flex items-center space-x-2 text-red-500 font-mono text-lg">
          <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          <span>{formatDuration(recordingDuration)}</span>
        </div>
      )}

      {/* Status text */}
      <div className="text-sm text-gray-400">
        {isProcessing ? (
          t.processing
        ) : isRecording ? (
          `${t.recording} - ${t.stopRecording} (Cmd+Shift+S)`
        ) : (
          `${t.startRecording} (Cmd+Shift+R)`
        )}
      </div>
    </div>
  );
};
