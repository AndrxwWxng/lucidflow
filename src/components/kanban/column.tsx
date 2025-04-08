import { useDroppable } from '@dnd-kit/core'
import { Button } from '../ui/button'
import { KanbanTask } from './task'
import { ArrowLeft, ChevronRightIcon, MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Task {
  id: string
  title: string
  status: 'todo' | 'inProgress' | 'done'
  createdAt: number
  priority?: 'low' | 'medium' | 'high'
}

interface KanbanColumnProps {
  id: string
  title: string
  icon: string
  tasks: Task[]
  onStatusChange: (taskId: string) => void
  onMoveBack: (taskId: string) => void
  onDelete: (taskId: string) => void
  onUpdatePriority: (taskId: string, priority: 'low' | 'medium' | 'high') => void
  showMoveBack: boolean
}

export function KanbanColumn({ 
  id, 
  title, 
  icon, 
  tasks, 
  onStatusChange, 
  onMoveBack, 
  onDelete,
  onUpdatePriority,
  showMoveBack 
}: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({
    id,
  })

  // Sort tasks by priority then by created date
  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    // Sort by priority first (if both have priority)
    if (a.priority && b.priority && a.priority !== b.priority) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    // Then sort by created date (newest first)
    return b.createdAt - a.createdAt;
  });

  return (
    <div
      ref={setNodeRef}
      className="glass-card p-4 rounded-lg flex-1 min-h-[200px] min-w-[250px] flex flex-col"
    >
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="text-lg">{icon}</span>
          <h3 className="font-medium">{title}</h3>
        </div>
        <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-medium">
          {tasks.length}
        </span>
      </div>
      
      <div className="flex flex-col gap-2 flex-1 overflow-y-auto max-h-[350px] scrollbar-thin">
        {sortedTasks.length > 0 ? (
          sortedTasks.map(task => (
            <div key={task.id} className="group relative">
              <KanbanTask 
                task={task} 
                onDelete={onDelete} 
                onUpdatePriority={onUpdatePriority}
              />
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {showMoveBack && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onMoveBack(task.id)}
                    className="h-6 w-6 rounded-full bg-background/70 backdrop-blur-sm hover:bg-background"
                  >
                    <ArrowLeft size={14} />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onStatusChange(task.id)}
                  className="h-6 w-6 rounded-full bg-background/70 backdrop-blur-sm hover:bg-background"
                >
                  <ChevronRightIcon size={14} />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-32 text-foreground/50 text-sm">
            <p className="text-center">No tasks yet</p>
            <p className="text-center text-xs">Drag and drop tasks here</p>
          </div>
        )}
      </div>
    </div>
  )
}