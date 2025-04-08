"use client"
import { DndContext, DragEndEvent, DragOverEvent, DragStartEvent, closestCorners } from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { KanbanColumn } from './column'
import { KanbanTask } from './task'
import { ArrowLeft, PlusIcon, ListTodo, Layers, Trash2 } from 'lucide-react'
import { Input } from '../ui/input'

type TaskStatus = 'todo' | 'inProgress' | 'done'

interface Task {
  id: string
  title: string
  status: TaskStatus
  createdAt: number
  priority?: 'low' | 'medium' | 'high'
  tagIds?: string[]
}

interface TaskTag {
  id: string
  name: string
  color: string
}

interface KanbanBoardProps {
  filteredTagIds?: string[]
}

export function KanbanBoard({ filteredTagIds }: KanbanBoardProps = {}) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [activeTask, setActiveTask] = useState<Task | null>(null)
  const [tags, setTags] = useState<TaskTag[]>([])

  // Load tasks from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const savedTasks = localStorage.getItem('kanban-tasks')
    const savedTags = localStorage.getItem('studyTaskTags')
    
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks))
      } catch (e) {
        console.error('Failed to parse tasks from localStorage', e)
      }
    }
    
    if (savedTags) {
      try {
        setTags(JSON.parse(savedTags))
      } catch (e) {
        console.error('Failed to parse tags from localStorage', e)
      }
    }
  }, [])

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    localStorage.setItem('kanban-tasks', JSON.stringify(tasks))
  }, [tasks])

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find(t => t.id === event.active.id)
    if (task) setActiveTask(task)
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return

    const activeTask = tasks.find(task => task.id === active.id)
    if (!activeTask) return

    const overId = over.id
    const overTask = tasks.find(task => task.id === overId)
    const overColumn = ['todo', 'inProgress', 'done'].find(col => col === overId)

    if (overTask) {
      const activeIndex = tasks.indexOf(activeTask)
      const overIndex = tasks.indexOf(overTask)
      setTasks(arrayMove(tasks, activeIndex, overIndex))
    } else if (overColumn && activeTask.status !== overColumn) {
      setTasks(tasks.map(task => 
        task.id === activeTask.id ? { ...task, status: overColumn as TaskStatus } : task
      ))
    }
  }

  const handleDragEnd = () => {
    setActiveTask(null)
  }

  const handleDragCancel = () => {
    setActiveTask(null)
  }

  const addTask = () => {
    if (!newTaskTitle.trim()) return

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      status: 'todo',
      createdAt: Date.now(),
      priority: 'medium',
      tagIds: []
    }

    setTasks([...tasks, newTask])
    setNewTaskTitle('')
  }

  const updateTaskStatus = (taskId: string, newStatus: TaskStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ))
  }

  const moveTaskBack = (taskId: string) => {
    const statusOrder: TaskStatus[] = ['todo', 'inProgress', 'done']
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const currentIndex = statusOrder.indexOf(task.status)
        const newStatus = statusOrder[Math.max(0, currentIndex - 1)]
        return { ...task, status: newStatus }
      }
      return task
    }))
  }

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId))
  }

  const updateTaskPriority = (taskId: string, priority: 'low' | 'medium' | 'high') => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, priority } : task
    ))
  }
  
  const updateTaskTags = (taskId: string, tagIds: string[]) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, tagIds } : task
    ))
  }

  const getTotalTasks = () => tasks.length
  const getCompletedTasks = () => tasks.filter(t => t.status === 'done').length
  const getCompletionPercentage = () => {
    if (getTotalTasks() === 0) return 0
    return Math.round((getCompletedTasks() / getTotalTasks()) * 100)
  }

  const clearCompletedTasks = () => {
    setTasks(tasks.filter(task => task.status !== 'done'))
  }
  
  // Filter tasks based on selected tags (if provided)
  const getFilteredTasks = (status: TaskStatus) => {
    let filteredTasks = tasks.filter(t => t.status === status);
    
    if (filteredTagIds && filteredTagIds.length > 0) {
      filteredTasks = filteredTasks.filter(task => {
        if (!task.tagIds || task.tagIds.length === 0) return false;
        return filteredTagIds.some(tagId => task.tagIds?.includes(tagId));
      });
    }
    
    return filteredTasks;
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="glass-card p-4 rounded-lg">
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <div className="flex flex-1 gap-2">
            <Input
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Add a new study task..."
              className="flex-1"
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
            />
            <Button onClick={addTask} className="flex items-center gap-1 whitespace-nowrap">
              <PlusIcon size={16} />
              Add Task
            </Button>
          </div>
          
          {getTotalTasks() > 0 && (
            <div className="flex items-center gap-4 text-sm text-foreground/70 whitespace-nowrap">
              <span className="flex items-center gap-1">
                <Layers size={14} className="text-primary" />
                {getTotalTasks()} tasks
              </span>
              <span className="flex items-center gap-1">
                <ListTodo size={14} className="text-primary" />
                {getCompletionPercentage()}% complete
              </span>
              {getCompletedTasks() > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearCompletedTasks}
                  className="text-xs px-2 h-8 flex items-center gap-1 hover:text-destructive transition-colors"
                >
                  <Trash2 size={14} />
                  Clear Done
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <DndContext 
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <div className="flex flex-col md:flex-row gap-4 w-full">
            {([
              { id: 'todo', title: 'To Study', icon: '📚' },
              { id: 'inProgress', title: 'Studying', icon: '🧠' },
              { id: 'done', title: 'Completed', icon: '✅' }
            ] as const).map(column => (
              <KanbanColumn 
                key={column.id}
                id={column.id}
                title={column.title}
                icon={column.icon}
                tasks={getFilteredTasks(column.id)}
                tags={tags}
                onStatusChange={(taskId) => {
                  const statusOrder = ['todo', 'inProgress', 'done']
                  const currentIndex = statusOrder.indexOf(column.id)
                  const nextStatus = statusOrder[currentIndex + 1]
                  if (nextStatus) updateTaskStatus(taskId, nextStatus as TaskStatus)
                }}
                onMoveBack={moveTaskBack}
                onDelete={deleteTask}
                onUpdatePriority={updateTaskPriority}
                onUpdateTags={updateTaskTags}
                showMoveBack={column.id !== 'todo'}
              />
            ))}
          </div>
        </DndContext>
      </div>
    </div>
  )
}