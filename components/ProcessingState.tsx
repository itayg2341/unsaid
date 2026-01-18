'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';

interface ProcessingStateProps {
  onComplete: (result: any) => void;
  conversationContent: string;
}

export default function ProcessingState({ onComplete, conversationContent }: ProcessingStateProps) {
  const { t } = useLanguage();
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    // Cycle through processing messages
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % t.processingMessages.length);
    }, 2000);

    // Simulate analysis completion
    // INTEGRATION POINT: Replace with actual API call to analysis service
    const analysisTimer = setTimeout(() => {
      performAnalysis();
    }, 8000);

    return () => {
      clearInterval(interval);
      clearTimeout(analysisTimer);
    };
  }, []);

  const performAnalysis = async () => {
    // MOCK ANALYSIS - Replace with actual AI analysis
    // This is where you would call your analysis API/service
    
    /*
      INTEGRATION POINT: AI Analysis Pipeline
      
      Example implementation:
      ```
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          conversation: conversationContent,
          language: language 
        }),
      });
      
      const result = await response.json();
      onComplete(result);
      ```
      
      Your analysis service should:
      1. Parse WhatsApp conversation format
      2. Extract participants, messages, timestamps
      3. Analyze patterns, dynamics, emotional investment
      4. Generate structured result matching the sections in translations
      5. Return result in the appropriate language
    */

    // Mock result for demo
    const mockResult = {
      powerDynamics: {
        leader: "Person A",
        follower: "Person B",
        analysis: "Person A consistently initiated conversations and set the pace. Person B responded but rarely led topics. The dynamic shows a clear pattern of pursuit and withdrawal."
      },
      emotionalInvestment: {
        moreInvested: "Person B",
        analysis: "Response times, message length, and emotional content suggest Person B had higher emotional stakes. Questions went unanswered more frequently for Person B."
      },
      patterns: {
        repeated: "Late night conversations followed by morning silence",
        changed: "Initial enthusiasm gradually decreased over 6 weeks",
        neverCame: "Plans discussed but never finalized"
      },
      unsaid: {
        avoided: "Direct discussion of relationship definition",
        implied: "Emotional availability concerns",
        known: "Both parties aware of incompatible expectations"
      }
    };

    onComplete(mockResult);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-serif mb-16 text-dark">
          {t.processingTitle}
        </h1>

        {/* Loading spinner */}
        <div className="mb-12">
          <div className="w-16 h-16 border-4 border-dark border-t-transparent rounded-full animate-spin mx-auto" />
        </div>

        {/* Processing message */}
        <p className="text-lg text-muted animate-pulse">
          {t.processingMessages[messageIndex]}
        </p>
      </div>
    </div>
  );
}
