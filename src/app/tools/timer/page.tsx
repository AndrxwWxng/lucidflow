"use client";

import { PomodoroTimer } from "@/components/pomodoro/timer";
import { TimerSettings } from "@/components/timer-settings";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Clock, 
  BarChart3, 
  Settings, 
  Bell, 
  PlayCircle, 
  PauseCircle, 
  Clock4, 
  ListChecks
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TimerPage() {
  // Focus mode toggles the minimalist view
  const [focusMode, setFocusMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Clock className="text-primary" />
          Focus Timer
        </h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setFocusMode(!focusMode)}
            className="flex items-center gap-1"
          >
            {focusMode ? (
              <>
                <Clock4 size={16} />
                <span>Normal Mode</span>
              </>
            ) : (
              <>
                <PlayCircle size={16} />
                <span>Focus Mode</span>
              </>
            )}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center gap-1"
          >
            <Settings size={16} />
            <span>Settings</span>
          </Button>
        </div>
      </div>

      {focusMode ? (
        // Focus mode - minimal UI
        <div className="flex flex-col items-center justify-center py-20">
          <div className="text-9xl font-bold text-primary mb-10">25:00</div>
          <div className="flex gap-4">
            <Button className="rounded-full h-16 w-16 p-0 flex items-center justify-center">
              <PlayCircle size={32} />
            </Button>
            <Button variant="outline" className="rounded-full h-16 w-16 p-0 flex items-center justify-center">
              <PauseCircle size={32} />
            </Button>
          </div>
        </div>
      ) : (
        // Normal mode - full interface
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2">
            <Card className="border-white/10">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Pomodoro Timer</span>
                  <span className="text-sm text-foreground/50">Session #3</span>
                </CardTitle>
                <CardDescription>
                  Use the Pomodoro technique to boost productivity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PomodoroTimer />
                
                {showSettings && (
                  <div className="mt-8 border-t border-white/10 pt-6">
                    <h3 className="text-lg font-medium mb-4">Timer Settings</h3>
                    <TimerSettings />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card className="border-white/10">
              <CardHeader>
                <CardTitle className="text-base">Today&apos;s Focus</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="font-medium">Total Focus Time</span>
                      <span className="text-foreground/60 text-sm">Today</span>
                    </div>
                    <div className="text-xl font-bold text-primary">1h 25m</div>
                  </div>
                  
                  <div className="h-2 bg-background rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  
                  <div className="flex justify-between text-sm text-foreground/60">
                    <span>Goal: 2h 30m</span>
                    <span>60% complete</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-white/10">
              <CardHeader>
                <CardTitle className="text-base">Recent Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span>Math Study</span>
                    </div>
                    <span className="text-sm text-foreground/60">25m</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span>Physics Notes</span>
                    </div>
                    <span className="text-sm text-foreground/60">50m</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      <span>Essay Writing</span>
                    </div>
                    <span className="text-sm text-foreground/60">10m</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Link href="/tools/statistics" className="w-full">
              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <BarChart3 size={16} />
                <span>View Detailed Stats</span>
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
} 