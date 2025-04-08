"use client"

import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { FileText, Save, Trash, Plus, Search, Tag, Star, ArrowDownUp, Clock } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

interface Note {
  id: string
  title: string
  content: string
  date: string
  category: string
  favorite: boolean
}

export function Notes() {
  const [notes, setNotes] = useState<Note[]>([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('general')
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'category'>('date')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const savedNotes = localStorage.getItem('study-notes')
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes))
      } catch (e) {
        console.error('Failed to load notes from localStorage')
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    localStorage.setItem('study-notes', JSON.stringify(notes))
  }, [notes])

  const addNote = () => {
    if (!title.trim()) return

    if (selectedNote) {
      setNotes(notes.map(note => 
        note.id === selectedNote.id 
          ? { ...note, title, content, category, date: new Date().toISOString() }
          : note
      ))
      setSelectedNote(null)
    } else {
      const newNote: Note = {
        id: Date.now().toString(),
        title,
        content,
        category,
        date: new Date().toISOString(),
        favorite: false
      }
      setNotes([...notes, newNote])
    }
    
    setTitle('')
    setContent('')
    setCategory('general')
  }

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id))
    if (selectedNote?.id === id) {
      setSelectedNote(null)
      setTitle('')
      setContent('')
      setCategory('general')
    }
  }

  const toggleFavorite = (id: string) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, favorite: !note.favorite } : note
    ))
  }

  const categories = ['general', 'math', 'science', 'language', 'history', 'other']
  
  const filteredNotes = notes
    .filter(note => 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        return sortDirection === 'desc' 
          ? new Date(b.date).getTime() - new Date(a.date).getTime()
          : new Date(a.date).getTime() - new Date(b.date).getTime()
      } else if (sortBy === 'title') {
        return sortDirection === 'desc'
          ? b.title.localeCompare(a.title)
          : a.title.localeCompare(b.title)
      } else {
        return sortDirection === 'desc'
          ? b.category.localeCompare(a.category)
          : a.category.localeCompare(b.category)
      }
    })

  return (
    <div className="grid grid-cols-12 gap-6 h-[600px] bg-background/60 backdrop-blur-sm rounded-lg p-6 border shadow-md">
      <div className="col-span-4 flex flex-col gap-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search notes..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            size="icon"
            variant="outline"
            onClick={() => {
              setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
            }}
            title={`Sort ${sortDirection === 'asc' ? 'descending' : 'ascending'}`}
          >
            <ArrowDownUp size={16} className={sortDirection === 'desc' ? 'rotate-180' : ''} />
          </Button>
        </div>
        
        <Select value={sortBy} onValueChange={(value) => setSortBy(value as any)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Sort by Date</SelectItem>
            <SelectItem value="title">Sort by Title</SelectItem>
            <SelectItem value="category">Sort by Category</SelectItem>
          </SelectContent>
        </Select>
        
        <Button
          variant="outline"
          className="w-full justify-start gap-2 h-auto py-3"
          onClick={() => {
            setSelectedNote(null)
            setTitle('')
            setContent('')
            setCategory('general')
          }}
        >
          <Plus size={16} />
          New Note
        </Button>
        
        <div className="flex-1 overflow-auto pr-2 space-y-2 mt-2">
          {filteredNotes.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchQuery ? "No matching notes found" : "No notes yet"}
            </div>
          ) : (
            filteredNotes.map(note => (
              <div
                key={note.id}
                className={`p-4 rounded-lg cursor-pointer transition-colors bg-card border ${
                  selectedNote?.id === note.id ? 'ring-2 ring-primary border-primary' : 'hover:bg-card/80'
                }`}
                onClick={() => {
                  setSelectedNote(note)
                  setTitle(note.title)
                  setContent(note.content)
                  setCategory(note.category)
                }}
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-lg truncate flex-1">{note.title}</h4>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6" 
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(note.id)
                    }}
                  >
                    <Star size={16} className={note.favorite ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"} />
                  </Button>
                </div>
                <div className="flex gap-2 items-center mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary`}>
                    {note.category}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center">
                    <Clock size={12} className="mr-1" />
                    {new Date(note.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  {note.content || "(No content)"}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
      
      <div className="col-span-8 flex flex-col gap-4">
        <div className="flex-1 flex flex-col gap-4 bg-card rounded-lg p-6 border shadow-sm">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title..."
            className="text-lg font-medium"
          />
          
          <div className="flex gap-2 items-center">
            <Tag size={16} className="text-muted-foreground" />
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your notes here..."
            className="w-full flex-1 rounded-md bg-background p-4 text-sm resize-none ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border"
          />
        </div>
        
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button
              variant="destructive"
              className="gap-2"
              onClick={() => selectedNote && deleteNote(selectedNote.id)}
              disabled={!selectedNote}
            >
              <Trash size={16} />
              Delete
            </Button>
            {selectedNote && (
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => {
                  toggleFavorite(selectedNote.id)
                }}
              >
                <Star size={16} className={selectedNote.favorite ? "fill-yellow-400" : ""} />
                {selectedNote.favorite ? 'Unfavorite' : 'Favorite'}
              </Button>
            )}
          </div>
          <Button className="gap-2" onClick={addNote}>
            <Save size={16} />
            {selectedNote ? 'Update' : 'Save'}
          </Button>
        </div>
      </div>
    </div>
  )
}