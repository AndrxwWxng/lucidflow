"use client";

import { useState, useEffect } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface Subject {
  name: string;
  progress: number;
  total: number;
  completed: number;
  color: string;
}

interface Goal {
  id: string;
  name: string;
  deadline: string;
  progress: number;
  target: number;
  current: number;
  unit: string;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  date: string;
}

export default function ProgressPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [activeTab, setActiveTab] = useState("subjects");
  const [showGoalDialog, setShowGoalDialog] = useState(false);
  
  const [newGoalName, setNewGoalName] = useState("");
  const [newGoalTarget, setNewGoalTarget] = useState(10);
  const [newGoalUnit, setNewGoalUnit] = useState("hours");
  const [newGoalDeadline, setNewGoalDeadline] = useState("");
  
  const getOverallProgress = () => {
    if (subjects.length === 0) return 0;
    
    const totalProgress = subjects.reduce((sum, subject) => sum + subject.progress, 0);
    return Math.round(totalProgress / subjects.length);
  };
  
  const getTotalStudyHours = () => {
    if (typeof window === 'undefined') return 0;
    
    const sessions = JSON.parse(localStorage.getItem('studySessions') || '[]');
    const totalMinutes = sessions
      .filter((s: any) => s.completed)
      .reduce((sum: number, session: any) => sum + session.duration, 0);
    
    return Math.round(totalMinutes / 60);
  };
  
  const getCompletedTasks = () => {
    if (typeof window === 'undefined') return 0;
    
    const tasks = JSON.parse(localStorage.getItem('kanban-tasks') || '[]');
    return tasks.filter((t: any) => t.status === 'done').length;
  };
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const studySessions = JSON.parse(localStorage.getItem('studySessions') || '[]');
    const studyGoals = JSON.parse(localStorage.getItem('studyGoals') || '[]');
    
    const subjectMap = new Map<string, {total: number, completed: number}>();
    
    studySessions.forEach((session: any) => {
      if (!subjectMap.has(session.subject)) {
        subjectMap.set(session.subject, { total: 0, completed: 0 });
      }
      
      const subjectData = subjectMap.get(session.subject)!;
      subjectData.total += 1;
      if (session.completed) {
        subjectData.completed += 1;
      }
    });
    
    const colors = ["blue", "green", "purple", "yellow", "red"];
    const subjectData: Subject[] = Array.from(subjectMap.entries()).map(([name, data], index) => ({
      name,
      total: data.total,
      completed: data.completed,
      progress: data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0,
      color: colors[index % colors.length]
    }));
    
    if (subjectData.length === 0) {
      setSubjects([
        { name: "Mathematics", progress: 68, total: 12, completed: 8, color: "blue" },
        { name: "Physics", progress: 45, total: 10, completed: 4, color: "green" },
        { name: "Literature", progress: 92, total: 8, completed: 7, color: "purple" },
        { name: "Chemistry", progress: 32, total: 15, completed: 5, color: "yellow" },
        { name: "History", progress: 77, total: 9, completed: 7, color: "red" },
      ]);
    } else {
      setSubjects(subjectData);
    }
    
    if (studyGoals.length > 0) {
      setGoals(studyGoals);
    } else {
      setGoals([
        { id: "1", name: "Complete Calculus Course", deadline: "May 15, 2023", progress: 75, target: 100, current: 75, unit: "hours" },
        { id: "2", name: "Read 5 Literature Books", deadline: "June 20, 2023", progress: 60, target: 5, current: 3, unit: "books" },
        { id: "3", name: "Finish Physics Project", deadline: "May 5, 2023", progress: 30, target: 100, current: 30, unit: "percent" },
        { id: "4", name: "Prepare for SAT Exam", deadline: "July 10, 2023", progress: 45, target: 100, current: 45, unit: "percent" },
      ]);
    }
    
    const defaultAchievements = [
      { id: "1", name: "Math Master", description: "Completed 50 math problems", icon: "CheckCircle2", date: "Apr 3" },
      { id: "2", name: "Reading Champion", description: "Finished 10 books this semester", icon: "Award", date: "Mar 28" },
      { id: "3", name: "Study Streak", description: "Studied for 14 days in a row", icon: "Flag", date: "Mar 15" },
      { id: "4", name: "Perfect Score", description: "Received 100% on a quiz", icon: "Star", date: "Feb 27" },
    ];
    
    setAchievements(defaultAchievements);
  }, []);
  
  const addNewGoal = () => {
    if (!newGoalName.trim() || !newGoalDeadline || typeof window === 'undefined') return;
    
    const newGoal: Goal = {
      id: Date.now().toString(),
      name: newGoalName,
      deadline: newGoalDeadline,
      target: newGoalTarget,
      current: 0,
      progress: 0,
      unit: newGoalUnit
    };
    
    const updatedGoals = [...goals, newGoal];
    setGoals(updatedGoals);
    localStorage.setItem("studyGoals", JSON.stringify(updatedGoals));
    
    setNewGoalName("");
    setNewGoalTarget(10);
    setNewGoalUnit("hours");
    setNewGoalDeadline("");
    setShowGoalDialog(false);
  };
  
  const renderIcon = (iconName: string) => {
    switch(iconName) {
      case "CheckCircle2": return <CheckCircle2 />;
      case "Award": return <Award />;
      case "Flag": return <Flag />;
      case "Star": return <Star />;
      default: return <Award />;
    }
  };
  
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
          <Dialog open={showGoalDialog} onOpenChange={setShowGoalDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-1">
                <Target size={16} />
                Set New Goal
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Goal</DialogTitle>
                <DialogDescription>
                  Set a new study goal to track your progress.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Goal Name</label>
                  <Input 
                    value={newGoalName} 
                    onChange={e => setNewGoalName(e.target.value)} 
                    placeholder="e.g., Complete Physics Course"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Target Value</label>
                    <Input 
                      type="number" 
                      value={newGoalTarget} 
                      onChange={e => setNewGoalTarget(parseInt(e.target.value))} 
                      min="1"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Unit</label>
                    <Select value={newGoalUnit} onValueChange={setNewGoalUnit}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hours">Hours</SelectItem>
                        <SelectItem value="days">Days</SelectItem>
                        <SelectItem value="sessions">Sessions</SelectItem>
                        <SelectItem value="books">Books</SelectItem>
                        <SelectItem value="problems">Problems</SelectItem>
                        <SelectItem value="percent">Percent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Deadline</label>
                  <Input 
                    type="date" 
                    value={newGoalDeadline} 
                    onChange={e => setNewGoalDeadline(e.target.value)} 
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowGoalDialog(false)}>Cancel</Button>
                <Button onClick={addNewGoal}>Create Goal</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button className="gap-1">
            <TrendingUp size={16} />
            View Report
          </Button>
        </div>
      </div>
      
      <Card className="border-white/10 mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col justify-center">
              <div className="text-3xl font-bold text-center mb-1">{getOverallProgress()}%</div>
              <div className="text-center text-foreground/60 text-sm mb-4">Overall Progress</div>
              <div className="h-3 bg-background rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${getOverallProgress()}%` }}></div>
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
              <Button variant="link" className="text-xs p-0 h-auto mt-1" onClick={() => setActiveTab("subjects")}>
                View all subjects
              </Button>
            </div>
            
            <div className="flex flex-col justify-center space-y-2">
              <div className="flex justify-between items-center">
                <div className="text-sm">Total Study Hours</div>
                <div className="text-xl font-bold">{getTotalStudyHours()}h</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm">Tasks Completed</div>
                <div className="text-xl font-bold">{getCompletedTasks()}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm">Achievements</div>
                <div className="text-xl font-bold">{achievements.length}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
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
                
                <Button 
                  variant="outline" 
                  className="w-full gap-1"
                  onClick={() => setShowGoalDialog(true)}
                >
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
                      <span className="font-medium">Read &quot;To Kill a Mockingbird&quot;</span>
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
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="achievements">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-white/10">
              <CardHeader>
                <CardTitle className="text-base font-medium">Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border border-white/10 rounded-md">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {renderIcon(achievement.icon)}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{achievement.name}</div>
                      <div className="text-xs text-foreground/60 mb-1">{achievement.description}</div>
                      <div className="text-xs text-foreground/50 flex items-center gap-1">
                        <Calendar size={12} />
                        {achievement.date}
                      </div>
                    </div>
                    <div>
                      <Badge variant="outline" className="ml-2">+50 XP</Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <Card className="border-white/10">
              <CardHeader>
                <CardTitle className="text-base font-medium">Achievement Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-background/50 rounded-md text-center">
                      <div className="text-3xl font-bold text-primary mb-1">{achievements.length}</div>
                      <div className="text-xs text-foreground/60">Total Achievements</div>
                    </div>
                    <div className="p-4 bg-background/50 rounded-md text-center">
                      <div className="text-3xl font-bold text-primary mb-1">350</div>
                      <div className="text-xs text-foreground/60">Total XP</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="text-sm font-medium">Upcoming Achievements</div>
                    <div className="p-3 border border-white/10 rounded-md space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Bookmark size={16} className="text-primary" />
                          <span>Study Streak: 30 Days</span>
                        </div>
                        <Badge variant="outline">75%</Badge>
                      </div>
                      <Progress value={75} className="h-1" />
                    </div>
                    
                    <div className="p-3 border border-white/10 rounded-md space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Bookmark size={16} className="text-primary" />
                          <span>Complete 50 Tasks</span>
                        </div>
                        <Badge variant="outline">56%</Badge>
                      </div>
                      <Progress value={56} className="h-1" />
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