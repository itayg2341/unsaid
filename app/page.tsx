'use client';

import { useState } from 'react';
import LanguageToggle from '@/components/LanguageToggle';
import LandingHero from '@/components/LandingHero';
import EmotionalPriming from '@/components/EmotionalPriming';
import UploadGuide from '@/components/UploadGuide';
import FileUpload from '@/components/FileUpload';
import PaymentGate from '@/components/PaymentGate';
import ProcessingState from '@/components/ProcessingState';
import AnalysisResult from '@/components/AnalysisResult';

type FlowState = 
  | 'LANDING'
  | 'PRIMING'
  | 'GUIDE'
  | 'UPLOAD'
  | 'PAYMENT'
  | 'PROCESSING'
  | 'RESULT';

export default function Home() {
  const [flowState, setFlowState] = useState<FlowState>('LANDING');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [conversationContent, setConversationContent] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleStart = () => {
    setFlowState('PRIMING');
  };

  const handlePrimingContinue = () => {
    setFlowState('GUIDE');
  };

  const handlePrimingBack = () => {
    setFlowState('LANDING');
  };

  const handleGuideReady = () => {
    setFlowState('UPLOAD');
  };

  const handleFileUploaded = (file: File, content: string) => {
    setUploadedFile(file);
    setConversationContent(content);
    setFlowState('PAYMENT');
  };

  const handlePaymentComplete = () => {
    setFlowState('PROCESSING');
  };

  const handleAnalysisComplete = (result: any) => {
    setAnalysisResult(result);
    setFlowState('RESULT');
  };

  return (
    <main className="min-h-screen">
      <LanguageToggle />
      
      {flowState === 'LANDING' && (
        <LandingHero onStart={handleStart} />
      )}

      {flowState === 'PRIMING' && (
        <EmotionalPriming 
          onContinue={handlePrimingContinue}
          onBack={handlePrimingBack}
        />
      )}

      {flowState === 'GUIDE' && (
        <UploadGuide onReady={handleGuideReady} />
      )}

      {flowState === 'UPLOAD' && (
        <FileUpload onFileUploaded={handleFileUploaded} />
      )}

      {flowState === 'PAYMENT' && (
        <PaymentGate onPaymentComplete={handlePaymentComplete} />
      )}

      {flowState === 'PROCESSING' && (
        <ProcessingState 
          conversationContent={conversationContent}
          onComplete={handleAnalysisComplete}
        />
      )}

      {flowState === 'RESULT' && analysisResult && (
        <AnalysisResult result={analysisResult} />
      )}
    </main>
  );
}
