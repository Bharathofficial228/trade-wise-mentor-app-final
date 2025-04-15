
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2, LineChart, PieChart, TrendingDown, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <header>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Your trading performance at a glance</p>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Win Rate" 
          value="62%" 
          trend="up" 
          trendValue="+5%" 
          icon={<TrendingUp className="h-5 w-5 text-profit" />} 
        />
        <StatCard 
          title="Risk/Reward" 
          value="1:2.5" 
          trend="up" 
          trendValue="+0.3" 
          icon={<BarChart2 className="h-5 w-5 text-primary" />} 
        />
        <StatCard 
          title="Total Trades" 
          value="42" 
          trend="neutral" 
          trendValue="+7" 
          icon={<LineChart className="h-5 w-5 text-secondary" />} 
        />
        <StatCard 
          title="Avg. Loss" 
          value="-$75" 
          trend="down" 
          trendValue="-$12" 
          icon={<TrendingDown className="h-5 w-5 text-loss" />} 
        />
      </div>

      {/* Recent Performance and AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Performance</CardTitle>
            <CardDescription>Your last 10 trades</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Placeholder for chart */}
              <div className="h-64 w-full bg-muted rounded-md flex items-center justify-center">
                <LineChart className="h-24 w-24 text-muted-foreground opacity-40" />
                <span className="ml-3 text-muted-foreground">Performance Chart</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Insights</CardTitle>
            <CardDescription>Based on your recent trades</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border border-insight/30 bg-insight/5 rounded-md">
              <h4 className="text-sm font-medium flex items-center">
                <PieChart className="inline mr-2 h-4 w-4 text-insight" /> 
                Pattern Detected
              </h4>
              <p className="text-sm mt-1 text-muted-foreground">
                You tend to perform better on trades made in the morning. Consider focusing more on morning setups.
              </p>
            </div>
            <div className="p-4 border border-loss/30 bg-loss/5 rounded-md">
              <h4 className="text-sm font-medium flex items-center">
                <TrendingDown className="inline mr-2 h-4 w-4 text-loss" /> 
                Risk Alert
              </h4>
              <p className="text-sm mt-1 text-muted-foreground">
                Recent losses show increased position sizes. Consider reviewing your risk management rules.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Tracking */}
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Progress Tracking</CardTitle>
            <CardDescription>Your journey towards your goals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <ProgressItem 
              label="Playbook Adherence" 
              value={78} 
              target="85%" 
              color="bg-primary"
            />
            <ProgressItem 
              label="Risk Management" 
              value={92} 
              target="95%" 
              color="bg-secondary"
            />
            <ProgressItem 
              label="Emotional Control" 
              value={65} 
              target="75%" 
              color="bg-accent"
            />
            <ProgressItem 
              label="Win Rate" 
              value={62} 
              target="70%" 
              color="bg-insight"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  trend: "up" | "down" | "neutral";
  trendValue: string;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, trend, trendValue, icon }: StatCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {icon}
        </div>
        <div className="mt-3">
          <h3 className="text-2xl font-bold">{value}</h3>
          <p className={`text-xs font-medium mt-1 flex items-center
            ${trend === "up" ? "text-profit" : trend === "down" ? "text-loss" : "text-secondary"}`}
          >
            {trend === "up" ? (
              <TrendingUp className="inline mr-1 h-3 w-3" />
            ) : trend === "down" ? (
              <TrendingDown className="inline mr-1 h-3 w-3" />
            ) : null}
            {trendValue}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

interface ProgressItemProps {
  label: string;
  value: number;
  target: string;
  color: string;
}

const ProgressItem = ({ label, value, target, color }: ProgressItemProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm text-muted-foreground">Target: {target}</span>
      </div>
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} rounded-full transition-all duration-500 ease-in-out animate-progress-fill`}
          style={{ "--progress-value": `${value}%` } as React.CSSProperties}
        ></div>
      </div>
      <span className="text-xs text-muted-foreground">{value}% complete</span>
    </div>
  );
};

export default Dashboard;
