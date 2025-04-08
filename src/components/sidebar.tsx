"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Brain, 
  Clock, 
  Music, 
  Layers, 
  Bot, 
  Calculator, 
  FileText, 
  Calendar, 
  ChevronLeft, 
  Blocks, 
  BarChart3, 
  GraduationCap, 
  PanelLeft,
} from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  compact: boolean;
  active?: boolean;
}

export function Sidebar() {
  const [compactSidebar, setCompactSidebar] = useState(false);
  const pathname = usePathname();
  
  // Check if sidebar state is stored in localStorage
  useEffect(() => {
    const storedState = localStorage.getItem("sidebarCompact");
    if (storedState) {
      setCompactSidebar(storedState === "true");
    }
  }, []);
  
  // Save sidebar state when it changes
  const toggleSidebar = () => {
    const newState = !compactSidebar;
    setCompactSidebar(newState);
    localStorage.setItem("sidebarCompact", String(newState));
  };

  return (
    <aside 
      className={`h-full border-r border-white/10 ${
        compactSidebar ? 'w-[68px]' : 'w-[220px]'
      } transition-all duration-300 bg-card/30 backdrop-blur-md flex flex-col shrink-0`}
    >
      <div className="p-4 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          <Brain size={24} className="text-primary animate-pulse-slow" />
          {!compactSidebar && <h1 className="mt-2 text-lg font-bold gradient-text font-manjari">lucidflow</h1>}
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="h-6 w-6 rounded-full opacity-70 hover:opacity-100"
        >
          <PanelLeft size={14} className={`transition-transform duration-200 ${compactSidebar ? 'rotate-180' : ''}`} />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-3">
        <nav className="space-y-0.5 px-2">
          <NavItem href="/dashboard" icon={<Blocks />} label="Dashboard" compact={compactSidebar} active={pathname === "/dashboard"} />
          <NavItem href="/tools/timer" icon={<Clock />} label="Focus Timer" compact={compactSidebar} active={pathname === "/tools/timer"} />
          <NavItem href="/tools/tasks" icon={<Layers />} label="Study Tasks" compact={compactSidebar} active={pathname === "/tools/tasks"} />
          <NavItem href="/tools/ai-assistant" icon={<Bot />} label="AI Assistant" compact={compactSidebar} active={pathname === "/tools/ai-assistant"} />
          <NavItem href="/tools/notes" icon={<FileText />} label="Notes" compact={compactSidebar} active={pathname === "/tools/notes"} />
          <NavItem href="/tools/planner" icon={<Calendar />} label="Planner" compact={compactSidebar} active={pathname === "/tools/planner"} />
          <NavItem href="/tools/music" icon={<Music />} label="Study Music" compact={compactSidebar} active={pathname === "/tools/music"} />
          <NavItem href="/tools/calculator" icon={<Calculator />} label="Calculator" compact={compactSidebar} active={pathname === "/tools/calculator"} />
          <NavItem href="/tools" icon={<Blocks />} label="More Tools" compact={compactSidebar} active={pathname === "/tools"} />
          
          <div className="pt-3 pb-1">
            {!compactSidebar && <div className="px-3 text-xs font-semibold text-foreground/40 uppercase tracking-wider">Insights</div>}
            <div className={compactSidebar ? 'border-t border-white/10 my-2' : ''}></div>
          </div>
          
          <NavItem href="/stats" icon={<BarChart3 />} label="Statistics" compact={compactSidebar} active={pathname === "/stats"} />
          <NavItem href="/progress" icon={<GraduationCap />} label="Progress" compact={compactSidebar} active={pathname === "/progress"} />
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
  );
}

function NavItem({ href, icon, label, compact, active = false }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors group ${
        active 
          ? 'bg-primary/10 text-primary' 
          : 'hover:bg-background/40 text-foreground/80 hover:text-foreground'
      }`}
    >
      <div className={active ? "text-primary" : "text-primary/70 group-hover:text-primary"}>
        {icon}
      </div>
      {!compact && <span>{label}</span>}
    </Link>
  )
} 