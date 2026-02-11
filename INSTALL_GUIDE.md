# VoiceInput 安裝指南

## 📦 下載

從 [GitHub Releases](https://github.com/YOUR_USERNAME/voice-input-assistant/releases) 下載最新版本：

- **VoiceInput-1.0.0-universal.dmg** (推薦)
- **VoiceInput-1.0.0-universal-mac.zip** (備選)

## 🔧 安裝步驟

### 方法 1：使用 DMG 安裝檔（推薦）

1. 下載 `VoiceInput-1.0.0-universal.dmg`
2. 雙擊 DMG 檔案打開
3. 將 VoiceInput.app 拖曳到 Applications 資料夾
4. 彈出 DMG 映像檔
5. 從 Applications 資料夾或 Launchpad 啟動 VoiceInput

### 方法 2：使用 ZIP 壓縮檔

1. 下載 `VoiceInput-1.0.0-universal-mac.zip`
2. 解壓縮 ZIP 檔案
3. 將 VoiceInput.app 移動到 Applications 資料夾
4. 從 Applications 資料夾或 Launchpad 啟動 VoiceInput

## 🔐 首次啟動

### macOS 安全性提示

首次啟動時，macOS 可能會顯示安全性警告，因為應用程式未經 Apple 公證。

**解決方法：**

1. 右鍵點擊 VoiceInput.app
2. 選擇「打開」
3. 在彈出的對話框中點擊「打開」

或者：

1. 打開「系統偏好設定」→「安全性與隱私權」
2. 在「一般」標籤頁中，點擊「仍要打開」

### 麥克風權限

首次使用錄音功能時，macOS 會要求授予麥克風權限：

1. 點擊「好」授予權限
2. 如果不小心拒絕，可以在「系統偏好設定」→「安全性與隱私權」→「麥克風」中手動啟用

## ⚙️ 初始設定

1. 啟動 VoiceInput
2. 點擊設定按鈕（齒輪圖示）
3. 輸入你的 OpenAI API 金鑰
4. 選擇預設語言（中文或英文）
5. 自訂其他設定（可選）
6. 點擊「儲存」

## 🎤 開始使用

1. 點擊麥克風按鈕開始錄音
2. 說話
3. 再次點擊按鈕停止錄音
4. 等待轉錄完成
5. 點擊複製按鈕複製文字

## 🔧 故障排除

### 應用程式無法啟動

- 確認你的 macOS 版本是 10.15 或更新
- 檢查是否已授予必要的權限
- 嘗試重新安裝應用程式

### 無法錄音

- 檢查麥克風權限
- 確認麥克風正常工作
- 重新啟動應用程式

### 轉錄失敗

- 檢查 API 金鑰是否正確
- 確認網路連線正常
- 檢查 OpenAI API 額度

## 🗑️ 解除安裝

1. 關閉 VoiceInput
2. 從 Applications 資料夾刪除 VoiceInput.app
3. （可選）刪除設定檔：
   ```bash
   rm -rf ~/Library/Application\ Support/voice-input-app
   ```

## 📞 需要幫助？

- 查看 [故障排除文件](故障排除.md)
- [回報問題](https://github.com/YOUR_USERNAME/voice-input-assistant/issues)
- [查看常見問題](https://github.com/YOUR_USERNAME/voice-input-assistant/wiki/FAQ)
