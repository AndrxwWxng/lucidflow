import { AiTutorChat } from "@/components/ai-tutor/chat";
import { KanbanBoard } from "@/components/kanban/board";
import { PomodoroTimer } from "@/components/pomodoro/timer";
import { ModeToggle } from "@/components/mode-toggle";
import { Settings } from "@/components/settings";
import { SpotifyPlayer } from "@/components/spotify-player";
import { Calculator } from "@/components/calculator";
import { StudyPlanner } from "@/components/study-planner";
import { Notes } from "@/components/notes"; 
import {
  Brain,
  Clock,
  Music,
  ListTodo,
  Bot,
  Calculator as CalcIcon,
  FileText,
  Calendar,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Brain size={32} className="text-cyan-400 animate-float" />
            <h1 className="text-3xl font-bold gradient-text">LucidFlow</h1>
          </div>
          <div className="flex items-center gap-4">
            <Settings />
            <ModeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

          <div className="xl:col-span-3 space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-foreground/80 flex items-center gap-2">
                <Clock size={20} className="text-primary" />
                Focus Timer
              </h2>
              <PomodoroTimer />
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 text-foreground/80 flex items-center gap-2">
                <CalcIcon size={20} className="text-primary" />
                Calculator
              </h2>
              <div className="p-4 rounded-lg bg-card border shadow-sm">
                <Calculator />
              </div>
            </div>
          </div>

          <div className="xl:col-span-5 space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-foreground/80 flex items-center gap-2">
                <ListTodo size={20} className="text-primary" />
                Study Tasks
              </h2>
              <KanbanBoard />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4 text-foreground/80 flex items-center gap-2">
                <Calendar size={20} className="text-primary" />
                Study Planner
              </h2>
              <div className="p-4 rounded-lg bg-card border shadow-sm">
                <StudyPlanner />
              </div>
            </div>
          </div>

          <div className="xl:col-span-4 space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-foreground/80 flex items-center gap-2">
                <Bot size={20} className="text-primary" />
                AI Study Assistant
              </h2>
              <AiTutorChat />
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 text-foreground/80 flex items-center gap-2">
                <Music size={20} className="text-primary" />
                Study Music
              </h2>
              <SpotifyPlayer />
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4 text-foreground/80 flex items-center gap-2">
            <FileText size={20} className="text-primary" />
            Study Notes
          </h2>
          <Notes />
        </div>
      </main>
    </div>
  );
}
