# VoiceInput 安裝和使用手冊

## 📋 目錄

- [系統需求](#系統需求)
- [安裝方式](#安裝方式)
  - [方式 1：下載預編譯版本（推薦）](#方式-1下載預編譯版本推薦)
  - [方式 2：從源碼編譯](#方式-2從源碼編譯)
- [首次設定](#首次設定)
- [使用說明](#使用說明)
- [常見問題](#常見問題)
- [卸載](#卸載)

---

## 系統需求

### 必要條件
- **作業系統**: macOS 10.15 (Catalina) 或更新版本
- **記憶體**: 至少 4GB RAM
- **硬碟空間**: 至少 200MB 可用空間
- **網路**: 需要網路連線（用於 OpenAI API）

### 需要準備
- OpenAI 帳號和 API 金鑰
- 麥克風（內建或外接）

---

## 安裝方式

### 方式 1：下載預編譯版本（推薦）

#### 步驟 1：下載應用程式

1. 前往 [GitHub Releases 頁面](https://github.com/YOUR_USERNAME/voice-input-assistant/releases)
2. 下載最新版本的 `VoiceInput-x.x.x.dmg` 檔案

#### 步驟 2：安裝

1. 雙擊下載的 `.dmg` 檔案
2. 將 **VoiceInput** 圖示拖曳到 **Applications** 資料夾
3. 退出 DMG（右鍵點擊桌面上的 DMG 圖示 → 退出）

#### 步驟 3：首次啟動

1. 開啟 **Finder** → **應用程式**
2. 找到並雙擊 **VoiceInput**
3. 如果看到安全性警告：
   - 點擊 **取消**
   - 前往 **系統偏好設定** → **安全性與隱私權**
   - 點擊 **仍要打開**
   - 再次點擊 **打開** 確認

---

### 方式 2：從源碼編譯

#### 前置需求

確保已安裝以下工具：

```bash
# 檢查 Node.js 版本（需要 18 或更新）
node --version

# 檢查 npm 版本
npm --version

# 如果沒有安裝，請從 https://nodejs.org/ 下載安裝
```

#### 步驟 1：克隆專案

```bash
# 使用 HTTPS
git clone https://github.com/YOUR_USERNAME/voice-input-assistant.git

# 或使用 SSH
git clone git@github.com:YOUR_USERNAME/voice-input-assistant.git

# 進入專案目錄
cd voice-input-assistant
```

#### 步驟 2：安裝依賴

```bash
npm install
```

這會安裝所有必要的依賴套件，可能需要幾分鐘。

#### 步驟 3：建置應用程式

```bash
# 建置應用程式
npm run build

# 打包成 macOS 應用程式
npm run package:mac
```

建置完成後，你會在 `release/` 目錄找到：
- `VoiceInput-x.x.x.dmg` - 安裝檔
- `VoiceInput-x.x.x-mac.zip` - 壓縮檔

#### 步驟 4：安裝

雙擊 `release/VoiceInput-x.x.x.dmg` 並按照上述「方式 1」的步驟 2-3 進行安裝。

---

## 首次設定

### 1. 取得 OpenAI API 金鑰

1. 前往 [OpenAI Platform](https://platform.openai.com/)
2. 登入或註冊帳號
3. 前往 [API Keys 頁面](https://platform.openai.com/api-keys)
4. 點擊 **Create new secret key**
5. 輸入名稱（例如：VoiceInput）
6. **複製金鑰**（以 `sk-` 開頭）
   - ⚠️ 重要：金鑰只會顯示一次，請妥善保存

### 2. 設定應用程式

1. 啟動 **VoiceInput**
2. 點擊右上角的 **⚙️ 設定** 圖示
3. 在 **OpenAI API 金鑰** 欄位貼上你的金鑰
4. 選擇 **預設語言**（中文或 English）
5. 選擇 **介面語言**（中文或 English）
6. 點擊 **儲存**

### 3. 授予麥克風權限

首次錄音時，macOS 會要求麥克風權限：

1. 點擊 **好** 或 **允許**
2. 如果不小心拒絕了：
   - 前往 **系統偏好設定** → **安全性與隱私權** → **隱私權**
   - 選擇左側的 **麥克風**
   - 勾選 **VoiceInput** 或 **Electron**

---

## 使用說明

### 基本操作

#### 開始錄音

**方式 1：使用按鈕**
- 點擊中央的 🎤 **麥克風按鈕**
- 按鈕會變紅色並顯示錄音時間

**方式 2：使用快捷鍵**
- 按 `Cmd+Shift+R`（可在設定中自訂）

#### 停止錄音

**方式 1：使用按鈕**
- 點擊紅色的 ⏹️ **停止按鈕**

**方式 2：使用快捷鍵**
- 按 `Cmd+Shift+S`（可在設定中自訂）

#### 複製文字

- 點擊文字區域右上角的 📋 **複製** 按鈕
- 會顯示「文字已複製到剪貼簿」提示
- 使用 `Cmd+V` 貼到任何地方

#### 清除文字

- 點擊文字區域右上角的 🗑️ **清除** 按鈕

### 進階功能

#### 查看歷史記錄

- 向下滾動查看最近的轉錄記錄
- 點擊任何歷史項目可重新載入該文字
- 點擊 **清空** 按鈕可刪除所有歷史

#### 調整視窗透明度

1. 開啟 **設定**
2. 拖動 **視窗透明度** 滑桿
3. 視窗會即時預覽透明度變化
4. 點擊 **儲存** 永久套用

#### 自訂快捷鍵

1. 開啟 **設定**
2. 找到 **鍵盤快捷鍵** 區域
3. 點擊輸入框
4. 按下你想要的組合鍵（例如：Cmd+Shift+T）
5. 放開按鍵後會自動填入
6. 點擊 **儲存**

#### 切換介面語言

1. 開啟 **設定**
2. 選擇 **介面語言**（中文或 English）
3. 介面會立即切換（預覽模式）
4. 點擊 **儲存** 永久套用
5. 點擊 **取消** 會恢復原來的語言

---

## 常見問題

### 安裝相關

**Q: 為什麼無法開啟應用程式？**

A: macOS 的安全機制會阻擋未簽名的應用程式。解決方法：
```bash
# 在終端機執行（替換路徑）
xattr -cr /Applications/VoiceInput.app
```

**Q: 應用程式閃退怎麼辦？**

A: 
1. 檢查 macOS 版本是否為 10.15 或更新
2. 重新安裝應用程式
3. 查看 Console.app 的錯誤日誌

### 使用相關

**Q: 無法錄音？**

A: 檢查麥克風權限：
1. **系統偏好設定** → **安全性與隱私權** → **隱私權** → **麥克風**
2. 確認 VoiceInput 已勾選

**Q: 轉錄失敗？**

A: 可能的原因：
1. **API 金鑰無效**：檢查金鑰是否正確
2. **網路問題**：確認網路連線正常
3. **OpenAI 額度不足**：前往 [OpenAI Usage](https://platform.openai.com/usage) 查看餘額
4. **音訊太長**：建議每次錄音不超過 5 分鐘

**Q: 視窗透明度沒有變化？**

A: 
1. 確認已點擊 **儲存** 按鈕
2. 重新啟動應用程式
3. 某些 macOS 版本可能不支援視窗透明度

**Q: 快捷鍵不起作用？**

A: 
1. 檢查是否與其他應用程式衝突
2. 嘗試使用不同的組合鍵
3. 確認已點擊 **儲存**

### 費用相關

**Q: 使用 VoiceInput 需要付費嗎？**

A: 
- VoiceInput 應用程式本身是免費的
- 但需要支付 OpenAI Whisper API 的使用費用
- 費用：每分鐘 $0.006（2024 年價格）
- 例如：100 分鐘轉錄 = $0.60

**Q: 如何查看 API 使用量？**

A: 前往 [OpenAI Usage Dashboard](https://platform.openai.com/usage)

---

## 卸載

### 完全移除 VoiceInput

1. **刪除應用程式**
   ```bash
   rm -rf /Applications/VoiceInput.app
   ```

2. **刪除設定和資料**
   ```bash
   rm -rf ~/Library/Application\ Support/voice-input-app/
   ```

3. **刪除快取（可選）**
   ```bash
   rm -rf ~/Library/Caches/voice-input-app/
   ```

---

## 開發模式

如果你想要開發或除錯：

```bash
# 克隆專案
git clone https://github.com/YOUR_USERNAME/voice-input-assistant.git
cd voice-input-assistant

# 安裝依賴
npm install

# 啟動開發模式
npm run dev
```

開發模式會啟動：
- Vite 開發伺服器（熱重載）
- Electron 應用程式

---

## 技術支援

- 📖 [完整文件](README.md)
- 🐛 [回報問題](https://github.com/YOUR_USERNAME/voice-input-assistant/issues)
- 💡 [功能建議](https://github.com/YOUR_USERNAME/voice-input-assistant/issues/new?labels=enhancement)
- 📧 聯絡開發者

---

## 更新日誌

查看 [CHANGELOG.md](CHANGELOG.md) 了解版本更新內容。

---

## 授權

本專案採用 MIT 授權 - 詳見 [LICENSE](LICENSE) 檔案。

---

**祝你使用愉快！🎤✨**

如有任何問題，歡迎在 GitHub 上提出 Issue。
