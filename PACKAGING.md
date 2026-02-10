# Packaging Guide

This guide explains how to package VoiceInput for distribution on macOS.

## Prerequisites

Before packaging, ensure you have:

1. **Node.js and npm** installed (v18 or higher recommended)
2. **All dependencies** installed: `npm install`
3. **Built the application**: `npm run build`

## Optional: Application Icon

The application will use a default icon if you don't provide one. To create a custom icon:

### Option 1: Automatic (requires ImageMagick)

```bash
# Install ImageMagick if not already installed
brew install imagemagick

# Generate icon from SVG
npm run build:icon
```

### Option 2: Manual

1. Convert `build/icon.svg` to `build/icon.png` (1024x1024) using any image editor
2. Run the icon build script: `bash scripts/build-icon.sh`

### Option 3: Online Converter

1. Go to https://cloudconvert.com/svg-to-icns
2. Upload `build/icon.svg`
3. Download and save as `build/icon.icns`
4. Update `package.json` to include: `"icon": "build/icon.icns"` in the `mac` section

## Packaging Commands

### Build for Distribution

```bash
# Build and package for macOS (creates DMG and ZIP)
npm run package:mac
```

This will:
1. Build the renderer process (React app)
2. Build the main process (Electron)
3. Package the application
4. Create distributable files in the `release/` directory

### Build for Testing (faster)

```bash
# Build without creating installers (for testing)
npm run package:mac:dir
```

This creates an unpacked application in `release/mac/` that you can run directly.

## Output Files

After packaging, you'll find the following in the `release/` directory:

- `VoiceInput-1.0.0.dmg` - macOS disk image installer
- `VoiceInput-1.0.0-mac.zip` - Zipped application bundle
- `mac/VoiceInput.app` - Unpacked application (if using `:dir` command)

## Code Signing (Optional)

For distribution outside the Mac App Store, you should sign your application:

1. **Get a Developer ID Certificate** from Apple Developer Program
2. **Update package.json** with signing configuration:

```json
"build": {
  "mac": {
    "identity": "Developer ID Application: Your Name (TEAM_ID)",
    "hardenedRuntime": true,
    "gatekeeperAssess": false,
    "entitlements": "build/entitlements.mac.plist",
    "entitlementsInherit": "build/entitlements.mac.plist"
  }
}
```

3. **Create entitlements file** at `build/entitlements.mac.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>com.apple.security.cs.allow-unsigned-executable-memory</key>
    <true/>
    <key>com.apple.security.device.audio-input</key>
    <true/>
</dict>
</plist>
```

4. **Package with signing**:

```bash
npm run package:mac
```

## Notarization (Optional)

For macOS 10.15+ (Catalina and later), you should notarize your application:

1. **Set environment variables**:

```bash
export APPLE_ID="your-apple-id@email.com"
export APPLE_ID_PASSWORD="app-specific-password"
export APPLE_TEAM_ID="your-team-id"
```

2. **Update package.json**:

```json
"build": {
  "mac": {
    "notarize": {
      "teamId": "TEAM_ID"
    }
  }
}
```

3. **Package** (notarization happens automatically):

```bash
npm run package:mac
```

## Testing the Package

### Test the DMG

1. Open `release/VoiceInput-1.0.0.dmg`
2. Drag VoiceInput to Applications
3. Open from Applications folder
4. Grant microphone permissions when prompted

### Test the ZIP

1. Extract `release/VoiceInput-1.0.0-mac.zip`
2. Move VoiceInput.app to Applications
3. Open and test

## Troubleshooting

### "App is damaged and can't be opened"

This happens when the app isn't signed. For testing:

```bash
xattr -cr /Applications/VoiceInput.app
```

### Build Fails

1. Clean build artifacts: `rm -rf dist release`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Try building again: `npm run package:mac`

### Icon Not Showing

1. Ensure icon file exists: `ls -la build/icon.icns`
2. Update package.json to reference the icon
3. Rebuild: `npm run package:mac`

## Distribution

### Direct Distribution

1. Upload the DMG file to your website or file hosting service
2. Provide installation instructions to users
3. Note: Users may need to allow the app in System Preferences > Security & Privacy

### Mac App Store

For Mac App Store distribution, additional steps are required:

1. Create a Mac App Store provisioning profile
2. Update build configuration for MAS target
3. Follow Apple's App Store submission guidelines

## Performance Considerations

The packaged app should:
- Use < 100MB memory when idle
- Start in < 2 seconds
- Respond to user input within 100ms

Monitor these metrics during testing.

## Version Management

Update version in `package.json` before each release:

```json
{
  "version": "1.0.1"
}
```

The version number will be automatically included in the package filename.
