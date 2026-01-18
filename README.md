# UNSAID - WhatsApp Conversation Analysis

A landing-page-based product that provides one-time, emotionally impactful analysis of WhatsApp conversations.

## Product Philosophy

This is NOT:
- An app
- A subscription service
- A generic AI tool
- A chatbot

This IS:
- A single-use emotional product
- An ephemeral, secret revelation
- A one-time purchase of truth

## Features

- **Bilingual Support** (English & Hebrew with RTL)
- **Complete Flow**: Landing → Emotional Priming → Upload Guide → File Upload → Payment → Analysis → Result
- **Privacy-First**: No accounts, no storage, no history
- **WhatsApp Export Only**: Official export format (.txt files)
- **Minimal Design**: Clean, calm, premium aesthetic
- **Mobile-First**: Responsive design for all devices

## Tech Stack

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **No backend dependencies** (ready for integration)

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with LanguageProvider
│   ├── page.tsx            # Main flow orchestration
│   └── globals.css         # Global styles & animations
├── components/
│   ├── LanguageToggle.tsx  # EN/HE language switcher
│   ├── LandingHero.tsx     # Landing page with privacy section
│   ├── EmotionalPriming.tsx # Pre-upload psychological priming
│   ├── UploadGuide.tsx     # WhatsApp export instructions
│   ├── FileUpload.tsx      # Drag-and-drop file upload
│   ├── PaymentGate.tsx     # Payment interface (mock)
│   ├── ProcessingState.tsx # Analysis processing UI
│   └── AnalysisResult.tsx  # Result display
├── contexts/
│   └── LanguageContext.tsx # Bilingual state management
└── content/
    └── translations.ts     # All EN/HE content
```

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## Integration Points

### 1. Payment Processing (PaymentGate.tsx)

Currently mocked. Integrate with:
- Stripe
- PayPal  
- Other payment processor

```typescript
// Example Stripe integration
const handlePayment = async () => {
  const response = await fetch('/api/create-checkout', {
    method: 'POST',
  });
  const { sessionId } = await response.json();
  const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
  await stripe.redirectToCheckout({ sessionId });
};
```

### 2. AI Analysis Pipeline (ProcessingState.tsx)

Currently returns mock data. Replace with actual analysis:

```typescript
const performAnalysis = async () => {
  const response = await fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      conversation: conversationContent,
      language: language 
    }),
  });
  
  const result = await response.json();
  onComplete(result);
};
```

#### Analysis Service Requirements:

1. Parse WhatsApp export format
2. Extract participants, messages, timestamps
3. Analyze:
   - Power dynamics (who leads, who follows)
   - Emotional investment (who needs this more)
   - Pattern recognition (what repeats, changes, never comes)
   - The unsaid (what's avoided, implied, known but not spoken)
4. Return structured result matching the interface
5. Support both English and Hebrew output

### 3. File Validation (FileUpload.tsx)

Basic WhatsApp format validation is implemented. Enhance as needed:

```typescript
const validateWhatsAppFile = (content: string): boolean => {
  // Add more sophisticated validation
  // Check for minimum messages, proper format, etc.
};
```

## Content Management

All user-facing text is in `content/translations.ts`. To modify copy:

1. Edit the English content in `content.en`
2. Edit the Hebrew content in `content.he`
3. Both versions must have matching structure

## Design Principles

1. **Minimal & Calm**: No over-animations, no playful UI
2. **Typography-First**: Serif for headings, sans-serif for body
3. **Plenty of Space**: Generous padding and margins
4. **Emotional Impact**: Tone is serious, intimate, not marketing-heavy
5. **Premium Feel**: High-quality, considered design choices

## Privacy Architecture

- No user accounts
- No conversation storage
- No data training
- Files processed once then deleted
- No analytics or tracking (add consciously if needed)

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- RTL support for Hebrew

## What's NOT Included

❌ Deployment configuration
❌ Backend/API implementation
❌ Real payment processing
❌ Actual AI analysis logic
❌ Database setup
❌ Authentication

## What IS Included

✅ Complete UI/UX flow
✅ Bilingual content system
✅ File upload handling
✅ Mock payment flow
✅ Result rendering
✅ Responsive design
✅ Clear integration points
✅ Production-ready frontend

## License

Private/Proprietary

## Notes

This product is designed to feel like "something you're not sure you want to know — but can't ignore." If it feels like a tool, it's failing. If it feels like a secret being revealed, it's succeeding.
