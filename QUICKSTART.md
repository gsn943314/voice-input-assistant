# Quick Start Guide

Get up and running with VoiceInput in 5 minutes!

## 📋 Prerequisites

Before you begin, make sure you have:

- ✅ macOS 10.15 (Catalina) or later
- ✅ An OpenAI account
- ✅ An OpenAI API key

## 🔑 Step 1: Get Your OpenAI API Key

If you don't have an API key yet:

1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Go to [API Keys page](https://platform.openai.com/api-keys)
4. Click **"Create new secret key"**
5. Give it a name (e.g., "VoiceInput")
6. **Copy the key** - it starts with `sk-`
7. Save it somewhere safe (you won't be able to see it again!)

💡 **Tip**: OpenAI gives you free credits when you sign up. Check your [usage page](https://platform.openai.com/usage) to see your balance.

## 📥 Step 2: Install VoiceInput

### Option A: Download Pre-built App (Easiest)

1. Download `VoiceInput-x.x.x.dmg` from the [Releases page](../../releases)
2. Open the DMG file
3. Drag **VoiceInput** to your **Applications** folder
4. Eject the DMG

### Option B: Build from Source

```bash
# Clone the repository
git clone <repository-url>
cd voice-input-assistant

# Install dependencies
npm install

# Build the app
npm run build

# Package for macOS
npm run package:mac

# The app will be in release/mac/VoiceInput.app
```

## 🚀 Step 3: Launch VoiceInput

1. Open **Applications** folder
2. Find and double-click **VoiceInput**
3. If you see a security warning:
   - Click **"Cancel"**
   - Go to **System Preferences** > **Security & Privacy**
   - Click **"Open Anyway"**
   - Click **"Open"** in the confirmation dialog

The VoiceInput window will appear on your screen!

## ⚙️ Step 4: Configure Settings

1. Click the **⚙️ (Settings)** icon in the VoiceInput window
2. In the **"OpenAI API 金鑰"** field, paste your API key
3. Choose your **Default Language**:
   - **中文** for Chinese
   - **English** for English
4. Adjust other settings if desired:
   - **Window Opacity**: How transparent the window is
   - **Keyboard Shortcuts**: Customize recording shortcuts
   - **History Limit**: How many transcriptions to keep
5. Click **"儲存" (Save)**

## 🎤 Step 5: Grant Microphone Permission

The first time you try to record:

1. macOS will ask for microphone permission
2. Click **"OK"** or **"Allow"**
3. If you accidentally denied it:
   - Go to **System Preferences** > **Security & Privacy** > **Privacy**
   - Select **"Microphone"** from the left
   - Check the box next to **VoiceInput**

## 🎙️ Step 6: Make Your First Recording

Now you're ready to use VoiceInput!

### Using the Button

1. Click the **🎤 microphone button**
2. The button turns red and pulses - you're recording!
3. Speak clearly into your microphone
4. Click the **⏹️ stop button** when done
5. Wait a moment while the audio is processed
6. Your transcribed text appears!

### Using Keyboard Shortcuts

- **Start Recording**: Press `Cmd+Shift+R`
- **Stop Recording**: Press `Cmd+Shift+S`

💡 **Tip**: You can customize these shortcuts in Settings!

## 📋 Step 7: Copy Your Text

Once your text is transcribed:

1. Click the **📋 Copy** button
2. The text is copied to your clipboard
3. Paste it anywhere with `Cmd+V`

## 🎉 You're All Set!

You can now:

- ✅ Record voice and get text instantly
- ✅ Copy transcriptions to clipboard
- ✅ View your transcription history
- ✅ Customize settings to your preference

## 💡 Pro Tips

### Tip 1: Better Audio Quality

For best results:
- Use a good quality microphone
- Record in a quiet environment
- Speak clearly and at a normal pace
- Keep recordings under 5 minutes

### Tip 2: Window Management

- **Drag** the window by the title bar to reposition
- The window stays **on top** of other apps
- Click **[─]** to minimize
- Click **[×]** to close

### Tip 3: Language Switching

- Set your default language in Settings
- The app will remember your preference
- Switch languages anytime in Settings

### Tip 4: History Management

- Click any history item to reload that text
- Click **"清空" (Clear)** to delete all history
- History is saved between sessions
- Adjust history limit in Settings (1-100 items)

## 🆘 Common Issues

### "Microphone access denied"

**Fix**: Go to System Preferences > Security & Privacy > Privacy > Microphone, and enable VoiceInput

### "Invalid API key"

**Fix**: 
1. Check your API key starts with `sk-`
2. Make sure there are no extra spaces
3. Try generating a new key from OpenAI

### "Network error"

**Fix**: 
1. Check your internet connection
2. Verify OpenAI services are online
3. Try again in a moment

### Recording but no text appears

**Fix**:
1. Check your microphone is working
2. Ensure you spoke during recording
3. Try recording again with clearer audio
4. Check your OpenAI account has credits

## 📚 Next Steps

- Read the full [README](README.md) for detailed documentation
- Check out [PACKAGING.md](PACKAGING.md) if you want to build from source
- Report issues or request features on [GitHub Issues](../../issues)

## 💰 Cost Information

OpenAI Whisper API charges per minute of audio:
- **$0.006 per minute** (as of 2024)
- Example: 100 minutes = $0.60

Check your usage at [OpenAI Usage Dashboard](https://platform.openai.com/usage)

---

**Need help?** Open an issue on GitHub or check the troubleshooting section in the [README](README.md).

Happy transcribing! 🎤✨
