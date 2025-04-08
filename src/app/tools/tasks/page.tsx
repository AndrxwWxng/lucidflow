"use client";

import { useState, useEffect } from "react";
import { KanbanBoard } from "@/components/kanban/board";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Layers, 
  ListChecks, 
  BarChart3, 
  Calendar, 
  Tag,
  Filter, 
  Clock, 
  CheckSquare,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface TaskTag {
  id: string;
  name: string;
  color: string;
}

export default function TasksPage() {
  const [taskView, setTaskView] = useState("all");
  const [tags, setTags] = useState<TaskTag[]>([]);
  const [newTagName, setNewTagName] = useState("");
  const [newTagColor, setNewTagColor] = useState("blue");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showTagDialog, setShowTagDialog] = useState(false);
  
  const availableColors = [
    { name: "red", class: "bg-red-500/10 text-red-500" },
    { name: "blue", class: "bg-blue-500/10 text-blue-500" },
    { name: "green", class: "bg-green-500/10 text-green-500" },
    { name: "purple", class: "bg-purple-500/10 text-purple-500" },
    { name: "yellow", class: "bg-yellow-500/10 text-yellow-500" },
    { name: "pink", class: "bg-pink-500/10 text-pink-500" },
    { name: "cyan", class: "bg-cyan-500/10 text-cyan-500" },
  ];
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const savedTags = localStorage.getItem('studyTaskTags');
    if (savedTags) {
      try {
        setTags(JSON.parse(savedTags));
      } catch (e) {
        console.error("Failed to parse tags:", e);
      }
    } else {
      const defaultTags = [
        { id: "1", name: "Math", color: "red" },
        { id: "2", name: "Physics", color: "blue" },
        { id: "3", name: "Chemistry", color: "green" },
        { id: "4", name: "History", color: "purple" },
        { id: "5", name: "Literature", color: "yellow" },
      ];
      setTags(defaultTags);
      localStorage.setItem('studyTaskTags', JSON.stringify(defaultTags));
    }
  }, []);
  
  const addTag = () => {
    if (!newTagName.trim() || typeof window === 'undefined') return;
    
    const newTag: TaskTag = {
      id: Date.now().toString(),
      name: newTagName.trim(),
      color: newTagColor
    };
    
    const updatedTags = [...tags, newTag];
    setTags(updatedTags);
    localStorage.setItem('studyTaskTags', JSON.stringify(updatedTags));
    
    setNewTagName("");
    setShowTagDialog(false);
  };
  
  const deleteTag = (tagId: string) => {
    if (typeof window === 'undefined') return;
    
    const updatedTags = tags.filter(tag => tag.id !== tagId);
    setTags(updatedTags);
    localStorage.setItem('studyTaskTags', JSON.stringify(updatedTags));
    setSelectedTags(selectedTags.filter(id => id !== tagId));
  };
  
  const toggleTagSelection = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) ? prev.filter(id => id !== tagId) : [...prev, tagId]
    );
  };
  
  const getColorClass = (colorName: string) => {
    return availableColors.find(c => c.name === colorName)?.class || "bg-primary/10 text-primary";
  };
  
  const getTaskStats = () => {
    const stats = {
      total: 12,
      completed: 5,
      inProgress: 3,
      todo: 4,
      completionRate: 42,
    };
    
    return stats;
  };
  
  const taskStats = getTaskStats();
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Layers className="text-primary" />
            Study Tasks
          </h2>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="gap-1">
              <Filter size={14} />
              Filter
            </Button>
            <Select value={taskView} onValueChange={setTaskView}>
              <SelectTrigger className="w-[140px] h-9">
                <SelectValue placeholder="View" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Tasks</SelectItem>
                  <SelectItem value="today">Due Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="priority">High Priority</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button className="gap-1">
              <Calendar size={14} />
              Schedule Task
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-white/10 bg-background/50">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
                <Layers size={18} className="text-primary" />
              </div>
              <div>
                <div className="text-sm text-foreground/60">Total Tasks</div>
                <div className="text-2xl font-bold">{taskStats.total}</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-white/10 bg-background/50">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-green-500/15 flex items-center justify-center">
                <CheckSquare size={18} className="text-green-500" />
              </div>
              <div>
                <div className="text-sm text-foreground/60">Completed</div>
                <div className="text-2xl font-bold">{taskStats.completed}</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-white/10 bg-background/50">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-500/15 flex items-center justify-center">
                <Clock size={18} className="text-blue-500" />
              </div>
              <div>
                <div className="text-sm text-foreground/60">In Progress</div>
                <div className="text-2xl font-bold">{taskStats.inProgress}</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-white/10 bg-background/50">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-yellow-500/15 flex items-center justify-center">
                <BarChart3 size={18} className="text-yellow-500" />
              </div>
              <div>
                <div className="text-sm text-foreground/60">Completion Rate</div>
                <div className="text-2xl font-bold">{taskStats.completionRate}%</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card className="border-white/10">
        <CardHeader className="pb-0">
          <CardTitle className="text-lg font-medium">Task Board</CardTitle>
        </CardHeader>
        <CardContent className="p-5">
          <div className="h-full">
            <KanbanBoard />
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card className="border-white/10 col-span-2">
          <CardHeader className="flex flex-row items-center justify-between py-5">
            <CardTitle className="text-base font-medium">Study Task Tags</CardTitle>
            <Dialog open={showTagDialog} onOpenChange={setShowTagDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <Plus size={14} />
                  Add Tag
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Tag</DialogTitle>
                  <DialogDescription>
                    Add a new tag to categorize your study tasks.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tag Name</label>
                    <Input 
                      value={newTagName} 
                      onChange={e => setNewTagName(e.target.value)} 
                      placeholder="e.g., Biology"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tag Color</label>
                    <div className="flex flex-wrap gap-2">
                      {availableColors.map(color => (
                        <button
                          key={color.name}
                          type="button"
                          onClick={() => setNewTagColor(color.name)}
                          className={`w-8 h-8 rounded-full ${color.class} ${
                            newTagColor === color.name ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowTagDialog(false)}>Cancel</Button>
                  <Button onClick={addTag}>Create Tag</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <div 
                  key={tag.id} 
                  className={`px-3 py-1 ${getColorClass(tag.color)} rounded-full text-xs flex items-center cursor-pointer ${
                    selectedTags.includes(tag.id) ? 'ring-1 ring-primary' : ''
                  }`}
                  onClick={() => toggleTagSelection(tag.id)}
                >
                  <Tag size={12} className="mr-1" /> {tag.name}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTag(tag.id);
                    }}
                    className="ml-2 opacity-70 hover:opacity-100"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-white/10">
          <CardHeader>
            <CardTitle className="text-base font-medium">Weekly Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Monday</span>
                  <span className="text-foreground/60">2/3</span>
                </div>
                <div className="h-2 bg-background rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '66%' }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Tuesday</span>
                  <span className="text-foreground/60">3/3</span>
                </div>
                <div className="h-2 bg-background rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Wednesday</span>
                  <span className="text-foreground/60">1/4</span>
                </div>
                <div className="h-2 bg-background rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Thursday</span>
                  <span className="text-foreground/60">0/2</span>
                </div>
                <div className="h-2 bg-background rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
            </div>
            
            <Button variant="link" className="w-full mt-4 text-xs" onClick={() => window.location.href = '/tools/statistics'}>
              View Full Analytics
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 