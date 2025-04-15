import { Trade } from '../types';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly';
  target: number;
  progress: number;
  reward: {
    type: 'points' | 'badge' | 'feature';
    value: number | string;
  };
  completed: boolean;
}

export interface Streak {
  type: 'daily' | 'weekly';
  current: number;
  longest: number;
  lastUpdated: Date;
}

export class GamificationService {
  private static instance: GamificationService;
  private challenges: Challenge[] = [];
  private streaks: Record<string, Streak> = {};

  private constructor() {
    this.initializeChallenges();
  }

  public static getInstance(): GamificationService {
    if (!GamificationService.instance) {
      GamificationService.instance = new GamificationService();
    }
    return GamificationService.instance;
  }

  private initializeChallenges() {
    this.challenges = [
      {
        id: 'challenge-1',
        title: 'Consistent Trader',
        description: 'Complete 5 trades following your playbook',
        type: 'weekly',
        target: 5,
        progress: 0,
        reward: {
          type: 'points',
          value: 100
        },
        completed: false
      },
      {
        id: 'challenge-2',
        title: 'Risk Manager',
        description: 'Maintain proper risk management for 10 trades',
        type: 'monthly',
        target: 10,
        progress: 0,
        reward: {
          type: 'badge',
          value: 'risk-manager'
        },
        completed: false
      },
      {
        id: 'challenge-3',
        title: 'Daily Logger',
        description: 'Log at least one trade for 7 consecutive days',
        type: 'weekly',
        target: 7,
        progress: 0,
        reward: {
          type: 'points',
          value: 50
        },
        completed: false
      }
    ];
  }

  public getChallenges(): Challenge[] {
    return this.challenges;
  }

  public updateChallengeProgress(challengeId: string, progress: number) {
    const challenge = this.challenges.find(c => c.id === challengeId);
    if (challenge) {
      challenge.progress = progress;
      challenge.completed = progress >= challenge.target;
    }
  }

  public getStreaks(): Record<string, Streak> {
    return this.streaks;
  }

  public updateStreak(type: 'daily' | 'weekly', trades: Trade[]) {
    const today = new Date();
    const lastTradeDate = trades.length > 0 ? new Date(trades[trades.length - 1].timestamp) : null;

    if (!this.streaks[type]) {
      this.streaks[type] = {
        type,
        current: 0,
        longest: 0,
        lastUpdated: today
      };
    }

    if (lastTradeDate) {
      const daysDiff = Math.floor((today.getTime() - lastTradeDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === 0) {
        // Trade logged today, increment streak
        this.streaks[type].current++;
        if (this.streaks[type].current > this.streaks[type].longest) {
          this.streaks[type].longest = this.streaks[type].current;
        }
      } else if (daysDiff > 1) {
        // Streak broken
        this.streaks[type].current = 0;
      }
      
      this.streaks[type].lastUpdated = today;
    }
  }

  public calculateLevel(trades: Trade[]): number {
    // Simple level calculation based on number of trades and success rate
    const successfulTrades = trades.filter(trade => trade.profit > 0).length;
    const successRate = trades.length > 0 ? successfulTrades / trades.length : 0;
    
    return Math.floor((trades.length * 0.1) + (successRate * 10));
  }
} 