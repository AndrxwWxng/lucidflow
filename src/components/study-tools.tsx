"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { Calculator } from "@/components/calculator"
import { StudyPlanner } from "@/components/study-planner"
import { Notes } from "@/components/notes"
import { TimerSettings } from "@/components/timer-settings"
import { Brain, Calculator as CalculatorIcon, Calendar, Clock, FileText, Music, Settings } from "lucide-react"
import { useState } from "react"

export function StudyTools() {
  const [calculatorOpen, setCalculatorOpen] = useState(false)
  const [plannerOpen, setPlannerOpen] = useState(false)
  const [notesOpen, setNotesOpen] = useState(false)
  const [timerSettingsOpen, setTimerSettingsOpen] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="gap-2">
            <Brain size={16} />
            Study Tools
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <Dialog open={calculatorOpen} onOpenChange={setCalculatorOpen}>
            <DialogTrigger asChild>
              <DropdownMenuItem className="gap-2" onSelect={(e) => e.preventDefault()}>
                <CalculatorIcon size={16} />
                Calculator
              </DropdownMenuItem>
            </DialogTrigger>
            <Calculator />
          </Dialog>
          <Dialog open={plannerOpen} onOpenChange={setPlannerOpen}>
            <DialogTrigger asChild>
              <DropdownMenuItem className="gap-2" onSelect={(e) => e.preventDefault()}>
                <Calendar size={16} />
                Study Planner
              </DropdownMenuItem>
            </DialogTrigger>
            <StudyPlanner />
          </Dialog>
          <Dialog open={notesOpen} onOpenChange={setNotesOpen}>
            <DialogTrigger asChild>
              <DropdownMenuItem className="gap-2" onSelect={(e) => e.preventDefault()}>
                <FileText size={16} />
                Notes
              </DropdownMenuItem>
            </DialogTrigger>
            <Notes />
          </Dialog>
          <Dialog open={timerSettingsOpen} onOpenChange={setTimerSettingsOpen}>
            <DialogTrigger asChild>
              <DropdownMenuItem className="gap-2" onSelect={(e) => e.preventDefault()}>
                <Clock size={16} />
                Timer Settings
              </DropdownMenuItem>
            </DialogTrigger>
            <TimerSettings />
          </Dialog>
          <DropdownMenuItem className="gap-2">
            <Music size={16} />
            Study Music
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2">
            <Settings size={16} />
            Preferences
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}