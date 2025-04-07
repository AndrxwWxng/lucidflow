"use client"

import { useState } from 'react'
import { Button } from './ui/button'
import { Calendar, Clock, Plus } from 'lucide-react'

interface StudySession {
  id: string
  subject: string
  duration: number
  date: string
}

export function StudyPlanner() {
  const [sessions, setSessions] = useState<StudySession[]>([])
  const [subject, setSubject] = useState('')
  const [duration, setDuration] = useState(30)
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  const addSession = () => {
    if (!subject.trim()) return
    
    const newSession: StudySession = {
      id: Date.now().toString(),
      subject,
      duration,
      date,
    }
    
    setSessions([...sessions, newSession])
    setSubject('')
  }

  return (
    <div className="space-y-6">
      <div className="glass-effect p-4 rounded-lg space-y-4">
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Enter subject name..."
          className="w-full rounded-md bg-secondary px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="text-sm font-medium mb-1.5 block text-muted-foreground">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-md bg-secondary px-3 py-2 text-sm"
            />
          </div>
          <div className="w-32">
            <label className="text-sm font-medium mb-1.5 block text-muted-foreground">
              Duration
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full rounded-md bg-secondary px-3 py-2 text-sm"
            >
              <option value={15}>15 min</option>
              <option value={30}>30 min</option>
              <option value={45}>45 min</option>
              <option value={60}>1 hour</option>
              <option value={90}>1.5 hours</option>
              <option value={120}>2 hours</option>
            </select>
          </div>
        </div>
        <Button onClick={addSession} className="w-full gap-2">
          <Plus size={16} />
          Add Study Session
        </Button>
      </div>
      
      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
        {sessions.map(session => (
          <div key={session.id} className="glass-effect p-4 rounded-lg flex items-center justify-between group">
            <div>
              <h4 className="font-medium text-lg">{session.subject}</h4>
              <div className="text-sm text-muted-foreground flex items-center gap-3 mt-1">
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  {new Date(session.date).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} />
                  {session.duration} min
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSessions(sessions.filter(s => s.id !== session.id))}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Remove
            </Button>
          </div>
        ))}
        {sessions.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            No study sessions planned yet
          </div>
        )}
      </div>
    </div>
  )
}