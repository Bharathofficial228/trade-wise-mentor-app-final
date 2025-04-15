import React, { useEffect, useState } from 'react';
import { AIService } from '../lib/ai-service';
import { AIFeedbackComponent } from '../components/AIFeedback';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useTradeStore } from '../stores/tradeStore';
import { usePlaybookStore } from '../stores/playbookStore';

export const AnalysisPage: React.FC = () => {
  const [feedback, setFeedback] = useState<AIFeedback | null>(null);
  const [patterns, setPatterns] = useState<string[]>([]);
  const [actionableSteps, setActionableSteps] = useState<string[]>([]);
  const { trades } = useTradeStore();
  const { activePlaybook } = usePlaybookStore();
  const aiService = AIService.getInstance();

  useEffect(() => {
    if (trades.length > 0 && activePlaybook) {
      const latestTrade = trades[trades.length - 1];
      aiService.generateFeedback(latestTrade, activePlaybook)
        .then(setFeedback);
      
      aiService.analyzeTradingPatterns(trades)
        .then(setPatterns);
      
      aiService.generateActionableSteps(trades)
        .then(setActionableSteps);
    }
  }, [trades, activePlaybook]);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Trading Analysis</h1>
      
      {feedback && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Latest Trade Feedback</h2>
          <AIFeedbackComponent feedback={feedback} />
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Trading Patterns</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            {patterns.map((pattern, index) => (
              <li key={index}>{pattern}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Actionable Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            {actionableSteps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={() => {
          // Refresh analysis
          if (trades.length > 0 && activePlaybook) {
            const latestTrade = trades[trades.length - 1];
            aiService.generateFeedback(latestTrade, activePlaybook)
              .then(setFeedback);
          }
        }}>
          Refresh Analysis
        </Button>
      </div>
    </div>
  );
}; 