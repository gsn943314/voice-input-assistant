# VoiceInput Quick Start Guide

## 📥 Installation

### Step 1: Download

Download from [GitHub Releases](https://github.com/gsn943314/voice-input-assistant/releases/latest):

- **VoiceInput-1.0.0-universal.dmg** (Recommended)
- **VoiceInput-1.0.0-universal-mac.zip** (Alternative)

### Step 2: Install

1. Open the DMG file
2. Drag VoiceInput.app to Applications folder
3. Eject the DMG

### Step 3: First Launch ⚠️

**Important:** Don't double-click to open!

1. **Right-click** on VoiceInput.app
2. Select "**Open**"
3. Click "**Open**" in the dialog

This is only needed once due to macOS security.

---

## ⚙️ Initial Setup

### Step 1: Get OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create account
3. Click "Create new secret key"
4. Copy the key (starts with `sk-`)

### Step 2: Configure VoiceInput

1. Launch VoiceInput
2. Click the ⚙️ settings icon
3. Paste your API key
4. Select default language (Chinese/English)
5. Click "Save"

### Step 3: Grant Microphone Permission

When prompted:
1. Click "OK" to allow microphone access
2. If denied, go to System Preferences → Security & Privacy → Microphone
3. Check the box next to VoiceInput

---

## 🎤 Using VoiceInput

### Basic Recording

1. **Start Recording**
   - Click the microphone button
   - Or press `Cmd+Shift+R`
   - Button turns red while recording

2. **Speak Clearly**
   - Speak at normal pace
   - Avoid background noise
   - Stay close to microphone

3. **Stop Recording**
   - Click the stop button
   - Or press `Cmd+Shift+S`
   - Wait for transcription

4. **Copy Text**
   - Click the copy button
   - Or press `Cmd+Shift+C`
   - Text copied to clipboard

### View History

- Scroll down to see recent transcriptions
- Click any item to reload it
- Click "Clear" to remove all history

### Adjust Settings

- **Window Opacity**: Drag slider (50-100%)
- **Language**: Switch between Chinese/English
- **Shortcuts**: Click to capture new key combination
- **History Limit**: Set max saved items (1-100)

---

## 💡 Tips & Tricks

### For Best Results

- ✅ Speak clearly and at normal pace
- ✅ Use in quiet environment
- ✅ Keep recordings under 5 minutes
- ✅ Position microphone properly

### Keyboard Shortcuts

| Action | Default | Customizable |
|--------|---------|--------------|
| Start Recording | `Cmd+Shift+R` | ✅ |
| Stop Recording | `Cmd+Shift+S` | ✅ |
| Copy Text | `Cmd+Shift+C` | ✅ |
| Clear Text | `Cmd+Shift+X` | ✅ |

### Window Management

- **Move**: Drag the title bar
- **Resize**: Drag window edges
- **Minimize**: Click yellow button
- **Close**: Click red button
- **Always on Top**: Enabled by default

---

## 🐛 Common Issues

### Security Warning

**Problem**: Can't open app, security warning

**Solution**: Right-click → Open → Open

[Detailed guide](SECURITY_WARNING_SOLUTION.md)

### No Microphone Access

**Problem**: Can't record audio

**Solution**:
1. System Preferences → Security & Privacy
2. Privacy → Microphone
3. Check VoiceInput
4. Restart app

### Invalid API Key

**Problem**: "Invalid API key" error

**Solution**:
1. Check key starts with `sk-`
2. No extra spaces
3. Generate new key if needed
4. Verify OpenAI account has credits

### Transcription Failed

**Problem**: Recording completes but no text

**Solution**:
1. Check internet connection
2. Verify API key is valid
3. Try shorter recording
4. Check OpenAI API status

---

## 💰 Pricing

### App Cost
- **Free** - VoiceInput is completely free

### API Cost
- **$0.006 per minute** of audio
- Charged by OpenAI, not VoiceInput
- Example costs:
  - 10 minutes = $0.06
  - 100 minutes = $0.60
  - 1000 minutes = $6.00

### Managing Costs

- Keep recordings concise
- Review transcriptions before re-recording
- Monitor usage on OpenAI dashboard
- Set spending limits in OpenAI account

---

## 📞 Getting Help

### Documentation

- [Full README](README.md)
- [Security Warning Solution](SECURITY_WARNING_SOLUTION.md)
- [Troubleshooting Guide](TROUBLESHOOTING.md)

### Support Channels

- 🐛 [Report Bug](https://github.com/gsn943314/voice-input-assistant/issues)
- 💡 [Request Feature](https://github.com/gsn943314/voice-input-assistant/issues/new?labels=enhancement)
- 💬 [Discussions](https://github.com/gsn943314/voice-input-assistant/discussions)

### Before Asking for Help

1. Check this guide
2. Review troubleshooting section
3. Search existing issues
4. Provide details:
   - macOS version
   - VoiceInput version
   - Error messages
   - Steps to reproduce

---

## 🎉 You're Ready!

Now you can:
- ✅ Record voice and get text
- ✅ Copy transcriptions quickly
- ✅ Access your history
- ✅ Customize settings

**Enjoy using VoiceInput!** 🎤✨

---

<div align="center">

**Questions?** Check the [FAQ](README.md#-troubleshooting) or [open an issue](https://github.com/gsn943314/voice-input-assistant/issues)

</div>
