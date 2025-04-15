import React, { Suspense, useEffect } from 'react';
import { useUserStore } from '../stores/userStore';
import { useTradeStore } from '../stores/tradeStore';
import { achievementService, achievements, Achievement } from '../lib/achievement-service';
import { useAchievementProgress } from '../hooks/useAchievementProgress';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { BadgeCheck, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { Skeleton } from '../components/ui/skeleton';
import { useToast } from '../hooks/use-toast';

interface AchievementCardProps {
  achievement: Achievement;
  isUnlocked: boolean;
  progress: number;
}

const AchievementCard = React.memo(({ achievement, isUnlocked, progress }: AchievementCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Card className={`transition-all duration-300 ${isUnlocked ? 'border-primary shadow-lg' : 'hover:shadow-md'}`}>
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div
            className={`p-3 rounded-full transition-colors duration-300 ${
              isUnlocked ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
            }`}
          >
            <span className="text-2xl">{achievement.icon}</span>
          </div>
          <div className="space-y-1 flex-1">
            <h3 className="font-medium">{achievement.title}</h3>
            <p className="text-sm text-muted-foreground">{achievement.description}</p>
            {isUnlocked ? (
              <div className="flex items-center text-primary text-sm mt-2">
                <BadgeCheck className="w-4 h-4 mr-1" />
                <span>Unlocked</span>
              </div>
            ) : (
              <div className="space-y-1 mt-2">
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-muted-foreground">{Math.round(progress)}% complete</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
));

AchievementCard.displayName = 'AchievementCard';

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(6)].map((_, i) => (
      <Card key={i} className="p-6">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-2 w-1/2" />
          </div>
        </div>
      </Card>
    ))}
  </div>
);

export const AchievementsPage = () => {
  const { user } = useUserStore();
  const { trades, isLoading: isTradesLoading, error: tradesError } = useTradeStore();
  const { toast } = useToast();
  const unlockedAchievements = achievementService.getUnlockedAchievements();

  useEffect(() => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to view and track your achievements.",
        variant: "destructive",
      });
      return;
    }

    if (tradesError) {
      toast({
        title: "Error Loading Data",
        description: "There was a problem loading your trade data. Please try again later.",
        variant: "destructive",
      });
    }
  }, [user, tradesError, toast]);

  useEffect(() => {
    if (!user || !trades.length) return;

    // Check for newly unlocked achievements
    const newlyUnlocked = achievements.filter(achievement => {
      const wasUnlocked = unlockedAchievements.includes(achievement.id);
      const progress = useAchievementProgress(achievement, trades);
      return !wasUnlocked && progress >= 100;
    });

    newlyUnlocked.forEach(achievement => {
      toast({
        title: "Achievement Unlocked! 🎉",
        description: `${achievement.title} - ${achievement.description}`,
        variant: "default",
      });
    });
  }, [trades, unlockedAchievements, toast, user]);

  if (!user) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Please log in to view achievements</h1>
      </div>
    );
  }

  const nextLevelXP = (user.level + 1) * 1000;
  const currentLevelXP = user.level * 1000;
  const progress = ((user.experience - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;

  return (
    <ErrorBoundary>
      <div className="container mx-auto p-4 space-y-6">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold">Achievements</h1>
          <p className="text-muted-foreground mt-1">Track your progress and unlock new milestones</p>
        </motion.header>

        {/* Level Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Level Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center">
                    <Badge className="mr-2">Level {user.level}</Badge>
                    <span className="font-medium">Trader</span>
                  </div>
                  <span>{user.experience} / {nextLevelXP} XP</span>
                </div>
                <Progress value={progress} className="h-2" />
                <div className="text-sm text-muted-foreground">
                  {nextLevelXP - user.experience} XP needed for next level
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Achievements */}
        <Suspense fallback={<LoadingSkeleton />}>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All Achievements</TabsTrigger>
              <TabsTrigger value="unlocked">Unlocked</TabsTrigger>
              <TabsTrigger value="locked">Locked</TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <TabsContent value="all" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {achievements.map((achievement) => {
                    const isUnlocked = unlockedAchievements.includes(achievement.id);
                    const achievementProgress = useAchievementProgress(achievement, trades);

                    return (
                      <ErrorBoundary key={achievement.id}>
                        <AchievementCard
                          achievement={achievement}
                          isUnlocked={isUnlocked}
                          progress={achievementProgress}
                        />
                      </ErrorBoundary>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="unlocked" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {achievements
                    .filter((achievement) => unlockedAchievements.includes(achievement.id))
                    .map((achievement) => (
                      <AchievementCard
                        key={achievement.id}
                        achievement={achievement}
                        isUnlocked={true}
                        progress={100}
                      />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="locked" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {achievements
                    .filter((achievement) => !unlockedAchievements.includes(achievement.id))
                    .map((achievement) => {
                      const achievementProgress = useAchievementProgress(achievement, trades);
                      return (
                        <AchievementCard
                          key={achievement.id}
                          achievement={achievement}
                          isUnlocked={false}
                          progress={achievementProgress}
                        />
                      );
                    })}
                </div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </Suspense>
      </div>
    </ErrorBoundary>
  );
};
