"use client"

import { useState } from 'react'
import { Button } from './ui/button'
import { FileText, Save, Trash, Plus } from 'lucide-react'

interface Note {
  id: string
  title: string
  content: string
  date: string
}

export function Notes() {
  const [notes, setNotes] = useState<Note[]>([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)

  const addNote = () => {
    if (!title.trim() || !content.trim()) return
    
    if (selectedNote) {
      setNotes(notes.map(note => 
        note.id === selectedNote.id 
          ? { ...note, title, content, date: new Date().toISOString() }
          : note
      ))
      setSelectedNote(null)
    } else {
      const newNote: Note = {
        id: Date.now().toString(),
        title,
        content,
        date: new Date().toISOString(),
      }
      setNotes([...notes, newNote])
    }
    
    setTitle('')
    setContent('')
  }

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id))
    if (selectedNote?.id === id) {
      setSelectedNote(null)
      setTitle('')
      setContent('')
    }
  }

  return (
    <div className="grid grid-cols-12 gap-6 h-[600px]">
      <div className="col-span-4 space-y-3 overflow-auto pr-2">
        <Button
          variant="outline"
          className="w-full justify-start gap-2 h-auto py-3"
          onClick={() => {
            setSelectedNote(null)
            setTitle('')
            setContent('')
          }}
        >
          <Plus size={16} />
          New Note
        </Button>
        {notes.map(note => (
          <div
            key={note.id}
            className={`glass-effect p-4 rounded-lg cursor-pointer transition-colors ${
              selectedNote?.id === note.id ? 'bg-primary/20 ring-2 ring-primary' : 'hover:bg-primary/10'
            }`}
            onClick={() => {
              setSelectedNote(note)
              setTitle(note.title)
              setContent(note.content)
            }}
          >
            <h4 className="font-medium text-lg truncate">{note.title}</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {new Date(note.date).toLocaleDateString()}
            </p>
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
              {note.content}
            </p>
          </div>
        ))}
      </div>
      <div className="col-span-8 flex flex-col gap-4">
        <div className="glass-effect p-4 rounded-lg space-y-4 flex-1">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title..."
            className="w-full rounded-md bg-secondary px-3 py-2 text-lg font-medium ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your notes here..."
            className="w-full flex-1 rounded-md bg-secondary p-3 text-sm resize-none ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <div className="flex justify-between">
          <Button
            variant="destructive"
            className="gap-2"
            onClick={() => selectedNote && deleteNote(selectedNote.id)}
            disabled={!selectedNote}
          >
            <Trash size={16} />
            Delete Note
          </Button>
          <Button className="gap-2" onClick={addNote}>
            <Save size={16} />
            {selectedNote ? 'Update Note' : 'Save Note'}
          </Button>
        </div>
      </div>
    </div>
  )
}