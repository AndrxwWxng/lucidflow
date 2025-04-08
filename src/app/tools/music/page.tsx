"use client";

import { SpotifyPlayer } from "@/components/spotify-player";
import { Music, PlayCircle, SkipForward, SkipBack, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MusicPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Study Music</h2>
        <p className="text-foreground/60 mt-1">
          Focus better with background music for studying
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-4">
          <div className="minimalist-card border-white/5 p-4 rounded-xl">
            <h3 className="text-base font-medium mb-3 flex items-center gap-2">
              <Music size={16} className="text-primary" />
              <span>Categories</span>
            </h3>
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start text-left">Lo-Fi</Button>
              <Button variant="ghost" className="w-full justify-start text-left">Classical</Button>
              <Button variant="ghost" className="w-full justify-start text-left">Nature Sounds</Button>
              <Button variant="ghost" className="w-full justify-start text-left">Ambient</Button>
              <Button variant="ghost" className="w-full justify-start text-left">Focus Beats</Button>
              <Button variant="ghost" className="w-full justify-start text-left">Study Jazz</Button>
            </div>
          </div>
          
          <div className="minimalist-card border-white/5 p-4 rounded-xl">
            <h3 className="text-base font-medium mb-3 flex items-center gap-2">
              <Radio size={16} className="text-primary" />
              <span>Radio Stations</span>
            </h3>
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start text-left">Study Radio</Button>
              <Button variant="ghost" className="w-full justify-start text-left">Focus FM</Button>
              <Button variant="ghost" className="w-full justify-start text-left">Concentration Channel</Button>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-3">
          <div className="minimalist-card border-white/5 p-4 rounded-xl">
            <h3 className="text-base font-medium mb-4">Now Playing</h3>
            <SpotifyPlayer />
            
            <div className="mt-8">
              <h3 className="text-base font-medium mb-4">Recommended Playlists</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <PlaylistCard 
                  title="Deep Focus" 
                  desc="Concentration enhancing electronic music" 
                  duration="2h 45m" 
                />
                <PlaylistCard 
                  title="Classical Study" 
                  desc="Timeless classical pieces for studying" 
                  duration="3h 20m" 
                />
                <PlaylistCard 
                  title="Nature Ambience" 
                  desc="Immersive natural soundscapes" 
                  duration="4h 10m" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlaylistCard({ title, desc, duration }: { title: string, desc: string, duration: string }) {
  return (
    <div className="p-3 rounded-lg bg-background/20 hover:bg-background/30 transition-colors group">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
          <PlayCircle size={20} className="text-primary group-hover:text-primary/90 transition-colors" />
        </div>
        <div className="flex-1">
          <h4 className="font-medium mb-1">{title}</h4>
          <p className="text-xs text-foreground/60 mb-1">{desc}</p>
          <div className="flex items-center gap-2 text-xs text-foreground/50">
            <Music size={10} />
            <span>{duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 