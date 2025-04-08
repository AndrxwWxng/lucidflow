"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader,
  DialogTitle,
  DialogTrigger 
} from "@/components/ui/dialog"
import { Calculator } from "@/components/calculator"
import { StudyPlanner } from "@/components/study-planner"
import { Notes } from "@/components/notes"
import { TimerSettings } from "@/components/timer-settings"
import { Preferences } from "@/components/preferences"
import { 
  Brain, 
  Calculator as CalculatorIcon, 
  Calendar, 
  Clock, 
  FileText, 
  Music, 
  Settings,
  BookOpen,
  ListTodo,
  Layers,
  ChevronRight,
} from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { Flashcards } from "./flashcards"

export function StudyTools() {
  const [activeDialog, setActiveDialog] = useState<string | null>(null);
  
  const handleDialogChange = (dialogName: string | null) => {
    setActiveDialog(dialogName);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="gap-2 text-sm">
            <Brain size={15} />
            Study Tools
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48 p-1">
          <Dialog open={activeDialog === 'calculator'} onOpenChange={(open) => handleDialogChange(open ? 'calculator' : null)}>
            <DialogTrigger asChild>
              <DropdownMenuItem className="gap-2 py-1.5 cursor-pointer" onSelect={(e) => e.preventDefault()}>
                <CalculatorIcon size={15} className="text-primary/80" />
                Calculator
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Calculator</DialogTitle>
              </DialogHeader>
              <Calculator />
            </DialogContent>
          </Dialog>
          
          <Dialog open={activeDialog === 'planner'} onOpenChange={(open) => handleDialogChange(open ? 'planner' : null)}>
            <DialogTrigger asChild>
              <DropdownMenuItem className="gap-2 py-1.5 cursor-pointer" onSelect={(e) => e.preventDefault()}>
                <Calendar size={15} className="text-primary/80" />
                Study Planner
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Study Planner</DialogTitle>
              </DialogHeader>
              <StudyPlanner />
            </DialogContent>
          </Dialog>
          
          <Dialog open={activeDialog === 'notes'} onOpenChange={(open) => handleDialogChange(open ? 'notes' : null)}>
            <DialogTrigger asChild>
              <DropdownMenuItem className="gap-2 py-1.5 cursor-pointer" onSelect={(e) => e.preventDefault()}>
                <FileText size={15} className="text-primary/80" />
                Notes
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Study Notes</DialogTitle>
              </DialogHeader>
              <Notes />
            </DialogContent>
          </Dialog>
          
          <Dialog open={activeDialog === 'timer'} onOpenChange={(open) => handleDialogChange(open ? 'timer' : null)}>
            <DialogTrigger asChild>
              <DropdownMenuItem className="gap-2 py-1.5 cursor-pointer" onSelect={(e) => e.preventDefault()}>
                <Clock size={15} className="text-primary/80" />
                Timer Settings
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Timer Settings</DialogTitle>
              </DialogHeader>
              <TimerSettings />
            </DialogContent>
          </Dialog>
          
          <DropdownMenuItem asChild className="gap-2 py-1.5 cursor-pointer">
            <a href="#music" className="flex items-center gap-2">
              <Music size={15} className="text-primary/80" />
              Study Music
            </a>
          </DropdownMenuItem>
          
          <Dialog open={activeDialog === 'flashcards'} onOpenChange={(open) => handleDialogChange(open ? 'flashcards' : null)}>
            <DialogTrigger asChild>
              <DropdownMenuItem id="flashcardsDialogTrigger" className="gap-2 py-1.5 cursor-pointer" onSelect={(e) => e.preventDefault()}>
                <BookOpen size={15} className="text-primary/80" />
                Flashcards
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Flashcards</DialogTitle>
              </DialogHeader>
              <Flashcards />
            </DialogContent>
          </Dialog>
          
          <DropdownMenuSeparator />
          
          <Dialog open={activeDialog === 'preferences'} onOpenChange={(open) => handleDialogChange(open ? 'preferences' : null)}>
            <DialogTrigger asChild>
              <DropdownMenuItem className="gap-2 py-1.5 cursor-pointer" onSelect={(e) => e.preventDefault()}>
                <Settings size={15} className="text-primary/80" />
                Preferences
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Preferences</DialogTitle>
              </DialogHeader>
              <Preferences />
            </DialogContent>
          </Dialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}