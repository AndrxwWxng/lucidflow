"use client";

import { StudyPlanner } from "@/components/study-planner";

export default function PlannerPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Study Planner</h2>
        <p className="text-foreground/60 mt-1">
          Plan your study sessions and track your progress
        </p>
      </div>
      
      <div className="minimalist-card border-white/5 p-4 rounded-xl">
        <StudyPlanner />
      </div>
    </div>
  );
} 