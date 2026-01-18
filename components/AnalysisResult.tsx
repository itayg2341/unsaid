'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';

interface AnalysisResultProps {
  result: any;
}

export default function AnalysisResult({ result }: AnalysisResultProps) {
  const { t } = useLanguage();
  const [showWarning, setShowWarning] = useState(true);

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
                {result.powerDynamics.analysis}
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
                {result.emotionalInvestment.analysis}
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
                  {result.patterns.repeated}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-dark mb-2 uppercase tracking-wide">
                  What changed
                </h3>
                <p className="text-dark/80 leading-relaxed">
                  {result.patterns.changed}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-dark mb-2 uppercase tracking-wide">
                  What never came
                </h3>
                <p className="text-dark/80 leading-relaxed">
                  {result.patterns.neverCame}
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
                  {result.unsaid.avoided}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-dark mb-2 uppercase tracking-wide">
                  What was implied
                </h3>
                <p className="text-dark/80 leading-relaxed">
                  {result.unsaid.implied}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-dark mb-2 uppercase tracking-wide">
                  What was known but not spoken
                </h3>
                <p className="text-dark/80 leading-relaxed">
                  {result.unsaid.known}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* End message */}
        <div className="mt-20 pt-16 border-t border-gray-200 text-center">
          <p className="text-lg text-dark/60 leading-relaxed max-w-2xl mx-auto">
            {t.endClosing}
          </p>
        </div>
      </div>
    </div>
  );
}
