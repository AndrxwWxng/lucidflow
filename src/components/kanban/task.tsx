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
  overlay?: boolean
}

export function KanbanTask({ task, overlay }: KanbanTaskProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const classes = [
    "glass-effect p-3 rounded shadow group",
    isDragging && "opacity-50",
    overlay && "cursor-grabbing shadow-lg scale-105",
  ].filter(Boolean).join(" ")

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={classes}
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