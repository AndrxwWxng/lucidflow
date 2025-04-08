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
  ChevronRight,
  AlertCircle,
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

// Define a type for our tool modal state
interface ToolModal {
  isOpen: boolean;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

export default function Dashboard() {
  const [compactSidebar, setCompactSidebar] = useState(false);
  const [toolModal, setToolModal] = useState<ToolModal>({
    isOpen: false,
    title: '',
    icon: null,
    content: null
  });

  const openToolModal = (title: string, icon: React.ReactNode, content: React.ReactNode) => {
    setToolModal({
      isOpen: true,
      title,
      icon,
      content
    });
  };

  const closeToolModal = () => {
    setToolModal(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar - Redesigned to be more elegant */}
      <aside className={`h-full border-r border-white/10 ${compactSidebar ? 'w-[68px]' : 'w-[220px]'} transition-all duration-300 bg-card/30 backdrop-blur-md flex flex-col shrink-0`}>
        <div className="p-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2">
            <Brain size={24} className="text-primary animate-pulse-slow" />
            {!compactSidebar && <h1 className="text-lg font-bold gradient-text">LucidFlow</h1>}
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setCompactSidebar(!compactSidebar)}
            className="h-6 w-6 rounded-full opacity-70 hover:opacity-100"
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
            
            <NavItem href="#stats" icon={<BarChart3 />} label="Statistics" compact={compactSidebar} />
            <NavItem href="#progress" icon={<GraduationCap />} label="Progress" compact={compactSidebar} />
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Modern header with blur effect */}
        <header className="bg-background/10 backdrop-blur-xl border-b border-white/10 z-10 shrink-0">
          <div className="max-w-full h-12 px-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <h1 id="dashboard" className="text-base font-medium hidden md:block">Your Study Dashboard</h1>
              <div className="hidden lg:flex items-center ml-6 gap-1">
                <StudyTools />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center">
                <Lightbulb className="text-primary/60 w-3.5 h-3.5 mr-2" />
                <span className="text-xs text-foreground/60 italic">Focus on one task at a time</span>
              </div>
              <div className="flex items-center gap-2">
                <Keyboard className="text-foreground/40 hover:text-foreground/60 cursor-pointer" size={16} />
                <Settings />
                <div className="md:hidden">
                  <ModeToggle />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          <main className="max-w-full p-4 md:p-5">
            {/* Welcome Card with Stats - more minimal and sleek */}
            <div className="mb-6 glass-card relative overflow-hidden rounded-xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-300/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>
              <div className="relative z-10 p-5 md:p-6 flex flex-col md:flex-row gap-5 justify-between">
                <div>
                  <span className="inline-flex items-center px-2 py-0.5 text-xs rounded-full bg-primary/15 text-primary mb-3">
                    <Sparkles size={10} className="mr-1" /> Dashboard
                  </span>
                  <h1 className="text-xl md:text-2xl font-bold mb-2">Welcome to your Study Space</h1>
                  <p className="text-foreground/70 mb-4 max-w-md text-sm">
                    Everything you need to optimize your learning in one place. Focus on what matters most.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center">
                      <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center mr-2">
                        <Clock size={14} className="text-primary" />
                      </div>
                      <div>
                        <div className="text-xs text-foreground/60">Focus Time</div>
                        <div className="font-medium text-sm">25:00</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center mr-2">
                        <Workflow size={14} className="text-primary" />
                      </div>
                      <div>
                        <div className="text-xs text-foreground/60">Sessions</div>
                        <div className="font-medium text-sm">3 today</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center mr-2">
                        <Zap size={14} className="text-primary" />
                      </div>
                      <div>
                        <div className="text-xs text-foreground/60">Productivity</div>
                        <div className="font-medium text-sm">85%</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 items-start flex-wrap md:flex-nowrap">
                  <QuickAction icon={<Clock size={16} />} title="Timer" desc="Focus now" href="#timer" />
                  <QuickAction icon={<Bot size={16} />} title="AI Tutor" desc="Get help" href="#ai" />
                  <QuickAction icon={<Layers size={16} />} title="Tasks" desc="3 pending" href="#tasks" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Left Column */}
              <div className="lg:col-span-3">
                <section id="timer" className="glass-card p-4 mb-5 rounded-xl motion-safe:animate-fade-in">
                  <h2 className="text-base font-medium mb-3 flex items-center gap-2">
                    <Clock size={16} className="text-primary" />
                    <span>Focus Timer</span>
                  </h2>
                  <PomodoroTimer />
                </section>

                <section id="music" className="glass-card p-4 mb-5 rounded-xl motion-safe:animate-fade-in animation-delay-300">
                  <h2 className="text-base font-medium mb-3 flex items-center gap-2">
                    <Music size={16} className="text-primary" />
                    <span>Study Music</span>
                  </h2>
                  <SpotifyPlayer />
                </section>

                <section id="calculator" className="glass-card p-4 rounded-xl motion-safe:animate-fade-in animation-delay-200">
                  <h2 className="text-base font-medium mb-3 flex items-center gap-2">
                    <CalcIcon size={16} className="text-primary" />
                    <span>Calculator</span>
                  </h2>
                  <Calculator />
                </section>
              </div>

              {/* Middle Column */}
              <div className="lg:col-span-9">
                <section id="tasks" className="glass-card p-4 mb-5 rounded-xl motion-safe:animate-fade-in animation-delay-150">
                  <h2 className="text-base font-medium mb-3 flex items-center gap-2">
                    <Layers size={16} className="text-primary" />
                    <span>Study Tasks</span>
                  </h2>
                  <KanbanBoard />
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <section id="ai" className="glass-card p-4 rounded-xl motion-safe:animate-fade-in animation-delay-100">
                    <h2 className="text-base font-medium mb-3 flex items-center gap-2">
                      <Bot size={16} className="text-primary" />
                      <span>AI Study Assistant</span>
                    </h2>
                    <AiTutorChat />
                  </section>

                  <section id="notes" className="glass-card p-4 rounded-xl motion-safe:animate-fade-in animation-delay-350">
                    <h2 className="text-base font-medium mb-3 flex items-center gap-2">
                      <FileText size={16} className="text-primary" />
                      <span>Study Notes</span>
                    </h2>
                    <Notes />
                  </section>
                </div>

                <section id="planner" className="glass-card p-4 mt-5 rounded-xl motion-safe:animate-fade-in animation-delay-250">
                  <h2 className="text-base font-medium mb-3 flex items-center gap-2">
                    <Calendar size={16} className="text-primary" />
                    <span>Study Planner</span>
                  </h2>
                  <StudyPlanner />
                </section>
              </div>
            </div>

            {/* Additional Tools Section - Redesigned to be more modern and useful */}
            <section id="tools" className="mt-6 glass-card p-5 rounded-xl motion-safe:animate-fade-in animation-delay-400">
              <h2 className="text-lg font-medium mb-4 flex items-center">
                <Blocks size={18} className="text-primary mr-2" />
                <span>Additional Study Tools</span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                <ToolCard 
                  icon={<BookOpen size={16} />} 
                  name="Flashcards" 
                  href="#" 
                  onClick={() => {
                    const dialogTrigger = document.querySelector('#flashcardsDialogTrigger') as HTMLElement;
                    if (dialogTrigger) {
                      dialogTrigger.click();
                    }
                  }}
                />
                <ToolCard 
                  icon={<FileText size={16} />} 
                  name="Summary Generator" 
                  href="#"
                  isNew={true}
                  onClick={() => openToolModal(
                    "Summary Generator", 
                    <FileText size={18} className="text-primary" />,
                    <div className="p-4 text-center">
                      <p className="text-sm text-foreground/70 mb-4">
                        Paste your study notes or text to generate a concise summary using AI.
                      </p>
                      <textarea 
                        className="w-full h-32 p-3 mb-4 rounded-md bg-background/50 border border-white/10 text-sm" 
                        placeholder="Paste your study material here..."
                      />
                      <Button>Generate Summary</Button>
                    </div>
                  )}
                />
                <ToolCard 
                  icon={<GraduationCap size={16} />} 
                  name="Learning Path" 
                  href="#"
                  isNew={true}
                  onClick={() => openToolModal(
                    "Learning Path", 
                    <GraduationCap size={18} className="text-primary" />,
                    <div className="p-4 text-center">
                      <p className="text-sm text-foreground/70 mb-4">
                        Create a personalized learning journey for your current subject.
                      </p>
                      <div className="space-y-3 mb-4">
                        <input 
                          type="text" 
                          className="w-full p-2 rounded-md bg-background/50 border border-white/10 text-sm" 
                          placeholder="What subject are you studying?"
                        />
                        <select className="w-full p-2 rounded-md bg-background/50 border border-white/10 text-sm">
                          <option>Beginner</option>
                          <option>Intermediate</option>
                          <option>Advanced</option>
                        </select>
                      </div>
                      <Button>Create Learning Path</Button>
                    </div>
                  )}
                />
                <ToolCard 
                  icon={<Brain size={16} />} 
                  name="Memory Techniques" 
                  href="#"
                  isNew={true}
                  onClick={() => openToolModal(
                    "Memory Techniques", 
                    <Brain size={18} className="text-primary" />,
                    <div className="space-y-4 p-3">
                      <div className="p-3 rounded-md bg-primary/5 border border-primary/10">
                        <h3 className="font-medium mb-1">Spaced Repetition</h3>
                        <p className="text-xs text-foreground/70">Review information at increasing intervals to improve retention.</p>
                      </div>
                      <div className="p-3 rounded-md bg-primary/5 border border-primary/10">
                        <h3 className="font-medium mb-1">Mind Palace</h3>
                        <p className="text-xs text-foreground/70">Visualize a familiar place and associate information with locations.</p>
                      </div>
                      <div className="p-3 rounded-md bg-primary/5 border border-primary/10">
                        <h3 className="font-medium mb-1">Chunking</h3>
                        <p className="text-xs text-foreground/70">Group information into manageable chunks for easier recall.</p>
                      </div>
                      <Button variant="outline" className="w-full">View All Techniques</Button>
                    </div>
                  )}
                />
                <ToolCard 
                  icon={<Calendar size={16} />} 
                  name="Exam Countdown" 
                  href="#"
                  onClick={() => openToolModal(
                    "Exam Countdown", 
                    <Calendar size={18} className="text-primary" />,
                    <div className="p-4 space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">Math Final</h3>
                          <p className="text-xs text-foreground/70">May 15, 2023</p>
                        </div>
                        <div className="text-xl font-bold text-primary">12 days</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">Physics Midterm</h3>
                          <p className="text-xs text-foreground/70">May 20, 2023</p>
                        </div>
                        <div className="text-xl font-bold text-primary">17 days</div>
                      </div>
                      <Button variant="outline" className="w-full">Add Exam</Button>
                    </div>
                  )}
                />
                <ToolCard 
                  icon={<Bot size={16} />} 
                  name="Study Coach" 
                  href="#"
                  isNew={true}
                  onClick={() => openToolModal(
                    "Study Coach", 
                    <Bot size={18} className="text-primary" />,
                    <div className="p-4">
                      <div className="text-center mb-4">
                        <p className="text-sm text-foreground/70">What do you need help with today?</p>
                      </div>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start text-left">
                          <AlertCircle size={14} className="mr-2" /> I'm feeling unmotivated
                        </Button>
                        <Button variant="outline" className="w-full justify-start text-left">
                          <AlertCircle size={14} className="mr-2" /> I don't understand the material
                        </Button>
                        <Button variant="outline" className="w-full justify-start text-left">
                          <AlertCircle size={14} className="mr-2" /> I need a study plan
                        </Button>
                        <Button variant="outline" className="w-full justify-start text-left">
                          <AlertCircle size={14} className="mr-2" /> I'm feeling anxious about my exam
                        </Button>
                      </div>
                    </div>
                  )}
                />
                <ToolCard 
                  icon={<Workflow size={16} />} 
                  name="Progress Tracker" 
                  href="#progress"
                />
                <ToolCard 
                  icon={<Music size={16} />} 
                  name="Focus Sounds" 
                  href="#music"
                />
                <ToolCard 
                  icon={<Keyboard size={16} />} 
                  name="Speed Typing" 
                  href="#"
                  isNew={true}
                  onClick={() => openToolModal(
                    "Speed Typing", 
                    <Keyboard size={18} className="text-primary" />,
                    <div className="p-4 text-center">
                      <p className="text-sm text-foreground/70 mb-4">
                        Practice typing to improve your note-taking speed.
                      </p>
                      <div className="p-3 rounded-md bg-background/50 border border-white/10 mb-4 text-sm font-mono">
                        The quick brown fox jumps over the lazy dog.
                      </div>
                      <div className="mb-4">
                        <input 
                          type="text" 
                          className="w-full p-2 rounded-md bg-background/50 border border-white/10 text-sm font-mono" 
                          placeholder="Type the text above..."
                        />
                      </div>
                      <div className="flex justify-between text-xs text-foreground/70">
                        <span>Speed: 0 WPM</span>
                        <span>Accuracy: 0%</span>
                      </div>
                    </div>
                  )}
                />
                <ToolCard 
                  icon={<Lightbulb size={16} />} 
                  name="Idea Board" 
                  href="#"
                  isNew={true}
                  onClick={() => openToolModal(
                    "Idea Board", 
                    <Lightbulb size={18} className="text-primary" />,
                    <div className="p-4">
                      <p className="text-sm text-foreground/70 mb-4 text-center">
                        Capture and organize your study ideas in one place.
                      </p>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="p-2 rounded-md bg-yellow-500/10 border border-yellow-500/20 text-xs">
                          Research topics for final paper
                        </div>
                        <div className="p-2 rounded-md bg-blue-500/10 border border-blue-500/20 text-xs">
                          Questions for study group
                        </div>
                        <div className="p-2 rounded-md bg-green-500/10 border border-green-500/20 text-xs">
                          Topics to review before exam
                        </div>
                        <div className="p-2 rounded-md bg-purple-500/10 border border-purple-500/20 text-xs">
                          Project ideas
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        Add New Idea
                      </Button>
                    </div>
                  )}
                />
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="text-sm text-foreground/60">
                  Want more tools? <a href="#suggest" className="text-primary hover:underline">Suggest new features</a>
                </div>
                <Button variant="outline" size="sm" className="text-xs gap-1">
                  Customize Tools <ChevronRight size={12} />
                </Button>
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* Tool Modal */}
      <Dialog open={toolModal.isOpen} onOpenChange={(open) => !open && closeToolModal()}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {toolModal.icon}
              {toolModal.title}
            </DialogTitle>
          </DialogHeader>
          {toolModal.content}
        </DialogContent>
      </Dialog>
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
    <a
      href={href}
      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-background/40 transition-colors group"
    >
      <div className="text-primary/70 group-hover:text-primary">
        {icon}
      </div>
      {!compact && <span className="text-foreground/80 group-hover:text-foreground">{label}</span>}
    </a>
  )
}

// Quick Action Component
function QuickAction({ icon, title, desc, href }: { 
  icon: React.ReactNode, 
  title: string, 
  desc: string,
  href: string
}) {
  return (
    <a
      href={href}
      className="flex flex-col items-center p-3 rounded-lg bg-background/20 hover:bg-background/30 transition-colors text-center w-full sm:w-24"
    >
      <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center mb-2">
        {icon}
      </div>
      <span className="font-medium text-sm">{title}</span>
      <span className="text-foreground/60 text-xs">{desc}</span>
    </a>
  )
}

// Tool Card Component
function ToolCard({ 
  icon, 
  name, 
  href,
  isNew = false,
  onClick
}: { 
  icon: React.ReactNode, 
  name: string,
  href: string,
  isNew?: boolean,
  onClick?: () => void
}) {
  return (
    <a 
      href={href} 
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      className="flex flex-col items-center justify-center p-3 rounded-xl bg-background/20 hover:bg-background/30 transition-all border border-white/5 hover:border-white/10 group relative"
    >
      <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
        {icon}
      </div>
      <span className="text-sm font-medium">{name}</span>
      {isNew && (
        <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded-full">
          NEW
        </span>
      )}
    </a>
  )
} 