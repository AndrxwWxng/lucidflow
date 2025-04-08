import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groqApiKey = process.env.GROQ_API_KEY;

if (!groqApiKey) {
  console.error('GROQ_API_KEY is not set in environment variables.');
}

const groq = groqApiKey ? new Groq({ apiKey: groqApiKey }) : null;

const AI_MODEL = 'llama3-8b-8192';

export async function POST(request: Request) {
  if (!groq) {
    return NextResponse.json(
      { error: 'Groq API key not configured' },
      { status: 500 }
    );
  }

  try {
    const data = await request.json();
    const { messages } = data;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Invalid request format: messages are required' },
        { status: 400 }
      );
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: messages,
      model: AI_MODEL,
      temperature: 0.7,
      max_tokens: 150,
      top_p: 1,
      stream: false,
    });

    const aiResponseContent =
      chatCompletion.choices[0]?.message?.content ||
      'Sorry, I could not generate a response.';

    return NextResponse.json({ content: aiResponseContent });
  } catch (error: any) {
    console.error('Error processing chat request with Groq:', error);
    const errorMessage = error?.error?.message || 'Internal server error';
    const errorStatus = error?.status || 500;

    return NextResponse.json(
      { error: `Failed to get response from AI: ${errorMessage}` },
      { status: errorStatus }
    );
  }
}
