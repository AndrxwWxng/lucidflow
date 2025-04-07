"use client"

import { useState } from 'react'
import { Button } from '../ui/button'
import { SendHorizontal } from 'lucide-react'

export function AiTutorChat() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const newMessages = [
      ...messages,
      { role: 'user' as const, content: input }
    ]
    setMessages(newMessages)
    setInput('')

    // TODO: Implement Groq API call
  }

  return (
    <div className="glass-effect flex flex-col h-[600px] rounded-lg">
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((message, i) => (
          <div
            key={i}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'glass-effect'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="border-t border-border/50 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your question..."
            className="flex-1 rounded-md bg-secondary px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <Button type="submit" size="icon">
            <SendHorizontal size={18} />
          </Button>
        </div>
      </form>
    </div>
  )
}