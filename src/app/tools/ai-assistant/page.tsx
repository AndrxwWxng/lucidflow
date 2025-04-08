"use client";

import { useState, useEffect } from "react";
import { AiTutorChat } from "@/components/ai-tutor/chat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Bot, 
  Brain, 
  FileQuestion, 
  BookOpen, 
  Lightbulb, 
  Clock, 
  History, 
  Save,
  MessageSquare,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";

interface ChatSession {
  id: string;
  title: string;
  date: string;
  time: string;
  messages: any[];
}

export default function AiAssistantPage() {
  const [recentChats, setRecentChats] = useState<ChatSession[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [isNewChat, setIsNewChat] = useState(true);

  const suggestedPrompts = [
    "Explain the concept of quantum entanglement in simple terms",
    "Help me solve this calculus problem: ∫(x²+2x+1)dx",
    "What are the key themes in Shakespeare's Macbeth?",
    "Create a study plan for my biology exam next week",
    "Compare and contrast photosynthesis and cellular respiration",
  ];
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const savedChats = localStorage.getItem('aiAssistantChats');
    if (savedChats) {
      try {
        const parsedChats = JSON.parse(savedChats);
        setRecentChats(parsedChats);
        if (parsedChats.length > 0 && !activeChat) {
          setActiveChat(parsedChats[0].id);
          setIsNewChat(false);
        }
      } catch (e) {
        console.error("Failed to parse saved chats:", e);
      }
    }
  }, [activeChat]);

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  const createNewChat = () => {
    if (typeof window === 'undefined') return;
    
    const date = new Date();
    const newChat: ChatSession = {
      id: Date.now().toString(),
      title: "New Chat",
      date: formatDate(date),
      time: formatTime(date),
      messages: []
    };
    
    const updatedChats = [newChat, ...recentChats];
    setRecentChats(updatedChats);
    setActiveChat(newChat.id);
    setIsNewChat(true);
    localStorage.setItem('aiAssistantChats', JSON.stringify(updatedChats));
  };

  const saveChat = (title: string = "Saved Chat") => {
    if (!activeChat || typeof window === 'undefined') return;
    
    const updatedChats = recentChats.map(chat => 
      chat.id === activeChat ? { ...chat, title } : chat
    );
    
    setRecentChats(updatedChats);
    localStorage.setItem('aiAssistantChats', JSON.stringify(updatedChats));
  };

  const selectChat = (chatId: string) => {
    setActiveChat(chatId);
    setIsNewChat(false);
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Bot className="text-primary" />
            AI Study Assistant
          </h2>
          <p className="text-foreground/60 mt-1">
            Your personal tutor to help with any subject or concept
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" className="gap-1" onClick={() => saveChat(`Chat ${recentChats.length + 1}`)}>
            <Save size={16} />
            Save Chat
          </Button>
          <Button className="gap-1" onClick={createNewChat}>
            <Plus size={16} />
            New Chat
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="space-y-6">
          <Card className="border-white/10">
            <CardHeader>
              <CardTitle className="text-base">Learning Modes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start gap-2">
                <BookOpen size={16} className="text-primary" />
                Explain Concepts
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <FileQuestion size={16} className="text-blue-500" />
                Problem Solving
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Brain size={16} className="text-purple-500" />
                Quiz Me
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Lightbulb size={16} className="text-yellow-500" />
                Study Tips
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border-white/10">
            <CardHeader className="flex flex-row items-center justify-between py-4">
              <CardTitle className="text-base">Recent Chats</CardTitle>
              <Button variant="ghost" size="icon" onClick={createNewChat} className="h-7 w-7">
                <Plus size={14} />
              </Button>
            </CardHeader>
            <CardContent className="space-y-2 max-h-[300px] overflow-y-auto">
              {recentChats.length === 0 ? (
                <div className="text-sm text-foreground/60 text-center py-2">
                  No recent chats
                </div>
              ) : (
                recentChats.map((chat) => (
                  <div 
                    key={chat.id} 
                    className={`p-2 hover:bg-background/50 rounded-md cursor-pointer transition-colors ${activeChat === chat.id ? 'bg-primary/10' : ''}`}
                    onClick={() => selectChat(chat.id)}
                  >
                    <div className="font-medium text-sm">{chat.title}</div>
                    <div className="text-xs text-foreground/60 flex items-center gap-2">
                      <Clock size={12} />
                      {chat.date} at {chat.time}
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-3">
          <Tabs defaultValue="chat">
            <TabsList className="mb-4">
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="prompts">Suggested Prompts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat" className="space-y-4">
              <Card className="border-white/10">
                <CardContent className="p-0">
                  <div className="h-[600px]">
                    <AiTutorChat 
                      isNewChat={isNewChat} 
                      activeChatId={activeChat} 
                      onSaveChat={(title: string) => saveChat(title)} 
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="prompts">
              <Card className="border-white/10">
                <CardHeader>
                  <CardTitle className="text-base">Try These Prompts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {suggestedPrompts.map((prompt, index) => (
                    <div 
                      key={index} 
                      className="p-3 border border-white/10 rounded-md hover:bg-primary/5 cursor-pointer transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <Brain size={18} className="text-primary mt-0.5" />
                        <div>{prompt}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
} 