
import { useState } from "react";
import { 
  Calendar,
  BarChart2, 
  PieChart, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Target, 
  Lightbulb, 
  ArrowUpRight,
  ArrowRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Statistics = () => {
  const [timeFrame, setTimeFrame] = useState("30d");
  
  return (
    <div className="space-y-6 animate-fade-in">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Statistics</h1>
          <p className="text-muted-foreground mt-1">Analyze your trading performance</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Select value={timeFrame} onValueChange={setTimeFrame}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="ytd">Year to date</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
        </div>
      </header>
      
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Win Rate" 
          value="62%" 
          change="+5%" 
          trend="up" 
          icon={<Target className="h-5 w-5" />} 
        />
        <MetricCard 
          title="Profit Factor" 
          value="1.8" 
          change="+0.3" 
          trend="up" 
          icon={<BarChart2 className="h-5 w-5" />} 
        />
        <MetricCard 
          title="Total Trades" 
          value="42" 
          change="+7" 
          trend="neutral" 
          icon={<Clock className="h-5 w-5" />} 
        />
        <MetricCard 
          title="Avg. Hold Time" 
          value="2h 15m" 
          change="-20m" 
          trend="down" 
          icon={<Clock className="h-5 w-5" />} 
        />
      </div>
      
      {/* Analysis Tabs */}
      <Tabs defaultValue="performance">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="patterns">Patterns</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance" className="mt-6 space-y-6">
          {/* Win/Loss Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Win/Loss Performance</CardTitle>
              <CardDescription>Analysis of your profitable vs losing trades</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full bg-muted/30 rounded-md flex items-center justify-center">
                <BarChart2 className="h-24 w-24 text-muted-foreground opacity-40" />
                <span className="ml-3 text-muted-foreground">Chart Placeholder</span>
              </div>
              
              {/* Win/Loss Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Win Rate</p>
                  <p className="text-2xl font-bold text-primary">62%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Wins</p>
                  <p className="text-2xl font-bold">26</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Losses</p>
                  <p className="text-2xl font-bold">16</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Profit Factor</p>
                  <p className="text-2xl font-bold">1.8</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Time Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance by Day</CardTitle>
                <CardDescription>Win rate across different days of the week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-60 w-full bg-muted/30 rounded-md flex items-center justify-center">
                  <BarChart2 className="h-16 w-16 text-muted-foreground opacity-40" />
                  <span className="ml-3 text-muted-foreground">Chart Placeholder</span>
                </div>
                
                {/* Best/Worst Days */}
                <div className="flex justify-between mt-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Best Day</p>
                    <div className="flex items-center mt-1">
                      <p className="font-bold mr-2">Wednesday</p>
                      <Badge color="green">82% Win Rate</Badge>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Worst Day</p>
                    <div className="flex items-center mt-1">
                      <p className="font-bold mr-2">Friday</p>
                      <Badge color="red">38% Win Rate</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Performance by Time</CardTitle>
                <CardDescription>Win rate across different times of the day</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-60 w-full bg-muted/30 rounded-md flex items-center justify-center">
                  <BarChart2 className="h-16 w-16 text-muted-foreground opacity-40" />
                  <span className="ml-3 text-muted-foreground">Chart Placeholder</span>
                </div>
                
                {/* Best/Worst Times */}
                <div className="flex justify-between mt-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Best Time</p>
                    <div className="flex items-center mt-1">
                      <p className="font-bold mr-2">9:30 - 10:30 AM</p>
                      <Badge color="green">75% Win Rate</Badge>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Worst Time</p>
                    <div className="flex items-center mt-1">
                      <p className="font-bold mr-2">3:00 - 4:00 PM</p>
                      <Badge color="red">42% Win Rate</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="patterns" className="mt-6 space-y-6">
          {/* Strategy Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Strategy Performance</CardTitle>
              <CardDescription>Win rate and P&L by strategy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="h-60 w-full bg-muted/30 rounded-md flex items-center justify-center">
                  <PieChart className="h-16 w-16 text-muted-foreground opacity-40" />
                  <span className="ml-3 text-muted-foreground">Chart Placeholder</span>
                </div>
                
                {/* Strategy Table */}
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left p-3 text-sm font-medium">Strategy</th>
                        <th className="text-left p-3 text-sm font-medium">Trades</th>
                        <th className="text-left p-3 text-sm font-medium">Win Rate</th>
                        <th className="text-left p-3 text-sm font-medium">Profit</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="p-3">Momentum Breakout</td>
                        <td className="p-3">15</td>
                        <td className="p-3 text-profit">75%</td>
                        <td className="p-3 text-profit">+$680.45</td>
                      </tr>
                      <tr className="border-t bg-muted/20">
                        <td className="p-3">Support Bounce</td>
                        <td className="p-3">12</td>
                        <td className="p-3 text-profit">67%</td>
                        <td className="p-3 text-profit">+$420.30</td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-3">Gap & Go</td>
                        <td className="p-3">8</td>
                        <td className="p-3 text-profit">62%</td>
                        <td className="p-3 text-profit">+$215.75</td>
                      </tr>
                      <tr className="border-t bg-muted/20">
                        <td className="p-3">News Reversal</td>
                        <td className="p-3">7</td>
                        <td className="p-3 text-loss">43%</td>
                        <td className="p-3 text-loss">-$120.65</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Patterns Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Emotional Impact */}
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <Lightbulb className="h-5 w-5 text-accent mr-2" />
                  <CardTitle>Emotional Impact</CardTitle>
                </div>
                <CardDescription>How your emotions affect trading outcomes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-40 w-full bg-muted/30 rounded-md flex items-center justify-center">
                    <BarChart2 className="h-12 w-12 text-muted-foreground opacity-40" />
                    <span className="ml-3 text-muted-foreground">Chart Placeholder</span>
                  </div>
                  
                  <div className="space-y-3">
                    <InsightItem 
                      label="Confident" 
                      value="78% Win Rate" 
                      trend="up" 
                      recommendation="Maintain this emotional state" 
                    />
                    <InsightItem 
                      label="Calm" 
                      value="65% Win Rate" 
                      trend="neutral" 
                      recommendation="Solid performance, can improve" 
                    />
                    <InsightItem 
                      label="Fearful" 
                      value="32% Win Rate" 
                      trend="down" 
                      recommendation="Avoid trading when fearful" 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Holding Period */}
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-secondary mr-2" />
                  <CardTitle>Holding Period</CardTitle>
                </div>
                <CardDescription>Performance by trade duration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-40 w-full bg-muted/30 rounded-md flex items-center justify-center">
                    <BarChart2 className="h-12 w-12 text-muted-foreground opacity-40" />
                    <span className="ml-3 text-muted-foreground">Chart Placeholder</span>
                  </div>
                  
                  <div className="space-y-3">
                    <InsightItem 
                      label="< 1 hour" 
                      value="55% Win Rate" 
                      trend="neutral" 
                      recommendation="Average performance" 
                    />
                    <InsightItem 
                      label="1-4 hours" 
                      value="76% Win Rate" 
                      trend="up" 
                      recommendation="Your sweet spot for trading" 
                    />
                    <InsightItem 
                      label="> 1 day" 
                      value="42% Win Rate" 
                      trend="down" 
                      recommendation="Consider shorter holding periods" 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="comparison" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Comparison</CardTitle>
              <CardDescription>Compare your performance across timeframes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full bg-muted/30 rounded-md flex items-center justify-center">
                <BarChart2 className="h-24 w-24 text-muted-foreground opacity-40" />
                <span className="ml-3 text-muted-foreground">Chart Placeholder</span>
              </div>
              
              {/* Comparison Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <ComparisonCard 
                  title="Current Period" 
                  subtitle="Last 30 days" 
                  winRate={62}
                  trades={42}
                  profit={"+$1,245.50"}
                />
                <ComparisonCard 
                  title="Previous Period" 
                  subtitle="30 days before" 
                  winRate={54}
                  trades={38}
                  profit={"+$870.25"}
                  change={"+8%"}
                />
                <ComparisonCard 
                  title="All Time" 
                  subtitle="Since you started" 
                  winRate={57}
                  trades={185}
                  profit={"+$4,725.80"}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-accent/5 border-accent/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-accent mt-0.5" />
                <div>
                  <h3 className="font-medium">Performance Insight</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your recent 30-day performance shows an 8% improvement in win rate compared to the previous period. 
                    This coincides with your increased use of the Momentum Breakout strategy and more consistent morning trading.
                    Consider continuing these patterns to maintain your improved performance.
                  </p>
                  <Button variant="link" className="p-0 h-auto text-accent mt-2">
                    <span>View detailed analysis</span>
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: React.ReactNode;
}

const MetricCard = ({ title, value, change, trend, icon }: MetricCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className={cn(
            trend === "up" ? "text-profit" : trend === "down" ? "text-loss" : "text-secondary"
          )}>
            {icon}
          </div>
        </div>
        <div className="mt-3">
          <h3 className="text-2xl font-bold">{value}</h3>
          <p className={cn(
            "text-xs font-medium mt-1 flex items-center",
            trend === "up" ? "text-profit" : trend === "down" ? "text-loss" : "text-secondary"
          )}>
            {trend === "up" ? (
              <TrendingUp className="inline mr-1 h-3 w-3" />
            ) : trend === "down" ? (
              <TrendingDown className="inline mr-1 h-3 w-3" />
            ) : null}
            {change}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

interface BadgeProps {
  children: React.ReactNode;
  color: "green" | "red" | "blue" | "purple";
}

const Badge = ({ children, color }: BadgeProps) => {
  return (
    <span className={cn(
      "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
      color === "green" ? "bg-profit/10 text-profit" :
      color === "red" ? "bg-loss/10 text-loss" :
      color === "blue" ? "bg-secondary/10 text-secondary" :
      "bg-accent/10 text-accent"
    )}>
      {children}
    </span>
  );
};

interface InsightItemProps {
  label: string;
  value: string;
  trend: "up" | "down" | "neutral";
  recommendation: string;
}

const InsightItem = ({ label, value, trend, recommendation }: InsightItemProps) => {
  return (
    <div className="flex items-center justify-between p-3 border rounded-md">
      <div>
        <span className="font-medium">{label}</span>
        <p className="text-sm text-muted-foreground mt-1">{recommendation}</p>
      </div>
      <div className="text-right">
        <div className={cn(
          "font-medium flex items-center justify-end",
          trend === "up" ? "text-profit" : trend === "down" ? "text-loss" : "text-secondary"
        )}>
          {value}
          {trend === "up" ? (
            <TrendingUp className="ml-1 h-3 w-3" />
          ) : trend === "down" ? (
            <TrendingDown className="ml-1 h-3 w-3" />
          ) : null}
        </div>
      </div>
    </div>
  );
};

interface ComparisonCardProps {
  title: string;
  subtitle: string;
  winRate: number;
  trades: number;
  profit: string;
  change?: string;
}

const ComparisonCard = ({ title, subtitle, winRate, trades, profit, change }: ComparisonCardProps) => {
  return (
    <div className="border rounded-md p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
        {change && (
          <Badge color="green">{change}</Badge>
        )}
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Win Rate</p>
          <p className="font-medium">{winRate}%</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Trades</p>
          <p className="font-medium">{trades}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">P&L</p>
          <p className={cn(
            "font-medium",
            profit.startsWith("+") ? "text-profit" : "text-loss"
          )}>
            {profit}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
