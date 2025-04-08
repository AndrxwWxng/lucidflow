"use client";

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
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";

export default function AiAssistantPage() {
  // Sample chat history and suggested prompts
  const recentChats = [
    { title: "Math Problem Help", date: "Today", time: "10:35 AM" },
    { title: "Physics Concepts", date: "Yesterday", time: "2:14 PM" },
    { title: "Essay Structure", date: "Apr 5", time: "4:22 PM" },
  ];

  const suggestedPrompts = [
    "Explain the concept of quantum entanglement in simple terms",
    "Help me solve this calculus problem: ∫(x²+2x+1)dx",
    "What are the key themes in Shakespeare's Macbeth?",
    "Create a study plan for my biology exam next week",
    "Compare and contrast photosynthesis and cellular respiration",
  ];
  
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
          <Button variant="outline" className="gap-1">
            <History size={16} />
            View History
          </Button>
          <Button variant="outline" className="gap-1">
            <Save size={16} />
            Save Chat
          </Button>
          <Button className="gap-1">
            <MessageSquare size={16} />
            New Chat
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
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
            <CardHeader>
              <CardTitle className="text-base">Recent Chats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {recentChats.map((chat, index) => (
                <div key={index} className="p-2 hover:bg-background/50 rounded-md cursor-pointer">
                  <div className="font-medium text-sm">{chat.title}</div>
                  <div className="text-xs text-foreground/60 flex items-center gap-2">
                    <Clock size={12} />
                    {chat.date} at {chat.time}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        
        {/* Main Chat Area */}
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
                    <AiTutorChat />
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