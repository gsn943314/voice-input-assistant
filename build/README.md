# Application Icons

This directory contains the application icons for VoiceInput.

## Icon Files

- `icon.svg` - Source SVG icon (512x512)
- `icon.icns` - macOS icon file (required for packaging)

## Generating macOS Icon

To generate the `.icns` file from the SVG, you can use one of these methods:

### Method 1: Using iconutil (macOS built-in)

1. Convert SVG to PNG at different sizes:
```bash
# You'll need a tool like ImageMagick or an online converter
# Convert icon.svg to icon.png at 1024x1024
```

2. Create an iconset:
```bash
mkdir icon.iconset
sips -z 16 16     icon.png --out icon.iconset/icon_16x16.png
sips -z 32 32     icon.png --out icon.iconset/icon_16x16@2x.png
sips -z 32 32     icon.png --out icon.iconset/icon_32x32.png
sips -z 64 64     icon.png --out icon.iconset/icon_32x32@2x.png
sips -z 128 128   icon.png --out icon.iconset/icon_128x128.png
sips -z 256 256   icon.png --out icon.iconset/icon_128x128@2x.png
sips -z 256 256   icon.png --out icon.iconset/icon_256x256.png
sips -z 512 512   icon.png --out icon.iconset/icon_256x256@2x.png
sips -z 512 512   icon.png --out icon.iconset/icon_512x512.png
sips -z 1024 1024 icon.png --out icon.iconset/icon_512x512@2x.png
```

3. Convert iconset to icns:
```bash
iconutil -c icns icon.iconset
```

### Method 2: Using online tools

1. Go to https://cloudconvert.com/svg-to-icns
2. Upload `icon.svg`
3. Convert and download `icon.icns`
4. Place the file in this directory

### Method 3: Using electron-builder (automatic)

electron-builder can automatically generate icons from a 1024x1024 PNG file:

1. Convert `icon.svg` to `icon.png` at 1024x1024
2. Place it in this directory
3. electron-builder will handle the rest during packaging

## Note

For development purposes, if the icon file is missing, electron-builder will use a default icon. However, for production releases, you should always include a proper icon.
