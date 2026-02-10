# 需求文件

## 簡介

開發一個 macOS 浮動視窗應用程式，使用 OpenAI Whisper API 提供語音轉文字功能，讓使用者可以快速將語音輸入轉換為文字並複製到 Kiro IDE 中使用。

## 術語表

- **VoiceInputApp**: 本專案開發的 macOS 浮動視窗應用程式
- **Whisper API**: OpenAI 提供的語音識別 API 服務
- **FloatingWindow**: 始終顯示在其他視窗上層的應用程式視窗
- **User**: 使用本應用程式的開發者

## 需求

### 需求 1

**使用者故事:** 作為開發者，我想要一個始終可見的浮動視窗，這樣我就可以隨時使用語音輸入功能而不需要切換應用程式

#### 驗收標準

1. THE VoiceInputApp SHALL 在啟動時顯示一個浮動視窗
2. THE VoiceInputApp SHALL 保持視窗始終顯示在所有其他應用程式視窗之上
3. THE VoiceInputApp SHALL 允許 User 拖動視窗到螢幕上的任意位置
4. THE VoiceInputApp SHALL 在視窗失去焦點時仍保持可見
5. THE VoiceInputApp SHALL 提供最小化視窗的選項

### 需求 2

**使用者故事:** 作為開發者，我想要使用 OpenAI 的 Whisper API 進行語音識別，這樣我就可以獲得高品質的語音轉文字結果

#### 驗收標準

1. THE VoiceInputApp SHALL 允許 User 輸入並儲存 OpenAI API 金鑰
2. THE VoiceInputApp SHALL 使用 Whisper API 進行語音轉文字處理
3. THE VoiceInputApp SHALL 在 API 金鑰無效時顯示錯誤訊息
4. THE VoiceInputApp SHALL 支援中文和英文語音識別
5. WHEN User 未設定 API 金鑰時，THE VoiceInputApp SHALL 提示 User 進行設定

### 需求 3

**使用者故事:** 作為開發者，我想要簡單的錄音控制，這樣我就可以快速開始和停止語音輸入

#### 驗收標準

1. THE VoiceInputApp SHALL 提供一個錄音按鈕供 User 開始錄音
2. WHEN User 點擊錄音按鈕時，THE VoiceInputApp SHALL 開始錄製音訊
3. THE VoiceInputApp SHALL 在錄音期間顯示視覺指示器
4. THE VoiceInputApp SHALL 提供停止錄音的按鈕
5. WHEN User 停止錄音時，THE VoiceInputApp SHALL 自動將音訊傳送至 Whisper API
6. THE VoiceInputApp SHALL 支援鍵盤快捷鍵來開始和停止錄音

### 需求 4

**使用者故事:** 作為開發者，我想要看到轉換後的文字並快速複製，這樣我就可以立即將其貼到 Kiro 中使用

#### 驗收標準

1. WHEN Whisper API 回傳轉換結果時，THE VoiceInputApp SHALL 在視窗中顯示轉換後的文字
2. THE VoiceInputApp SHALL 提供一鍵複製按鈕
3. WHEN User 點擊複製按鈕時，THE VoiceInputApp SHALL 將文字複製到系統剪貼簿
4. THE VoiceInputApp SHALL 在複製成功後顯示視覺回饋
5. THE VoiceInputApp SHALL 保留最近的轉換歷史記錄供 User 查看

### 需求 5

**使用者故事:** 作為開發者，我想要清楚的狀態提示，這樣我就可以知道應用程式正在做什麼

#### 驗收標準

1. WHEN VoiceInputApp 正在錄音時，THE VoiceInputApp SHALL 顯示「錄音中」狀態
2. WHEN VoiceInputApp 正在處理音訊時，THE VoiceInputApp SHALL 顯示「處理中」狀態和進度指示器
3. WHEN 轉換完成時，THE VoiceInputApp SHALL 顯示「完成」狀態
4. IF API 請求失敗，THEN THE VoiceInputApp SHALL 顯示具體的錯誤訊息
5. THE VoiceInputApp SHALL 在狀態改變時提供視覺和文字提示

### 需求 6

**使用者故事:** 作為開發者，我想要輕量級的應用程式，這樣它就不會影響我的系統效能

#### 驗收標準

1. THE VoiceInputApp SHALL 在閒置時使用少於 100MB 的記憶體
2. THE VoiceInputApp SHALL 在背景時最小化 CPU 使用率
3. THE VoiceInputApp SHALL 在錄音完成後立即釋放音訊資源
4. THE VoiceInputApp SHALL 提供退出應用程式的選項
5. THE VoiceInputApp SHALL 在系統選單列提供快速存取圖示

### 需求 7

**使用者故事:** 作為開發者，我想要自訂應用程式設定，這樣我就可以根據我的需求調整功能

#### 驗收標準

1. THE VoiceInputApp SHALL 提供設定介面供 User 配置選項
2. THE VoiceInputApp SHALL 允許 User 選擇預設語言（中文或英文）
3. THE VoiceInputApp SHALL 允許 User 自訂鍵盤快捷鍵
4. THE VoiceInputApp SHALL 允許 User 設定視窗透明度
5. THE VoiceInputApp SHALL 儲存 User 的設定並在下次啟動時載入
