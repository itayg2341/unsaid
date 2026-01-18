'use client';

import { useLanguage } from '@/contexts/LanguageContext';

interface LandingHeroProps {
  onStart: () => void;
}

export default function LandingHero({ onStart }: LandingHeroProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-3xl mx-auto text-center">
        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-serif font-normal mb-6 text-dark leading-tight">
          {t.title}
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted mb-16 font-light">
          {t.subtitle}
        </p>

        {/* Body paragraphs */}
        <div className="space-y-6 mb-16 text-left">
          {t.heroBody.map((paragraph, index) => (
            <p
              key={index}
              className="text-lg leading-relaxed text-dark/80"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={onStart}
          className="px-12 py-4 bg-dark text-white text-lg font-medium rounded-sm hover:bg-dark/90 transition-colors"
        >
          {t.ctaButton}
        </button>
      </div>
    </div>
  );
}
