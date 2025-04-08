"use client";

import { Calculator } from "@/components/calculator";
import { Sidebar } from "@/components/sidebar";
import { MotivationalQuotes } from "@/components/motivational-quotes";
import { Calculator as CalcIcon, Keyboard, Lightbulb, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function CalculatorPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">

      <div className="flex-1 flex flex-col overflow-hidden">

        <div className="flex-1 overflow-y-auto">
          <main className="max-w-6xl mx-auto p-4 md:p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Calculator</h2>
              <p className="text-foreground/60 mt-1">
                Solve mathematical problems for your studies
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 glass-card p-5 rounded-xl">
                <Calculator />
              </div>
              
              <div className="space-y-6">
                <div className="glass-card p-5 rounded-xl">
                  <h3 className="text-base font-medium mb-3 flex items-center gap-2">
                    <Keyboard size={16} className="text-primary" />
                    <span>Keyboard Shortcuts</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center justify-between p-2 bg-background/30 rounded-md">
                      <span>Numbers</span>
                      <code className="text-xs bg-background/50 px-1.5 py-0.5 rounded">0-9</code>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-background/30 rounded-md">
                      <span>Add</span>
                      <code className="text-xs bg-background/50 px-1.5 py-0.5 rounded">+</code>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-background/30 rounded-md">
                      <span>Subtract</span>
                      <code className="text-xs bg-background/50 px-1.5 py-0.5 rounded">-</code>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-background/30 rounded-md">
                      <span>Multiply</span>
                      <code className="text-xs bg-background/50 px-1.5 py-0.5 rounded">*</code>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-background/30 rounded-md">
                      <span>Divide</span>
                      <code className="text-xs bg-background/50 px-1.5 py-0.5 rounded">/</code>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-background/30 rounded-md">
                      <span>Calculate</span>
                      <code className="text-xs bg-background/50 px-1.5 py-0.5 rounded">Enter</code>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-background/30 rounded-md">
                      <span>Clear All</span>
                      <code className="text-xs bg-background/50 px-1.5 py-0.5 rounded">Esc</code>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-background/30 rounded-md">
                      <span>Backspace</span>
                      <code className="text-xs bg-background/50 px-1.5 py-0.5 rounded">⌫</code>
                    </div>
                  </div>
                </div>
                
                <div className="glass-card p-5 rounded-xl">
                  <MotivationalQuotes />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
} 