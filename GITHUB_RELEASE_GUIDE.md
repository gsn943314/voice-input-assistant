# 如何在 GitHub 上发布 VoiceInput

## 📋 准备工作

确保你已经完成以下步骤：
- ✅ 代码已推送到 GitHub
- ✅ 应用已成功打包（生成了 DMG 和 ZIP 文件）
- ✅ 测试过应用可以正常运行

## 🚀 发布步骤

### 1. 推送代码到 GitHub

如果还没有推送，执行以下命令：

```bash
# 添加所有文件
git add .

# 提交更改
git commit -m "v1.0.0: Initial release with full features"

# 推送到 GitHub
git push origin main
```

### 2. 在 GitHub 创建 Release

#### 步骤 A: 进入 Releases 页面
1. 打开你的 GitHub 仓库页面
2. 点击右侧的 **Releases** 链接
3. 点击 **Create a new release** 按钮

#### 步骤 B: 填写 Release 信息

**Tag version** (标签版本):
```
v1.0.0
```
- 点击 "Choose a tag" 下拉菜单
- 输入 `v1.0.0`
- 选择 "Create new tag: v1.0.0 on publish"

**Release title** (发布标题):
```
VoiceInput v1.0.0 - 首次发布！🎉
```

**Description** (描述):
复制以下内容（或使用 RELEASE_NOTES.md 的内容）:

```markdown
# VoiceInput v1.0.0 - 首次发布！

欢迎使用 VoiceInput - 一个优雅的 macOS 浮动窗口语音转文字应用程序！

## ✨ 主要功能

### 🎤 语音转文字
- 使用 OpenAI Whisper API 提供高质量语音识别
- 支持中文和英文语音识别
- 即时录音和转录
- 一键复制转录结果

### 🪟 浮动窗口设计
- 始终保持在最上层，不干扰其他工作
- 可调整窗口透明度（50%-100%）
- 简洁现代的 UI 设计
- 支持拖拽移动和调整大小

### 🌐 多语言界面
- 完整的中英文界面切换
- 即时预览语言变更
- 所有 UI 元素都支持多语言

### ⚙️ 丰富的设置选项
- 自定义键盘快捷键（智能按键捕捉）
- 调整历史记录数量限制
- 窗口透明度即时预览
- 开发者工具开关（开发模式）

## 📥 下载安装

### 推荐：DMG 安装包
- **VoiceInput-1.0.0-arm64.dmg** (92MB)
- 适用于 Apple Silicon (M1/M2/M3) Mac
- 双击安装，拖拽到 Applications 文件夹

### 备选：ZIP 压缩包
- **VoiceInput-1.0.0-arm64-mac.zip** (89MB)
- 解压后移动到 Applications 文件夹

## 🚀 快速开始

1. 下载并安装 VoiceInput
2. 获取 OpenAI API 密钥
3. 在设置中输入 API 密钥
4. 开始录音！

详细安装说明请查看 [QUICK_START.md](QUICK_START.md)

## 📋 系统要求

- **操作系统**: macOS 10.15 (Catalina) 或更新版本
- **芯片**: Apple Silicon (M1/M2/M3)
- **内存**: 至少 4GB RAM
- **网络**: 需要网络连接（OpenAI API）
- **其他**: 麦克风、OpenAI API 密钥

## 💰 费用说明

- VoiceInput 应用程序完全免费
- 需要支付 OpenAI Whisper API 使用费：每分钟 $0.006
- 例如：100 分钟转录 ≈ $0.60

## 🐛 已知问题

- 首次启动可能需要授予麦克风权限
- 某些 macOS 版本的窗口透明度效果可能有限
- 长时间录音（>5分钟）可能影响转录准确度

## 🙏 致谢

感谢以下开源项目：
- [OpenAI Whisper API](https://openai.com/research/whisper)
- [Electron](https://www.electronjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**享受语音转文字的便利！** 🎤✨

如果你觉得 VoiceInput 有用，请给我们一个 ⭐ Star！
```

#### 步骤 C: 上传安装包文件

在 **Attach binaries** 区域：
1. 点击 "Attach binaries by dropping them here or selecting them"
2. 选择以下文件上传：
   - `release/VoiceInput-1.0.0-arm64.dmg` (推荐)
   - `release/VoiceInput-1.0.0-arm64-mac.zip` (备选)

或者直接拖拽文件到上传区域。

#### 步骤 D: 发布

1. 确认所有信息正确
2. 勾选 **Set as the latest release** (设为最新版本)
3. 点击 **Publish release** 按钮

### 3. 验证发布

发布后，检查以下内容：
- ✅ Release 页面显示正确
- ✅ 下载链接可以正常工作
- ✅ DMG 和 ZIP 文件可以下载
- ✅ README 中的下载链接指向正确

## 📝 发布后的工作

### 更新 README 链接

确保 README.md 中的下载链接正确：
```markdown
### 📥 [下载最新版本 (Download Latest Release)](../../releases/latest)
```

### 分享你的应用

现在你可以分享你的应用了！
- 复制 Release 页面的链接
- 分享给朋友或同事
- 发布到社交媒体

## 🔄 后续版本发布

当你有新版本时：

1. **更新版本号**
   - 修改 `package.json` 中的 `version` 字段
   - 例如：`"version": "1.1.0"`

2. **重新打包**
   ```bash
   npm run package:mac
   ```

3. **创建新的 Release**
   - 使用新的 tag（如 `v1.1.0`）
   - 上传新的安装包
   - 描述新版本的变更

## 💡 提示

### 自动化发布（可选）

你可以使用 GitHub Actions 自动化发布流程：
- 自动构建
- 自动打包
- 自动创建 Release
- 自动上传文件

需要时可以参考 Electron 的 CI/CD 最佳实践。

### 版本号规范

遵循语义化版本（Semantic Versioning）：
- **主版本号** (Major): 不兼容的 API 修改
- **次版本号** (Minor): 向下兼容的功能性新增
- **修订号** (Patch): 向下兼容的问题修正

例如：
- `1.0.0` - 首次发布
- `1.1.0` - 新增功能
- `1.1.1` - 修复 bug
- `2.0.0` - 重大更新

## 🆘 常见问题

### Q: 上传文件太慢怎么办？
A: GitHub 有时上传速度较慢，可以：
- 使用稳定的网络连接
- 分批上传文件
- 使用 GitHub CLI 工具

### Q: 如何删除或修改已发布的 Release？
A: 
1. 进入 Release 页面
2. 点击要修改的 Release
3. 点击右上角的 **Edit release**
4. 修改后点击 **Update release**

### Q: 如何支持 Intel Mac？
A: 需要额外打包 x64 版本：
```bash
# 在 package.json 中修改 build.mac.target
"target": [
  {
    "target": "dmg",
    "arch": ["arm64", "x64"]
  }
]
```

---

**祝你发布顺利！** 🚀
