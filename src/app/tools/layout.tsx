"use client";

import { ChevronLeft, Brain } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { usePathname } from "next/navigation";

export default function ToolsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const toolName = pathname.split('/').pop();
  
  // Map path to human-readable tool names
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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10 bg-background/30 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors">
              <ChevronLeft size={18} />
              <span>Back to Dashboard</span>
            </Link>
            <span className="text-foreground/30 mx-2">|</span>
            <div className="flex items-center gap-2">
              <Brain size={18} className="text-primary" />
              <h1 className="text-lg font-medium">
                {toolNames[toolName || ''] || 'Study Tool'}
              </h1>
            </div>
          </div>
          <ModeToggle />
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-4 bg-background/30 backdrop-blur-xl">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-sm text-foreground/50">
            LucidFlow Study Dashboard
          </div>
          <div className="text-sm text-foreground/50">
            <Link href="/dashboard" className="hover:text-primary transition-colors">
              Return to Dashboard
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
} 