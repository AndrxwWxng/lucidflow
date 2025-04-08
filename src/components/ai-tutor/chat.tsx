"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '../ui/button';
import { SendHorizontal, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface Chat {
  id: string;
  title: string;
  date: string;
  time: string;
  messages: Message[];
}

interface AiTutorChatProps {
  isNewChat?: boolean;
  activeChatId?: string | null;
  onNewChatCreated?: (chatData: Omit<Chat, 'id'>) => string;
  onChatUpdated?: (chatId: string, updatedMessages: Message[]) => void;
}

export function AiTutorChat({
  isNewChat = true,
  activeChatId = null,
  onNewChatCreated,
  onChatUpdated,
}: AiTutorChatProps) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentChatId, setCurrentChatId] = useState(activeChatId);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    if (messages.length > 1) {
      scrollToBottom('smooth');
    }
  }, [messages]);

  useEffect(() => {
    setCurrentChatId(activeChatId);
    let initialMessages: Message[] = [];

    if (typeof window === 'undefined') return;

    if (activeChatId && !isNewChat) {
      const savedChats: Chat[] = JSON.parse(
        localStorage.getItem('aiAssistantChats') || '[]'
      );
      const currentChat = savedChats.find((chat) => chat.id === activeChatId);
      initialMessages = currentChat?.messages || [];
      setMessages(initialMessages);
    } else {
      const welcomeMessage: Message = {
        role: 'assistant',
        content:
          "Hi there! I'm your AI Assistant. How can I help you today?",
      };
      initialMessages = [welcomeMessage];
      setMessages(initialMessages);
    }
    setInput('');

    setTimeout(() => scrollToBottom('auto'), 0);

  }, [activeChatId, isNewChat]);

  const saveChatHistory = useCallback(
    (chatId: string, updatedMessages: Message[]) => {
      if (typeof window === 'undefined' || !chatId) return;

      const savedChats: Chat[] = JSON.parse(
        localStorage.getItem('aiAssistantChats') || '[]'
      );
      const chatIndex = savedChats.findIndex((chat) => chat.id === chatId);

      let updatedChats: Chat[];
      let chatToSave: Chat;

      if (chatIndex >= 0) {
        chatToSave = {
          ...savedChats[chatIndex],
          messages: updatedMessages,
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        };
        updatedChats = [...savedChats];
        updatedChats[chatIndex] = chatToSave;
      } else {
        console.warn(
          'Attempted to save to a non-existent chat ID:',
          chatId
        );
        const title =
          updatedMessages.find((m) => m.role === 'user')?.content.slice(0, 30) +
            '...' || 'New Chat';
        chatToSave = {
          id: chatId,
          title: title,
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          messages: updatedMessages,
        };
        updatedChats = [chatToSave, ...savedChats];
      }

      localStorage.setItem('aiAssistantChats', JSON.stringify(updatedChats));

      if (onChatUpdated) {
        onChatUpdated(chatId, updatedMessages);
      }
    },
    [onChatUpdated]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    const newMessages: Message[] = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    const systemPrompt: Message = {
      role: 'system',
      content:
        'You are a helpful AI assistant. Keep your responses clear and concise, using 2-4 sentences. Break down complex topics into simple points. Use LaTeX for math notation where appropriate (e.g., \\( E = mc^2 \\) or $$ \\sum_{i=1}^{n} i = \\frac{n(n+1)}{2} $$).',
    };

    const messagesForApi = [
      systemPrompt,
      ...newMessages.filter((m) => m.role !== 'system'),
    ];

    let tempChatId = currentChatId;
    let chatCreated = false;

    try {
      if (isNewChat && onNewChatCreated && !currentChatId) {
        const title =
          userMessage.content.slice(0, 30) +
          (userMessage.content.length > 30 ? '...' : '');
        const newChatData = {
          title: title,
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          messages: newMessages,
        };
        tempChatId = onNewChatCreated(newChatData);
        setCurrentChatId(tempChatId);
        chatCreated = true;
      }

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: messagesForApi }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorData.error || 'Unknown API error'}`
        );
      }

      const data = await response.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.content,
      };

      const finalMessages = [...newMessages, assistantMessage];
      setMessages(finalMessages);

      if (tempChatId) {
        saveChatHistory(tempChatId, finalMessages);
      } else if (!isNewChat) {
        console.error('Error: Cannot save chat, activeChatId is missing for existing chat.');
      }

    } catch (error) {
      console.error('Failed to get response:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred.';
      setMessages((prev) => [
        ...prev.filter(m => m !== userMessage),
        userMessage,
        {
          role: 'assistant',
          content: `Sorry, I encountered an error: ${errorMessage}. Please try again.`,
        },
      ]);
      if (chatCreated && tempChatId) {
         console.error("Chat creation initiated but API call failed.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="minimalist-card flex flex-col h-[600px] rounded-lg overflow-hidden border border-border/50">
      <div className="flex-1 overflow-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-secondary scrollbar-track-transparent">
        {messages.length === 0 && !isNewChat && !isLoading && (
          <div className="h-full flex items-center justify-center text-center text-foreground/60">
            <p>Loading chat history...</p>
          </div>
        )}
        {messages.map((message, i) =>
          message.role === 'user' || message.role === 'assistant' ? (
            <div
              key={i}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              } animate-fade-in`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 text-sm md:text-base break-words ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                {message.content.split(/(\\\(.*?\\\)|$$[\s\S]*?$$)/).map((part, index) => {
                  if (part.startsWith('\\(') && part.endsWith('\\)')) {
                    return <span key={index} className="font-mono text-blue-600 dark:text-blue-400">{part}</span>;
                  }
                  if (part.startsWith('$$') && part.endsWith('$$')) {
                    return <div key={index} className="font-mono text-blue-600 dark:text-blue-400 my-2 p-2 bg-background/50 rounded">{part}</div>;
                  }
                  return part;
                })}
              </div>
            </div>
          ) : null
        )}
        {isLoading && (
          <div className="flex justify-start animate-fade-in">
            <div className="bg-muted rounded-lg p-3">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="border-t border-border/50 p-3 md:p-4 bg-background/80 backdrop-blur-sm"
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 rounded-md bg-background/50 px-3 py-2 text-sm ring-offset-background border border-input placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isLoading}
            aria-label="Chat input"
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
            className="rounded-md"
            aria-label="Send message"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <SendHorizontal size={18} />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
