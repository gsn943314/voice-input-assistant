# macOS Security Warning Solution

## 🚨 Problem Description

After installing VoiceInput, you see this error when trying to open it:

**English version:**
> "VoiceInput" Not Opened
> 
> Apple could not verify "VoiceInput" is free of malware that may harm your Mac or compromise your privacy.

**Chinese version:**
> 未打開 "VoiceInput"
> 
> Apple 無法驗證 "VoiceInput" 是否包含可能危害 Mac 安全或洩漏隱私的惡意軟件。

## ❓ Why Does This Happen?

This is macOS **Gatekeeper** security mechanism. The warning appears because:

1. VoiceInput is an open-source application
2. It's not notarized by Apple
3. It's not signed with a paid Apple Developer account

**This doesn't mean the app is unsafe!** You can review the complete source code.

## ✅ Solutions

### Method 1: Right-Click to Open (Easiest) ⭐

1. Locate `/Applications/VoiceInput.app`
2. **Right-click** (or Control-click) on the app
3. Select "**Open**" from the menu
4. A new dialog will appear, click "**Open**" to confirm

![Right-click open demonstration]

**You only need to do this once!** After that, you can double-click to open normally.

---

### Method 2: Use Terminal Command

Open Terminal and run:

```bash
xattr -cr /Applications/VoiceInput.app
```

Then open the app normally:

```bash
open /Applications/VoiceInput.app
```

**Or use our provided script:**

```bash
cd voice-input-assistant
bash fix-security-warning.sh
```

---

### Method 3: System Preferences

1. Try to open VoiceInput (it will be blocked)
2. Immediately open **System Preferences**
3. Click **Security & Privacy**
4. Go to the **General** tab
5. You'll see: "VoiceInput was blocked..."
6. Click the **"Open Anyway"** button
7. Try opening the app again
8. Click **"Open"** in the confirmation dialog

---

### Method 4: Disable Gatekeeper Completely (Not Recommended)

⚠️ **Warning: This reduces system security, not recommended**

```bash
sudo spctl --master-disable
```

Remember to re-enable it after:

```bash
sudo spctl --master-enable
```

---

## 🔍 Verify App Security

If you're concerned about security:

### 1. Review Source Code

All code is publicly available on GitHub:
- https://github.com/gsn943314/voice-input-assistant

### 2. Inspect App Contents

```bash
# View app structure
ls -la /Applications/VoiceInput.app/Contents/

# Check code signature
codesign -dv /Applications/VoiceInput.app

# View quarantine attributes
xattr -l /Applications/VoiceInput.app
```

### 3. Build It Yourself

If you don't trust the packaged version, build it yourself:

```bash
git clone https://github.com/gsn943314/voice-input-assistant.git
cd voice-input-assistant
npm install
npm run package:mac
```

---

## 📝 FAQ

### Q: Why not get Apple notarization?

A: Apple notarization requires:
- Paid Apple Developer account ($99/year)
- Complex signing and notarization process
- Too costly for free open-source apps

### Q: Is this app safe?

A: Yes!
- ✅ Completely open source, code is reviewable
- ✅ Doesn't collect any personal data
- ✅ Only uses OpenAI API (with your own key)
- ✅ All data stored locally

### Q: Do I need to allow it every update?

A: Yes, you'll need to allow it once for each new version.

### Q: Can I trust this developer?

A: You can:
- Review all commit history on GitHub
- Check other users' reviews and Issues
- Audit the source code yourself
- Build the app yourself

---

## 🎯 Quick Command Reference

```bash
# Remove quarantine attribute
xattr -cr /Applications/VoiceInput.app

# Open the app
open /Applications/VoiceInput.app

# View app information
codesign -dv /Applications/VoiceInput.app

# View quarantine attributes
xattr -l /Applications/VoiceInput.app

# Completely remove the app
rm -rf /Applications/VoiceInput.app
rm -rf ~/Library/Application\ Support/voice-input-app
```

---

## 💡 Sharing with Friends

If you want to share this app with friends:

1. Share this documentation with them
2. Tell them to use the "right-click open" method
3. Explain this is normal macOS security behavior
4. Provide the GitHub link for source code review

---

## 📞 Need Help?

- 🐛 [Report Issue](https://github.com/gsn943314/voice-input-assistant/issues)
- 💬 [Discussions](https://github.com/gsn943314/voice-input-assistant/discussions)
- 📖 [Full Documentation](https://github.com/gsn943314/voice-input-assistant)

---

**Remember: This warning is normal macOS behavior, not an indication of a problem!** 🎉
