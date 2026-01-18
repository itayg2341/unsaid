'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';

interface ProcessingStateProps {
  onComplete: (result: any) => void;
  onError?: (error: string) => void;
  conversationContent: string;
}

export default function ProcessingState({ onComplete, onError, conversationContent }: ProcessingStateProps) {
  const { t, language } = useLanguage();
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    // Cycle through processing messages
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % t.processingMessages.length);
    }, 2000);

    // Start analysis immediately
    performAnalysis();

    return () => {
      clearInterval(interval);
    };
  }, []);

  const performAnalysis = async () => {
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          conversation: conversationContent,
          language: language 
        }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const result = await response.json();
      console.log('API result received:', result);
      
      if (!result || !result.powerDynamics) {
        throw new Error('Invalid result format from API');
      }
      
      onComplete(result);

    } catch (error) {
      console.error('Analysis error:', error);
      if (onError) {
        onError(error instanceof Error ? error.message : 'Analysis failed');
      }
    }
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
