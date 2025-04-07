import { useDroppable } from '@dnd-kit/core'
import { Button } from '../ui/button'
import { KanbanTask } from './task'
import { ArrowLeft, ChevronRightIcon } from 'lucide-react'

interface Task {
  id: string
  title: string
  status: 'todo' | 'inProgress' | 'done'
}

interface KanbanColumnProps {
  id: string
  title: string
  tasks: Task[]
  onStatusChange: (taskId: string) => void
  onMoveBack: (taskId: string) => void
  showMoveBack: boolean
}

export function KanbanColumn({ id, title, tasks, onStatusChange, onMoveBack, showMoveBack }: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({
    id,
  })

  return (
    <div
      ref={setNodeRef}
      className="glass-effect p-4 rounded-lg flex-1 min-h-[200px]"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">{title}</h3>
        <span className="bg-secondary px-2 py-1 rounded text-sm">
          {tasks.length}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {tasks.map(task => (
          <div key={task.id} className="group relative">
            <KanbanTask task={task} />
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {showMoveBack && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onMoveBack(task.id)}
                  className="bg-secondary/50"
                >
                  <ArrowLeft size={16} />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onStatusChange(task.id)}
                className="bg-secondary/50"
              >
                <ChevronRightIcon size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}