"use client";

import { ChevronLeft, Brain, Gauge, Clock, Layers, Bot, FileText, Calendar, Music, Calculator as CalcIcon, Blocks, BarChart3, GraduationCap, PanelLeft } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ToolsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const toolName = pathname.split('/').pop();
  const [compactSidebar, setCompactSidebar] = useState(false);
  
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
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside className={`h-full border-r border-white/10 ${compactSidebar ? 'w-[68px]' : 'w-[220px]'} transition-all duration-300 bg-card/30 backdrop-blur-md flex flex-col shrink-0`}>
        <div className="p-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2">
            <Brain size={24} className="text-primary animate-pulse-slow" />
            {!compactSidebar && <h1 className="text-lg font-bold gradient-text font-manjari flex items-center translate-y-0.5">lucidflow</h1>}
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setCompactSidebar(!compactSidebar)}
            className="h-6 w-6 rounded-full opacity-70 hover:opacity-100 ml-1"
          >
            <PanelLeft size={14} className={`transition-transform duration-200 ${compactSidebar ? 'rotate-180' : ''}`} />
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-3">
          <nav className="space-y-0.5 px-2">
            <NavItem href="/dashboard" icon={<Gauge />} label="Dashboard" compact={compactSidebar} />
            <NavItem href="/tools/timer" icon={<Clock />} label="Focus Timer" compact={compactSidebar} />
            <NavItem href="/tools/tasks" icon={<Layers />} label="Study Tasks" compact={compactSidebar} />
            <NavItem href="/tools/ai-assistant" icon={<Bot />} label="AI Assistant" compact={compactSidebar} />
            <NavItem href="/tools/notes" icon={<FileText />} label="Notes" compact={compactSidebar} />
            <NavItem href="/tools/planner" icon={<Calendar />} label="Planner" compact={compactSidebar} />
            <NavItem href="/tools/music" icon={<Music />} label="Study Music" compact={compactSidebar} />
            <NavItem href="/tools/calculator" icon={<CalcIcon />} label="Calculator" compact={compactSidebar} />
            <NavItem href="/tools" icon={<Blocks />} label="More Tools" compact={compactSidebar} />
            
            <div className="pt-3 pb-1">
              {!compactSidebar && <div className="px-3 text-xs font-semibold text-foreground/40 uppercase tracking-wider">Insights</div>}
              <div className={compactSidebar ? 'border-t border-white/10 my-2' : ''}></div>
            </div>
            
            <NavItem href="/tools/statistics" icon={<BarChart3 />} label="Statistics" compact={compactSidebar} />
            <NavItem href="/tools/progress" icon={<GraduationCap />} label="Progress" compact={compactSidebar} />
          </nav>
        </div>
        
        <div className="p-3 border-t border-white/10 flex items-center justify-between">
          <Link href="/" className={`flex items-center gap-2 text-xs opacity-70 hover:opacity-100 transition-opacity ${compactSidebar ? 'justify-center w-full' : ''}`}>
            <ChevronLeft size={14} />
            {!compactSidebar && <span>Back to Home</span>}
          </Link>
          {!compactSidebar && <ModeToggle />}
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
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

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          <main className="max-w-full p-4 md:p-5">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

// Navigation Item Component
function NavItem({ href, icon, label, compact }: { 
  href: string, 
  icon: React.ReactNode, 
  label: string,
  compact: boolean
}) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);
  
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors group
        ${isActive 
          ? 'bg-primary/10 text-foreground'
          : 'hover:bg-background/40 text-foreground/70 hover:text-foreground'}
      `}
    >
      <div className={`${isActive ? 'text-primary' : 'text-primary/70 group-hover:text-primary'}`}>
        {icon}
      </div>
      {!compact && <span>{label}</span>}
    </Link>
  )
} 