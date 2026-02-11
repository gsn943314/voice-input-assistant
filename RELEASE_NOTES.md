# VoiceInput v1.0.0 Release Notes

## 🎉 首次發布！

歡迎使用 VoiceInput - 一個優雅的 macOS 浮動視窗語音轉文字應用程式！

## ✨ 主要功能

### 🎤 語音轉文字
- 使用 OpenAI Whisper API 提供高品質語音識別
- 支援中文和英文語音識別
- 即時錄音和轉錄
- 一鍵複製轉錄結果

### 🪟 浮動視窗設計
- 始終保持在最上層，不干擾其他工作
- 可調整視窗透明度（50%-100%）
- 簡潔現代的 UI 設計
- 支援拖曳移動和調整大小

### 🌐 多語言介面
- 完整的中英文介面切換
- 即時預覽語言變更
- 所有 UI 元素都支援多語言

### ⚙️ 豐富的設定選項
- 自訂鍵盤快捷鍵（智能按鍵捕捉）
- 調整歷史記錄數量限制
- 視窗透明度即時預覽
- 開發者工具開關（開發模式）

### 📜 歷史記錄管理
- 虛擬滾動優化，支援大量歷史記錄
- 點擊歷史項目快速重新載入
- 一鍵清空所有歷史
- 顯示錄音時間和語言標籤

### 🚀 效能優化
- 記憶體使用優化（< 100MB 閒置）
- 音訊處理效能優化
- 設定變更防抖動
- 自動資源清理

## 🎮 使用方法

### 快速開始
1. 下載並安裝 VoiceInput
2. 取得 OpenAI API 金鑰
3. 在設定中輸入 API 金鑰
4. 開始錄音！

### 快捷鍵
- `Cmd+Shift+R` - 開始錄音
- `Cmd+Shift+S` - 停止錄音
- 可在設定中自訂

## 📋 系統需求

- **作業系統**: macOS 10.15 (Catalina) 或更新版本
- **處理器**: Intel 或 Apple Silicon (M1/M2/M3)
- **記憶體**: 至少 4GB RAM
- **網路**: 需要網路連線（OpenAI API）
- **其他**: 麥克風、OpenAI API 金鑰

## 💰 費用說明

- VoiceInput 應用程式完全免費
- 需要支付 OpenAI Whisper API 使用費：每分鐘 $0.006
- 例如：100 分鐘轉錄 ≈ $0.60

## 📥 下載

### 推薦：DMG 安裝檔（Universal 版本）
- **VoiceInput-1.0.0-universal.dmg** (169MB)
- 同時支援 Intel 和 Apple Silicon Mac
- 雙擊安裝，拖曳到 Applications 資料夾

### 備選：ZIP 壓縮檔（Universal 版本）
- **VoiceInput-1.0.0-universal-mac.zip** (163MB)
- 同時支援 Intel 和 Apple Silicon Mac
- 解壓後移動到 Applications 資料夾

## 🔧 技術規格

- **框架**: Electron 28.3.3
- **前端**: React 18 + TypeScript
- **樣式**: Tailwind CSS
- **建置工具**: Vite
- **API**: OpenAI Whisper
- **儲存**: electron-store
- **架構**: Universal (Intel + Apple Silicon)

## 🐛 已知問題

- 首次啟動可能需要授予麥克風權限
- 某些 macOS 版本的視窗透明度效果可能有限
- 長時間錄音（>5分鐘）可能影響轉錄準確度

## 🔄 未來計劃

- [ ] 支援更多語言
- [ ] 即時轉錄功能
- [ ] 自訂 Whisper 模型選擇
- [ ] 雲端同步歷史記錄
- [ ] macOS Shortcuts 整合
- [ ] 批次檔案轉錄

## 🙏 致謝

感謝以下開源專案：
- [OpenAI Whisper API](https://openai.com/research/whisper)
- [Electron](https://www.electronjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)

## 📞 支援

- 🐛 [回報問題](https://github.com/YOUR_USERNAME/voice-input-assistant/issues)
- 💡 [功能建議](https://github.com/YOUR_USERNAME/voice-input-assistant/issues/new?labels=enhancement)
- 📖 [完整文件](https://github.com/YOUR_USERNAME/voice-input-assistant)

## 📄 授權

本專案採用 MIT 授權條款。

---

**享受語音轉文字的便利！** 🎤✨

如果你覺得 VoiceInput 有用，請給我們一個 ⭐ Star！
