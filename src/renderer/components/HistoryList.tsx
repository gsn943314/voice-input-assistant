import React, { useState, useRef, useMemo } from 'react';
import type { TranscriptionHistory } from '../../shared/types';
import { useAppContext } from '../App';

interface HistoryListProps {
  history: TranscriptionHistory[];
  onSelectItem: (item: TranscriptionHistory) => void;
  onClearHistory: () => void;
}

// Virtual scrolling configuration
const ITEM_HEIGHT = 80; // Approximate height of each history item in pixels
const VISIBLE_ITEMS = 5; // Number of items to render at once
const BUFFER_ITEMS = 2; // Extra items to render above/below for smooth scrolling

export const HistoryList: React.FC<HistoryListProps> = ({
  history,
  onSelectItem,
  onClearHistory,
}) => {
  const { t, uiLanguage } = useAppContext();
  const [scrollTop, setScrollTop] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Memoize formatting functions to avoid recreating on every render
  const formatTimestamp = useMemo(() => (timestamp: number): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) {
      return t.timeAgo.justNow;
    } else if (diffMins < 60) {
      return `${diffMins} ${t.timeAgo.minutesAgo}`;
    } else if (diffHours < 24) {
      return `${diffHours} ${t.timeAgo.hoursAgo}`;
    } else if (diffDays < 7) {
      return `${diffDays} ${t.timeAgo.daysAgo}`;
    } else {
      return date.toLocaleDateString(uiLanguage === 'zh' ? 'zh-TW' : 'en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    }
  }, [t, uiLanguage]);

  const formatDuration = useMemo(() => (seconds: number): string => {
    if (seconds < 60) {
      return `${Math.round(seconds)}${uiLanguage === 'zh' ? '秒' : 's'}`;
    }
    const mins = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, [uiLanguage]);

  const truncateText = useMemo(() => (text: string, maxLength: number = 60): string => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  }, []);

  // Calculate visible items based on scroll position (virtual scrolling)
  const visibleItems = useMemo(() => {
    if (history.length === 0) return [];

    const startIndex = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - BUFFER_ITEMS);
    const endIndex = Math.min(
      history.length,
      Math.ceil((scrollTop + ITEM_HEIGHT * VISIBLE_ITEMS) / ITEM_HEIGHT) + BUFFER_ITEMS
    );

    return history.slice(startIndex, endIndex).map((item, index) => ({
      item,
      index: startIndex + index,
    }));
  }, [history, scrollTop]);

  // Handle scroll event with throttling
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  // Calculate total height for virtual scrolling
  const totalHeight = history.length * ITEM_HEIGHT;

  if (history.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <svg
          className="w-12 h-12 mx-auto mb-3 opacity-50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-sm">{t.noHistory}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Header with clear button */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-300">
          {t.history} ({history.length})
        </h3>
        <button
          onClick={onClearHistory}
          className="text-xs text-red-400 hover:text-red-300 transition-colors px-2 py-1 rounded hover:bg-red-900/20"
          title={t.clearHistory}
        >
          {t.clearHistory}
        </button>
      </div>

      {/* History list with virtual scrolling */}
      <div 
        ref={scrollContainerRef}
        className="max-h-64 overflow-y-auto custom-scrollbar"
        onScroll={handleScroll}
      >
        <div style={{ height: `${totalHeight}px`, position: 'relative' }}>
          {visibleItems.map(({ item, index }) => (
            <button
              key={item.id}
              onClick={() => onSelectItem(item)}
              className="absolute w-full text-left p-3 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-all border border-gray-600/30 hover:border-gray-500/50 group"
              style={{
                top: `${index * ITEM_HEIGHT}px`,
                height: `${ITEM_HEIGHT}px`,
              }}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {formatTimestamp(item.timestamp)}
                </span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <svg
                    className="w-3 h-3"
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
                  {formatDuration(item.duration)}
                </span>
              </div>
              <p className="text-sm text-gray-200 group-hover:text-white transition-colors line-clamp-2">
                {truncateText(item.text)}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-500 px-1.5 py-0.5 rounded bg-gray-600/30">
                  {item.language === 'zh' ? t.chinese : t.english}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
