"use client"
import { DndContext, DragEndEvent, closestCorners } from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import { useState } from 'react'
import { Button } from '../ui/button'
import { KanbanColumn } from './column'
import { KanbanTask } from './task'
import { PlusIcon } from 'lucide-react'

type TaskStatus = 'todo' | 'inProgress' | 'done'

interface Task {
  id: string
  title: string
  status: TaskStatus
}

export function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState('')

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return

    const activeTask = tasks.find(task => task.id === active.id)
    const overTask = tasks.find(task => task.id === over.id)

    if (!activeTask || !overTask) return

    const activeIndex = tasks.indexOf(activeTask)
    const overIndex = tasks.indexOf(overTask)

    setTasks(arrayMove(tasks, activeIndex, overIndex))
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

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 p-4">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="New task..."
          className="flex-1 rounded-md border p-2"
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <Button onClick={addTask} className="flex items-center gap-2">
          <PlusIcon size={16} />
          Add Task
        </Button>
      </div>
      
      <div className="flex gap-4 p-4">
        <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
          <SortableContext items={tasks.map(task => task.id)}>
            <KanbanColumn 
              title="To Do" 
              tasks={tasks.filter(t => t.status === 'todo')}
              onStatusChange={(taskId) => updateTaskStatus(taskId, 'inProgress')}
            />
            <KanbanColumn 
              title="In Progress" 
              tasks={tasks.filter(t => t.status === 'inProgress')}
              onStatusChange={(taskId) => updateTaskStatus(taskId, 'done')}
            />
            <KanbanColumn 
              title="Done" 
              tasks={tasks.filter(t => t.status === 'done')}
              onStatusChange={(taskId) => updateTaskStatus(taskId, 'todo')}
            />
          </SortableContext>
        </DndContext>
      </div>
    </div>
  )
}