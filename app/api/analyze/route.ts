import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

interface AnalysisRequest {
  conversation: string;
  language: 'en' | 'he';
}

interface AnalysisResult {
  powerDynamics: {
    leader: string;
    follower: string;
    analysis: string;
  };
  emotionalInvestment: {
    moreInvested: string;
    analysis: string;
  };
  patterns: {
    repeated: string;
    changed: string;
    neverCame: string;
  };
  unsaid: {
    avoided: string;
    implied: string;
    known: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const { conversation, language } = await request.json() as AnalysisRequest;

    if (!conversation) {
      return NextResponse.json(
        { error: 'No conversation provided' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      );
    }

    // Prepare the analysis prompt
    const systemPrompt = language === 'he'
      ? `אתה מנתח מערכות יחסים מומחה עם הבנה עמוקה של דפוסי תקשורת אנושית, דינמיקות כוח והשקעה רגשית. אתה מנתח שיחות וואטסאפ כדי לחשוף דפוסים, דינמיקות ואמיתות לא מדוברות.

הניתוח שלך חייב להיות:
- חד ישיר
- מבוסס על דפוסים ניתנים לצפייה בטקסט
- כתוב כעובדות, לא עצות
- קצר ומשפיע
- אינטליגנטי רגשית אבל לא טיפולי

החזר את הניתוח שלך כאובייקט JSON עם המבנה המדויק הזה (בעברית):
{
  "powerDynamics": {
    "leader": "שם האדם שמוביל",
    "follower": "שם האדם שעוקב",
    "analysis": "2-3 משפטים על מי יוזם, קובע קצב, שולט בנושאים"
  },
  "emotionalInvestment": {
    "moreInvested": "שם האדם שיותר מושקע",
    "analysis": "2-3 משפטים על למי זה חשוב יותר, מבוסס על דפוסי תגובה"
  },
  "patterns": {
    "repeated": "אילו דפוסי שיחה חוזרים",
    "changed": "איך הדינמיקה התפתחה לאורך זמן",
    "neverCame": "מה נדון אבל לא התממש"
  },
  "unsaid": {
    "avoided": "נושאים שהוימנעו מהם בבירור",
    "implied": "מה נרמז אבל לא נאמר",
    "known": "מה שני הצדדים ידעו אבל לא דיברו עליו"
  }
}`
      : `You are an expert relationship analyst with deep understanding of human communication patterns, power dynamics, and emotional investment. You analyze WhatsApp conversations to reveal underlying patterns, dynamics, and unspoken truths.

Your analysis MUST be:
- Sharp and direct
- Based on observable patterns in the text
- Written as statements of fact, not advice
- Short and impactful
- Emotionally intelligent but not therapeutic
- Written in ENGLISH ONLY

Return your analysis as a JSON object with this exact structure (ALL text must be in English):
{
  "powerDynamics": {
    "leader": "Name of person who leads",
    "follower": "Name of person who follows",
    "analysis": "2-3 sentences about who initiates, sets pace, controls topics"
  },
  "emotionalInvestment": {
    "moreInvested": "Name of person more invested",
    "analysis": "2-3 sentences about who needs this more, based on response patterns"
  },
  "patterns": {
    "repeated": "What conversation patterns repeat",
    "changed": "How the dynamic evolved over time",
    "neverCame": "What was discussed but never materialized"
  },
  "unsaid": {
    "avoided": "Topics that were clearly avoided",
    "implied": "What was implied but not stated",
    "known": "What both parties knew but didn't discuss"
  }
}`;

    const userPrompt = language === 'he' 
      ? `נתח את שיחת הוואטסאפ הבאה. חשוב מאוד: כתוב את כל התשובה בעברית בלבד.\n\nשיחה:\n${conversation}`
      : `Analyze the following WhatsApp conversation. IMPORTANT: Write the entire response in English only. Do not use any other language.\n\nConversation:\n${conversation}`;

    const fullPrompt = `${systemPrompt}\n\n${userPrompt}`;

    // Call Google Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: fullPrompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 8192
          }
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('Gemini API error:', error);
      return NextResponse.json(
        { error: 'Analysis failed' },
        { status: 500 }
      );
    }

    const data = await response.json();
    let generatedText = data.candidates[0].content.parts[0].text;
    
    // Remove markdown code blocks if present
    generatedText = generatedText.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
    
    const result = JSON.parse(generatedText) as AnalysisResult;

    return NextResponse.json(result);

  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
