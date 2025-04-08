"use client";

import { Card, CardContent } from "@/components/ui/card";
import { 
  Clock, 
  Layers, 
  Bot, 
  FileText, 
  Calendar, 
  Music, 
  Calculator, 
  BookOpen, 
  BarChart3, 
  GraduationCap, 
  Blocks,
  Sparkles
} from "lucide-react";
import Link from "next/link";

export default function ToolsPage() {
  const tools = [
    { id: 'timer', name: 'Focus Timer', icon: <Clock />, description: 'Stay focused with the pomodoro technique' },
    { id: 'tasks', name: 'Study Tasks', icon: <Layers />, description: 'Organize your tasks with kanban boards' },
    { id: 'ai-assistant', name: 'AI Study Assistant', icon: <Bot />, description: 'Get help with any subject or concept' },
    { id: 'notes', name: 'Study Notes', icon: <FileText />, description: 'Take notes and organize your study materials' },
    { id: 'planner', name: 'Study Planner', icon: <Calendar />, description: 'Plan your study sessions and exams' },
    { id: 'music', name: 'Study Music', icon: <Music />, description: 'Focus with background music and sounds' },
    { id: 'calculator', name: 'Calculator', icon: <Calculator />, description: 'Solve math problems and equations' },
    { id: 'flashcards', name: 'Flashcards', icon: <BookOpen />, description: 'Study with interactive flashcards' },
    { id: 'statistics', name: 'Statistics', icon: <BarChart3 />, description: 'Track your study patterns and productivity' },
    { id: 'progress', name: 'Progress Tracker', icon: <GraduationCap />, description: 'Monitor your learning journey' },
  ];
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/15 text-primary mb-4">
          <Blocks size={14} className="mr-1" />
          <span className="text-sm">Study Tools</span>
        </div>
        <h1 className="text-3xl font-bold mb-3">Your Complete Study Toolkit</h1>
        <p className="text-foreground/70 max-w-lg mx-auto text-sm">
          Explore our comprehensive set of study tools designed to enhance your learning experience and productivity.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <Link 
            key={tool.id} 
            href={`/tools/${tool.id}`}
            className={`${
              tools.length % 3 === 1 && index === tools.length - 1 
                ? 'lg:col-start-2' 
                : ''
            }`}
          >
            <Card className="border-white/10 hover:border-primary/20 hover:bg-primary/5 transition-all cursor-pointer group h-full">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors text-primary">
                  {tool.icon}
                </div>
                <h2 className="text-lg font-medium mb-1">{tool.name}</h2>
                <p className="text-foreground/70 text-sm mb-4">{tool.description}</p>
                <div className="text-primary text-sm flex items-center font-medium mt-auto">
                  <Sparkles size={12} className="mr-1.5" />
                  Explore Tool
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      
      <div className="mt-12 text-center text-sm text-foreground/60">
        <p>
          Return to your <Link href="/dashboard" className="text-primary hover:underline">Dashboard</Link> to continue your study session
        </p>
      </div>
    </div>
  );
} 