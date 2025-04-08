import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Trash2, Flag, Tag } from 'lucide-react'
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
  tagIds?: string[]
}

interface TaskTag {
  id: string
  name: string
  color: string
}

interface KanbanTaskProps {
  task: Task
  overlay?: boolean
  tags?: TaskTag[]
  onDelete?: (taskId: string) => void
  onUpdatePriority?: (taskId: string, priority: 'low' | 'medium' | 'high') => void
  onUpdateTags?: (taskId: string, tagIds: string[]) => void
}

export function KanbanTask({ 
  task, 
  overlay, 
  tags = [], 
  onDelete, 
  onUpdatePriority,
  onUpdateTags
}: KanbanTaskProps) {
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
    "glass-card p-3 rounded-lg shadow-sm group relative",
    isDragging && "opacity-50",
    overlay && "cursor-grabbing shadow-lg scale-105",
  ].filter(Boolean).join(" ")

  // Get priority color
  const getPriorityColor = () => {
    if (!task.priority) return 'bg-muted/30';
    
    switch (task.priority) {
      case 'high':
        return 'bg-red-500/20 text-red-400';
      case 'medium':
        return 'bg-amber-500/20 text-amber-400';
      case 'low':
        return 'bg-green-500/20 text-green-400';
      default:
        return 'bg-muted/30';
    }
  };

  // Get tag color class
  const getTagColorClass = (color: string) => {
    switch (color) {
      case 'red': return 'bg-red-500/10 text-red-500';
      case 'blue': return 'bg-blue-500/10 text-blue-500';
      case 'green': return 'bg-green-500/10 text-green-500';
      case 'purple': return 'bg-purple-500/10 text-purple-500';
      case 'yellow': return 'bg-yellow-500/10 text-yellow-500';
      case 'pink': return 'bg-pink-500/10 text-pink-500';
      case 'cyan': return 'bg-cyan-500/10 text-cyan-500';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  // Get tags for this task
  const taskTags = task.tagIds 
    ? tags.filter(tag => task.tagIds?.includes(tag.id))
    : [];

  // Toggle tag on this task
  const toggleTag = (tagId: string) => {
    if (!onUpdateTags) return;
    
    const currentTagIds = task.tagIds || [];
    const newTagIds = currentTagIds.includes(tagId)
      ? currentTagIds.filter(id => id !== tagId)
      : [...currentTagIds, tagId];
    
    onUpdateTags(task.id, newTagIds);
  };

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
          className="mt-1 cursor-move opacity-0 group-hover:opacity-70 transition-opacity"
        >
          <GripVertical size={15} className="text-foreground/50" />
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="break-words">{task.title}</p>
          
          {taskTags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2 mb-1">
              {taskTags.map(tag => (
                <div 
                  key={tag.id} 
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${getTagColorClass(tag.color)}`}
                >
                  <Tag size={10} className="mr-1" />
                  {tag.name}
                </div>
              ))}
            </div>
          )}
          
          {task.priority && (
            <div className={`mt-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${getPriorityColor()}`}>
              <Flag size={11} />
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
            </div>
          )}
        </div>
        
        {(onDelete || onUpdatePriority || onUpdateTags) && (
          <DropdownMenu>
            <DropdownMenuTrigger className="opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="h-6 w-6 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36">
              {onUpdatePriority && (
                <>
                  <DropdownMenuItem 
                    onClick={() => onUpdatePriority(task.id, 'high')}
                    className="gap-2 text-red-400"
                  >
                    <Flag size={14} /> High Priority
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => onUpdatePriority(task.id, 'medium')}
                    className="gap-2 text-amber-400"
                  >
                    <Flag size={14} /> Medium
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => onUpdatePriority(task.id, 'low')}
                    className="gap-2 text-green-400"
                  >
                    <Flag size={14} /> Low
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}
              
              {onUpdateTags && tags.length > 0 && (
                <>
                  <div className="text-xs px-2 py-1 text-foreground/60">Tags</div>
                  {tags.map(tag => (
                    <DropdownMenuItem 
                      key={tag.id}
                      onClick={() => toggleTag(tag.id)}
                      className={`gap-2 ${getTagColorClass(tag.color)}`}
                    >
                      <Tag size={12} />
                      {tag.name}
                      {task.tagIds?.includes(tag.id) && (
                        <span className="ml-auto">✓</span>
                      )}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                </>
              )}
              
              {onDelete && (
                <DropdownMenuItem 
                  onClick={() => onDelete(task.id)}
                  className="gap-2 text-destructive"
                >
                  <Trash2 size={14} /> Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  )
}