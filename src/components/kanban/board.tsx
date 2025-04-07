"use client"
import { DndContext, DragEndEvent, DragOverEvent, DragStartEvent, closestCorners } from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import { useState } from 'react'
import { Button } from '../ui/button'
import { KanbanColumn } from './column'
import { KanbanTask } from './task'
import { ArrowLeft, PlusIcon } from 'lucide-react'

type TaskStatus = 'todo' | 'inProgress' | 'done'

interface Task {
  id: string
  title: string
  status: TaskStatus
}

export function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [activeTask, setActiveTask] = useState<Task | null>(null)

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
      status: 'todo'
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

  return (
    <div className="flex flex-col gap-4">
      <div className="glass-effect p-4 rounded-lg">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 rounded-md bg-secondary px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
          />
          <Button onClick={addTask} className="flex items-center gap-2">
            <PlusIcon size={16} />
            Add Task
          </Button>
        </div>
      </div>
      
      <div className="flex gap-4">
        <DndContext 
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <div className="flex gap-4 w-full">
            {(['todo', 'inProgress', 'done'] as const).map(status => (
              <KanbanColumn 
                key={status}
                id={status}
                title={status === 'todo' ? 'To Do' : status === 'inProgress' ? 'In Progress' : 'Done'}
                tasks={tasks.filter(t => t.status === status)}
                onStatusChange={(taskId) => {
                  const statusOrder = ['todo', 'inProgress', 'done']
                  const currentIndex = statusOrder.indexOf(status)
                  const nextStatus = statusOrder[currentIndex + 1]
                  if (nextStatus) updateTaskStatus(taskId, nextStatus as TaskStatus)
                }}
                onMoveBack={moveTaskBack}
                showMoveBack={status !== 'todo'}
              />
            ))}
          </div>
        </DndContext>
      </div>
    </div>
  )
}