import { useMemo } from 'react';
import { Trade } from '../types';
import { Achievement } from '../lib/achievement-service';

export const useAchievementProgress = (achievement: Achievement, trades: Trade[]) => {
  return useMemo(() => {
    switch (achievement.id) {
      case 'first-trade':
        return trades.length > 0 ? 100 : 0;

      case 'winning-streak-3':
        const lastThree = trades.slice(-3);
        if (lastThree.length < 3) {
          return (lastThree.length / 3) * 100;
        }
        const winningStreak = lastThree.every((trade) => trade.profit > 0);
        return winningStreak ? 100 : (lastThree.filter((t) => t.profit > 0).length / 3) * 100;

      case 'risk-manager':
        const properSizedTrades = trades.filter(
          (trade) => trade.positionSize <= 0.02 // 2% max risk per trade
        );
        return Math.min((properSizedTrades.length / 10) * 100, 100);

      case 'profitable-month':
        const now = new Date();
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const monthTrades = trades.filter(
          (trade) => new Date(trade.timestamp) >= monthStart
        );
        const totalProfit = monthTrades.reduce(
          (sum, trade) => sum + trade.profit,
          0
        );
        const tradeProgress = Math.min((monthTrades.length / 10) * 100, 100);
        const profitProgress = totalProfit > 0 ? 100 : 0;
        return (tradeProgress + profitProgress) / 2;

      default:
        return 0;
    }
  }, [achievement.id, trades]);
}; 