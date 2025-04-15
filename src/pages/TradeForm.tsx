
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  ArrowLeft,
  Calendar as CalendarIcon,
  Check,
  CircleDollarSign,
  Clock,
  ImagePlus,
  Lightbulb,
  Save,
  Trash2
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";

const TradeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditing = !!id;
  
  // Form state
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [symbol, setSymbol] = useState("");
  const [tradeType, setTradeType] = useState("long");
  const [entryPrice, setEntryPrice] = useState("");
  const [exitPrice, setExitPrice] = useState("");
  const [strategy, setStrategy] = useState("");
  const [emotion, setEmotion] = useState("");
  const [notes, setNotes] = useState("");
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save logic would go here
    
    toast({
      title: "Trade saved",
      description: `Your ${isEditing ? 'edited' : 'new'} trade has been saved successfully.`
    });
    
    navigate("/trades");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <header className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate("/trades")}
          className="mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {isEditing ? "Edit Trade" : "New Trade"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {isEditing 
              ? "Update the details of your trade" 
              : "Record the details of your new trade"
            }
          </p>
        </div>
      </header>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Main Trade Details */}
          <Card>
            <CardHeader>
              <CardTitle>Trade Details</CardTitle>
              <CardDescription>Basic information about your trade</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="symbol">Symbol</Label>
                <Input 
                  id="symbol" 
                  placeholder="e.g., AAPL" 
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label>Trade Type</Label>
                <RadioGroup 
                  defaultValue="long" 
                  value={tradeType}
                  onValueChange={setTradeType}
                  className="flex"
                >
                  <div className="flex items-center space-x-2 pr-6">
                    <RadioGroupItem value="long" id="long" />
                    <Label htmlFor="long" className="cursor-pointer">Long</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="short" id="short" />
                    <Label htmlFor="short" className="cursor-pointer">Short</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="entryPrice">Entry Price</Label>
                  <div className="relative">
                    <CircleDollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="entryPrice" 
                      placeholder="0.00"
                      className="pl-9"
                      value={entryPrice}
                      onChange={(e) => setEntryPrice(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="exitPrice">Exit Price</Label>
                  <div className="relative">
                    <CircleDollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="exitPrice" 
                      placeholder="0.00"
                      className="pl-9"
                      value={exitPrice}
                      onChange={(e) => setExitPrice(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date">Trade Date</Label>
                <div className="flex gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  
                  <Button variant="outline" className="flex-shrink-0">
                    <Clock className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Trade Analysis</CardTitle>
              <CardDescription>Evaluate your strategy and emotions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="strategy">Strategy Used</Label>
                <Input 
                  id="strategy" 
                  placeholder="e.g., Trend Following, Breakout..." 
                  value={strategy}
                  onChange={(e) => setStrategy(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="emotion">Emotional State</Label>
                <Input 
                  id="emotion" 
                  placeholder="e.g., Confident, Anxious, Neutral..." 
                  value={emotion}
                  onChange={(e) => setEmotion(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Trade Notes</Label>
                <Textarea 
                  id="notes" 
                  placeholder="What worked well? What could have been better?" 
                  className="min-h-[120px]"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
              
              <div>
                <Label>Screenshots</Label>
                <div className="mt-2 border-2 border-dashed rounded-lg p-8 text-center">
                  <ImagePlus className="h-8 w-8 mx-auto text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG or GIF up to 5MB
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* AI Feedback */}
        <Card className="mt-6">
          <CardHeader className="bg-accent/10 rounded-t-lg">
            <div className="flex items-center">
              <Lightbulb className="h-5 w-5 text-accent mr-2" />
              <CardTitle>AI Feedback</CardTitle>
            </div>
            <CardDescription>
              Get instant analysis and feedback on your trade
            </CardDescription>
          </CardHeader>
          <CardContent className="py-4">
            {symbol && entryPrice && exitPrice ? (
              <div className="p-4 border rounded-md">
                <h4 className="font-medium">Trade Analysis</h4>
                <p className="text-sm text-muted-foreground mt-1 mb-3">
                  Based on the information you've provided, here's what I see:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
                    <span>
                      This {tradeType === "long" ? "long" : "short"} trade on {symbol} 
                      {" "}appears to align with your recent trading patterns.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
                    <span>
                      The {+entryPrice < +exitPrice ? "profit" : "loss"} on this trade 
                      {" "}highlights the importance of {strategy || "your strategy"}.
                    </span>
                  </li>
                  {emotion && (
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
                      <span>
                        Your emotional state of "{emotion}" 
                        {" "}may have influenced your decision-making process.
                      </span>
                    </li>
                  )}
                </ul>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">
                Complete your trade details to receive AI-powered insights
              </p>
            )}
          </CardContent>
        </Card>
        
        {/* Form Actions */}
        <div className="mt-6 flex items-center justify-end gap-4">
          {isEditing && (
            <Button type="button" variant="outline" className="flex gap-2 text-destructive">
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </Button>
          )}
          <Button variant="secondary" type="button" onClick={() => navigate("/trades")}>
            Cancel
          </Button>
          <Button type="submit" className="bg-primary hover:bg-primary/90 flex gap-2">
            <Save className="h-4 w-4" />
            <span>Save Trade</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TradeForm;
