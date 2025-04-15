import React from 'react';
import { Challenge, Streak } from '../lib/gamification-service';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';

interface ChallengesProps {
  challenges: Challenge[];
  streaks: Record<string, Streak>;
  level: number;
}

export const ChallengesComponent: React.FC<ChallengesProps> = ({
  challenges,
  streaks,
  level
}) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Level: {level}</CardTitle>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Challenges</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {challenges.map((challenge) => (
            <div key={challenge.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{challenge.title}</h3>
                <span className="text-sm text-gray-500">
                  {challenge.progress}/{challenge.target}
                </span>
              </div>
              <p className="text-sm text-gray-600">{challenge.description}</p>
              <Progress value={(challenge.progress / challenge.target) * 100} />
              {challenge.completed && (
                <p className="text-sm text-green-600">Completed! 🎉</p>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Streaks</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.values(streaks).map((streak) => (
            <div key={streak.type} className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold capitalize">{streak.type} Streak</h3>
                <span className="text-sm text-gray-500">
                  Current: {streak.current} | Longest: {streak.longest}
                </span>
              </div>
              <Progress value={(streak.current / Math.max(streak.longest, 1)) * 100} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}; 