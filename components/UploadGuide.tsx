'use client';

import { useLanguage } from '@/contexts/LanguageContext';

interface UploadGuideProps {
  onReady: () => void;
}

export default function UploadGuide({ onReady }: UploadGuideProps) {
  const { t, isRTL } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif mb-6 text-dark text-center">
          {t.guideTitle}
        </h1>

        <p className="text-xl text-muted mb-16 text-center">
          {t.guideIntro}
        </p>

        {/* Steps */}
        <div className="space-y-8 mb-12">
          {t.guideSteps.map((step, index) => (
            <div
              key={index}
              className="flex gap-6 items-start"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-dark text-white flex items-center justify-center font-medium text-lg">
                {index + 1}
              </div>
              <div className="flex-1 pt-1">
                <h3 className="text-lg font-medium text-dark mb-2">
                  {step.title}
                </h3>
                <p className="text-base text-dark/70 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Important note */}
        <div className="p-6 bg-gray-50 rounded-sm mb-12">
          <p className="text-base text-dark/80 leading-relaxed">
            {t.guideNote}
          </p>
        </div>

        {/* Continue button */}
        <div className="text-center">
          <button
            onClick={onReady}
            className="px-12 py-4 bg-dark text-white text-lg font-medium rounded-sm hover:bg-dark/90 transition-colors"
          >
            {t.guideReady}
          </button>
        </div>
      </div>
    </div>
  );
}
