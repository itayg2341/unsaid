'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';

interface AnalysisResultProps {
  result: any;
  onAnalyzeAnother: () => void;
  originalLanguage: 'en' | 'he';
}

export default function AnalysisResult({ result, onAnalyzeAnother, originalLanguage }: AnalysisResultProps) {
  const { t, language } = useLanguage();
  const [showWarning, setShowWarning] = useState(true);
  const [displayResult, setDisplayResult] = useState(result);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedCache, setTranslatedCache] = useState<{en?: any, he?: any}>({
    [originalLanguage]: result
  });

  // Debug: Log the result to see what we're getting
  console.log('Result received:', result);
  console.log('Display result:', displayResult);

  useEffect(() => {
    // When language changes, check if we need to translate
    if (language !== originalLanguage && !translatedCache[language]) {
      translateResult();
    } else if (translatedCache[language]) {
      setDisplayResult(translatedCache[language]);
    }
  }, [language]);

  const translateResult = async () => {
    setIsTranslating(true);
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          result: result,
          targetLanguage: language
        }),
      });

      if (response.ok) {
        const translated = await response.json();
        setDisplayResult(translated);
        setTranslatedCache(prev => ({ ...prev, [language]: translated }));
      }
    } catch (error) {
      console.error('Translation failed:', error);
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="min-h-screen px-6 py-20">
      <div className="max-w-4xl mx-auto">
        {/* Warning banner */}
        {showWarning && (
          <div className="mb-12 p-6 bg-yellow-50 border border-yellow-200 rounded-sm">
            <p className="text-center text-dark font-medium mb-2">
              {t.endMessage}
            </p>
            <button
              onClick={() => setShowWarning(false)}
              className="text-sm text-muted hover:text-dark mx-auto block"
            >
              ×
            </button>
          </div>
        )}

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-serif mb-20 text-dark text-center">
          {t.resultTitle}
        </h1>

        {/* Translating indicator */}
        {isTranslating && (
          <div className="text-center mb-8 text-muted">
            <div className="inline-block animate-pulse">Translating...</div>
          </div>
        )}

        {/* Result sections */}
        <div className="space-y-16">
          {/* Power Dynamics */}
          <section className="border-b border-gray-200 pb-16">
            <h2 className="text-2xl font-serif mb-4 text-dark">
              {t.resultSections[0].title}
            </h2>
            <p className="text-sm text-muted mb-6 italic">
              {t.resultSections[0].description}
            </p>
            <div className="prose prose-lg max-w-none">
              <p className="text-dark/80 leading-relaxed">
                {displayResult.powerDynamics.analysis}
              </p>
            </div>
          </section>

          {/* Emotional Investment */}
          <section className="border-b border-gray-200 pb-16">
            <h2 className="text-2xl font-serif mb-4 text-dark">
              {t.resultSections[1].title}
            </h2>
            <p className="text-sm text-muted mb-6 italic">
              {t.resultSections[1].description}
            </p>
            <div className="prose prose-lg max-w-none">
              <p className="text-dark/80 leading-relaxed">
                {displayResult.emotionalInvestment.analysis}
              </p>
            </div>
          </section>

          {/* Pattern Recognition */}
          <section className="border-b border-gray-200 pb-16">
            <h2 className="text-2xl font-serif mb-4 text-dark">
              {t.resultSections[2].title}
            </h2>
            <p className="text-sm text-muted mb-6 italic">
              {t.resultSections[2].description}
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-dark mb-2 uppercase tracking-wide">
                  What repeated
                </h3>
                <p className="text-dark/80 leading-relaxed">
                  {displayResult.patterns.repeated}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-dark mb-2 uppercase tracking-wide">
                  What changed
                </h3>
                <p className="text-dark/80 leading-relaxed">
                  {displayResult.patterns.changed}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-dark mb-2 uppercase tracking-wide">
                  What never came
                </h3>
                <p className="text-dark/80 leading-relaxed">
                  {displayResult.patterns.neverCame}
                </p>
              </div>
            </div>
          </section>

          {/* The Unsaid */}
          <section className="pb-16">
            <h2 className="text-2xl font-serif mb-4 text-dark">
              {t.resultSections[3].title}
            </h2>
            <p className="text-sm text-muted mb-6 italic">
              {t.resultSections[3].description}
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-dark mb-2 uppercase tracking-wide">
                  What was avoided
                </h3>
                <p className="text-dark/80 leading-relaxed">
                  {displayResult.unsaid.avoided}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-dark mb-2 uppercase tracking-wide">
                  What was implied
                </h3>
                <p className="text-dark/80 leading-relaxed">
                  {displayResult.unsaid.implied}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-dark mb-2 uppercase tracking-wide">
                  What was known but not spoken
                </h3>
                <p className="text-dark/80 leading-relaxed">
                  {displayResult.unsaid.known}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* End message */}
        <div className="mt-20 pt-16 border-t border-gray-200 text-center">
          <p className="text-lg text-dark/60 leading-relaxed max-w-2xl mx-auto mb-8">
            {t.endClosing}
          </p>
          <button
            onClick={onAnalyzeAnother}
            className="px-8 py-3 bg-dark text-white rounded-sm hover:bg-dark/90 transition-colors"
          >
            {t.analyzeAnother}
          </button>
        </div>
      </div>
    </div>
  );
}
