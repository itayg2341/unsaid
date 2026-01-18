import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

interface TranslateRequest {
  result: any;
  targetLanguage: 'en' | 'he';
}

export async function POST(request: NextRequest) {
  try {
    const { result, targetLanguage } = await request.json() as TranslateRequest;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      );
    }

    const prompt = targetLanguage === 'he'
      ? `Translate the following relationship analysis JSON to Hebrew. Keep the exact same JSON structure, only translate the text values. Be natural and human in Hebrew.\n\n${JSON.stringify(result, null, 2)}`
      : `Translate the following relationship analysis JSON to English. Keep the exact same JSON structure, only translate the text values. Be natural and human in English.\n\n${JSON.stringify(result, null, 2)}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 4096
          }
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('Translation API error:', error);
      return NextResponse.json(
        { error: 'Translation failed' },
        { status: 500 }
      );
    }

    const data = await response.json();
    let generatedText = data.candidates[0].content.parts[0].text;
    
    // Remove markdown code blocks if present
    generatedText = generatedText.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
    
    const translatedResult = JSON.parse(generatedText);

    return NextResponse.json(translatedResult);

  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
