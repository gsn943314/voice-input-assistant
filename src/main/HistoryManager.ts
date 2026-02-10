import Store from 'electron-store';
import { TranscriptionHistory } from '../shared/types.js';

export class HistoryManager {
  private store: Store;
  private readonly HISTORY_KEY = 'transcription-history';

  constructor() {
    this.store = new Store({
      name: 'app-history',
    });
  }

  /**
   * Save history items to persistent storage
   */
  save(history: TranscriptionHistory[]): void {
    this.store.set(this.HISTORY_KEY, history);
  }

  /**
   * Load history items from persistent storage
   */
  load(): TranscriptionHistory[] {
    const history = this.store.get(this.HISTORY_KEY) as TranscriptionHistory[] | undefined;
    return history || [];
  }

  /**
   * Add a new history item and enforce the limit
   */
  addItem(item: TranscriptionHistory, limit: number = 50): TranscriptionHistory[] {
    const currentHistory = this.load();
    const newHistory = [item, ...currentHistory];
    
    // Enforce history limit
    const limitedHistory = newHistory.slice(0, limit);
    
    this.save(limitedHistory);
    return limitedHistory;
  }

  /**
   * Clear all history items
   */
  clear(): void {
    this.store.delete(this.HISTORY_KEY);
  }

  /**
   * Get a specific history item by ID
   */
  getItemById(id: string): TranscriptionHistory | undefined {
    const history = this.load();
    return history.find(item => item.id === id);
  }

  /**
   * Delete a specific history item by ID
   */
  deleteItem(id: string): TranscriptionHistory[] {
    const history = this.load();
    const updatedHistory = history.filter(item => item.id !== id);
    this.save(updatedHistory);
    return updatedHistory;
  }
}
