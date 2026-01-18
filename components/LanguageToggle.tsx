'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed top-8 right-8 z-50">
      <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm border border-gray-200">
        <button
          onClick={() => setLanguage('en')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
            language === 'en'
              ? 'bg-dark text-white'
              : 'text-muted hover:text-dark'
          }`}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage('he')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
            language === 'he'
              ? 'bg-dark text-white'
              : 'text-muted hover:text-dark'
          }`}
        >
          עב
        </button>
      </div>
    </div>
  );
}
