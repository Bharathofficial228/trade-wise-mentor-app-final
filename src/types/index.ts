export interface Trade {
  id: string;
  symbol: string;
  entryPrice: number;
  exitPrice: number;
  stopLoss: number;
  takeProfit: number;
  positionSize: number;
  profit: number;
  timestamp: Date;
  strategy: string;
  emotions: string[];
  screenshot?: string;
  notes?: string;
}

export interface Playbook {
  id: string;
  name: string;
  description: string;
  marketConditions: string[];
  setupChecklist: string[];
  riskManagementRules: string[];
  screenshots?: string[];
  version: number;
  lastUpdated: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  level: number;
  experience: number;
  badges: string[];
  settings: UserSettings;
}

export interface UserSettings {
  theme: 'light' | 'dark';
  notifications: boolean;
  feedbackFrequency: 'immediate' | 'daily' | 'weekly';
  defaultPlaybook?: string;
} 