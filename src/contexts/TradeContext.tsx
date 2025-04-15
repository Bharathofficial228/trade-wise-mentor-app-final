
import { createContext, useContext, useState, ReactNode } from "react";

// Types
export interface Trade {
  id: string;
  symbol: string;
  type: "Long" | "Short";
  entry: number;
  exit: number;
  pl: number;
  plPercentage: number;
  date: string;
  strategy: string;
  emotion: string;
  outcome: "profit" | "loss";
  notes?: string;
  screenshots?: string[];
}

export interface PlaybookItem {
  id: string;
  name: string;
  description: string;
  lastUpdated: string;
  useCount: number;
  winRate: number;
  category: string;
  content: {
    conditions: string[];
    entry: string[];
    exit: string[];
    risk: string[];
  };
}

interface TradeContextType {
  trades: Trade[];
  playbooks: PlaybookItem[];
  addTrade: (trade: Omit<Trade, "id" | "pl" | "plPercentage" | "outcome">) => void;
  updateTrade: (id: string, trade: Partial<Trade>) => void;
  deleteTrade: (id: string) => void;
  addPlaybook: (playbook: Omit<PlaybookItem, "id" | "lastUpdated" | "useCount" | "winRate">) => void;
  updatePlaybook: (id: string, playbook: Partial<PlaybookItem>) => void;
  deletePlaybook: (id: string) => void;
}

// Initial mock data
const initialTrades: Trade[] = [
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

const initialPlaybooks: PlaybookItem[] = [
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

// Create the context
export const TradeContext = createContext<TradeContextType | undefined>(undefined);

// Provider component
export function TradeProvider({ children }: { children: ReactNode }) {
  const [trades, setTrades] = useState<Trade[]>(initialTrades);
  const [playbooks, setPlaybooks] = useState<PlaybookItem[]>(initialPlaybooks);

  // Calculate P&L and outcome
  const calculateTradeMetrics = (entry: number, exit: number, type: "Long" | "Short") => {
    let pl = 0;
    let plPercentage = 0;
    let outcome: "profit" | "loss" = "profit";

    if (type === "Long") {
      pl = exit - entry;
      plPercentage = (pl / entry) * 100;
    } else {
      pl = entry - exit;
      plPercentage = (pl / entry) * 100;
    }

    outcome = pl >= 0 ? "profit" : "loss";

    return { pl, plPercentage, outcome };
  };

  // Trade functions
  const addTrade = (trade: Omit<Trade, "id" | "pl" | "plPercentage" | "outcome">) => {
    const { pl, plPercentage, outcome } = calculateTradeMetrics(trade.entry, trade.exit, trade.type);
    
    const newTrade: Trade = {
      ...trade,
      id: Date.now().toString(),
      pl,
      plPercentage,
      outcome
    };

    setTrades(prev => [newTrade, ...prev]);
  };

  const updateTrade = (id: string, tradeUpdate: Partial<Trade>) => {
    setTrades(prev => 
      prev.map(trade => {
        if (trade.id === id) {
          const updatedTrade = { ...trade, ...tradeUpdate };
          
          // Recalculate P&L if entry or exit changed
          if (tradeUpdate.entry !== undefined || tradeUpdate.exit !== undefined) {
            const { pl, plPercentage, outcome } = calculateTradeMetrics(
              tradeUpdate.entry ?? trade.entry,
              tradeUpdate.exit ?? trade.exit,
              tradeUpdate.type ?? trade.type
            );
            
            return { ...updatedTrade, pl, plPercentage, outcome };
          }
          
          return updatedTrade;
        }
        return trade;
      })
    );
  };

  const deleteTrade = (id: string) => {
    setTrades(prev => prev.filter(trade => trade.id !== id));
  };

  // Playbook functions
  const addPlaybook = (playbook: Omit<PlaybookItem, "id" | "lastUpdated" | "useCount" | "winRate">) => {
    const newPlaybook: PlaybookItem = {
      ...playbook,
      id: Date.now().toString(),
      lastUpdated: new Date().toISOString().split('T')[0],
      useCount: 0,
      winRate: 0
    };

    setPlaybooks(prev => [...prev, newPlaybook]);
  };

  const updatePlaybook = (id: string, playbookUpdate: Partial<PlaybookItem>) => {
    setPlaybooks(prev => 
      prev.map(playbook => {
        if (playbook.id === id) {
          return { 
            ...playbook, 
            ...playbookUpdate,
            lastUpdated: new Date().toISOString().split('T')[0]
          };
        }
        return playbook;
      })
    );
  };

  const deletePlaybook = (id: string) => {
    setPlaybooks(prev => prev.filter(playbook => playbook.id !== id));
  };

  return (
    <TradeContext.Provider 
      value={{ 
        trades, 
        playbooks, 
        addTrade, 
        updateTrade, 
        deleteTrade,
        addPlaybook,
        updatePlaybook,
        deletePlaybook
      }}
    >
      {children}
    </TradeContext.Provider>
  );
}

// Custom hook for using the context
export function useTrade() {
  const context = useContext(TradeContext);
  if (context === undefined) {
    throw new Error("useTrade must be used within a TradeProvider");
  }
  return context;
}
