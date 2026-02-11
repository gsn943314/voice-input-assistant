# VoiceInput v1.0.0 Release Notes

## 🎉 Initial Release!

Welcome to VoiceInput - an elegant macOS floating window app for voice-to-text conversion!

## ✨ Key Features

### 🎤 Voice-to-Text
- High-quality speech recognition powered by OpenAI Whisper API
- Support for Chinese and English recognition
- Real-time recording and transcription
- One-click copy to clipboard

### 🪟 Floating Window Design
- Always stays on top, doesn't interfere with other work
- Adjustable window opacity (50%-100%)
- Clean and modern UI design
- Supports drag to move and resize

### 🌐 Multi-Language Interface
- Complete Chinese and English interface switching
- Real-time language preview
- All UI elements support multiple languages

### ⚙️ Rich Settings Options
- Custom keyboard shortcuts (smart key capture)
- Adjust history record limit
- Window opacity real-time preview
- Developer tools toggle (development mode)

### 📜 History Management
- Virtual scrolling optimization, supports large history
- Click history items to quickly reload
- One-click clear all history
- Display recording time and language tags

### 🚀 Performance Optimization
- Memory usage optimization (< 100MB idle)
- Audio processing performance optimization
- Settings change debouncing
- Automatic resource cleanup

## 🎮 How to Use

### Quick Start
1. Download and install VoiceInput
2. Get OpenAI API key
3. Enter API key in settings
4. Start recording!

### Keyboard Shortcuts
- `Cmd+Shift+R` - Start recording
- `Cmd+Shift+S` - Stop recording
- Customizable in settings

## 📋 System Requirements

- **OS**: macOS 10.15 (Catalina) or later
- **Processor**: Intel or Apple Silicon (M1/M2/M3)
- **Memory**: At least 4GB RAM
- **Network**: Internet connection required (OpenAI API)
- **Other**: Microphone, OpenAI API key

## 💰 Pricing

- VoiceInput app is completely free
- OpenAI Whisper API usage fee: $0.006 per minute
- Example: 100 minutes transcription ≈ $0.60

## 📥 Download

### Recommended: DMG Installer (Universal Version)
- **VoiceInput-1.0.0-universal.dmg** (169MB)
- Supports both Intel and Apple Silicon Mac
- Double-click to install, drag to Applications folder

### Alternative: ZIP Archive (Universal Version)
- **VoiceInput-1.0.0-universal-mac.zip** (163MB)
- Supports both Intel and Apple Silicon Mac
- Extract and move to Applications folder

### ⚠️ Important: First-Time Opening Instructions

macOS will show a security warning - this is normal!

**Solution:**
1. **Right-click** on VoiceInput.app
2. Select "**Open**"
3. Click "**Open**" in the confirmation dialog

**Detailed guide:** [SECURITY_WARNING_SOLUTION.md](https://github.com/gsn943314/voice-input-assistant/blob/main/SECURITY_WARNING_SOLUTION.md)

## 🔧 Technical Specifications

- **Framework**: Electron 28.3.3
- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **API**: OpenAI Whisper
- **Storage**: electron-store
- **Architecture**: Universal (Intel + Apple Silicon)

## 🐛 Known Issues

- **macOS security warning on first launch** (normal, use right-click to open)
- First launch may require microphone permission
- Some macOS versions may have limited window transparency effects
- Long recordings (>5 minutes) may affect transcription accuracy

## 🔄 Future Plans

- [ ] Support for more languages
- [ ] Real-time transcription
- [ ] Custom Whisper model selection
- [ ] Cloud sync for history
- [ ] macOS Shortcuts integration
- [ ] Batch file transcription

## 🙏 Acknowledgments

Thanks to the following open source projects:
- [OpenAI Whisper API](https://openai.com/research/whisper)
- [Electron](https://www.electronjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)

## 📞 Support

- 🐛 [Report Issue](https://github.com/gsn943314/voice-input-assistant/issues)
- 💡 [Feature Request](https://github.com/gsn943314/voice-input-assistant/issues/new?labels=enhancement)
- 📖 [Full Documentation](https://github.com/gsn943314/voice-input-assistant)

## 📄 License

This project is licensed under the MIT License.

---

**Enjoy the convenience of voice-to-text!** 🎤✨

If you find VoiceInput useful, please give us a ⭐ Star!
