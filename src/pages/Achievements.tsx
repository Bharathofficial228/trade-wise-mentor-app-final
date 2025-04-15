
import { 
  Award, 
  BadgeCheck, 
  Flame, 
  TrendingUp, 
  Target, 
  BookOpen, 
  CircleDollarSign, 
  Clock, 
  Calendar, 
  BarChart2, 
  Heart, 
  Shield, 
  Sparkles
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const Achievements = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <header>
        <h1 className="text-3xl font-bold text-foreground">Achievements</h1>
        <p className="text-muted-foreground mt-1">Track your progress and unlock new milestones</p>
      </header>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SummaryCard 
          title="Level" 
          value="7" 
          icon={<Sparkles className="h-5 w-5 text-accent" />} 
          description="Consistent Trader"
        />
        <SummaryCard 
          title="Badges" 
          value="14/32" 
          icon={<BadgeCheck className="h-5 w-5 text-primary" />} 
          description="44% Unlocked"
        />
        <SummaryCard 
          title="Streak" 
          value="8 Days" 
          icon={<Flame className="h-5 w-5 text-destructive" />} 
          description="Current Streak"
        />
        <SummaryCard 
          title="Experience" 
          value="3,450" 
          icon={<Award className="h-5 w-5 text-secondary" />} 
          description="550 to Level 8"
        />
      </div>
      
      {/* Level Progress */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Level Progress</CardTitle>
          <CardDescription>4,000 XP needed for Level 8</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <div className="flex items-center">
                <Badge className="mr-2 bg-accent text-accent-foreground">Level 7</Badge>
                <span className="font-medium">Consistent Trader</span>
              </div>
              <span>3,450 / 4,000 XP</span>
            </div>
            
            <Progress value={86} className="h-2" />
            
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Next milestone: 60 days of trading activity</span>
              <span>550 XP remaining</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Badges & Achievements */}
      <Tabs defaultValue="badges">
        <TabsList>
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
        </TabsList>
        
        <TabsContent value="badges" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AchievementCard 
              title="Winning Streak" 
              description="Win 5 trades in a row" 
              icon={<TrendingUp />} 
              progress={100}
              unlocked={true}
              date="Apr 15, 2023"
              level={2}
            />
            <AchievementCard 
              title="Sharp Shooter" 
              description="Achieve 75% win rate over 20 trades" 
              icon={<Target />} 
              progress={100}
              unlocked={true}
              date="Apr 2, 2023" 
              level={1}
            />
            <AchievementCard 
              title="Playbook Master" 
              description="Create 3 different playbooks and use each one successfully" 
              icon={<BookOpen />} 
              progress={100}
              unlocked={true}
              date="Mar 28, 2023"
              level={1}
            />
            <AchievementCard 
              title="Risk Manager" 
              description="Maintain proper position sizing for 15 consecutive trades" 
              icon={<Shield />} 
              progress={100}
              unlocked={true}
              date="Mar 20, 2023"
              level={1}
            />
            <AchievementCard 
              title="Emotional Control" 
              description="Complete 10 trades with positive emotional tags" 
              icon={<Heart />} 
              progress={70}
              unlocked={false}
              level={1}
            />
            <AchievementCard 
              title="Profit Machine" 
              description="Achieve 2:1 average reward-to-risk ratio across 10 trades" 
              icon={<CircleDollarSign />} 
              progress={45}
              unlocked={false}
              level={1}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="challenges" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChallengeCard 
              title="Perfect Week" 
              description="Log trades for 5 consecutive days and maintain a 60%+ win rate" 
              reward="200 XP"
              icon={<Calendar />}
              progress={80}
              daysLeft={1}
            />
            <ChallengeCard 
              title="Strategy Mastery" 
              description="Use the same playbook for 10 trades with at least 70% win rate" 
              reward="350 XP"
              icon={<BookOpen />}
              progress={60}
              daysLeft={5}
            />
            <ChallengeCard 
              title="Risk Discipline" 
              description="Keep all losses under 2% of account for 15 consecutive trades" 
              reward="250 XP"
              icon={<Shield />}
              progress={33}
              daysLeft={12}
            />
            <ChallengeCard 
              title="Mindful Trading" 
              description="Complete emotional tagging for every trade for 2 weeks" 
              reward="150 XP"
              icon={<Heart />}
              progress={50}
              daysLeft={7}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="milestones" className="mt-6">
          <div className="space-y-8">
            <MilestoneItem 
              title="Trading Consistency" 
              icon={<Clock />}
              milestones={[
                { label: "5 days in a row", completed: true },
                { label: "10 days in a row", completed: true },
                { label: "30 days in a row", completed: false, progress: 27 },
                { label: "100 days in a row", completed: false, progress: 27 },
              ]}
            />
            
            <MilestoneItem 
              title="Win Rate Improvement" 
              icon={<Target />}
              milestones={[
                { label: "50% win rate", completed: true },
                { label: "60% win rate", completed: true },
                { label: "70% win rate", completed: false, progress: 86 },
                { label: "80% win rate", completed: false, progress: 0 },
              ]}
            />
            
            <MilestoneItem 
              title="Playbook Development" 
              icon={<BookOpen />}
              milestones={[
                { label: "Create first playbook", completed: true },
                { label: "Create 3 playbooks", completed: true },
                { label: "Create 5 playbooks", completed: false, progress: 60 },
                { label: "Refine playbook 10 times", completed: false, progress: 40 },
              ]}
            />
            
            <MilestoneItem 
              title="Trade Volume" 
              icon={<BarChart2 />}
              milestones={[
                { label: "10 trades recorded", completed: true },
                { label: "50 trades recorded", completed: false, progress: 84 },
                { label: "100 trades recorded", completed: false, progress: 42 },
                { label: "500 trades recorded", completed: false, progress: 8 },
              ]}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface SummaryCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description: string;
}

const SummaryCard = ({ title, value, icon, description }: SummaryCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          {icon}
        </div>
        <div className="mt-3">
          <div className="text-2xl font-bold">{value}</div>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

interface AchievementCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  unlocked: boolean;
  date?: string;
  level: number;
}

const AchievementCard = ({ title, description, icon, progress, unlocked, date, level }: AchievementCardProps) => {
  return (
    <Card className={cn(
      "overflow-hidden border transition-all",
      unlocked ? "border-primary/30" : "opacity-80"
    )}>
      <div className={cn(
        "h-1",
        unlocked ? "bg-primary" : "bg-muted"
      )}></div>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className={cn(
            "p-2 rounded-full",
            unlocked ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
          )}>
            {icon}
          </div>
          <div className="space-y-1">
            <div className="flex items-center">
              <h3 className="font-medium">{title}</h3>
              {level > 1 && (
                <Badge className="ml-2 bg-accent text-accent-foreground">Level {level}</Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{description}</p>
            
            {unlocked ? (
              <div className="flex items-center text-xs text-primary mt-1">
                <BadgeCheck className="h-3 w-3 mr-1" />
                <span>Unlocked {date}</span>
              </div>
            ) : (
              <div className="mt-2 space-y-1">
                <Progress value={progress} className="h-1.5" />
                <div className="text-xs text-muted-foreground text-right">
                  {progress}% complete
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface ChallengeCardProps {
  title: string;
  description: string;
  reward: string;
  icon: React.ReactNode;
  progress: number;
  daysLeft: number;
}

const ChallengeCard = ({ title, description, reward, icon, progress, daysLeft }: ChallengeCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge variant="outline" className="text-xs">
            {daysLeft} {daysLeft === 1 ? "day" : "days"} left
          </Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              {icon}
              <span>{progress}% complete</span>
            </div>
            <div className="flex items-center gap-1 text-primary font-medium">
              <Award className="h-4 w-4" />
              <span>{reward}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface MilestoneItemProps {
  title: string;
  icon: React.ReactNode;
  milestones: {
    label: string;
    completed: boolean;
    progress?: number;
  }[];
}

const MilestoneItem = ({ title, icon, milestones }: MilestoneItemProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full bg-secondary/10 text-secondary">
            {icon}
          </div>
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Milestone track */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-muted"></div>
          
          <div className="space-y-8 relative">
            {milestones.map((milestone, index) => (
              <div key={index} className="ml-8 relative">
                {/* Milestone indicator */}
                <div className={cn(
                  "absolute -left-10 w-6 h-6 rounded-full flex items-center justify-center border-2",
                  milestone.completed 
                    ? "bg-primary text-primary-foreground border-primary" 
                    : "bg-background border-muted"
                )}>
                  {milestone.completed ? (
                    <BadgeCheck className="h-4 w-4" />
                  ) : (
                    <span className="text-xs font-medium">{index + 1}</span>
                  )}
                </div>
                
                <div>
                  <h4 className={cn(
                    "font-medium",
                    milestone.completed && "text-primary"
                  )}>
                    {milestone.label}
                  </h4>
                  
                  {!milestone.completed && milestone.progress !== undefined && (
                    <div className="mt-2 space-y-1">
                      <Progress value={milestone.progress} className="h-1.5" />
                      <div className="text-xs text-muted-foreground">
                        {milestone.progress}% complete
                      </div>
                    </div>
                  )}
                  
                  {milestone.completed && (
                    <div className="flex items-center text-xs text-primary mt-1">
                      <BadgeCheck className="h-3 w-3 mr-1" />
                      <span>Completed</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Achievements;
