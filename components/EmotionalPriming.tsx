'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';

interface EmotionalPrimingProps {
  onContinue: () => void;
  onBack: () => void;
}

export default function EmotionalPriming({ onContinue, onBack }: EmotionalPrimingProps) {
  const { t } = useLanguage();
  const [showQuestions, setShowQuestions] = useState(false);

  useEffect(() => {
    // Delayed reveal of questions for dramatic effect
    const timer = setTimeout(() => setShowQuestions(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif mb-8 text-dark text-center">
          {t.primingTitle}
        </h1>

        <p className="text-xl text-muted mb-16 text-center font-light italic">
          {t.primingInstructions}
        </p>

        {showQuestions && (
          <div className="space-y-12 mb-16 opacity-0 animate-fadeIn">
            {t.primingQuestions.map((question, index) => (
              <div
                key={index}
                className="py-6 border-b border-gray-200 last:border-b-0"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <p className="text-lg text-dark leading-relaxed">
                  {question}
                </p>
              </div>
            ))}
          </div>
        )}

        {showQuestions && (
          <div className="mt-16 p-6 bg-gray-50 rounded-sm opacity-0 animate-fadeIn" style={{ animationDelay: '800ms' }}>
            <p className="text-base text-dark/80 leading-relaxed text-center">
              {t.primingWarning}
            </p>
          </div>
        )}

        <div className="mt-12 flex gap-4 justify-center">
          <button
            onClick={onBack}
            className="px-8 py-3 text-muted border border-gray-300 rounded-sm hover:border-gray-400 transition-colors"
          >
            {t.primingBack}
          </button>
          <button
            onClick={onContinue}
            className="px-8 py-3 bg-dark text-white rounded-sm hover:bg-dark/90 transition-colors"
          >
            {t.primingContinue}
          </button>
        </div>
      </div>
    </div>
  );
}
