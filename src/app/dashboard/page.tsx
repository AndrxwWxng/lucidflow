"use client";
import { AiTutorChat } from "@/components/ai-tutor/chat";
import { KanbanBoard } from "@/components/kanban/board";
import { PomodoroTimer } from "@/components/pomodoro/timer";
import { ModeToggle } from "@/components/mode-toggle";
import { Settings } from "@/components/settings";
import { SpotifyPlayer } from "@/components/spotify-player";
import { Calculator } from "@/components/calculator";
import { StudyPlanner } from "@/components/study-planner";
import { Notes } from "@/components/notes"; 
import { StudyTools } from "@/components/study-tools";
import Link from "next/link";
import {
  Brain,
  Clock,
  Music,
  Layers,
  Bot,
  Calculator as CalcIcon,
  FileText,
  Calendar,
  ChevronLeft,
  BookOpen,
  Sparkles,
  Zap,
  Lightbulb,
  PanelLeft,
  Workflow,
  Blocks,
  Gauge,
  BarChart3,
  GraduationCap,
  Keyboard,
} from "lucide-react";
import { Flashcards } from "@/components/flashcards";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Dashboard() {
  const [compactSidebar, setCompactSidebar] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside className={`h-full border-r border-white/5 ${compactSidebar ? 'w-[70px]' : 'w-[240px]'} transition-all duration-300 bg-card/20 backdrop-blur-sm flex flex-col shrink-0`}>
        <div className="p-4 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-3">
            <Brain size={28} className="text-primary animate-pulse-glow" />
            {!compactSidebar && <h1 className="text-xl font-bold gradient-text">LucidFlow</h1>}
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setCompactSidebar(!compactSidebar)}
            className="h-7 w-7 rounded-full"
          >
            <PanelLeft size={16} className={compactSidebar ? 'rotate-180' : ''} />
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-2">
            <NavItem href="#dashboard" icon={<Gauge />} label="Dashboard" compact={compactSidebar} />
            <NavItem href="#timer" icon={<Clock />} label="Focus Timer" compact={compactSidebar} />
            <NavItem href="#tasks" icon={<Layers />} label="Study Tasks" compact={compactSidebar} />
            <NavItem href="#ai" icon={<Bot />} label="AI Assistant" compact={compactSidebar} />
            <NavItem href="#notes" icon={<FileText />} label="Notes" compact={compactSidebar} />
            <NavItem href="#planner" icon={<Calendar />} label="Planner" compact={compactSidebar} />
            <NavItem href="#music" icon={<Music />} label="Study Music" compact={compactSidebar} />
            <NavItem href="#calculator" icon={<CalcIcon />} label="Calculator" compact={compactSidebar} />
            <NavItem href="#tools" icon={<Blocks />} label="More Tools" compact={compactSidebar} />
            
            <div className="pt-4 pb-2">
              {!compactSidebar && <div className="px-3 text-xs font-semibold text-foreground/50 uppercase tracking-wider">Insights</div>}
              <div className={compactSidebar ? 'border-t border-white/5 my-2' : ''}></div>
            </div>
            
            <NavItem href="#stats" icon={<BarChart3 />} label="Statistics" compact={compactSidebar} />
            <NavItem href="#progress" icon={<GraduationCap />} label="Progress" compact={compactSidebar} />
          </nav>
        </div>
        
        <div className="p-4 border-t border-white/5 flex items-center justify-between">
          <Link href="/" className={`flex items-center gap-2 text-sm ${compactSidebar ? 'justify-center w-full' : ''}`}>
            <ChevronLeft size={16} />
            {!compactSidebar && <span>Back to Home</span>}
          </Link>
          {!compactSidebar && <ModeToggle />}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Modern header with blur effect */}
        <header className="bg-background/5 backdrop-blur-xl border-b border-white/5 z-10 shrink-0">
          <div className="max-w-full h-14 px-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <h1 id="dashboard" className="text-lg font-bold hidden md:block">Your Study Dashboard</h1>
              <div className="hidden lg:flex items-center ml-8 gap-1">
                <StudyTools />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center">
                <Lightbulb className="text-primary/60 w-4 h-4 mr-2" />
                <span className="text-sm text-foreground/60 italic">Focus on one task at a time</span>
              </div>
              <Keyboard className="text-foreground/40 hover:text-foreground/60 cursor-pointer" size={18} />
              <Settings />
              <div className="md:hidden">
                <ModeToggle />
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          <main className="max-w-full p-4 md:p-6">
            {/* Welcome Card with Stats */}
            <div className="mb-8 glass-card relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-300/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>
              <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row gap-6 justify-between">
                <div>
                  <span className="inline-flex items-center px-3 py-1 text-xs rounded-full bg-primary/20 text-primary mb-4">
                    <Sparkles size={12} className="mr-1" /> Dashboard
                  </span>
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome to your Study Space</h1>
                  <p className="text-foreground/70 mb-4 max-w-md">
                    Everything you need to optimize your learning in one place. Focus on what matters most.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                        <Clock size={16} className="text-primary" />
                      </div>
                      <div>
                        <div className="text-xs text-foreground/60">Focus Time</div>
                        <div className="font-semibold">25:00</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                        <Workflow size={16} className="text-primary" />
                      </div>
                      <div>
                        <div className="text-xs text-foreground/60">Sessions</div>
                        <div className="font-semibold">3 today</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                        <Zap size={16} className="text-primary" />
                      </div>
                      <div>
                        <div className="text-xs text-foreground/60">Productivity</div>
                        <div className="font-semibold">85%</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 items-start flex-wrap md:flex-nowrap">
                  <QuickAction icon={<Clock size={18} />} title="Timer" desc="Focus now" href="#timer" />
                  <QuickAction icon={<Bot size={18} />} title="AI Tutor" desc="Get help" href="#ai" />
                  <QuickAction icon={<Layers size={18} />} title="Tasks" desc="3 pending" href="#tasks" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div>
                <section id="timer" className="glass-card p-4 mb-6 motion-safe:animate-fade-in">
                  <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Clock size={18} className="text-primary" />
                    <span>Focus Timer</span>
                  </h2>
                  <PomodoroTimer />
                </section>

                <section id="music" className="glass-card p-4 mb-6 motion-safe:animate-fade-in animation-delay-300">
                  <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Music size={18} className="text-primary" />
                    <span>Study Music</span>
                  </h2>
                  <SpotifyPlayer />
                </section>

                <section id="calculator" className="glass-card p-4 motion-safe:animate-fade-in animation-delay-200">
                  <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <CalcIcon size={18} className="text-primary" />
                    <span>Calculator</span>
                  </h2>
                  <Calculator />
                </section>
              </div>

              {/* Middle Column */}
              <div className="lg:col-span-2">
                <section id="tasks" className="glass-card p-4 mb-6 motion-safe:animate-fade-in animation-delay-150">
                  <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Layers size={18} className="text-primary" />
                    <span>Study Tasks</span>
                  </h2>
                  <KanbanBoard />
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <section id="ai" className="glass-card p-4 motion-safe:animate-fade-in animation-delay-100">
                    <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Bot size={18} className="text-primary" />
                      <span>AI Study Assistant</span>
                    </h2>
                    <AiTutorChat />
                  </section>

                  <section id="notes" className="glass-card p-4 motion-safe:animate-fade-in animation-delay-350">
                    <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <FileText size={18} className="text-primary" />
                      <span>Study Notes</span>
                    </h2>
                    <Notes />
                  </section>
                </div>

                <section id="planner" className="glass-card p-4 mt-6 motion-safe:animate-fade-in animation-delay-250">
                  <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Calendar size={18} className="text-primary" />
                    <span>Study Planner</span>
                  </h2>
                  <StudyPlanner />
                </section>
              </div>
            </div>

            {/* Additional Tools Section */}
            <section id="tools" className="mt-8 glass-card p-6 motion-safe:animate-fade-in animation-delay-400">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Blocks size={20} className="text-primary mr-2" />
                <span>Additional Study Tools</span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="cursor-pointer">
                      <ToolCard icon={<BookOpen className="text-primary" />} name="Flashcards" />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>Flashcards</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                      <Flashcards />
                    </div>
                  </DialogContent>
                </Dialog>
                <ToolCard icon={<Zap className="text-primary" />} name="Quick Quiz" />
                <ToolCard icon={<Brain className="text-primary" />} name="Mind Map" />
                <ToolCard icon={<Lightbulb className="text-primary" />} name="Study Tips" />
                <ToolCard icon={<Bot className="text-primary" />} name="AI Tutor Pro" />
                <ToolCard icon={<Calendar className="text-primary" />} name="Exam Scheduler" />
                <ToolCard icon={<FileText className="text-primary" />} name="PDF Viewer" />
                <ToolCard icon={<Workflow className="text-primary" />} name="Study Flow" />
                <ToolCard icon={<GraduationCap className="text-primary" />} name="Resources" />
                <ToolCard icon={<BarChart3 className="text-primary" />} name="Analytics" />
                <ToolCard icon={<Keyboard className="text-primary" />} name="Shortcuts" />
                <ToolCard icon={<Clock className="text-primary" />} name="Time Tracker" />
              </div>
            </section>
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
  return (
    <Link 
      href={href} 
      className={`flex items-center px-3 py-2 text-sm rounded-md hover:bg-primary/10 transition-all duration-300 group ${compact ? 'justify-center' : 'gap-3'}`}
    >
      <div className="text-primary group-hover:scale-110 transition-transform">{icon}</div>
      {!compact && <span className="group-hover:translate-x-1 transition-transform group-hover:text-primary">{label}</span>}
    </Link>
  );
}

// Quick Action Component
function QuickAction({ icon, title, desc, href }: { 
  icon: React.ReactNode, 
  title: string, 
  desc: string,
  href: string
}) {
  return (
    <Link href={href}>
      <div className="p-3 rounded-lg bg-card/30 hover:bg-card/50 border border-white/5 transition-all duration-300 flex items-center gap-3 min-w-[140px] group hover:shadow-md hover:shadow-primary/5 hover:border-white/10 card-hover">
        <div className="p-2 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors relative">
          <div className="absolute inset-0 bg-primary/5 rounded-md blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10 text-primary group-hover:scale-110 transition-transform">
            {icon}
          </div>
        </div>
        <div>
          <div className="font-medium text-sm group-hover:text-primary transition-colors">{title}</div>
          <div className="text-xs text-foreground/60">{desc}</div>
        </div>
      </div>
    </Link>
  );
}

// Tool Card Component
function ToolCard({ icon, name }: { icon: React.ReactNode, name: string }) {
  return (
    <div className="p-4 rounded-lg bg-card/20 hover:bg-card/40 border border-white/5 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 cursor-pointer flex flex-col items-center justify-center text-center group transform hover:-translate-y-1 tool-card-hover">
      <div className="p-3 rounded-full bg-background/50 mb-2 group-hover:bg-primary/10 transition-colors relative">
        <div className="absolute inset-0 bg-primary/5 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="relative z-10 icon-hover">
          {icon}
        </div>
      </div>
      <span className="text-sm font-medium group-hover:text-primary transition-colors">{name}</span>
    </div>
  );
} 