import { Trade } from '../types';
import { useUserStore } from '../stores/userStore';
import { notificationService } from './notification-service';
import { storageService } from './storage-service';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  badge?: string;
  condition: (trades: Trade[]) => boolean;
  category: 'trading' | 'learning' | 'consistency' | 'risk';
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
}

export const achievements: Achievement[] = [
  {
    id: 'first-trade',
    title: 'First Steps',
    description: 'Complete your first trade',
    icon: '🎯',
    xpReward: 100,
    badge: 'beginner',
    category: 'trading',
    difficulty: 'easy',
    condition: (trades) => trades.length >= 1,
  },
  {
    id: 'winning-streak-3',
    title: 'Hot Streak',
    description: 'Win 3 trades in a row',
    icon: '🔥',
    xpReward: 250,
    badge: 'streaker',
    category: 'trading',
    difficulty: 'medium',
    condition: (trades) => {
      const lastThree = trades.slice(-3);
      return (
        lastThree.length === 3 && lastThree.every((trade) => trade.profit > 0)
      );
    },
  },
  {
    id: 'risk-manager',
    title: 'Risk Manager',
    description: 'Complete 10 trades with proper position sizing',
    icon: '🛡️',
    xpReward: 500,
    badge: 'risk-master',
    category: 'risk',
    difficulty: 'medium',
    condition: (trades) => {
      const properSizedTrades = trades.filter(
        (trade) => trade.positionSize <= 0.02 // 2% max risk per trade
      );
      return properSizedTrades.length >= 10;
    },
  },
  {
    id: 'profitable-month',
    title: 'Profitable Month',
    description: 'Achieve positive returns for a full month',
    icon: '📈',
    xpReward: 1000,
    badge: 'consistent',
    category: 'consistency',
    difficulty: 'hard',
    condition: (trades) => {
      const now = new Date();
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const monthTrades = trades.filter(
        (trade) => new Date(trade.timestamp) >= monthStart
      );
      const totalProfit = monthTrades.reduce(
        (sum, trade) => sum + trade.profit,
        0
      );
      return monthTrades.length >= 10 && totalProfit > 0;
    },
  },
];

class AchievementService {
  private static instance: AchievementService;
  private unlockedAchievements: Set<string>;
  private readonly STORAGE_KEY = 'unlocked_achievements';

  private constructor() {
    this.unlockedAchievements = new Set(this.loadUnlockedAchievements());
  }

  private loadUnlockedAchievements(): string[] {
    try {
      const stored = storageService.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading unlocked achievements:', error);
      return [];
    }
  }

  private saveUnlockedAchievements(): void {
    try {
      storageService.setItem(
        this.STORAGE_KEY,
        JSON.stringify(Array.from(this.unlockedAchievements))
      );
    } catch (error) {
      console.error('Error saving unlocked achievements:', error);
    }
  }

  public static getInstance(): AchievementService {
    if (!AchievementService.instance) {
      AchievementService.instance = new AchievementService();
    }
    return AchievementService.instance;
  }

  public checkAchievements(trades: Trade[]): void {
    try {
      achievements.forEach((achievement) => {
        if (
          !this.unlockedAchievements.has(achievement.id) &&
          achievement.condition(trades)
        ) {
          this.unlockAchievement(achievement);
        }
      });
    } catch (error) {
      console.error('Error checking achievements:', error);
    }
  }

  private unlockAchievement(achievement: Achievement): void {
    try {
      this.unlockedAchievements.add(achievement.id);
      this.saveUnlockedAchievements();
      
      // Add XP and badge
      const userStore = useUserStore.getState();
      userStore.addExperience(achievement.xpReward);
      if (achievement.badge) {
        userStore.addBadge(achievement.badge);
      }

      // Show achievement notification
      notificationService.showAchievementUnlock(achievement);
    } catch (error) {
      console.error('Error unlocking achievement:', error);
    }
  }

  public getUnlockedAchievements(): string[] {
    return Array.from(this.unlockedAchievements);
  }

  public isAchievementUnlocked(id: string): boolean {
    return this.unlockedAchievements.has(id);
  }

  public getAchievementById(id: string): Achievement | undefined {
    return achievements.find((a) => a.id === id);
  }

  public getAchievementsByCategory(category: Achievement['category']): Achievement[] {
    return achievements.filter((a) => a.category === category);
  }

  public getAchievementsByDifficulty(difficulty: Achievement['difficulty']): Achievement[] {
    return achievements.filter((a) => a.difficulty === difficulty);
  }
}

export const achievementService = AchievementService.getInstance(); 