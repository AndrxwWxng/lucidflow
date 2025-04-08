"use client"

import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select } from './ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Calendar, Clock, Pencil, Plus, Target, Trash2, BookOpen, Flag, Award, BarChart, CheckCircle, Sparkles } from 'lucide-react'
import { Progress } from './ui/progress'
import { Badge } from './ui/badge'

interface StudySession {
  id: string
  subject: string
  topic: string
  duration: number
  date: string
  completed: boolean
  color: string
}

interface StudyGoal {
  id: string
  title: string
  target: number
  current: number
  unit: 'hours' | 'sessions' | 'topics'
  deadline: string
}

const subjectColors = [
  "bg-blue-500/20 text-blue-500 border-blue-500/40",
  "bg-purple-500/20 text-purple-500 border-purple-500/40",
  "bg-green-500/20 text-green-500 border-green-500/40",
  "bg-amber-500/20 text-amber-500 border-amber-500/40",
  "bg-pink-500/20 text-pink-500 border-pink-500/40",
  "bg-cyan-500/20 text-cyan-500 border-cyan-500/40",
  "bg-red-500/20 text-red-500 border-red-500/40"
];

export function StudyPlanner() {
  const [sessions, setSessions] = useState<StudySession[]>([])
  const [subject, setSubject] = useState('')
  const [topic, setTopic] = useState('')
  const [duration, setDuration] = useState(30)
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [activeTab, setActiveTab] = useState('upcoming')
  const [subjectStats, setSubjectStats] = useState<{[key: string]: {minutes: number, sessions: number}}>({})
  const [editingId, setEditingId] = useState<string | null>(null)
  
  // Study goals state
  const [goals, setGoals] = useState<StudyGoal[]>([])
  const [goalTitle, setGoalTitle] = useState('')
  const [goalTarget, setGoalTarget] = useState(10)
  const [goalUnit, setGoalUnit] = useState<'hours' | 'sessions' | 'topics'>('hours')
  const [goalDeadline, setGoalDeadline] = useState(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
  const [showGoalForm, setShowGoalForm] = useState(false)

  useEffect(() => {
    const savedSessions = localStorage.getItem('studySessions');
    const savedGoals = localStorage.getItem('studyGoals');
    
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions));
    }
    
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('studySessions', JSON.stringify(sessions));
    
    const stats: {[key: string]: {minutes: number, sessions: number}} = {};
    sessions.forEach(session => {
      if (!stats[session.subject]) {
        stats[session.subject] = { minutes: 0, sessions: 0 };
      }
      stats[session.subject].minutes += session.completed ? session.duration : 0;
      stats[session.subject].sessions += session.completed ? 1 : 0;
    });
    setSubjectStats(stats);
    
    // Update goals progress based on sessions
    if (goals.length > 0) {
      const updatedGoals = goals.map(goal => {
        let current = 0;
        
        if (goal.unit === 'hours') {
          current = Math.floor(getTotalCompletedMinutes() / 60);
        } else if (goal.unit === 'sessions') {
          current = sessions.filter(s => s.completed).length;
        } else if (goal.unit === 'topics') {
          const completedTopics = new Set(sessions.filter(s => s.completed).map(s => s.topic));
          current = completedTopics.size;
        }
        
        return { ...goal, current };
      });
      
      setGoals(updatedGoals);
      localStorage.setItem('studyGoals', JSON.stringify(updatedGoals));
    }
  }, [sessions]);

  const addSession = () => {
    if (!subject.trim()) return;
    
    let subjectColor = "";
    const existingSubject = sessions.find(s => s.subject === subject);
    
    if (existingSubject) {
      subjectColor = existingSubject.color;
    } else {
      const existingSubjects = [...new Set(sessions.map(s => s.subject))];
      const colorIndex = existingSubjects.length % subjectColors.length;
      subjectColor = subjectColors[colorIndex];
    }
    
    const newSession: StudySession = {
      id: editingId || Date.now().toString(),
      subject,
      topic,
      duration,
      date,
      completed: false,
      color: subjectColor
    }
    
    if (editingId) {
      setSessions(sessions.map(s => s.id === editingId ? newSession : s));
      setEditingId(null);
    } else {
      setSessions([...sessions, newSession]);
    }
    
    setSubject('');
    setTopic('');
  }
  
  const addGoal = () => {
    if (!goalTitle.trim()) return;
    
    const newGoal: StudyGoal = {
      id: Date.now().toString(),
      title: goalTitle,
      target: goalTarget,
      current: 0,
      unit: goalUnit,
      deadline: goalDeadline
    };
    
    const updatedGoals = [...goals, newGoal];
    setGoals(updatedGoals);
    localStorage.setItem('studyGoals', JSON.stringify(updatedGoals));
    
    // Reset form
    setGoalTitle('');
    setGoalTarget(10);
    setGoalUnit('hours');
    setShowGoalForm(false);
  }
  
  const deleteGoal = (id: string) => {
    const updatedGoals = goals.filter(g => g.id !== id);
    setGoals(updatedGoals);
    localStorage.setItem('studyGoals', JSON.stringify(updatedGoals));
  }

  const editSession = (session: StudySession) => {
    setSubject(session.subject);
    setTopic(session.topic);
    setDuration(session.duration);
    setDate(session.date);
    setEditingId(session.id);
  }

  const deleteSession = (id: string) => {
    setSessions(sessions.filter(s => s.id !== id));
  }

  const toggleComplete = (id: string) => {
    setSessions(sessions.map(s => 
      s.id === id ? {...s, completed: !s.completed} : s
    ));
  }

  const getFilteredSessions = () => {
    const today = new Date().toISOString().split('T')[0];
    
    if (activeTab === 'upcoming') {
      return sessions
        .filter(s => !s.completed && s.date >= today)
        .sort((a, b) => a.date.localeCompare(b.date));
    } else if (activeTab === 'completed') {
      return sessions
        .filter(s => s.completed)
        .sort((a, b) => b.date.localeCompare(a.date));
    } else {
      return [];
    }
  }

  const getTotalPlannedMinutes = () => {
    return sessions.reduce((total, session) => total + session.duration, 0);
  }

  const getTotalCompletedMinutes = () => {
    return sessions
      .filter(session => session.completed)
      .reduce((total, session) => total + session.duration, 0);
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="space-y-4">
          <div className="glass-effect p-3 rounded-lg space-y-3 bg-card/30">
            <div className="flex gap-2">
              <Input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject"
                className="flex-1 bg-background/50"
              />
              <Input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Topic (optional)"
                className="flex-1 bg-background/50"
              />
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Calendar size={14} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Date</span>
                </div>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-background/50"
                />
              </div>
              <div className="w-24">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Clock size={14} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Minutes</span>
                </div>
                <select
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full h-10 rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background"
                >
                  <option value={15}>15</option>
                  <option value={30}>30</option>
                  <option value={45}>45</option>
                  <option value={60}>60</option>
                  <option value={90}>90</option>
                  <option value={120}>120</option>
                </select>
              </div>
            </div>
            <Button onClick={addSession} className="w-full gap-2">
              {editingId ? (
                <>
                  <Pencil size={14} />
                  Update Session
                </>
              ) : (
                <>
                  <Plus size={14} />
                  Add Session
                </>
              )}
            </Button>
          </div>
          
          <div className="space-y-2 max-h-[240px] overflow-y-auto pr-1">
            {getFilteredSessions().map(session => (
              <div 
                key={session.id} 
                className="glass-effect p-3 rounded-lg flex items-center justify-between group border-l-4 hover:bg-card/40 transition-colors"
                style={{ borderLeftColor: session.color.split(' ')[2].split('-')[0] }}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className={`${session.color} text-xs px-2 py-0.5`}>
                      {session.subject}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(session.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-sm truncate">
                        {session.topic || "General study"}
                      </h4>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock size={12} />
                        {session.duration} min
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleComplete(session.id)}
                        className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <BookOpen size={14} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editSession(session)}
                        className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Pencil size={14} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteSession(session.id)}
                        className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {getFilteredSessions().length === 0 && (
              <div className="text-center text-muted-foreground py-6">
                No upcoming study sessions
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-3">
          <div className="space-y-2 max-h-[325px] overflow-y-auto pr-1">
            {getFilteredSessions().map(session => (
              <div 
                key={session.id} 
                className="glass-effect p-3 rounded-lg flex items-center justify-between group border-l-4 hover:bg-card/40 transition-colors"
                style={{ borderLeftColor: session.color.split(' ')[2].split('-')[0] }}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className={`${session.color} text-xs px-2 py-0.5`}>
                      {session.subject}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(session.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-sm truncate">
                        {session.topic || "General study"}
                      </h4>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock size={12} />
                        {session.duration} min
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleComplete(session.id)}
                        className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Target size={14} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteSession(session.id)}
                        className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {getFilteredSessions().length === 0 && (
              <div className="text-center text-muted-foreground py-6">
                No completed study sessions
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="goals" className="space-y-4">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm text-foreground/70">
              Track your study milestones and achievements
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowGoalForm(!showGoalForm)}
              className="gap-1.5"
            >
              {showGoalForm ? 'Cancel' : <><Plus size={14} /> Add Goal</>}
            </Button>
          </div>
          
          {showGoalForm && (
            <div className="minimalist-card p-4 mb-4 space-y-3">
              <div className="flex gap-2">
                <Input
                  placeholder="Goal title"
                  value={goalTitle}
                  onChange={(e) => setGoalTitle(e.target.value)}
                  className="flex-1"
                />
              </div>
              <div className="flex gap-3">
                <div className="w-24">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Target size={14} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Target</span>
                  </div>
                  <Input
                    type="number"
                    value={goalTarget}
                    onChange={(e) => setGoalTarget(parseInt(e.target.value) || 1)}
                    min={1}
                    className="bg-background/50"
                  />
                </div>
                <div className="w-28">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <BookOpen size={14} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Unit</span>
                  </div>
                  <select
                    value={goalUnit}
                    onChange={(e) => setGoalUnit(e.target.value as any)}
                    className="w-full h-10 rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background"
                  >
                    <option value="hours">Hours</option>
                    <option value="sessions">Sessions</option>
                    <option value="topics">Topics</option>
                  </select>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Calendar size={14} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Deadline</span>
                  </div>
                  <Input
                    type="date"
                    value={goalDeadline}
                    onChange={(e) => setGoalDeadline(e.target.value)}
                    className="bg-background/50"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={addGoal} className="gap-1.5">
                  <Flag size={14} /> Set Goal
                </Button>
              </div>
            </div>
          )}
          
          {goals.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Target className="mx-auto mb-3 opacity-20" size={32} />
              <p>No study goals set yet</p>
              <p className="text-sm mt-1">Create goals to track your study progress</p>
            </div>
          ) : (
            <div className="space-y-3">
              {goals.map(goal => {
                const progress = Math.min(100, Math.round((goal.current / goal.target) * 100));
                const isCompleted = goal.current >= goal.target;
                const daysLeft = Math.max(0, Math.ceil((new Date(goal.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
                
                return (
                  <div key={goal.id} className={`minimalist-card p-4 ${isCompleted ? 'border-green-500/30' : ''}`}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        {isCompleted ? (
                          <CheckCircle className="text-green-500" size={18} />
                        ) : (
                          <Flag className="text-primary/70" size={18} />
                        )}
                        <h3 className="font-medium">{goal.title}</h3>
                        {isCompleted && (
                          <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
                            <CheckCircle size={12} className="mr-1" /> Achieved
                          </Badge>
                        )}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6 opacity-60 hover:opacity-100"
                        onClick={() => deleteGoal(goal.id)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                    
                    <Progress value={progress} className="h-2 mb-3" />
                    
                    <div className="flex justify-between text-xs text-foreground/70">
                      <div>
                        <span className="font-medium text-foreground">{goal.current}</span>
                        /{goal.target} {goal.unit}
                      </div>
                      {!isCompleted && (
                        <div className="flex items-center gap-1.5">
                          <Calendar size={12} />
                          {daysLeft} day{daysLeft !== 1 ? 's' : ''} left
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="stats" className="space-y-4">
          <div className="glass-effect p-4 rounded-lg bg-card/30">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">Study Progress</h3>
              <span className="text-sm">
                {getTotalCompletedMinutes()} / {getTotalPlannedMinutes()} min
              </span>
            </div>
            <Progress 
              value={(getTotalCompletedMinutes() / Math.max(getTotalPlannedMinutes(), 1)) * 100} 
              className="h-2" 
            />
            
            <div className="mt-6 space-y-4">
              <h3 className="font-medium text-sm">Subject Breakdown</h3>
              <div className="space-y-3">
                {Object.entries(subjectStats).map(([subject, data]) => (
                  <div key={subject} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{subject}</span>
                      <span>{data.minutes} min ({data.sessions} sessions)</span>
                    </div>
                    <Progress 
                      value={(data.minutes / Math.max(getTotalCompletedMinutes(), 1)) * 100} 
                      className="h-1.5" 
                    />
                  </div>
                ))}
                {Object.keys(subjectStats).length === 0 && (
                  <div className="text-center text-muted-foreground py-3">
                    No data available yet
                  </div>
                )}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}