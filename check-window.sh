#!/bin/bash

# Check if VoiceInput is running
if pgrep -f "VoiceInput.app" > /dev/null; then
    echo "✓ VoiceInput is running"
    
    # Get window info using AppleScript
    osascript <<EOF
tell application "System Events"
    set appName to "VoiceInput"
    if exists (process appName) then
        tell process appName
            set windowCount to count of windows
            log "Number of windows: " & windowCount
            if windowCount > 0 then
                repeat with w in windows
                    log "Window: " & (name of w)
                    log "Position: " & (position of w)
                    log "Size: " & (size of w)
                end repeat
            end if
        end tell
    else
        log "Process not found"
    end if
end tell
EOF
else
    echo "✗ VoiceInput is not running"
fi
