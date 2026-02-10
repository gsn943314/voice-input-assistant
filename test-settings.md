# 測試設定儲存功能

## 測試步驟

1. **啟動應用程式**
   ```bash
   npm run dev
   ```

2. **開啟設定**
   - 點擊右上角的 ⚙️ 圖示

3. **輸入 API 金鑰**
   - 在「OpenAI API 金鑰」欄位輸入你的金鑰（以 sk- 開頭）
   - 確保金鑰長度至少 20 個字元

4. **檢查驗證**
   - 如果金鑰格式正確，不應該有錯誤訊息
   - 如果有錯誤，會顯示紅色錯誤文字

5. **儲存設定**
   - 點擊「儲存」按鈕
   - 設定視窗應該會關閉

6. **驗證儲存**
   - 重新開啟設定
   - 確認 API 金鑰已經儲存（會顯示為密碼格式）

## 常見問題

### 問題：無法儲存設定

**可能原因：**
1. API 金鑰格式不正確
   - 必須以 `sk-` 開頭
   - 長度至少 20 個字元

2. 快捷鍵衝突
   - 開始和停止錄音的快捷鍵不能相同

3. 數值超出範圍
   - 視窗透明度：50-100%
   - 歷史記錄限制：1-100

### 問題：設定儲存後沒有生效

**解決方法：**
1. 檢查瀏覽器控制台（開發者工具）是否有錯誤
2. 確認 electron-store 有寫入權限
3. 檢查設定檔位置：
   ```
   ~/Library/Application Support/voice-input-app/config.json
   ```

## 設定檔位置

macOS:
```
~/Library/Application Support/voice-input-app/config.json
```

你可以手動檢查這個檔案來確認設定是否正確儲存。

## 除錯技巧

1. **開啟開發者工具**
   - 應用程式會自動開啟開發者工具（在開發模式下）
   - 查看 Console 標籤的錯誤訊息

2. **檢查網路請求**
   - 在 Network 標籤查看 IPC 通訊

3. **查看儲存的設定**
   ```bash
   cat ~/Library/Application\ Support/voice-input-app/config.json
   ```

4. **清除設定（如果需要重置）**
   ```bash
   rm ~/Library/Application\ Support/voice-input-app/config.json
   ```
