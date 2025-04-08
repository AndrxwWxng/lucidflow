import { NextResponse } from 'next/server';

// Mock AI responses for different types of questions
const responses = {
  math: [
    "The derivative of f(x) = x² is f'(x) = 2x. This means the rate of change is proportional to x.",
    "To solve this equation, try isolating the variable first, then apply the appropriate operation to both sides.",
    "The quadratic formula is x = (-b ± √(b² - 4ac)) / 2a. Use it when you have an equation in the form ax² + bx + c = 0."
  ],
  physics: [
    "Newton's Second Law states that force equals mass times acceleration (F = ma).",
    "Kinetic energy is calculated using the formula KE = ½mv². It represents energy of motion.",
    "The conservation of energy principle states that energy cannot be created or destroyed, only transferred or converted."
  ],
  history: [
    "The Renaissance period marked a cultural rebirth in Europe between the 14th and 17th centuries.",
    "The Industrial Revolution began in Great Britain in the late 18th century and transformed manufacturing processes.",
    "World War I lasted from 1914 to 1918 and involved major global powers in an unprecedented conflict."
  ],
  literature: [
    "Shakespeare's plays often explore themes of love, power, betrayal, and human nature.",
    "Symbolism in literature uses objects, characters, or settings to represent abstract ideas or concepts.",
    "The Hero's Journey is a common narrative structure found in many stories across cultures."
  ],
  general: [
    "That's an interesting question. Let me help you understand this concept step by step.",
    "Great question! Breaking this down into simpler parts will make it easier to grasp.",
    "I'd approach this by first understanding the fundamentals, then building upon them.",
    "Let's think about this methodically to find the best approach.",
    "There are several ways to look at this problem. Let's explore the most effective one."
  ]
};

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { messages } = data;
    
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
    }
    
    // Get the last user message
    const userMessage = messages.filter(m => m.role === 'user').pop();
    
    if (!userMessage) {
      return NextResponse.json(
        { error: 'No user message found' },
        { status: 400 }
      );
    }
    
    // Determine the category based on message content
    let category = 'general';
    const content = userMessage.content.toLowerCase();
    
    if (content.includes('math') || content.includes('equation') || content.includes('calculus') || content.includes('algebra')) {
      category = 'math';
    } else if (content.includes('physics') || content.includes('force') || content.includes('energy') || content.includes('motion')) {
      category = 'physics';
    } else if (content.includes('history') || content.includes('war') || content.includes('century') || content.includes('revolution')) {
      category = 'history';
    } else if (content.includes('literature') || content.includes('book') || content.includes('novel') || content.includes('shakespeare')) {
      category = 'literature';
    }
    
    // Get a random response from the category
    const responseList = responses[category as keyof typeof responses];
    const randomResponse = responseList[Math.floor(Math.random() * responseList.length)];
    
    // Add a small delay to simulate thinking
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return NextResponse.json({ content: randomResponse });
  } catch (error) {
    console.error('Error processing chat request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}