"use client";

import { Flashcards } from "@/components/flashcards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BookOpen, 
  Plus, 
  PlusCircle, 
  Share2, 
  FolderPlus, 
  Tag, 
  Filter, 
  Search, 
  CheckCircle2, 
  Brain,
  ArrowLeftRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useState } from "react";

export default function FlashcardsPage() {
  // Store the state for creating a new deck
  const [showNewDeck, setShowNewDeck] = useState(false);
  
  // Sample flashcard decks
  const flashcardDecks = [
    { id: 1, title: "Biology Terms", cards: 42, mastered: 28, category: "Science" },
    { id: 2, title: "Physics Formulas", cards: 35, mastered: 15, category: "Science" },
    { id: 3, title: "Spanish Vocabulary", cards: 120, mastered: 60, category: "Languages" },
    { id: 4, title: "History Dates", cards: 25, mastered: 10, category: "History" },
    { id: 5, title: "Math Theorems", cards: 18, mastered: 12, category: "Math" },
    { id: 6, title: "Literary Devices", cards: 30, mastered: 22, category: "Literature" },
  ];
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="text-primary" />
            Flashcards
          </h2>
          <p className="text-foreground/60 mt-1">
            Create and study flashcards to boost your memory
          </p>
        </div>
        
        <div className="flex gap-3">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-foreground/50" />
            <Input placeholder="Search flashcards..." className="pl-9" />
          </div>
          
          <Button variant="outline" className="gap-1">
            <Filter size={16} />
            Filter
          </Button>
          
          <Button className="gap-1" onClick={() => setShowNewDeck(true)}>
            <PlusCircle size={16} />
            New Deck
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all-decks" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all-decks">All Decks</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="mastered">Mastered</TabsTrigger>
          <TabsTrigger value="shared">Shared</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all-decks">
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Study Decks</h3>
            
            {showNewDeck ? (
              <Card className="border-white/10 mb-6 border-2 border-dashed">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Create New Deck</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm mb-1 block">Deck Name</label>
                      <Input placeholder="e.g., Biology Terms" />
                    </div>
                    
                    <div>
                      <label className="text-sm mb-1 block">Category</label>
                      <Select defaultValue="science">
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="science">Science</SelectItem>
                            <SelectItem value="math">Mathematics</SelectItem>
                            <SelectItem value="languages">Languages</SelectItem>
                            <SelectItem value="history">History</SelectItem>
                            <SelectItem value="literature">Literature</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm mb-1 block">Description (Optional)</label>
                      <Input placeholder="Brief description of this deck" />
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setShowNewDeck(false)}>
                        Cancel
                      </Button>
                      <Button>
                        Create Deck
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : null}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {flashcardDecks.map((deck) => (
                <Card key={deck.id} className="border-white/10 hover:border-primary/20 hover:bg-primary/5 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base">{deck.title}</CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {deck.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between mb-4">
                      <div className="text-sm text-foreground/70">
                        {deck.cards} cards
                      </div>
                      <div className="text-sm flex items-center gap-1 text-green-500">
                        <CheckCircle2 size={14} />
                        {deck.mastered} mastered
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="h-1.5 bg-background rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full" 
                          style={{ width: `${(deck.mastered / deck.cards) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-foreground/60">
                        <span>{Math.round((deck.mastered / deck.cards) * 100)}% mastered</span>
                        <span>{deck.cards - deck.mastered} to go</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 text-xs">
                        Edit
                      </Button>
                      <Button size="sm" className="flex-1 text-xs">
                        Study
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {/* Add deck card */}
              <Card className="border-white/10 border-dashed flex flex-col items-center justify-center p-6 cursor-pointer hover:bg-background/50 transition-colors" onClick={() => setShowNewDeck(true)}>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Plus size={24} className="text-primary" />
                </div>
                <div className="text-base font-medium mb-1">Create New Deck</div>
                <div className="text-xs text-foreground/60 text-center">
                  Add your own custom flashcards
                </div>
              </Card>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-white/10">
              <CardHeader>
                <CardTitle className="text-base">Study Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-background/50 rounded-md text-center">
                    <div className="text-2xl font-bold text-primary mb-1">270</div>
                    <div className="text-xs text-foreground/60">Total Cards</div>
                  </div>
                  <div className="p-4 bg-background/50 rounded-md text-center">
                    <div className="text-2xl font-bold text-green-500 mb-1">147</div>
                    <div className="text-xs text-foreground/60">Mastered</div>
                  </div>
                  <div className="p-4 bg-background/50 rounded-md text-center">
                    <div className="text-2xl font-bold text-blue-500 mb-1">6</div>
                    <div className="text-xs text-foreground/60">Decks Created</div>
                  </div>
                  <div className="p-4 bg-background/50 rounded-md text-center">
                    <div className="text-2xl font-bold text-yellow-500 mb-1">52</div>
                    <div className="text-xs text-foreground/60">Study Streak</div>
                  </div>
                </div>
                
                <div className="p-4 border border-white/10 rounded-md">
                  <h4 className="text-sm font-medium mb-3 flex items-center gap-1">
                    <Brain size={14} className="text-primary" />
                    Memory Tips
                  </h4>
                  <ul className="text-xs space-y-2 text-foreground/70">
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      Review cards right before sleeping for better retention
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      Space out your practice sessions for optimal learning
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      Try to recall information before flipping the card
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-white/10">
              <CardHeader>
                <CardTitle className="text-base">Quick Study</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="relative rounded-lg overflow-hidden aspect-[3/2]">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <div className="text-center p-6">
                        <ArrowLeftRight size={32} className="text-primary/50 mx-auto mb-3" />
                        <div className="text-lg font-medium mb-1">Random Card</div>
                        <div className="text-sm text-foreground/70 mb-4">Test your knowledge with a random flashcard</div>
                        <Button size="sm">Start</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Recent Decks</h4>
                    <div className="space-y-2">
                      {flashcardDecks.slice(0, 3).map((deck) => (
                        <div key={deck.id} className="flex justify-between items-center p-2 hover:bg-background/50 rounded-md transition-colors">
                          <div className="flex items-center gap-2">
                            <BookOpen size={16} className="text-primary/70" />
                            <span>{deck.title}</span>
                          </div>
                          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                            Study
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="recent">
          <div className="p-6 text-center">
            <BookOpen size={48} className="mx-auto mb-4 text-primary/30" />
            <h3 className="text-lg font-medium mb-2">Recent decks will appear here</h3>
            <p className="text-sm text-foreground/60 mb-4">
              You'll see your recently studied flashcard decks in this tab
            </p>
            <Button>Study Now</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="mastered">
          <div className="p-6 text-center">
            <CheckCircle2 size={48} className="mx-auto mb-4 text-primary/30" />
            <h3 className="text-lg font-medium mb-2">Track your mastered cards</h3>
            <p className="text-sm text-foreground/60 mb-4">
              Cards you've mastered will be shown here to track your progress
            </p>
            <Button>View All Cards</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="shared">
          <div className="p-6 text-center">
            <Share2 size={48} className="mx-auto mb-4 text-primary/30" />
            <h3 className="text-lg font-medium mb-2">Share and collaborate</h3>
            <p className="text-sm text-foreground/60 mb-4">
              Share decks with friends or access shared decks from others
            </p>
            <Button>Create Shared Deck</Button>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Active Study Mode - This would be shown when studying a deck */}
      <div className="hidden">
        <Flashcards />
      </div>
    </div>
  );
} 