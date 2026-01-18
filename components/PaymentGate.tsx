'use client';

import { useLanguage } from '@/contexts/LanguageContext';

interface PaymentGateProps {
  onPaymentComplete: () => void;
}

export default function PaymentGate({ onPaymentComplete }: PaymentGateProps) {
  const { t } = useLanguage();

  const handlePayment = () => {
    // MOCK PAYMENT - In production, integrate Stripe/PayPal/etc.
    // For now, simulate payment processing
    setTimeout(() => {
      onPaymentComplete();
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-serif mb-6 text-dark">
          {t.paymentTitle}
        </h1>

        <p className="text-lg text-dark/70 leading-relaxed mb-16 max-w-xl mx-auto">
          {t.paymentDescription}
        </p>

        {/* Price */}
        <div className="mb-12">
          <div className="text-6xl font-serif text-dark mb-2">
            {t.paymentPrice}
          </div>
          <p className="text-sm text-muted uppercase tracking-wide">
            {t.paymentSecure}
          </p>
        </div>

        {/* Payment button */}
        <button
          onClick={handlePayment}
          className="px-16 py-5 bg-dark text-white text-lg font-medium rounded-sm hover:bg-dark/90 transition-colors"
        >
          {t.paymentButton}
        </button>

        {/* 
          INTEGRATION POINT: Real payment
          Replace the handlePayment function with actual payment processing:
          - Stripe Checkout
          - PayPal
          - Other payment processor
          
          Example with Stripe:
          ```
          const handlePayment = async () => {
            const response = await fetch('/api/create-checkout', {
              method: 'POST',
            });
            const { sessionId } = await response.json();
            const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
            await stripe.redirectToCheckout({ sessionId });
          };
          ```
        */}
      </div>
    </div>
  );
}
