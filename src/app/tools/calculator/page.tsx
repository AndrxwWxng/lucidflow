"use client";

import { Calculator } from "@/components/calculator";

export default function CalculatorPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Calculator</h2>
        <p className="text-foreground/60 mt-1">
          Solve mathematical problems for your studies
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="minimalist-card border-white/5 p-4 rounded-xl">
          <Calculator />
        </div>
        
        <div className="space-y-4">
          <div className="minimalist-card border-white/5 p-4 rounded-xl">
            <h3 className="text-base font-medium mb-3">History</h3>
            <div className="text-sm text-foreground/70">
              <p className="py-2 border-b border-white/5">2 + 2 = 4</p>
              <p className="py-2 border-b border-white/5">15 * 3 = 45</p>
              <p className="py-2 border-b border-white/5">100 / 4 = 25</p>
              <p className="py-2 border-b border-white/5">√16 = 4</p>
              <p className="py-2">32 - 12 = 20</p>
            </div>
          </div>
          
          <div className="minimalist-card border-white/5 p-4 rounded-xl">
            <h3 className="text-base font-medium mb-3">Tips</h3>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li>• Use keyboard shortcuts for faster calculations</li>
              <li>• Access scientific functions with the extended view</li>
              <li>• Save calculations for future reference</li>
              <li>• Convert between different units with the converter</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 