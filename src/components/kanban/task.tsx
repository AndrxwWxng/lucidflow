import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'

interface Task {
  id: string
  title: string
  status: 'todo' | 'inProgress' | 'done'
}

interface KanbanTaskProps {
  task: Task
}

export function KanbanTask({ task }: KanbanTaskProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="glass-effect p-3 rounded shadow group"
    >
      <div className="flex items-start gap-2">
        <div
          {...listeners}
          className="mt-1 cursor-move opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <GripVertical size={16} className="text-foreground/50" />
        </div>
        <p className="flex-1">{task.title}</p>
      </div>
    </div>
  )
}