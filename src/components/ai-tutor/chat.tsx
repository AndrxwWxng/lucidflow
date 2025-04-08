"use client"

import { useState } from 'react'
import { Button } from '../ui/button'
import { SendHorizontal, Loader2 } from 'lucide-react'

export function AiTutorChat() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    
    const userMessage = { role: 'user' as const, content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: 'You are a helpful AI tutor. Keep your responses clear and concise, using 2-3 sentences at most. Break down complex topics into simple points.'
            },
            ...messages,
            userMessage
          ]
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: data.content }
      ]);
    } catch (error) {
      console.error('Failed to get response:', error);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="minimalist-card flex flex-col h-[600px] rounded-lg overflow-hidden">
      <div className="flex-1 overflow-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-secondary">
        {messages.length === 0 && (
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-foreground/60 max-w-xs">
              <div className="mb-2 mx-auto w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Loader2 className="h-5 w-5 text-primary animate-spin-slow" />
              </div>
              <p className="text-sm">Ask any question to get started with your AI study assistant.</p>
            </div>
          </div>
        )}
        {messages.map((message, i) => (
          <div
            key={i}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in animation-delay-${i * 100}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'minimalist-card'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-fade-in">
            <div className="minimalist-card rounded-lg p-3">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="border-t border-border/50 p-4 bg-background/20 backdrop-blur-sm">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your question..."
            className="flex-1 rounded-md bg-background/30 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading} className="rounded-md bg-primary hover:bg-primary/90">
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <SendHorizontal size={18} />
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}