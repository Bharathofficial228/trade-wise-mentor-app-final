
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  CircleDollarSign, 
  Filter,
  Search, 
  Tag, 
  Calendar, 
  TrendingUp, 
  TrendingDown,
  Plus
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock trade data
const mockTrades = [
  {
    id: "1",
    symbol: "AAPL",
    type: "Long",
    entry: 175.23,
    exit: 182.78,
    pl: 7.55,
    plPercentage: 4.31,
    date: "2023-04-10",
    strategy: "Trend Following",
    emotion: "Confident",
    outcome: "profit",
  },
  {
    id: "2",
    symbol: "NVDA",
    type: "Long",
    entry: 453.25,
    exit: 482.36,
    pl: 29.11,
    plPercentage: 6.42,
    date: "2023-04-08",
    strategy: "Breakout",
    emotion: "Excited",
    outcome: "profit",
  },
  {
    id: "3",
    symbol: "AMZN",
    type: "Short",
    entry: 178.32,
    exit: 172.45,
    pl: 5.87,
    plPercentage: 3.29,
    date: "2023-04-05",
    strategy: "Reversal",
    emotion: "Cautious",
    outcome: "profit",
  },
  {
    id: "4",
    symbol: "TSLA",
    type: "Long",
    entry: 225.68,
    exit: 218.23,
    pl: -7.45,
    plPercentage: -3.30,
    date: "2023-04-03",
    strategy: "Momentum",
    emotion: "Fearful",
    outcome: "loss",
  },
  {
    id: "5",
    symbol: "META",
    type: "Short",
    entry: 482.54,
    exit: 498.31,
    pl: -15.77,
    plPercentage: -3.27,
    date: "2023-04-01",
    strategy: "News Play",
    emotion: "Uncertain",
    outcome: "loss",
  },
];

const Trades = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  // Filter trades based on search term and active tab
  const filteredTrades = mockTrades.filter(trade => {
    const matchesSearch = 
      trade.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trade.strategy.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "profit") return matchesSearch && trade.outcome === "profit";
    if (activeTab === "loss") return matchesSearch && trade.outcome === "loss";
    
    return matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Trades</h1>
          <p className="text-muted-foreground mt-1">Manage and analyze your trades</p>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90">
          <Link to="/trades/new">
            <Plus className="mr-2 h-4 w-4" />
            New Trade
          </Link>
        </Button>
      </header>
      
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by symbol or strategy..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex gap-2">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </Button>
      </div>
      
      {/* Trades List */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Trades</TabsTrigger>
          <TabsTrigger value="profit">Profit</TabsTrigger>
          <TabsTrigger value="loss">Loss</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <Card>
            <CardHeader className="px-6 py-4">
              <CardTitle className="text-lg">Trading History</CardTitle>
            </CardHeader>
            <CardContent className="px-6">
              <div className="space-y-4">
                {filteredTrades.length > 0 ? (
                  filteredTrades.map((trade) => (
                    <TradeCard key={trade.id} trade={trade} />
                  ))
                ) : (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">No trades found</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="profit" className="mt-6">
          <Card>
            <CardHeader className="px-6 py-4">
              <CardTitle className="text-lg">Profitable Trades</CardTitle>
            </CardHeader>
            <CardContent className="px-6">
              <div className="space-y-4">
                {filteredTrades.length > 0 ? (
                  filteredTrades.map((trade) => (
                    <TradeCard key={trade.id} trade={trade} />
                  ))
                ) : (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">No profitable trades found</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="loss" className="mt-6">
          <Card>
            <CardHeader className="px-6 py-4">
              <CardTitle className="text-lg">Loss Trades</CardTitle>
            </CardHeader>
            <CardContent className="px-6">
              <div className="space-y-4">
                {filteredTrades.length > 0 ? (
                  filteredTrades.map((trade) => (
                    <TradeCard key={trade.id} trade={trade} />
                  ))
                ) : (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">No loss trades found</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface TradeCardProps {
  trade: {
    id: string;
    symbol: string;
    type: string;
    entry: number;
    exit: number;
    pl: number;
    plPercentage: number;
    date: string;
    strategy: string;
    emotion: string;
    outcome: string;
  };
}

const TradeCard = ({ trade }: TradeCardProps) => {
  return (
    <Link to={`/trades/${trade.id}`}>
      <div className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Trade Basic Info */}
          <div className="flex items-center gap-3">
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center 
                ${trade.outcome === "profit" ? "bg-profit/10 text-profit" : "bg-loss/10 text-loss"}`}
            >
              {trade.outcome === "profit" ? (
                <TrendingUp className="h-5 w-5" />
              ) : (
                <TrendingDown className="h-5 w-5" />
              )}
            </div>
            <div>
              <div className="flex items-center">
                <h3 className="font-medium">{trade.symbol}</h3>
                <Badge variant="outline" className="ml-2">{trade.type}</Badge>
              </div>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <Calendar className="h-3 w-3 mr-1" />
                <span>{trade.date}</span>
              </div>
            </div>
          </div>
          
          {/* Trade Details */}
          <div className="flex flex-wrap gap-3 text-sm">
            <div className="flex items-center gap-1 bg-neutral/10 px-2 py-1 rounded-md">
              <Tag className="h-3 w-3" />
              <span>{trade.strategy}</span>
            </div>
            <div className="flex items-center gap-1 bg-neutral/10 px-2 py-1 rounded-md">
              <CircleDollarSign className="h-3 w-3" />
              <span>Entry: ${trade.entry}</span>
            </div>
            <div className="flex items-center gap-1 bg-neutral/10 px-2 py-1 rounded-md">
              <CircleDollarSign className="h-3 w-3" />
              <span>Exit: ${trade.exit}</span>
            </div>
          </div>
          
          {/* Trade Outcome */}
          <div 
            className={`text-right ${
              trade.outcome === "profit" ? "text-profit" : "text-loss"
            }`}
          >
            <div className="font-medium">
              {trade.pl > 0 ? "+" : ""}${Math.abs(trade.pl).toFixed(2)}
            </div>
            <div className="text-sm">
              {trade.plPercentage > 0 ? "+" : ""}
              {trade.plPercentage.toFixed(2)}%
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Trades;
