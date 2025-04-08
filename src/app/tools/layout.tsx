"use client";

import { ChevronLeft, Gauge, Clock, Layers, Bot, FileText, Calendar, Music, Calculator as CalcIcon, Blocks, BarChart3, GraduationCap } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/sidebar";

export default function ToolsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const toolName = pathname.split('/').pop();
  
  const toolNames: Record<string, string> = {
    'timer': 'Focus Timer',
    'tasks': 'Study Tasks',
    'ai-assistant': 'AI Study Assistant',
    'notes': 'Study Notes',
    'planner': 'Study Planner',
    'music': 'Study Music',
    'calculator': 'Calculator',
    'flashcards': 'Flashcards',
    'statistics': 'Statistics',
    'progress': 'Progress Tracker',
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-background/10 backdrop-blur-xl border-b border-white/10 z-10 shrink-0">
          <div className="max-w-full h-12 px-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <h1 className="text-base font-medium">
                {toolNames[toolName || ''] || 'Study Tool'}
              </h1>
            </div>
            <div className="md:hidden">
              <ModeToggle />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          <main className="max-w-full p-4 md:p-5">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
} 