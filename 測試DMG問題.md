# DMG 白屏問題排查

## 問題描述

- 開發版本（npm run dev）：正常顯示 ✅
- DMG 打包版本：白屏 ❌

## 已修復的問題

### 1. 視窗透明度
- ✅ 將 `transparent: false`
- ✅ 預設透明度設為 1.0 (100%)

### 2. 文件路徑
- ✅ 修正了 index.html 的載入路徑
- 從 `../renderer/index.html` 改為 `../../renderer/index.html`

## 當前狀態

應用程式已重新打包，文件位於：
- `release/VoiceInput-1.0.0-universal.dmg`
- `release/VoiceInput-1.0.0-universal-mac.zip`

## 測試步驟

1. 安裝 DMG
2. 啟動應用程式
3. 檢查是否顯示內容

## 如果還是白屏

### 方法 1：檢查 Console 日誌

```bash
# 啟動應用程式後執行
log stream --predicate 'process == "VoiceInput"' --level debug
```

### 方法 2：檢查打包後的文件結構

```bash
# 解壓 app.asar 檢查
cd /Applications/VoiceInput.app/Contents/Resources
npx asar extract app.asar /tmp/app_check
ls -la /tmp/app_check/dist/
```

### 方法 3：使用開發者工具

1. 修改 `src/shared/constants.ts`
2. 將 `openDevTools: true`
3. 重新打包
4. 啟動後會自動打開開發者工具
5. 查看 Console 錯誤

## 可能的原因

1. **CSS 未載入**
   - 檢查 dist/renderer/assets/ 中的 CSS 文件
   - 確認 index.html 中的 CSS 路徑正確

2. **JS 未執行**
   - 檢查 dist/renderer/assets/ 中的 JS 文件
   - 確認 index.html 中的 JS 路徑正確

3. **React 未掛載**
   - 檢查 #root 元素是否存在
   - 檢查 React 是否正確初始化

4. **路徑問題**
   - 確認 main.js 中的 loadFile 路徑
   - 確認相對路徑計算正確

## 下一步

如果問題持續，請：

1. 截圖顯示的內容
2. 提供 Console 日誌
3. 或者我可以添加更多調試信息
