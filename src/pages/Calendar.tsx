
import { useState } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  TrendingUp, 
  TrendingDown,
  Info,
  Edit,
  X
} from "lucide-react";
import { format, addMonths, subMonths, isEqual, isToday, isFirstDayOfMonth, startOfMonth, endOfMonth, eachDayOfInterval, getDay, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { useTrade, Trade } from "@/contexts/TradeContext";
import { cn } from "@/lib/utils";

// Mock trade data for the calendar
const mockTradesByDate = {
  "2023-04-01": { wins: 2, losses: 1, profit: 150.25 },
  "2023-04-03": { wins: 1, losses: 0, profit: 75.50 },
  "2023-04-05": { wins: 0, losses: 2, profit: -120.75 },
  "2023-04-10": { wins: 3, losses: 1, profit: 210.30 },
  "2023-04-12": { wins: 1, losses: 1, profit: 15.20 },
  "2023-04-14": { wins: 0, losses: 1, profit: -45.60 },
  "2023-04-17": { wins: 2, losses: 0, profit: 95.10 },
  "2023-04-21": { wins: 1, losses: 2, profit: -85.25 },
  "2023-04-24": { wins: 2, losses: 0, profit: 140.80 },
  "2023-04-25": { wins: 0, losses: 1, profit: -60.15 },
  "2023-04-28": { wins: 3, losses: 0, profit: 180.45 },
};

const CalendarPage = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTrades, setSelectedTrades] = useState<Trade[]>([]);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  const navigate = useNavigate();
  const { trades } = useTrade();

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  // Generate days for calendar display
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Calculate start day offset (0 = Sunday, 1 = Monday, etc.)
  const startDayOfWeek = getDay(monthStart);

  // Group trades by date
  const tradesByDate: Record<string, Trade[]> = {};
  trades.forEach(trade => {
    if (!tradesByDate[trade.date]) {
      tradesByDate[trade.date] = [];
    }
    tradesByDate[trade.date].push(trade);
  });

  // Handle day click to show trades for that day
  const handleDayClick = (dateStr: string) => {
    const dayTrades = tradesByDate[dateStr] || [];
    if (dayTrades.length > 0) {
      setSelectedDate(dateStr);
      setSelectedTrades(dayTrades);
      setIsDetailsOpen(true);
    }
  };

  // Navigate to edit a specific trade
  const handleEditTrade = (tradeId: string) => {
    setIsDetailsOpen(false);
    navigate(`/trades/${tradeId}`);
  };

  // Calculate stats for a specific day
  const getDayStats = (dateStr: string) => {
    const dayTrades = tradesByDate[dateStr] || [];
    if (dayTrades.length === 0) return null;

    const wins = dayTrades.filter(t => t.outcome === "profit").length;
    const total = dayTrades.length;
    const profit = dayTrades.reduce((sum, t) => sum + t.pl, 0);

    return { wins, total, profit };
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <header>
        <h1 className="text-3xl font-bold text-foreground">Calendar</h1>
        <p className="text-muted-foreground mt-1">Track your trading performance over time</p>
      </header>

      <Card>
        <CardContent className="p-6">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">
              {format(currentMonth, "MMMM yyyy")}
            </h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={prevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={() => setCurrentMonth(new Date())}>
                Today
              </Button>
              <Button variant="outline" size="icon" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Day names */}
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}

            {/* Empty cells before month start */}
            {Array.from({ length: startDayOfWeek }).map((_, index) => (
              <div key={`empty-${index}`} className="aspect-square p-1 bg-muted/20 rounded-md"></div>
            ))}

            {/* Calendar days */}
            {daysInMonth.map((day) => {
              const dateStr = format(day, "yyyy-MM-dd");
              const dayStats = getDayStats(dateStr);
              const hasActivity = !!dayStats;
              
              return (
                <div 
                  key={dateStr}
                  className={cn(
                    "aspect-square p-1 border rounded-md cursor-pointer",
                    isToday(day) ? "border-primary/50 bg-primary/5" : "border-transparent",
                    hasActivity ? "hover:border-primary/30" : "hover:border-muted/30"
                  )}
                  onClick={() => handleDayClick(dateStr)}
                >
                  <div className="h-full w-full">
                    {/* Date number */}
                    <div className={cn(
                      "text-xs font-medium mb-1 px-1",
                      isFirstDayOfMonth(day) ? "font-bold" : "",
                      isToday(day) ? "text-primary" : ""
                    )}>
                      {format(day, "d")}
                    </div>
                    
                    {/* Trade data */}
                    {hasActivity && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className={cn(
                              "h-3/4 rounded-sm flex items-center justify-center p-1",
                              dayStats.profit > 0 ? "bg-profit/10 text-profit" : "bg-loss/10 text-loss"
                            )}>
                              <div className="flex flex-col items-center justify-center">
                                {dayStats.profit > 0 ? (
                                  <TrendingUp className="h-5 w-5" />
                                ) : (
                                  <TrendingDown className="h-5 w-5" />
                                )}
                                <div className="text-xs font-medium mt-1">
                                  {dayStats.wins}/{dayStats.total}
                                </div>
                              </div>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="space-y-1 text-sm">
                              <p className="font-medium">{format(day, "MMMM d, yyyy")}</p>
                              <p>
                                <span className="text-muted-foreground">Win/Total:</span>{" "}
                                <span className="font-medium">
                                  {dayStats.wins}/{dayStats.total}
                                </span>
                              </p>
                              <p>
                                <span className="text-muted-foreground">P/L:</span>{" "}
                                <span className={cn(
                                  "font-medium",
                                  dayStats.profit > 0 ? "text-profit" : "text-loss"
                                )}>
                                  ${dayStats.profit.toFixed(2)}
                                </span>
                              </p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Legend */}
          <div className="mt-6 flex items-center justify-end gap-x-6 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-sm bg-profit/10 border border-profit/30 mr-2"></div>
              <span>Profitable day</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-sm bg-loss/10 border border-loss/30 mr-2"></div>
              <span>Loss day</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-sm border border-primary/30 bg-primary/5 mr-2"></div>
              <span>Today</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Monthly summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <h3 className="font-medium text-muted-foreground text-sm">Total Trades</h3>
              <p className="text-2xl font-bold mt-1">25</p>
            </div>
            <CalendarIcon className="h-8 w-8 text-muted opacity-70" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <h3 className="font-medium text-muted-foreground text-sm">Win Rate</h3>
              <p className="text-2xl font-bold mt-1 text-profit">64%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-profit opacity-70" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <h3 className="font-medium text-muted-foreground text-sm">Net Profit</h3>
              <p className="text-2xl font-bold mt-1 text-profit">$556.85</p>
            </div>
            <CircleChart percentage={64} />
          </CardContent>
        </Card>
      </div>
      
      {/* Pattern detection */}
      <Card className="bg-accent/5 border-accent/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-accent mt-0.5" />
            <div>
              <h3 className="font-medium">Pattern Detected</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Your win rate is consistently higher on Mondays and Wednesdays (75%), compared to other days of the week (52%). 
                Consider focusing your trading on these days or analyzing what makes these days more successful for you.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trade Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              Trades on {selectedDate && format(parseISO(selectedDate), "MMMM d, yyyy")}
            </DialogTitle>
            <DialogDescription>
              {selectedTrades.length} trade{selectedTrades.length !== 1 ? 's' : ''} found for this day
            </DialogDescription>
          </DialogHeader>

          <div className="max-h-[60vh] overflow-y-auto space-y-4 py-4">
            {selectedTrades.map((trade) => (
              <Card key={trade.id} className={cn(
                "overflow-hidden",
                trade.outcome === "profit" ? "border-profit/30" : "border-loss/30"
              )}>
                <div className={cn(
                  "h-2",
                  trade.outcome === "profit" ? "bg-profit" : "bg-loss"
                )} />
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <h3 className="text-lg font-bold">{trade.symbol}</h3>
                        <span className={cn(
                          "ml-2 text-xs px-2 py-0.5 rounded-full",
                          trade.type === "Long" ? "bg-profit/10 text-profit" : "bg-loss/10 text-loss"
                        )}>
                          {trade.type}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm">{trade.strategy}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8" 
                      onClick={() => handleEditTrade(trade.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Entry</p>
                      <p className="font-medium">${trade.entry.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Exit</p>
                      <p className="font-medium">${trade.exit.toFixed(2)}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-xs text-muted-foreground">P/L</p>
                    <p className={cn(
                      "font-medium text-lg",
                      trade.outcome === "profit" ? "text-profit" : "text-loss"
                    )}>
                      ${trade.pl.toFixed(2)} ({trade.plPercentage.toFixed(2)}%)
                    </p>
                  </div>
                  
                  {trade.notes && (
                    <div className="mt-4 p-3 bg-muted/20 rounded-md">
                      <p className="text-xs text-muted-foreground mb-1">Notes</p>
                      <p className="text-sm">{trade.notes}</p>
                    </div>
                  )}
                  
                  <div className="mt-4 flex items-center text-sm">
                    <div className="flex items-center mr-6">
                      <span className="text-muted-foreground mr-2">Emotion:</span>
                      <span>{trade.emotion}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <DialogFooter className="sm:justify-between">
            <Button 
              variant="outline" 
              onClick={() => setIsDetailsOpen(false)}
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Close
            </Button>
            {selectedTrades.length > 0 && (
              <Button 
                onClick={() => navigate("/trades/new")}
                className="flex items-center gap-2"
              >
                Add New Trade
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface CircleChartProps {
  percentage: number;
}

const CircleChart = ({ percentage }: CircleChartProps) => {
  const circumference = 2 * Math.PI * 10; // r = 10
  const strokeDashoffset = circumference - (circumference * percentage) / 100;
  
  return (
    <div className="relative h-12 w-12 flex items-center justify-center">
      <svg className="w-full h-full" viewBox="0 0 24 24">
        <circle
          className="text-muted stroke-current"
          strokeWidth="2"
          stroke="currentColor"
          fill="transparent"
          r="10"
          cx="12"
          cy="12"
        />
        <circle
          className="text-profit stroke-current"
          strokeWidth="2"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="10"
          cx="12"
          cy="12"
          style={{ 
            transformOrigin: 'center',
            transform: 'rotate(-90deg)',
            transition: 'stroke-dashoffset 1s ease-in-out'
          }}
        />
      </svg>
      <div className="absolute text-xs font-medium">{percentage}%</div>
    </div>
  );
};

export default CalendarPage;
