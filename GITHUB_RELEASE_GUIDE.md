# GitHub Release 發布指南

## 📋 準備工作

確認以下文件已準備好：
- ✅ `release/VoiceInput-1.0.0-universal.dmg` (169MB)
- ✅ `release/VoiceInput-1.0.0-universal-mac.zip` (163MB)
- ✅ `RELEASE_NOTES.md`

## 🚀 發布步驟

### 1. 提交並推送代碼

```bash
git add .
git commit -m "v1.0.0: Initial release with universal binary support"
git push origin main
```

### 2. 創建 GitHub Release

1. 前往你的 GitHub 倉庫
2. 點擊 **Releases** 標籤
3. 點擊 **Create a new release** 或 **Draft a new release**

### 3. 填寫 Release 資訊

#### Tag version
```
v1.0.0
```

#### Release title
```
VoiceInput v1.0.0 - 首次發布！🎉
```

#### Description

複製 `RELEASE_NOTES.md` 的內容，或使用以下簡化版本：

```markdown
## 🎉 首次發布！

VoiceInput 是一個優雅的 macOS 浮動視窗語音轉文字應用程式，使用 OpenAI Whisper API 提供高品質語音識別。

### ✨ 主要功能

- 🎤 高品質語音轉文字（OpenAI Whisper API）
- 🪟 浮動視窗設計，始終保持在最上層
- 🌐 完整的中英文介面切換
- ⚙️ 豐富的自訂設定選項
- 📜 歷史記錄管理
- 🚀 效能優化

### 📥 下載

**推薦：DMG 安裝檔（Universal 版本）**
- 同時支援 Intel 和 Apple Silicon Mac
- 雙擊安裝，拖曳到 Applications 資料夾

**備選：ZIP 壓縮檔（Universal 版本）**
- 同時支援 Intel 和 Apple Silicon Mac
- 解壓後移動到 Applications 資料夾

### 📋 系統需求

- macOS 10.15 (Catalina) 或更新版本
- Intel 或 Apple Silicon (M1/M2/M3)
- 至少 4GB RAM
- 網路連線（OpenAI API）
- 麥克風、OpenAI API 金鑰

### 🔧 安裝指南

請參閱 [INSTALL_GUIDE.md](https://github.com/YOUR_USERNAME/voice-input-assistant/blob/main/INSTALL_GUIDE.md)

### 📞 支援

- 🐛 [回報問題](https://github.com/YOUR_USERNAME/voice-input-assistant/issues)
- 💡 [功能建議](https://github.com/YOUR_USERNAME/voice-input-assistant/issues/new?labels=enhancement)
- 📖 [完整文件](https://github.com/YOUR_USERNAME/voice-input-assistant)

---

**享受語音轉文字的便利！** 🎤✨
```

### 4. 上傳文件

在 **Attach binaries** 區域，拖曳或選擇以下文件：

1. `release/VoiceInput-1.0.0-universal.dmg`
2. `release/VoiceInput-1.0.0-universal-mac.zip`

**注意：** 不要上傳 `.blockmap` 文件，這些是 electron-builder 的內部文件。

### 5. 發布選項

- ✅ **Set as the latest release** - 勾選此項
- ⬜ **Set as a pre-release** - 不要勾選（這是正式版本）
- ⬜ **Create a discussion for this release** - 可選

### 6. 發布

點擊 **Publish release** 按鈕

## ✅ 驗證

發布後，確認：

1. Release 頁面顯示正確
2. DMG 和 ZIP 文件可以下載
3. 文件大小正確：
   - DMG: ~169MB
   - ZIP: ~163MB
4. Release notes 顯示正確

## 📝 更新 README

在 README.md 中添加下載連結：

```markdown
## 📥 下載

從 [GitHub Releases](https://github.com/YOUR_USERNAME/voice-input-assistant/releases/latest) 下載最新版本。

- **VoiceInput-1.0.0-universal.dmg** - DMG 安裝檔（推薦）
- **VoiceInput-1.0.0-universal-mac.zip** - ZIP 壓縮檔

支援 Intel 和 Apple Silicon Mac。
```

## 🔄 後續版本

對於後續版本，重複以上步驟，但記得：

1. 更新 `package.json` 中的版本號
2. 更新 tag 和 release title
3. 更新 release notes
4. 重新打包並上傳新文件

## 💡 提示

- 使用語義化版本號（Semantic Versioning）
- 保持 release notes 簡潔明瞭
- 包含重要的變更和修復
- 提供清晰的安裝指南
- 回應用戶的問題和反饋
