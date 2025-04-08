"use client";

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
  // These would be real data in a full implementation
  
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
          <Select defaultValue="week">
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
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="border-white/10 bg-background/50">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
              <Clock size={18} className="text-primary" />
            </div>
            <div>
              <div className="text-sm text-foreground/60">Total Focus Time</div>
              <div className="text-2xl font-bold">12h 35m</div>
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
              <div className="text-2xl font-bold">24</div>
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
              <div className="text-2xl font-bold">7 days</div>
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
              <div className="text-2xl font-bold">85/100</div>
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
            <Card className="border-white/10 col-span-2">
              <CardHeader>
                <CardTitle className="text-base font-medium">Daily Focus Time</CardTitle>
              </CardHeader>
              <CardContent>
                {/* This would be a real chart in a full implementation */}
                <div className="h-[300px] flex items-center justify-center flex-col">
                  <BarChart4 size={48} className="text-primary/50 mb-4" />
                  <div className="text-center text-foreground/60 text-sm">
                    Focus time chart visualization would go here
                  </div>
                  <div className="flex gap-4 mt-4">
                    <div className="flex items-center text-xs">
                      <div className="w-3 h-3 rounded-sm bg-primary mr-2"></div>
                      Focus Sessions
                    </div>
                    <div className="flex items-center text-xs">
                      <div className="w-3 h-3 rounded-sm bg-blue-500/70 mr-2"></div>
                      Break Time
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-white/10">
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
                      <FileClock size={14} className="text-blue-500" />
                      Avg. Time to Complete
                    </span>
                    <span className="font-medium">2.3 days</span>
                  </div>
                </div>
                
                <div className="border-t border-white/10 pt-4 mt-6">
                  <div className="text-sm font-medium mb-3">Task Types</div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Reading</span>
                      <span className="text-foreground/60">38%</span>
                    </div>
                    <div className="h-1.5 bg-background rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '38%' }}></div>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span>Problem Solving</span>
                      <span className="text-foreground/60">25%</span>
                    </div>
                    <div className="h-1.5 bg-background rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span>Essay Writing</span>
                      <span className="text-foreground/60">18%</span>
                    </div>
                    <div className="h-1.5 bg-background rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500 rounded-full" style={{ width: '18%' }}></div>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span>Other</span>
                      <span className="text-foreground/60">19%</span>
                    </div>
                    <div className="h-1.5 bg-background rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: '19%' }}></div>
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
                  <div className="grid grid-cols-3 gap-4 mt-6 w-full max-w-lg mx-auto">
                    <div className="flex items-center text-xs">
                      <div className="w-3 h-3 rounded-sm bg-blue-500 mr-2"></div>
                      Math (35%)
                    </div>
                    <div className="flex items-center text-xs">
                      <div className="w-3 h-3 rounded-sm bg-green-500 mr-2"></div>
                      Science (25%)
                    </div>
                    <div className="flex items-center text-xs">
                      <div className="w-3 h-3 rounded-sm bg-yellow-500 mr-2"></div>
                      History (15%)
                    </div>
                    <div className="flex items-center text-xs">
                      <div className="w-3 h-3 rounded-sm bg-purple-500 mr-2"></div>
                      Language (10%)
                    </div>
                    <div className="flex items-center text-xs">
                      <div className="w-3 h-3 rounded-sm bg-red-500 mr-2"></div>
                      Arts (8%)
                    </div>
                    <div className="flex items-center text-xs">
                      <div className="w-3 h-3 rounded-sm bg-gray-500 mr-2"></div>
                      Other (7%)
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-white/10">
              <CardHeader>
                <CardTitle className="text-base font-medium">Subject Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium mb-3">Most Studied</div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 bg-primary/5 p-2 rounded-md">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <span className="text-xs font-medium">1</span>
                      </div>
                      <div>
                        <div className="font-medium">Mathematics</div>
                        <div className="text-xs text-foreground/60">4h 15m total</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 bg-background/50 p-2 rounded-md">
                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <span className="text-xs font-medium">2</span>
                      </div>
                      <div>
                        <div className="font-medium">Physics</div>
                        <div className="text-xs text-foreground/60">3h 40m total</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 bg-background/50 p-2 rounded-md">
                      <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                        <span className="text-xs font-medium">3</span>
                      </div>
                      <div>
                        <div className="font-medium">Literature</div>
                        <div className="text-xs text-foreground/60">2h 50m total</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-white/10 pt-4">
                  <div className="text-sm font-medium mb-3">Recommendations</div>
                  <div className="space-y-2">
                    <div className="text-xs text-foreground/70 p-2 bg-background/50 rounded-md">
                      Increase focus time on Chemistry to prepare for upcoming exam.
                    </div>
                    <div className="text-xs text-foreground/70 p-2 bg-background/50 rounded-md">
                      Consider more practice in History - completion rate is below average (65%).
                    </div>
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
                <CardTitle className="text-base font-medium">Productivity By Time of Day</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] flex items-center justify-center flex-col">
                  <LineChart size={48} className="text-primary/50 mb-4" />
                  <div className="text-center text-foreground/60 text-sm">
                    Productivity chart by hour would go here
                  </div>
                </div>
                <div className="border-t border-white/10 pt-4 mt-2">
                  <div className="text-sm font-medium">Peak Productivity Times</div>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    <div className="p-2 border border-white/10 rounded-md text-center">
                      <div className="text-primary font-medium">9-11 AM</div>
                      <div className="text-xs text-foreground/60">Morning Focus</div>
                    </div>
                    <div className="p-2 border border-white/10 rounded-md text-center">
                      <div className="text-primary font-medium">2-4 PM</div>
                      <div className="text-xs text-foreground/60">Afternoon</div>
                    </div>
                    <div className="p-2 border border-white/10 rounded-md text-center">
                      <div className="text-primary font-medium">8-10 PM</div>
                      <div className="text-xs text-foreground/60">Evening</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-white/10">
              <CardHeader>
                <CardTitle className="text-base font-medium">Weekly Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] flex items-center justify-center flex-col">
                  <BarChart4 size={48} className="text-primary/50 mb-4" />
                  <div className="text-center text-foreground/60 text-sm">
                    Weekly study patterns chart would go here
                  </div>
                </div>
                <div className="border-t border-white/10 pt-4 mt-2">
                  <div className="text-sm font-medium">Insights</div>
                  <div className="mt-2 space-y-2">
                    <div className="p-2 border border-white/10 rounded-md text-xs text-foreground/70">
                      Most productive day: Tuesday (avg. 2.5 hours of focus time)
                    </div>
                    <div className="p-2 border border-white/10 rounded-md text-xs text-foreground/70">
                      Least productive day: Friday (avg. 45 minutes of focus time)
                    </div>
                    <div className="p-2 border border-primary/20 bg-primary/5 rounded-md text-xs">
                      Recommendation: Try to maintain consistent study schedule on weekends
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