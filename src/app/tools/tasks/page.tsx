"use client";

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
  CheckSquare
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
import { useState } from "react";

export default function TasksPage() {
  // Task stats - these would be calculated from actual task data in a real app
  const taskStats = {
    total: 12,
    completed: 5,
    inProgress: 3,
    todo: 4,
    completionRate: 42,
  };
  
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
            <Select defaultValue="all">
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
        
        {/* Stats Cards */}
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
      
      {/* Main Kanban Board */}
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
      
      {/* Additional features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card className="border-white/10 col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-medium">Study Task Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <div className="px-3 py-1 bg-red-500/10 text-red-500 rounded-full text-xs flex items-center">
                <Tag size={12} className="mr-1" /> Math
              </div>
              <div className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-xs flex items-center">
                <Tag size={12} className="mr-1" /> Physics
              </div>
              <div className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-xs flex items-center">
                <Tag size={12} className="mr-1" /> Chemistry
              </div>
              <div className="px-3 py-1 bg-purple-500/10 text-purple-500 rounded-full text-xs flex items-center">
                <Tag size={12} className="mr-1" /> History
              </div>
              <div className="px-3 py-1 bg-yellow-500/10 text-yellow-500 rounded-full text-xs flex items-center">
                <Tag size={12} className="mr-1" /> Literature
              </div>
              <div className="px-3 py-1 bg-background/50 border border-white/10 rounded-full text-xs flex items-center">
                <Tag size={12} className="mr-1" /> Add Tag...
              </div>
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
            
            <Button variant="link" className="w-full mt-4 text-xs">
              View Full Analytics
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 