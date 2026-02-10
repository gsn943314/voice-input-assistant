import React, { useState, useEffect, useRef } from 'react';

interface ShortcutInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
}

export const ShortcutInput: React.FC<ShortcutInputProps> = ({
  value,
  onChange,
  placeholder,
  error,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isRecording) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const newKeys = new Set(pressedKeys);
      
      // Add modifier keys
      if (e.metaKey || e.key === 'Meta') newKeys.add('CommandOrControl');
      if (e.ctrlKey || e.key === 'Control') newKeys.add('CommandOrControl');
      if (e.shiftKey || e.key === 'Shift') newKeys.add('Shift');
      if (e.altKey || e.key === 'Alt') newKeys.add('Alt');
      
      // Add regular key (not modifier)
      if (!['Meta', 'Control', 'Shift', 'Alt'].includes(e.key)) {
        newKeys.add(e.key.toUpperCase());
      }

      setPressedKeys(newKeys);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      e.preventDefault();
      e.stopPropagation();

      // When all keys are released, finalize the shortcut
      if (pressedKeys.size > 0) {
        const shortcut = Array.from(pressedKeys).join('+');
        onChange(shortcut);
        setIsRecording(false);
        setPressedKeys(new Set());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isRecording, pressedKeys, onChange]);

  // Click outside to cancel
  useEffect(() => {
    if (!isRecording) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setIsRecording(false);
        setPressedKeys(new Set());
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isRecording]);

  const handleClick = () => {
    setIsRecording(true);
    setPressedKeys(new Set());
  };

  const displayValue = isRecording
    ? pressedKeys.size > 0
      ? Array.from(pressedKeys).join('+')
      : 'Press keys...'
    : value || placeholder;

  return (
    <div className="relative">
      <div
        ref={inputRef}
        onClick={handleClick}
        className={`
          w-full bg-gray-700 border rounded-lg px-4 py-2 cursor-pointer
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-all
          ${error ? 'border-red-500' : 'border-gray-600'}
          ${isRecording ? 'ring-2 ring-blue-500 border-blue-500' : ''}
        `}
      >
        <div className="flex items-center justify-between">
          <span className={`text-sm ${isRecording ? 'text-blue-400' : 'text-white'}`}>
            {displayValue}
          </span>
          {isRecording && (
            <span className="text-xs text-blue-400 animate-pulse">
              Recording...
            </span>
          )}
        </div>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
      {!error && !isRecording && (
        <p className="mt-1 text-xs text-gray-400">
          Click to record shortcut
        </p>
      )}
    </div>
  );
};
