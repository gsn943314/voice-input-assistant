import { app } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { WindowManager } from './WindowManager.js';
import { SettingsManager } from './SettingsManager.js';
import { HistoryManager } from './HistoryManager.js';
import { IPCHandler } from './IPCHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let windowManager: WindowManager;
let settingsManager: SettingsManager;
let historyManager: HistoryManager;

function createWindow() {
  const window = windowManager.createMainWindow({
    width: 400,
    height: 600,
    alwaysOnTop: true,
    frame: false,
    transparent: false,  // 關閉透明，使用不透明視窗
    resizable: true,
  });

  // Load settings and apply window opacity
  try {
    const settings = settingsManager.load();
    console.log('Loaded settings:', { windowOpacity: settings.windowOpacity });
    windowManager.setOpacity(settings.windowOpacity);
  } catch (error) {
    console.error('Failed to load settings, using default opacity:', error);
    windowManager.setOpacity(1.0); // Fallback to fully opaque
  }

  // Load the app
  if (process.env.NODE_ENV === 'development' || !app.isPackaged) {
    // In development, try common Vite ports
    const devPort = process.env.VITE_DEV_SERVER_PORT || '5174';
    window.loadURL(`http://localhost:${devPort}`);
    
    // Only open DevTools if enabled in settings
    try {
      const settings = settingsManager.load();
      if (settings.openDevTools) {
        window.webContents.openDevTools();
      }
    } catch (error) {
      console.error('Failed to check DevTools setting:', error);
    }
  } else {
    // In production, load from the packaged files
    // Path is relative to dist/main/main/main.js
    window.loadFile(path.join(__dirname, '../../renderer/index.html'));
  }
}

app.whenReady().then(() => {
  // Initialize managers
  windowManager = new WindowManager();
  settingsManager = new SettingsManager();
  historyManager = new HistoryManager();
  new IPCHandler(settingsManager, historyManager, windowManager);

  createWindow();

  app.on('activate', () => {
    if (windowManager.getWindow() === null) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
