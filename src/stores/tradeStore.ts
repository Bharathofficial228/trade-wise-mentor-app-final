import { create } from 'zustand';
import { Trade } from '../types';
import { achievementService } from '../lib/achievement-service';

interface TradeStore {
  trades: Trade[];
  isLoading: boolean;
  error: string | null;
  addTrade: (trade: Omit<Trade, 'id'>) => void;
  updateTrade: (id: string, trade: Partial<Trade>) => void;
  deleteTrade: (id: string) => void;
  getTrade: (id: string) => Trade | undefined;
}

export const useTradeStore = create<TradeStore>((set, get) => ({
  trades: [],
  isLoading: false,
  error: null,
  addTrade: (trade) => {
    set({ isLoading: true, error: null });
    try {
      const newTrade: Trade = {
        ...trade,
        id: crypto.randomUUID(),
      };
      set((state) => {
        const newTrades = [...state.trades, newTrade];
        // Check for achievements after adding a trade
        achievementService.checkAchievements(newTrades);
        return { trades: newTrades, isLoading: false };
      });
    } catch (error) {
      set({ error: 'Failed to add trade', isLoading: false });
    }
  },
  updateTrade: (id, trade) => {
    set({ isLoading: true, error: null });
    try {
      set((state) => {
        const newTrades = state.trades.map((t) =>
          t.id === id ? { ...t, ...trade } : t
        );
        // Check for achievements after updating a trade
        achievementService.checkAchievements(newTrades);
        return { trades: newTrades, isLoading: false };
      });
    } catch (error) {
      set({ error: 'Failed to update trade', isLoading: false });
    }
  },
  deleteTrade: (id) => {
    set({ isLoading: true, error: null });
    try {
      set((state) => ({
        trades: state.trades.filter((t) => t.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to delete trade', isLoading: false });
    }
  },
  getTrade: (id) => {
    return get().trades.find((t) => t.id === id);
  },
})); 