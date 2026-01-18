export type Language = 'en' | 'he';

export interface Content {
  // Landing Page
  title: string;
  subtitle: string;
  heroBody: string[];
  ctaButton: string;
  
  // Privacy Section
  privacyTitle: string;
  privacyPoints: string[];
  privacyClosing: string;
  
  // Emotional Priming
  primingTitle: string;
  primingInstructions: string;
  primingQuestions: string[];
  primingWarning: string;
  primingContinue: string;
  primingBack: string;
  
  // Upload Guide
  guideTitle: string;
  guideIntro: string;
  guideSteps: {
    title: string;
    description: string;
  }[];
  guideNote: string;
  guideReady: string;
  
  // Upload
  uploadTitle: string;
  uploadDragDrop: string;
  uploadOr: string;
  uploadBrowse: string;
  uploadProcessing: string;
  uploadError: string;
  uploadInvalidFile: string;
  
  // Payment
  paymentTitle: string;
  paymentDescription: string;
  paymentPrice: string;
  paymentButton: string;
  paymentSecure: string;
  
  // Processing
  processingTitle: string;
  processingMessages: string[];
  
  // Result
  resultTitle: string;
  resultSections: {
    title: string;
    description: string;
  }[];
  
  // End
  endMessage: string;
  endClosing: string;
  
  // Common
  loading: string;
  error: string;
  back: string;
  continue: string;
}

export const content: Record<Language, Content> = {
  en: {
    // Landing Page
    title: "What if you already know?",
    subtitle: "One conversation. One truth. No going back.",
    heroBody: [
      "You've read it a hundred times. You know the patterns. You recognize the silence, the deflection, the careful words.",
      "But knowing and seeing are different.",
      "This is not a tool. It's not an app. It's not AI assistance.",
      "It's what happened — extracted from the noise, stripped of your interpretation, delivered once."
    ],
    ctaButton: "I'm ready",
    
    // Privacy Section
    privacyTitle: "Why this works",
    privacyPoints: [
      "No account. No login. No history.",
      "The conversation is processed once, then deleted.",
      "Nothing is stored. Nothing is trained on.",
      "This only exists because it disappears.",
      "If it were saved, it couldn't be sold."
    ],
    privacyClosing: "You get one result. Then it's gone.",
    
    // Emotional Priming
    primingTitle: "Before you continue",
    primingInstructions: "Don't type anything. Just think.",
    primingQuestions: [
      "What are you afraid to discover?",
      "What do you already suspect?",
      "Who is more emotionally invested in this conversation?"
    ],
    primingWarning: "The analysis will not tell you what to do. It will tell you what is.",
    primingContinue: "I understand",
    primingBack: "Not ready",
    
    // Upload Guide
    guideTitle: "How to export your WhatsApp conversation",
    guideIntro: "You need the full conversation. Every message, from the beginning.",
    guideSteps: [
      {
        title: "Open WhatsApp",
        description: "On your phone, open the conversation you want analyzed"
      },
      {
        title: "Tap the contact name at the top",
        description: "This opens the conversation settings"
      },
      {
        title: "Scroll down and tap 'Export Chat'",
        description: "You'll see this option in the menu"
      },
      {
        title: "Choose 'Without Media'",
        description: "Only the text is needed. No photos, no videos."
      },
      {
        title: "Save the file and upload it here",
        description: "The file will be named 'WhatsApp Chat with [Name].txt'"
      }
    ],
    guideNote: "The entire conversation must be included. Don't edit it. Don't remove parts. Names and timestamps are handled automatically.",
    guideReady: "I have the file",
    
    // Upload
    uploadTitle: "Upload your conversation",
    uploadDragDrop: "Drag your WhatsApp export file here",
    uploadOr: "or",
    uploadBrowse: "browse files",
    uploadProcessing: "Reading conversation...",
    uploadError: "Something went wrong. Please try again.",
    uploadInvalidFile: "This doesn't appear to be a WhatsApp export file. Please check the file and try again.",
    
    // Payment
    paymentTitle: "One conversation. One price.",
    paymentDescription: "You're not buying access. You're buying a result. Once you pay, the analysis begins. You cannot request a refund after receiving the result.",
    paymentPrice: "$19",
    paymentButton: "Pay and analyze",
    paymentSecure: "Secure payment • No subscription • One time only",
    
    // Processing
    processingTitle: "Analyzing...",
    processingMessages: [
      "Reading conversation structure...",
      "Identifying patterns...",
      "Extracting dynamics...",
      "Preparing result..."
    ],
    
    // Result
    resultTitle: "What happened",
    resultSections: [
      {
        title: "Power dynamics",
        description: "Who led. Who followed. Who waited."
      },
      {
        title: "Emotional investment",
        description: "Who needed this more."
      },
      {
        title: "Pattern recognition",
        description: "What repeated. What changed. What never came."
      },
      {
        title: "The unsaid",
        description: "What was avoided. What was implied. What was known but not spoken."
      }
    ],
    
    // End
    endMessage: "This result will not be saved. Take a screenshot if you need to.",
    endClosing: "There is no history. There is no account. This conversation never happened here.",
    
    // Common
    loading: "Loading...",
    error: "An error occurred",
    back: "Back",
    continue: "Continue",
  },
  
  he: {
    // Landing Page  
    title: "מה אם את/ה כבר יודע/ת?",
    subtitle: "שיחה אחת. אמת אחת. אין דרך חזרה.",
    heroBody: [
      "קראת את זה מאה פעמים. את/ה מכיר/ה את הדפוסים. את/ה מזהה את השתיקה, ההתחמקות, המילים הזהירות.",
      "אבל לדעת ולראות זה לא אותו דבר.",
      "זה לא כלי. זה לא אפליקציה. זה לא עזרה של בינה מלאכותית.",
      "זה מה שקרה — מופק מהרעש, מופשט מהפרשנות שלך, נמסר פעם אחת."
    ],
    ctaButton: "אני מוכן/ה",
    
    // Privacy Section
    privacyTitle: "למה זה עובד",
    privacyPoints: [
      "אין חשבון. אין התחברות. אין היסטוריה.",
      "השיחה מעובדת פעם אחת, ואז נמחקת.",
      "שום דבר לא נשמר. שום דבר לא משמש לאימון.",
      "זה קיים רק כי זה נעלם.",
      "אם זה היה נשמר, לא היה ניתן למכור את זה."
    ],
    privacyClosing: "את/ה מקבל/ת תוצאה אחת. ואז זה נעלם.",
    
    // Emotional Priming
    primingTitle: "לפני שממשיכים",
    primingInstructions: "אל תכתוב/י כלום. רק תחשוב/י.",
    primingQuestions: [
      "ממה את/ה חושש/ת לגלות?",
      "מה את/ה כבר חושד/ת?",
      "מי יותר מושקע רגשית בשיחה הזו?"
    ],
    primingWarning: "הניתוח לא יגיד לך מה לעשות. הוא יגיד לך מה יש.",
    primingContinue: "הבנתי",
    primingBack: "לא מוכן/ה",
    
    // Upload Guide
    guideTitle: "איך לייצא את שיחת הוואטסאפ",
    guideIntro: "את/ה צריך/ה את השיחה המלאה. כל הודעה, מההתחלה.",
    guideSteps: [
      {
        title: "פתח/י את וואטסאפ",
        description: "בטלפון, פתח/י את השיחה שרוצים לנתח"
      },
      {
        title: "הקש/י על שם איש הקשר למעלה",
        description: "זה יפתח את הגדרות השיחה"
      },
      {
        title: "גלול/י למטה והקש/י על 'ייצוא צ'אט'",
        description: "תראה/י את האפשרות הזו בתפריט"
      },
      {
        title: "בחר/י 'ללא מדיה'",
        description: "רק הטקסט נחוץ. בלי תמונות, בלי סרטונים."
      },
      {
        title: "שמור/י את הקובץ והעלה/י אותו כאן",
        description: "הקובץ ייקרא 'WhatsApp Chat with [שם].txt'"
      }
    ],
    guideNote: "השיחה כולה חייבת להיות כלולה. אל תערוך/י. אל תסיר/י חלקים. שמות וחותמות זמן מטופלים אוטומטית.",
    guideReady: "יש לי את הקובץ",
    
    // Upload
    uploadTitle: "העלה/י את השיחה",
    uploadDragDrop: "גרור/י את קובץ הייצוא של וואטסאפ לכאן",
    uploadOr: "או",
    uploadBrowse: "חפש/י קבצים",
    uploadProcessing: "קורא את השיחה...",
    uploadError: "משהו השתבש. נסה/י שוב.",
    uploadInvalidFile: "זה לא נראה כמו קובץ ייצוא של וואטסאפ. בדוק/י את הקובץ ונסה/י שוב.",
    
    // Payment
    paymentTitle: "שיחה אחת. מחיר אחד.",
    paymentDescription: "את/ה לא קונה גישה. את/ה קונה תוצאה. ברגע שתשלם/י, הניתוח מתחיל. לא ניתן לבקש החזר כספי אחרי קבלת התוצאה.",
    paymentPrice: "₪69",
    paymentButton: "שלם/י ונתח/י",
    paymentSecure: "תשלום מאובטח • ללא מינוי • פעם אחת בלבד",
    
    // Processing
    processingTitle: "מנתח...",
    processingMessages: [
      "קורא מבנה שיחה...",
      "מזהה דפוסים...",
      "מחלץ דינמיקות...",
      "מכין תוצאה..."
    ],
    
    // Result
    resultTitle: "מה קרה",
    resultSections: [
      {
        title: "דינמיקות כוח",
        description: "מי הוביל. מי עקב. מי חיכה."
      },
      {
        title: "השקעה רגשית",
        description: "למי זה היה יותר חשוב."
      },
      {
        title: "זיהוי דפוסים",
        description: "מה חזר על עצמו. מה השתנה. מה אף פעם לא הגיע."
      },
      {
        title: "מה שלא נאמר",
        description: "ממה התחמקו. מה נרמז. מה ידעו אבל לא דיברו עליו."
      }
    ],
    
    // End
    endMessage: "התוצאה הזו לא תישמר. צלם/י מסך אם את/ה צריך/ה.",
    endClosing: "אין היסטוריה. אין חשבון. השיחה הזו אף פעם לא קרתה פה.",
    
    // Common
    loading: "טוען...",
    error: "אירעה שגיאה",
    back: "חזרה",
    continue: "המשך",
  }
};
