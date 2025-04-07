import { Groq } from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body;
    
    const groq = new Groq({ 
      apiKey: process.env.GROQ_API_KEY
    });

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful AI tutor. Explain concepts clearly and concisely, using examples when helpful. Break down complex topics into simpler parts."
        },
        ...messages
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 2048,
    });

    return NextResponse.json(completion.choices[0]?.message || { content: "Sorry, I couldn't generate a response." });
  } catch (error) {
    console.error('Failed to get response:', error);
    return NextResponse.json(
      { error: 'Failed to process your request' },
      { status: 500 }
    );
  }
}