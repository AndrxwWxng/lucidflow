import { useDroppable } from '@dnd-kit/core'
import { Button } from '../ui/button'
import { KanbanTask } from './task'
import { ChevronRightIcon } from 'lucide-react'

interface Task {
  id: string
  title: string
  status: 'todo' | 'inProgress' | 'done'
}

interface KanbanColumnProps {
  title: string
  tasks: Task[]
  onStatusChange: (taskId: string) => void
}

export function KanbanColumn({ title, tasks, onStatusChange }: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({
    id: title,
  })

  return (
    <div
      ref={setNodeRef}
      className="glass-effect p-4 rounded-lg min-w-[300px] flex-1"
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
            <Button
              variant="ghost"
              size="icon"
              className="absolute -right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => onStatusChange(task.id)}
            >
              <ChevronRightIcon size={16} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}