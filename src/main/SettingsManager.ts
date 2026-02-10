import Store from 'electron-store';
import { AppSettings } from '../shared/types.js';
import { DEFAULT_SETTINGS } from '../shared/constants.js';
import { safeStorage } from 'electron';

export class SettingsManager {
  private store: Store;

  constructor() {
    this.store = new Store({
      name: 'app-settings',
      encryptionKey: 'voice-input-app-encryption-key',
    });
  }

  save(settings: AppSettings): void {
    // Encrypt API key before storing
    const settingsToStore = {
      ...settings,
      apiKey: this.encryptApiKey(settings.apiKey),
    };

    this.store.set('settings', settingsToStore);
  }

  load(): AppSettings {
    const storedSettings = this.store.get('settings') as any;

    if (!storedSettings) {
      return { ...DEFAULT_SETTINGS };
    }

    // Decrypt API key
    const decryptedApiKey = this.decryptApiKey(storedSettings.apiKey);

    return {
      ...DEFAULT_SETTINGS,
      ...storedSettings,
      apiKey: decryptedApiKey,
    };
  }

  reset(): void {
    this.store.clear();
  }

  private encryptApiKey(apiKey: string): string {
    if (!apiKey) {
      return '';
    }

    // Use Electron's safeStorage if available (requires app to be ready)
    if (safeStorage.isEncryptionAvailable()) {
      const buffer = safeStorage.encryptString(apiKey);
      return buffer.toString('base64');
    }

    // Fallback to base64 encoding (not secure, but better than plain text)
    return Buffer.from(apiKey).toString('base64');
  }

  private decryptApiKey(encryptedApiKey: string): string {
    if (!encryptedApiKey) {
      return '';
    }

    try {
      // Use Electron's safeStorage if available
      if (safeStorage.isEncryptionAvailable()) {
        const buffer = Buffer.from(encryptedApiKey, 'base64');
        return safeStorage.decryptString(buffer);
      }

      // Fallback to base64 decoding
      return Buffer.from(encryptedApiKey, 'base64').toString('utf-8');
    } catch (error) {
      console.error('Failed to decrypt API key:', error);
      return '';
    }
  }
}
