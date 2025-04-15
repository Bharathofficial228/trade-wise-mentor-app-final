import { create } from 'zustand';
import { User, UserSettings } from '../types';

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  updateSettings: (settings: Partial<UserSettings>) => void;
  addExperience: (amount: number) => void;
  addBadge: (badge: string) => void;
  removeBadge: (badge: string) => void;
}

const calculateLevel = (experience: number): number => {
  // Level formula: Each level requires 1000 * level XP
  return Math.floor((-1 + Math.sqrt(1 + 8 * experience / 1000)) / 2);
};

const calculateRequiredXP = (level: number): number => {
  return 1000 * level;
};

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  setUser: (user) => set({ user }),
  updateSettings: (settings) => {
    set((state) => ({
      user: state.user
        ? {
            ...state.user,
            settings: { ...state.user.settings, ...settings },
          }
        : null,
    }));
  },
  addExperience: (amount) => {
    set((state) => {
      if (!state.user) return state;

      const newExperience = state.user.experience + amount;
      const newLevel = calculateLevel(newExperience);
      const leveledUp = newLevel > state.user.level;

      return {
        user: {
          ...state.user,
          experience: newExperience,
          level: newLevel,
        },
      };
    });
  },
  addBadge: (badge) => {
    set((state) => {
      if (!state.user) return state;
      if (state.user.badges.includes(badge)) return state;

      return {
        user: {
          ...state.user,
          badges: [...state.user.badges, badge],
        },
      };
    });
  },
  removeBadge: (badge) => {
    set((state) => {
      if (!state.user) return state;

      return {
        user: {
          ...state.user,
          badges: state.user.badges.filter((b) => b !== badge),
        },
      };
    });
  },
})); 