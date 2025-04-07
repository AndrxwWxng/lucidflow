"use client"

import { useState, useEffect } from 'react'
import { Button } from '../ui/button'

export function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [isBreak, setIsBreak] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsBreak(!isBreak)
      setTimeLeft(isBreak ? 25 * 60 : 5 * 60)
      setIsRunning(false)
    }

    return () => clearInterval(interval)
  }, [isRunning, timeLeft, isBreak])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <div className="glass-effect flex flex-col items-center gap-4 p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-foreground/80">
        {isBreak ? 'Break Time' : 'Focus Time'}
      </h2>
      <div className="text-6xl font-mono font-bold tracking-wider text-primary">
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </div>
      <div className="flex gap-2">
        <Button
          onClick={() => setIsRunning(!isRunning)}
          variant={isRunning ? 'destructive' : 'default'}
          size="lg"
          className="min-w-[100px]"
        >
          {isRunning ? 'Pause' : 'Start'}
        </Button>
        <Button
          onClick={() => {
            setTimeLeft(25 * 60)
            setIsRunning(false)
            setIsBreak(false)
          }}
          variant="outline"
          size="lg"
        >
          Reset
        </Button>
      </div>
    </div>
  )
}