"use client"

import { useState } from 'react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Clock } from 'lucide-react'

interface TimerSettings {
  focusTime: number
  breakTime: number
  longBreakTime: number
  sessionsBeforeLongBreak: number
  autoStartBreaks: boolean
  autoStartPomodoros: boolean
}

export function TimerSettings() {
  const [settings, setSettings] = useState<TimerSettings>({
    focusTime: 25,
    breakTime: 5,
    longBreakTime: 15,
    sessionsBeforeLongBreak: 4,
    autoStartBreaks: true,
    autoStartPomodoros: true,
  })

  return (
    <DialogContent className="sm:max-w-[425px] glass-effect">
      <DialogHeader>
        <DialogTitle>Timer Settings</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Focus Time (minutes)</label>
          <input
            type="number"
            value={settings.focusTime}
            onChange={(e) => setSettings({ ...settings, focusTime: Number(e.target.value) })}
            className="w-full rounded-md bg-secondary px-3 py-2 text-sm"
            min={1}
            max={60}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Short Break Time (minutes)</label>
          <input
            type="number"
            value={settings.breakTime}
            onChange={(e) => setSettings({ ...settings, breakTime: Number(e.target.value) })}
            className="w-full rounded-md bg-secondary px-3 py-2 text-sm"
            min={1}
            max={30}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Long Break Time (minutes)</label>
          <input
            type="number"
            value={settings.longBreakTime}
            onChange={(e) => setSettings({ ...settings, longBreakTime: Number(e.target.value) })}
            className="w-full rounded-md bg-secondary px-3 py-2 text-sm"
            min={1}
            max={60}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Sessions Before Long Break</label>
          <input
            type="number"
            value={settings.sessionsBeforeLongBreak}
            onChange={(e) => setSettings({ ...settings, sessionsBeforeLongBreak: Number(e.target.value) })}
            className="w-full rounded-md bg-secondary px-3 py-2 text-sm"
            min={1}
            max={10}
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="autoStartBreaks"
            checked={settings.autoStartBreaks}
            onChange={(e) => setSettings({ ...settings, autoStartBreaks: e.target.checked })}
            className="rounded border-secondary"
          />
          <label htmlFor="autoStartBreaks" className="text-sm font-medium">
            Auto-start Breaks
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="autoStartPomodoros"
            checked={settings.autoStartPomodoros}
            onChange={(e) => setSettings({ ...settings, autoStartPomodoros: e.target.checked })}
            className="rounded border-secondary"
          />
          <label htmlFor="autoStartPomodoros" className="text-sm font-medium">
            Auto-start Pomodoros
          </label>
        </div>
        <Button className="w-full gap-2">
          <Clock size={16} />
          Save Settings
        </Button>
      </div>
    </DialogContent>
  )
}