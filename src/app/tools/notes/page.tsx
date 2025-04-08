"use client";

import { Notes } from "@/components/notes";

export default function NotesPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Study Notes</h2>
        <p className="text-foreground/60 mt-1">
          Organize your study materials and take notes
        </p>
      </div>
      
      <div className="minimalist-card border-white/5 p-4 rounded-xl">
        <Notes />
      </div>
    </div>
  );
} 