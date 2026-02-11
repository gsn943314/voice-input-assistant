# VoiceInput Installation Guide

## 📦 Download

Download the latest version from [GitHub Releases](https://github.com/gsn943314/voice-input-assistant/releases):

- **VoiceInput-1.0.0-universal.dmg** (Recommended)
- **VoiceInput-1.0.0-universal-mac.zip** (Alternative)

## 🔧 Installation Steps

### Method 1: Using DMG Installer (Recommended)

1. Download `VoiceInput-1.0.0-universal.dmg`
2. Double-click the DMG file to open
3. Drag VoiceInput.app to the Applications folder
4. Eject the DMG image
5. Launch VoiceInput from Applications or Launchpad

### Method 2: Using ZIP Archive

1. Download `VoiceInput-1.0.0-universal-mac.zip`
2. Extract the ZIP file
3. Move VoiceInput.app to the Applications folder
4. Launch VoiceInput from Applications or Launchpad

## 🔐 First Launch

### macOS Security Warning

On first launch, macOS will display a security warning because the app is not notarized by Apple.

**Solution (choose one):**

#### Method 1: Right-Click to Open (Recommended)

1. **Don't** double-click VoiceInput.app
2. **Right-click** on VoiceInput.app
3. Select "**Open**"
4. Click "**Open**" in the confirmation dialog

#### Method 2: Using Terminal

```bash
xattr -cr /Applications/VoiceInput.app
open /Applications/VoiceInput.app
```

#### Method 3: System Preferences

1. Try to open the app (it will be blocked)
2. Open "System Preferences" → "Security & Privacy"
3. In the "General" tab, click "**Open Anyway**"

## ⚙️ Initial Setup

1. Launch VoiceInput
2. Click the settings button (gear icon)
3. Enter your OpenAI API key
4. Select default language (Chinese or English)
5. Customize other settings (optional)
6. Click "Save"

## 🎤 Getting Started

1. Click the microphone button to start recording
2. Speak
3. Click the button again to stop recording
4. Wait for transcription to complete
5. Click the copy button to copy text

## 🔧 Troubleshooting

### App Won't Launch

- Confirm your macOS version is 10.15 or later
- Check if necessary permissions are granted
- Try reinstalling the app

### Can't Record

- Check microphone permissions
- Confirm microphone is working
- Restart the app

### Transcription Failed

- Verify API key is correct
- Check internet connection
- Verify OpenAI API credits

## 🗑️ Uninstallation

1. Close VoiceInput
2. Delete VoiceInput.app from Applications folder
3. (Optional) Delete settings file:
   ```bash
   rm -rf ~/Library/Application\ Support/voice-input-app
   ```

## 📞 Need Help?

- Check [Security Warning Solution](SECURITY_WARNING_SOLUTION.md)
- [Report Issue](https://github.com/gsn943314/voice-input-assistant/issues)
- [View Documentation](README.md)
