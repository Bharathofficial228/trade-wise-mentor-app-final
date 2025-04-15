import { toast } from '@/hooks/use-toast';
import type { Achievement } from './achievement-service';

export class NotificationService {
  private static instance: NotificationService;

  private constructor() {}

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  public showAchievementUnlock(achievement: Achievement): void {
    try {
      toast({
        variant: 'default',
        title: 'Achievement Unlocked! 🎉',
        description: `You've unlocked: ${achievement.title}`,
        duration: 5000,
      });
    } catch (error) {
      console.error('Error showing achievement notification:', error);
    }
  }

  public showError(message: string): void {
    try {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: message,
        duration: 3000,
      });
    } catch (error) {
      console.error('Error showing error notification:', error);
    }
  }

  public showSuccess(message: string): void {
    try {
      toast({
        variant: 'default',
        title: 'Success',
        description: message,
        duration: 3000,
      });
    } catch (error) {
      console.error('Error showing success notification:', error);
    }
  }

  public showInfo(message: string): void {
    try {
      toast({
        variant: 'default',
        title: 'Info',
        description: message,
        duration: 3000,
      });
    } catch (error) {
      console.error('Error showing info notification:', error);
    }
  }

  public showLevelUp(newLevel: number, xpToNext: number) {
    this.show({
      type: 'level-up',
      title: `Level Up! 🎉`,
      description: `You've reached level ${newLevel}!\n${xpToNext} XP needed for next level.`,
      duration: 5000,
    });
  }

  public show({ type, title, description, duration = 3000 }: NotificationOptions) {
    toast({
      title,
      description,
      duration,
    });
  }
}

export const notificationService = NotificationService.getInstance(); 