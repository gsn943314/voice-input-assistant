#!/bin/bash

# Fix macOS Gatekeeper Security Warning
# Usage: bash fix-security-warning.sh

echo "🔧 Removing quarantine attribute from VoiceInput..."

# Check if app exists
if [ ! -d "/Applications/VoiceInput.app" ]; then
    echo "❌ Error: VoiceInput.app not found in /Applications"
    echo "Please install the app first"
    exit 1
fi

# Remove quarantine attribute
sudo xattr -cr /Applications/VoiceInput.app

if [ $? -eq 0 ]; then
    echo "✅ Success! VoiceInput can now be opened normally"
    echo ""
    echo "Launching the app..."
    open /Applications/VoiceInput.app
else
    echo "❌ Failed: Administrator permission required"
    echo "Please run: sudo xattr -cr /Applications/VoiceInput.app"
fi
