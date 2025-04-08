"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Clock, 
  Star, 
  CircleSlash, 
  CheckCircle2, 
  Flame, 
  BarChart4, 
  PieChart, 
  LineChart, 
  FileClock, 
  ListChecks 
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

import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";

export default function StatisticsPage() {
  const [timeRange, setTimeRange] = useState("week");
  const [focusStats, setFocusStats] = useState({
    totalHours: "12h 35m",
    tasksCompleted: 24,
    streak: 7,
    productivityScore: 85
  });
  
  const generateChartData = () => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return days.map(day => ({
      day,
      focusMinutes: Math.floor(Math.random() * 120) + 30,
      breakMinutes: Math.floor(Math.random() * 30) + 10
    }));
  };
  
  const [chartData, setChartData] = useState(generateChartData());
  
  useEffect(() => {
    const loadStats = () => {
      try {
        if (typeof window === 'undefined') return;
        
        const studySessions = JSON.parse(localStorage.getItem('studySessions') || '[]');
        const kanbanTasks = JSON.parse(localStorage.getItem('kanban-tasks') || '[]');
        
        let totalMinutes = 0;
        studySessions.forEach((session: any) => {
          if (session.completed) {
            totalMinutes += session.duration;
          }
        });
        
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        
        const tasksCompleted = kanbanTasks.filter((t: any) => t.status === 'done').length;
        
        setFocusStats({
          totalHours: `${hours}h ${minutes}m`,
          tasksCompleted,
          streak: 7, // This would be calculated based on consecutive days with sessions
          productivityScore: 85 // This would be calculated based on various metrics
        });
        
        setChartData(generateChartData());
      } catch (e) {
        console.error("Failed to load statistics data:", e);
      }
    };
    
    loadStats();
  }, [timeRange]);
  
  const renderFocusChart = () => {
    const maxValue = Math.max(...chartData.map(d => d.focusMinutes + d.breakMinutes)) * 1.1;
    
    return (
      <div className="h-[350px] pt-4">
        <div className="flex justify-between mb-4">
          {chartData.map((data, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-xs mb-2">{data.day}</div>
              <div className="relative w-12 flex justify-center" style={{ height: '270px' }}>
                <div 
                  className="w-8 bg-primary/70 absolute bottom-0"
                  style={{ height: `${(data.focusMinutes / maxValue) * 270}px` }}
                ></div>
                <div 
                  className="w-8 bg-blue-500/70 absolute bottom-0 rounded-t-sm opacity-75"
                  style={{ 
                    height: `${(data.breakMinutes / maxValue) * 270}px`,
                    bottom: `${(data.focusMinutes / maxValue) * 270}px`
                  }}
                ></div>
              </div>
              <div className="text-xs mt-2 text-foreground/60">{data.focusMinutes}m</div>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-6 justify-center">
          <div className="flex items-center text-xs">
            <div className="w-3 h-3 rounded-sm bg-primary mr-2"></div>
            Focus Time
          </div>
          <div className="flex items-center text-xs">
            <div className="w-3 h-3 rounded-sm bg-blue-500/70 mr-2"></div>
            Break Time
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BarChart3 className="text-primary" />
            Statistics & Insights
          </h2>
          <p className="text-foreground/60 mt-1">
            Track your study patterns and productivity
          </p>
        </div>
        
        <div className="flex gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px] h-9">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button className="gap-1">
            <TrendingUp size={16} />
            Export Data
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="border-white/10 bg-background/50">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
              <Clock size={18} className="text-primary" />
            </div>
            <div>
              <div className="text-sm text-foreground/60">Total Focus Time</div>
              <div className="text-2xl font-bold">{focusStats.totalHours}</div>
              <div className="text-xs text-green-500">↑ 15% from last week</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-white/10 bg-background/50">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-green-500/15 flex items-center justify-center">
              <CheckCircle2 size={18} className="text-green-500" />
            </div>
            <div>
              <div className="text-sm text-foreground/60">Tasks Completed</div>
              <div className="text-2xl font-bold">{focusStats.tasksCompleted}</div>
              <div className="text-xs text-green-500">↑ 8% from last week</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-white/10 bg-background/50">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-500/15 flex items-center justify-center">
              <Flame size={18} className="text-blue-500" />
            </div>
            <div>
              <div className="text-sm text-foreground/60">Streak</div>
              <div className="text-2xl font-bold">{focusStats.streak} days</div>
              <div className="text-xs text-foreground/60">Best: 14 days</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-white/10 bg-background/50">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-yellow-500/15 flex items-center justify-center">
              <Star size={18} className="text-yellow-500" />
            </div>
            <div>
              <div className="text-sm text-foreground/60">Productivity Score</div>
              <div className="text-2xl font-bold">{focusStats.productivityScore}/100</div>
              <div className="text-xs text-green-500">↑ 5 points</div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="focus" className="space-y-4">
        <TabsList>
          <TabsTrigger value="focus">Focus Time</TabsTrigger>
          <TabsTrigger value="tasks">Task Completion</TabsTrigger>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
          <TabsTrigger value="patterns">Study Patterns</TabsTrigger>
        </TabsList>
        
        <TabsContent value="focus">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-white/10 col-span-2 h-[500px]">
              <CardHeader>
                <CardTitle className="text-base font-medium">Daily Focus Time</CardTitle>
              </CardHeader>
              <CardContent>
                {renderFocusChart()}
              </CardContent>
            </Card>
            
            <Card className="border-white/10 h-[500px]">
              <CardHeader>
                <CardTitle className="text-base font-medium">Focus Sessions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Most Productive Day</span>
                    <span className="text-foreground/60">Tuesday</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Average Session Length</span>
                      <span className="text-foreground/60">28 minutes</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Longest Session</span>
                      <span className="text-foreground/60">1h 15m</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Total Sessions</span>
                      <span className="text-foreground/60">32</span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-white/10 pt-4">
                  <div className="text-sm font-medium mb-2">Time of Day</div>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="p-2 bg-primary/5 rounded-md">
                      <div className="text-xs text-foreground/60">Morning</div>
                      <div className="font-medium">35%</div>
                    </div>
                    <div className="p-2 bg-primary/15 rounded-md">
                      <div className="text-xs text-foreground/60">Afternoon</div>
                      <div className="font-medium">45%</div>
                    </div>
                    <div className="p-2 bg-primary/10 rounded-md">
                      <div className="text-xs text-foreground/60">Evening</div>
                      <div className="font-medium">15%</div>
                    </div>
                    <div className="p-2 bg-primary/5 rounded-md">
                      <div className="text-xs text-foreground/60">Night</div>
                      <div className="font-medium">5%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="tasks">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-white/10 col-span-2">
              <CardHeader>
                <CardTitle className="text-base font-medium">Task Completion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center flex-col">
                  <LineChart size={48} className="text-primary/50 mb-4" />
                  <div className="text-center text-foreground/60 text-sm">
                    Task completion trend chart would go here
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-white/10">
              <CardHeader>
                <CardTitle className="text-base font-medium">Task Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="flex items-center gap-1">
                      <ListChecks size={14} className="text-primary" />
                      Task Completion Rate
                    </span>
                    <span className="font-medium">78%</span>
                  </div>
                  <div className="h-2 bg-background rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="flex items-center gap-1">
                      <FileClock size={14} className="text-primary" />
                      On-Time Completion
                    </span>
                    <span className="font-medium">92%</span>
                  </div>
                  <div className="h-2 bg-background rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                
                <div className="border-t border-white/10 pt-4 mt-4">
                  <div className="text-sm font-medium mb-2">Task Categories</div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs">
                      <span>Reading</span>
                      <span>8 tasks</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Problem Sets</span>
                      <span>6 tasks</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Assignments</span>
                      <span>5 tasks</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Revision</span>
                      <span>3 tasks</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Projects</span>
                      <span>2 tasks</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="subjects">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-white/10 col-span-2">
              <CardHeader>
                <CardTitle className="text-base font-medium">Subject Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center flex-col">
                  <PieChart size={48} className="text-primary/50 mb-4" />
                  <div className="text-center text-foreground/60 text-sm">
                    Subject distribution chart would go here
                  </div>
                  <div className="flex flex-wrap gap-3 justify-center mt-6">
                    <div className="flex items-center text-xs">
                      <div className="w-3 h-3 rounded-sm bg-blue-500 mr-2"></div>
                      Mathematics (35%)
                    </div>
                    <div className="flex items-center text-xs">
                      <div className="w-3 h-3 rounded-sm bg-green-500 mr-2"></div>
                      Physics (25%)
                    </div>
                    <div className="flex items-center text-xs">
                      <div className="w-3 h-3 rounded-sm bg-purple-500 mr-2"></div>
                      Literature (15%)
                    </div>
                    <div className="flex items-center text-xs">
                      <div className="w-3 h-3 rounded-sm bg-yellow-500 mr-2"></div>
                      Chemistry (15%)
                    </div>
                    <div className="flex items-center text-xs">
                      <div className="w-3 h-3 rounded-sm bg-red-500 mr-2"></div>
                      History (10%)
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-white/10">
              <CardHeader>
                <CardTitle className="text-base font-medium">Subject Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span>Mathematics</span>
                    <span className="text-green-500">↑ 12%</span>
                  </div>
                  <div className="h-2 bg-background rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span>Physics</span>
                    <span className="text-green-500">↑ 8%</span>
                  </div>
                  <div className="h-2 bg-background rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span>Literature</span>
                    <span className="text-green-500">↑ 15%</span>
                  </div>
                  <div className="h-2 bg-background rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span>Chemistry</span>
                    <span className="text-red-500">↓ 3%</span>
                  </div>
                  <div className="h-2 bg-background rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span>History</span>
                    <span className="text-green-500">↑ 5%</span>
                  </div>
                  <div className="h-2 bg-background rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="patterns">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-white/10">
              <CardHeader>
                <CardTitle className="text-base font-medium">Study Time by Day</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Monday</span>
                      <span className="text-foreground/60">2.5 hours</span>
                    </div>
                    <div className="h-2 bg-background rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Tuesday</span>
                      <span className="text-foreground/60">3 hours</span>
                    </div>
                    <div className="h-2 bg-background rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Wednesday</span>
                      <span className="text-foreground/60">1.5 hours</span>
                    </div>
                    <div className="h-2 bg-background rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '50%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Thursday</span>
                      <span className="text-foreground/60">2 hours</span>
                    </div>
                    <div className="h-2 bg-background rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Friday</span>
                      <span className="text-foreground/60">1 hour</span>
                    </div>
                    <div className="h-2 bg-background rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '35%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Saturday</span>
                      <span className="text-foreground/60">1.5 hours</span>
                    </div>
                    <div className="h-2 bg-background rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '50%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Sunday</span>
                      <span className="text-foreground/60">1 hour</span>
                    </div>
                    <div className="h-2 bg-background rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '35%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-white/10">
              <CardHeader>
                <CardTitle className="text-base font-medium">Productivity Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border border-white/10 rounded-md space-y-2">
                  <div className="text-sm font-medium">Best Study Time</div>
                  <div className="text-2xl font-bold text-primary">9:00 AM - 11:00 AM</div>
                  <div className="text-xs text-foreground/60">Based on your focus scores and task completion</div>
                </div>
                
                <div className="p-4 border border-white/10 rounded-md space-y-2">
                  <div className="text-sm font-medium">Most Productive Environment</div>
                  <div className="text-lg font-medium">Library</div>
                  <div className="text-xs text-foreground/60">You complete 35% more tasks here</div>
                </div>
                
                <div className="p-4 border border-white/10 rounded-md space-y-2">
                  <div className="text-sm font-medium">Focus Boosters</div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <div className="px-2 py-1 bg-primary/10 rounded-full text-xs">
                      Study Music
                    </div>
                    <div className="px-2 py-1 bg-primary/10 rounded-full text-xs">
                      Pomodoro Technique
                    </div>
                    <div className="px-2 py-1 bg-primary/10 rounded-full text-xs">
                      Morning Study
                    </div>
                    <div className="px-2 py-1 bg-primary/10 rounded-full text-xs">
                      Note-Taking
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 