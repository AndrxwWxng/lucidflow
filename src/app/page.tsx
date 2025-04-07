import { AiTutorChat } from '@/components/ai-tutor/chat'
import { KanbanBoard } from '@/components/kanban/board'
import { PomodoroTimer } from '@/components/pomodoro/timer'
import { ModeToggle } from '@/components/mode-toggle'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto py-4 px-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-cyan-300 bg-clip-text text-transparent">
            LucidFlow
          </h1>
          <ModeToggle />
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-foreground/80">Focus Timer</h2>
              <PomodoroTimer />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4 text-foreground/80">AI Study Assistant</h2>
              <AiTutorChat />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4 text-foreground/80">Study Tasks</h2>
            <KanbanBoard />
          </div>
        </div>
      </main>
    </div>
  )
}

