import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../App';

interface TextDisplayProps {
  onCopy: (text: string) => void;
  onClear?: () => void;
}

export const TextDisplay: React.FC<TextDisplayProps> = ({ onCopy, onClear }) => {
  const { transcribedText, setTranscribedText, t } = useAppContext();
  const [showCopied, setShowCopied] = useState(false);
  const textAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when text changes
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight;
    }
  }, [transcribedText]);

  const handleCopy = async () => {
    if (!transcribedText) return;

    try {
      // Use Electron API if available, otherwise fallback to clipboard API
      if (window.electronAPI?.copyToClipboard) {
        await window.electronAPI.copyToClipboard(transcribedText);
      } else {
        await navigator.clipboard.writeText(transcribedText);
      }
      
      onCopy(transcribedText);
      
      // Show copied feedback
      setShowCopied(true);
      setTimeout(() => {
        setShowCopied(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  const handleClear = () => {
    setTranscribedText('');
    if (onClear) {
      onClear();
    }
  };

  return (
    <div className="w-full space-y-3">
      {/* Text display area */}
      <div className="relative">
        <div
          ref={textAreaRef}
          className="
            w-full min-h-[200px] max-h-[300px] overflow-y-auto
            bg-gray-800 rounded-lg p-4
            text-gray-100 text-base leading-relaxed
            border border-gray-700
            scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800
          "
        >
          {transcribedText ? (
            <p className="whitespace-pre-wrap break-words">{transcribedText}</p>
          ) : (
            <p className="text-gray-500 italic">{t.noTextYet}</p>
          )}
        </div>

        {/* Copy button overlay */}
        {transcribedText && (
          <div className="absolute top-2 right-2 flex gap-2">
            {/* Clear button */}
            <button
              onClick={handleClear}
              className="
                px-3 py-1.5 rounded-md
                bg-red-700 hover:bg-red-600
                text-white text-sm
                transition-all duration-200
                flex items-center space-x-1
                opacity-90 hover:opacity-100
              "
              aria-label="Clear text"
              title={t.uiLanguage === 'zh' ? '清除文字' : 'Clear text'}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              <span>{t.uiLanguage === 'zh' ? '清除' : 'Clear'}</span>
            </button>

            {/* Copy button */}
            <button
              onClick={handleCopy}
              className="
                px-3 py-1.5 rounded-md
                bg-gray-700 hover:bg-gray-600
                text-white text-sm
                transition-all duration-200
                flex items-center space-x-1
                opacity-90 hover:opacity-100
              "
              aria-label="Copy text"
            >
              {showCopied ? (
                <>
                  <svg
                    className="w-4 h-4 text-green-400"
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
                  <span className="text-green-400">{t.copied}</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  <span>{t.copyToClipboard}</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Copy success animation */}
      {showCopied && (
        <div className="flex items-center justify-center space-x-2 text-green-400 animate-fade-in-out">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-sm font-medium">{t.uiLanguage === 'zh' ? '文字已複製到剪貼簿' : 'Text copied to clipboard'}</span>
        </div>
      )}
    </div>
  );
};
