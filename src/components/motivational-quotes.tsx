"use client"

import { useState, useEffect } from 'react'
import { Quote, RefreshCw, Leaf } from 'lucide-react'
import { Button } from './ui/button'

interface QuoteType {
  text: string;
  author: string;
}

const quotes: QuoteType[] = [
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain"
  },
  {
    text: "It always seems impossible until it's done.",
    author: "Nelson Mandela"
  },
  {
    text: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson"
  },
  {
    text: "The future depends on what you do today.",
    author: "Mahatma Gandhi"
  },
  {
    text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    text: "Learning is not attained by chance, it must be sought for with ardor and diligence.",
    author: "Abigail Adams"
  },
  {
    text: "Education is the most powerful weapon which you can use to change the world.",
    author: "Nelson Mandela"
  },
  {
    text: "The beautiful thing about learning is that nobody can take it away from you.",
    author: "B.B. King"
  },
  {
    text: "The mind is not a vessel to be filled, but a fire to be kindled.",
    author: "Plutarch"
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt"
  },
  {
    text: "Your time is limited, don't waste it living someone else's life.",
    author: "Steve Jobs"
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  }
];

// Nature background gradients
const backgrounds = [
  "bg-gradient-to-br from-green-500/20 to-emerald-700/30",
  "bg-gradient-to-br from-blue-500/20 to-cyan-700/30",
  "bg-gradient-to-br from-indigo-500/20 to-purple-700/30",
  "bg-gradient-to-br from-amber-500/20 to-orange-700/30",
  "bg-gradient-to-br from-pink-500/20 to-rose-700/30",
];

export function MotivationalQuotes() {
  const [quote, setQuote] = useState<QuoteType | null>(null);
  const [background, setBackground] = useState('');
  
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomBgIndex = Math.floor(Math.random() * backgrounds.length);
    setQuote(quotes[randomIndex]);
    setBackground(backgrounds[randomBgIndex]);
  };
  
  useEffect(() => {
    getRandomQuote();
    
    // Refresh quote every 30 minutes
    const interval = setInterval(() => {
      getRandomQuote();
    }, 30 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  if (!quote) return null;
  
  return (
    <div className={`rounded-xl p-4 h-full flex flex-col relative overflow-hidden motion-safe:animate-fade-in minimalist-card ${background}`}>
      {/* Nature-inspired decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
      
      <div className="flex justify-between items-start mb-4 z-10">
        <h2 className="text-base font-medium flex items-center gap-2">
          <Leaf size={16} className="text-primary" />
          <span>Daily Inspiration</span>
        </h2>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={getRandomQuote}
          className="h-7 w-7 rounded-full text-primary/70 hover:text-primary bg-white/10 hover:bg-white/20"
        >
          <RefreshCw size={12} />
        </Button>
      </div>
      
      <div className="flex-1 flex flex-col justify-center z-10">
        <div className="text-primary mb-1">
          <Quote size={18} />
        </div>
        <p className="text-foreground/90 text-sm md:text-base font-medium italic mb-3">
          {quote.text}
        </p>
        <p className="text-xs md:text-sm text-foreground/70 self-end">
          — {quote.author}
        </p>
      </div>
      
      <div className="mt-auto pt-4 text-xs text-foreground/60 flex items-center gap-1 z-10">
        <Leaf size={12} className="text-primary" />
        <span>Focus on your growth today</span>
      </div>
    </div>
  );
} 