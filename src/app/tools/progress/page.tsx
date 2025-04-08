"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  GraduationCap, 
  Trophy, 
  TrendingUp, 
  Target, 
  Bookmark, 
  Star, 
  BarChart3, 
  Calendar, 
  Clock, 
  ArrowUp, 
  Award,
  CircleCheck,
  Flag,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function ProgressPage() {
  // Sample data
  const subjects = [
    { name: "Mathematics", progress: 68, total: 12, completed: 8, color: "blue" },
    { name: "Physics", progress: 45, total: 10, completed: 4, color: "green" },
    { name: "Literature", progress: 92, total: 8, completed: 7, color: "purple" },
    { name: "Chemistry", progress: 32, total: 15, completed: 5, color: "yellow" },
    { name: "History", progress: 77, total: 9, completed: 7, color: "red" },
  ];
  
  const goals = [
    { name: "Complete Calculus Course", deadline: "May 15, 2023", progress: 75 },
    { name: "Read 5 Literature Books", deadline: "June 20, 2023", progress: 60 },
    { name: "Finish Physics Project", deadline: "May 5, 2023", progress: 30 },
    { name: "Prepare for SAT Exam", deadline: "July 10, 2023", progress: 45 },
  ];
  
  const achievements = [
    { name: "Math Master", description: "Completed 50 math problems", icon: <CheckCircle2 />, date: "Apr 3" },
    { name: "Reading Champion", description: "Finished 10 books this semester", icon: <Award />, date: "Mar 28" },
    { name: "Study Streak", description: "Studied for 14 days in a row", icon: <Flag />, date: "Mar 15" },
    { name: "Perfect Score", description: "Received 100% on a quiz", icon: <Star />, date: "Feb 27" },
  ];
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <GraduationCap className="text-primary" />
            Progress Tracker
          </h2>
          <p className="text-foreground/60 mt-1">
            Monitor your learning journey and achievements
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" className="gap-1">
            <Target size={16} />
            Set New Goal
          </Button>
          <Button className="gap-1">
            <TrendingUp size={16} />
            View Report
          </Button>
        </div>
      </div>
      
      {/* Overall Progress */}
      <Card className="border-white/10 mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col justify-center">
              <div className="text-3xl font-bold text-center mb-1">64%</div>
              <div className="text-center text-foreground/60 text-sm mb-4">Overall Progress</div>
              <div className="h-3 bg-background rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '64%' }}></div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-foreground/60">
                <span>Beginner</span>
                <span>Advanced</span>
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="text-sm font-medium mb-2">Subject Breakdown</div>
              {subjects.slice(0, 3).map((subject, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>{subject.name}</span>
                    <span>{subject.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-background rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full bg-${subject.color}-500`} 
                      style={{ width: `${subject.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
              <Button variant="link" className="text-xs p-0 h-auto mt-1">View all subjects</Button>
            </div>
            
            <div className="flex flex-col justify-center space-y-2">
              <div className="flex justify-between items-center">
                <div className="text-sm">Total Study Hours</div>
                <div className="text-xl font-bold">42h</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm">Tasks Completed</div>
                <div className="text-xl font-bold">28</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm">Achievements</div>
                <div className="text-xl font-bold">12</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="subjects" className="space-y-6">
        <TabsList>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>
        
        <TabsContent value="subjects">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject, index) => (
              <Card key={index} className="border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex justify-between items-start">
                    <span>{subject.name}</span>
                    <Badge variant={subject.progress > 75 ? "default" : "outline"}>
                      {subject.progress}%
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress value={subject.progress} className="h-2 mb-4" />
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-2 bg-background/50 rounded-md">
                      <div className="text-2xl font-bold text-primary">
                        {subject.completed}
                      </div>
                      <div className="text-xs text-foreground/60">Completed</div>
                    </div>
                    <div className="p-2 bg-background/50 rounded-md">
                      <div className="text-2xl font-bold">
                        {subject.total}
                      </div>
                      <div className="text-xs text-foreground/60">Total Units</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-between">
                    <Button variant="ghost" size="sm" className="text-xs">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      Continue
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="goals">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-white/10">
              <CardHeader>
                <CardTitle className="text-base font-medium">Current Goals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {goals.map((goal, index) => (
                  <div key={index} className="p-3 border border-white/10 rounded-md space-y-2">
                    <div className="flex justify-between items-start">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <Target size={16} className="text-primary" />
                          <span className="font-medium">{goal.name}</span>
                        </div>
                        <div className="text-xs text-foreground/60 flex items-center gap-1">
                          <Calendar size={12} />
                          Due: {goal.deadline}
                        </div>
                      </div>
                      <Badge variant={goal.progress > 75 ? "default" : "outline"}>
                        {goal.progress}%
                      </Badge>
                    </div>
                    <Progress value={goal.progress} className="h-1.5" />
                  </div>
                ))}
                
                <Button variant="outline" className="w-full gap-1">
                  <Target size={14} />
                  Add New Goal
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-white/10">
              <CardHeader>
                <CardTitle className="text-base font-medium">Completed Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border border-white/10 bg-primary/5 rounded-md space-y-1">
                    <div className="flex items-center gap-2">
                      <Trophy size={16} className="text-yellow-500" />
                      <span className="font-medium">Finish Biology Assignment</span>
                    </div>
                    <div className="text-xs text-foreground/60 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        Completed: Apr 2, 2023
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        3 days early
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-3 border border-white/10 bg-primary/5 rounded-md space-y-1">
                    <div className="flex items-center gap-2">
                      <Trophy size={16} className="text-yellow-500" />
                      <span className="font-medium">Read "To Kill a Mockingbird"</span>
                    </div>
                    <div className="text-xs text-foreground/60 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        Completed: Mar 28, 2023
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        On time
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-3 border border-white/10 bg-primary/5 rounded-md space-y-1">
                    <div className="flex items-center gap-2">
                      <Trophy size={16} className="text-yellow-500" />
                      <span className="font-medium">Complete Algebra Chapter</span>
                    </div>
                    <div className="text-xs text-foreground/60 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        Completed: Mar 15, 2023
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        1 day late
                      </span>
                    </div>
                  </div>
                </div>
                
                <Button variant="link" className="w-full mt-2 text-xs">
                  View All Completed Goals
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="achievements">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-white/10 md:col-span-2">
              <CardHeader>
                <CardTitle className="text-base font-medium">Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="p-4 border border-white/10 rounded-md flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-primary">
                        {achievement.icon}
                      </div>
                      <div>
                        <div className="font-medium">{achievement.name}</div>
                        <div className="text-xs text-foreground/60 mb-1">{achievement.description}</div>
                        <div className="text-xs flex items-center gap-1">
                          <Calendar size={12} className="text-primary/60" />
                          Earned on {achievement.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button variant="link" className="w-full mt-4 text-xs">
                  View All Achievements
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-white/10">
              <CardHeader>
                <CardTitle className="text-base font-medium">Achievement Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-primary/5 rounded-md text-center">
                  <div className="text-3xl font-bold text-primary mb-1">12</div>
                  <div className="text-sm text-foreground/70">Total Achievements</div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Academic</span>
                    <span className="text-foreground/60">5</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Consistency</span>
                    <span className="text-foreground/60">3</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Milestones</span>
                    <span className="text-foreground/60">2</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Mastery</span>
                    <span className="text-foreground/60">2</span>
                  </div>
                </div>
                
                <div className="p-3 border border-white/10 rounded-md text-center text-sm space-y-1">
                  <div>Next Achievement:</div>
                  <div className="font-medium text-primary">Science Explorer</div>
                  <div className="text-xs text-foreground/60">Complete 3 more science lessons</div>
                  <Progress value={40} className="h-1.5 mt-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 