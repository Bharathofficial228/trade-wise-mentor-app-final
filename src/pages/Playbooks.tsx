
import { useState } from "react";
import { 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  Edit, 
  Plus, 
  Search,
  Star,
  FileText,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const mockPlaybooks = [
  {
    id: "1",
    name: "Momentum Breakout",
    description: "Strategy for capturing momentum after price breaks a key level",
    lastUpdated: "2023-04-05",
    useCount: 12,
    winRate: 75,
    category: "Momentum",
    content: {
      conditions: [
        "Price breaks through resistance on high volume",
        "RSI > 70 indicating strong momentum",
        "At least 1.5x average volume"
      ],
      entry: [
        "Enter on first pullback after breakout",
        "Confirm with volume surge",
        "Wait for 5-minute candle close above resistance"
      ],
      exit: [
        "Take profit at 2:1 risk-reward ratio",
        "Exit if price falls below entry candle low",
        "Trail stop after 1:1 profit achieved"
      ],
      risk: [
        "Risk 1% of account per trade",
        "Stop loss below recent swing low",
        "No trading during major news events"
      ]
    }
  },
  {
    id: "2",
    name: "Support Bounce",
    description: "Strategy for buying at support levels with confirmation",
    lastUpdated: "2023-03-28",
    useCount: 8,
    winRate: 62,
    category: "Reversal",
    content: {
      conditions: [
        "Price touches established support level",
        "RSI < 30 indicating oversold conditions",
        "Bullish candlestick patterns present"
      ],
      entry: [
        "Enter after confirmation candle closes",
        "Place buy order above confirmation candle high",
        "Look for volume increase on bounce"
      ],
      exit: [
        "Take profit at next resistance level",
        "Exit if support level breaks",
        "Scale out at 50% and 100% profit targets"
      ],
      risk: [
        "Risk maximum 2% of account",
        "Stop loss 3% below support level",
        "Reduce position size in choppy markets"
      ]
    }
  },
  {
    id: "3",
    name: "Gap & Go",
    description: "Trading morning gaps with momentum continuation",
    lastUpdated: "2023-04-12",
    useCount: 15,
    winRate: 80,
    category: "Gap",
    content: {
      conditions: [
        "Stock gaps up at least 3% at market open",
        "Gap is supported by positive news catalyst",
        "Pre-market volume is at least 2x average"
      ],
      entry: [
        "Enter after first 5-minute candle breaks high",
        "Confirm with increasing volume",
        "Wait for at least 10 minutes after market open"
      ],
      exit: [
        "Take profit at prior resistance levels",
        "Use 1:2 risk-reward minimum",
        "Exit position before noon if target not reached"
      ],
      risk: [
        "Risk 1.5% maximum per gap trade",
        "Stop loss below the first 5-minute candle low",
        "Avoid gaps with no clear catalyst"
      ]
    }
  }
];

const Playbooks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  // Filter playbooks based on search term and active tab
  const filteredPlaybooks = mockPlaybooks.filter(playbook => {
    const matchesSearch = 
      playbook.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      playbook.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      playbook.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "momentum") return matchesSearch && playbook.category === "Momentum";
    if (activeTab === "reversal") return matchesSearch && playbook.category === "Reversal";
    if (activeTab === "gap") return matchesSearch && playbook.category === "Gap";
    
    return matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Playbooks</h1>
          <p className="text-muted-foreground mt-1">Create and manage your trading strategies</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          New Playbook
        </Button>
      </header>
      
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search playbooks..."
          className="pl-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* Playbooks List */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Playbooks</TabsTrigger>
          <TabsTrigger value="momentum">Momentum</TabsTrigger>
          <TabsTrigger value="reversal">Reversal</TabsTrigger>
          <TabsTrigger value="gap">Gap</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlaybooks.length > 0 ? (
              filteredPlaybooks.map((playbook) => (
                <PlaybookCard key={playbook.id} playbook={playbook} />
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-muted-foreground">No playbooks found</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="momentum" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlaybooks.length > 0 ? (
              filteredPlaybooks.map((playbook) => (
                <PlaybookCard key={playbook.id} playbook={playbook} />
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-muted-foreground">No momentum playbooks found</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="reversal" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlaybooks.length > 0 ? (
              filteredPlaybooks.map((playbook) => (
                <PlaybookCard key={playbook.id} playbook={playbook} />
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-muted-foreground">No reversal playbooks found</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="gap" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlaybooks.length > 0 ? (
              filteredPlaybooks.map((playbook) => (
                <PlaybookCard key={playbook.id} playbook={playbook} />
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-muted-foreground">No gap playbooks found</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Detailed View */}
      <Card className="mt-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <BookOpen className="h-5 w-5 text-accent mr-2" />
              <CardTitle>Playbook Details</CardTitle>
            </div>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
          <CardDescription>Detailed strategy and execution plan</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredPlaybooks.length > 0 && (
            <PlaybookDetails playbook={filteredPlaybooks[0]} />
          )}
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <div className="text-sm text-muted-foreground">
              Last updated: {filteredPlaybooks[0]?.lastUpdated}
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="flex items-center">
                <FileText className="h-3 w-3 mr-1" />
                Used {filteredPlaybooks[0]?.useCount} times
              </Badge>
              <Badge variant="outline" className="flex items-center text-primary">
                <CheckCircle className="h-3 w-3 mr-1" />
                {filteredPlaybooks[0]?.winRate}% Win Rate
              </Badge>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

interface PlaybookCardProps {
  playbook: {
    id: string;
    name: string;
    description: string;
    lastUpdated: string;
    useCount: number;
    winRate: number;
    category: string;
  };
}

const PlaybookCard = ({ playbook }: PlaybookCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="px-6 py-4 bg-accent/10">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{playbook.name}</CardTitle>
          <Badge>{playbook.category}</Badge>
        </div>
        <CardDescription>{playbook.description}</CardDescription>
      </CardHeader>
      <CardContent className="px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-sm">
            <div className="flex items-center text-primary">
              <Star className="h-4 w-4 mr-1 fill-primary" />
              <span>{playbook.winRate}% Win Rate</span>
            </div>
            <div className="flex items-center text-muted-foreground mt-1">
              <FileText className="h-3 w-3 mr-1" />
              <span>Used {playbook.useCount} times</span>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <BookOpen className="h-4 w-4 mr-2" />
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

interface PlaybookDetailsProps {
  playbook: {
    id: string;
    name: string;
    description: string;
    content: {
      conditions: string[];
      entry: string[];
      exit: string[];
      risk: string[];
    };
  };
}

const PlaybookDetails = ({ playbook }: PlaybookDetailsProps) => {
  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible defaultValue="conditions">
        <AccordionItem value="conditions">
          <AccordionTrigger className="py-3 hover:no-underline hover:bg-muted/20 px-4 rounded-md">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-secondary/20 text-secondary flex items-center justify-center mr-3">
                1
              </div>
              <span className="font-medium">Market Conditions</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-2">
            <ul className="space-y-2">
              {playbook.content.conditions.map((condition, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                  <span>{condition}</span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="entry">
          <AccordionTrigger className="py-3 hover:no-underline hover:bg-muted/20 px-4 rounded-md">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-3">
                2
              </div>
              <span className="font-medium">Entry Rules</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-2">
            <ul className="space-y-2">
              {playbook.content.entry.map((entry, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>{entry}</span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="exit">
          <AccordionTrigger className="py-3 hover:no-underline hover:bg-muted/20 px-4 rounded-md">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-accent/20 text-accent flex items-center justify-center mr-3">
                3
              </div>
              <span className="font-medium">Exit Strategy</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-2">
            <ul className="space-y-2">
              {playbook.content.exit.map((exit, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-accent mr-2 mt-0.5 flex-shrink-0" />
                  <span>{exit}</span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="risk">
          <AccordionTrigger className="py-3 hover:no-underline hover:bg-muted/20 px-4 rounded-md">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-destructive/20 text-destructive flex items-center justify-center mr-3">
                4
              </div>
              <span className="font-medium">Risk Management</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-2">
            <ul className="space-y-2">
              {playbook.content.risk.map((risk, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-destructive mr-2 mt-0.5 flex-shrink-0" />
                  <span>{risk}</span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Playbooks;
