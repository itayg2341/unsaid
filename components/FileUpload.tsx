'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useRef } from 'react';

interface FileUploadProps {
  onFileUploaded: (file: File, content: string) => void;
}

export default function FileUpload({ onFileUploaded }: FileUploadProps) {
  const { t } = useLanguage();
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateWhatsAppFile = (content: string): boolean => {
    // Basic validation: check for WhatsApp export patterns
    // Supports multiple formats:
    // [DD/MM/YYYY, HH:MM:SS] Name: Message
    // [DD/MM/YYYY, HH:MM] Name: Message  
    // [M/D/YY, H:MM AM] Name: Message
    // DD/MM/YYYY, HH:MM - Name: Message
    
    const patterns = [
      /\[\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4},?\s+\d{1,2}:\d{2}/i,  // Bracketed format
      /\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4},?\s+\d{1,2}:\d{2}\s*[-–]\s*/i,  // Dash format
    ];
    
    return patterns.some(pattern => pattern.test(content));
  };

  const handleFile = async (file: File) => {
    setError(null);
    setIsProcessing(true);

    try {
      // Check file type
      if (!file.name.endsWith('.txt')) {
        throw new Error(t.uploadInvalidFile);
      }

      // Read file content
      const content = await file.text();

      // Validate it's a WhatsApp export
      if (!validateWhatsAppFile(content)) {
        throw new Error(t.uploadInvalidFile);
      }

      // Success - pass to parent
      setTimeout(() => {
        onFileUploaded(file, content);
      }, 1000);

    } catch (err) {
      setIsProcessing(false);
      setError(err instanceof Error ? err.message : t.uploadError);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-2xl mx-auto w-full">
        <h1 className="text-4xl md:text-5xl font-serif mb-16 text-dark text-center">
          {t.uploadTitle}
        </h1>

        {/* Upload area */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`
            relative border-2 border-dashed rounded-sm p-16 text-center transition-all
            ${isDragging ? 'border-dark bg-gray-50' : 'border-gray-300'}
            ${isProcessing ? 'opacity-50 pointer-events-none' : 'cursor-pointer hover:border-gray-400'}
          `}
          onClick={() => !isProcessing && fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt"
            onChange={handleFileSelect}
            className="hidden"
          />

          {isProcessing ? (
            <div className="space-y-4">
              <div className="w-12 h-12 border-4 border-dark border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-lg text-muted">{t.uploadProcessing}</p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <svg
                  className="w-16 h-16 mx-auto text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <p className="text-lg text-dark mb-2">{t.uploadDragDrop}</p>
              <p className="text-sm text-muted mb-4">{t.uploadOr}</p>
              <span className="text-base text-dark underline">{t.uploadBrowse}</span>
            </>
          )}
        </div>

        {/* Error message */}
        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-sm">
            <p className="text-red-800 text-center">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
