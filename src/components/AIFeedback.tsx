import React from 'react';
import { AIFeedback } from '../lib/ai-service';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';

interface AIFeedbackProps {
  feedback: AIFeedback;
}

export const AIFeedbackComponent: React.FC<AIFeedbackProps> = ({ feedback }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>AI Mentor Feedback</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-semibold">Key Insights</h3>
          <ul className="list-disc pl-5 space-y-1">
            {feedback.insights.map((insight, index) => (
              <li key={index}>{insight}</li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold">Suggestions</h3>
          <ul className="list-disc pl-5 space-y-1">
            {feedback.suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold">Emotional Analysis</h3>
          <p>{feedback.emotionalAnalysis}</p>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold">Performance Metrics</h3>
          <div className="space-y-2">
            <div>
              <p>Playbook Adherence</p>
              <Progress value={feedback.playbookAdherence * 100} />
            </div>
            <div>
              <p>Risk Management Score</p>
              <Progress value={feedback.riskManagementScore * 100} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 