"use client"

import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { BookOpen, Plus, ArrowLeft, ArrowRight, Shuffle, Edit, Trash2, XIcon } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'

interface Flashcard {
  id: string;
  front: string;
  back: string;
  deck: string;
}

export function Flashcards() {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [decks, setDecks] = useState<string[]>([]);
  const [currentDeck, setCurrentDeck] = useState<string>('All');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [newCard, setNewCard] = useState({ front: '', back: '', deck: '' });
  const [editingCard, setEditingCard] = useState<Flashcard | null>(null);
  const [isAddingCard, setIsAddingCard] = useState(false);

  // Load cards from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const savedCards = localStorage.getItem('flashcards');
    if (savedCards) {
      const parsedCards = JSON.parse(savedCards);
      setCards(parsedCards);
      
      // Extract unique decks
      const uniqueDecks = Array.from(
        new Set<string>(parsedCards.map((card: Flashcard) => card.deck))
      );
      setDecks(['All', ...uniqueDecks]);
    }
  }, []);

  // Save cards to localStorage when cards change
  useEffect(() => {
    if (typeof window === 'undefined' || cards.length === 0) return;
    
    localStorage.setItem('flashcards', JSON.stringify(cards));
    
    // Update decks
    const uniqueDecks = Array.from(
      new Set<string>(cards.map((card) => card.deck))
    );
    setDecks(['All', ...uniqueDecks]);
  }, [cards]);

  // Filter cards by current deck
  const filteredCards = currentDeck === 'All' 
    ? cards 
    : cards.filter((card) => card.deck === currentDeck);

  // Add a new card
  const addCard = () => {
    if (newCard.front.trim() && newCard.back.trim() && newCard.deck.trim()) {
      const newCardWithId = {
        ...newCard,
        id: Date.now().toString()
      };
      
      setCards([...cards, newCardWithId]);
      setNewCard({ front: '', back: '', deck: '' });
      setIsAddingCard(false);
    }
  };

  // Update an existing card
  const updateCard = () => {
    if (editingCard && editingCard.front.trim() && editingCard.back.trim() && editingCard.deck.trim()) {
      setCards(cards.map(card => 
        card.id === editingCard.id ? editingCard : card
      ));
      setEditingCard(null);
    }
  };

  // Delete a card
  const deleteCard = (id: string) => {
    setCards(cards.filter(card => card.id !== id));
    if (currentCardIndex >= filteredCards.length - 1) {
      setCurrentCardIndex(Math.max(0, filteredCards.length - 2));
    }
  };

  // Navigate to next card
  const nextCard = () => {
    if (filteredCards.length > 0) {
      setFlipped(false);
      setCurrentCardIndex((prevIndex) => 
        prevIndex + 1 >= filteredCards.length ? 0 : prevIndex + 1
      );
    }
  };

  // Navigate to previous card
  const prevCard = () => {
    if (filteredCards.length > 0) {
      setFlipped(false);
      setCurrentCardIndex((prevIndex) => 
        prevIndex - 1 < 0 ? filteredCards.length - 1 : prevIndex - 1
      );
    }
  };

  // Shuffle cards
  const shuffleCards = () => {
    setFlipped(false);
    setCurrentCardIndex(0);
    // Fisher-Yates shuffle algorithm
    const shuffled = [...filteredCards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setCards([...cards.filter(card => 
      currentDeck === 'All' ? false : card.deck !== currentDeck
    ), ...shuffled]);
  };

  return (
    <div className="space-y-6">
      {/* Deck selection and controls */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          {decks.map((deck) => (
            <Button
              key={deck}
              variant={currentDeck === deck ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setCurrentDeck(deck);
                setCurrentCardIndex(0);
                setFlipped(false);
              }}
              className="text-xs"
            >
              {deck}
            </Button>
          ))}
        </div>
        
        <div className="flex items-center gap-2">
          <Dialog open={isAddingCard} onOpenChange={setIsAddingCard}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <Plus size={14} /> Add Card
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Flashcard</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Front</label>
                  <Input
                    value={newCard.front}
                    onChange={(e) => setNewCard({...newCard, front: e.target.value})}
                    placeholder="Question or term"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Back</label>
                  <Input
                    value={newCard.back}
                    onChange={(e) => setNewCard({...newCard, back: e.target.value})}
                    placeholder="Answer or definition"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Deck</label>
                  <Input
                    value={newCard.deck}
                    onChange={(e) => setNewCard({...newCard, deck: e.target.value})}
                    placeholder="e.g., Math, Biology"
                    list="existing-decks"
                  />
                  <datalist id="existing-decks">
                    {decks.filter(d => d !== 'All').map(deck => (
                      <option key={deck} value={deck} />
                    ))}
                  </datalist>
                </div>
                <Button onClick={addCard} className="w-full mt-2">
                  Create Card
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Flashcard display */}
      {filteredCards.length > 0 ? (
        <div className="relative">
          <div 
            onClick={() => setFlipped(!flipped)} 
            className={`aspect-video max-h-[280px] bg-card/30 rounded-xl border border-white/10 cursor-pointer transition-all duration-500 transform perspective-1000 ${flipped ? 'rotate-y-180' : ''}`}
          >
            {/* Front of card */}
            <div className={`absolute inset-0 backface-hidden p-6 flex flex-col items-center justify-center ${flipped ? 'opacity-0' : 'opacity-100'}`}>
              <div className="absolute top-2 right-2 text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">
                {filteredCards[currentCardIndex]?.deck}
              </div>
              <div className="text-xl md:text-2xl font-medium text-center">
                {filteredCards[currentCardIndex]?.front}
              </div>
              <div className="absolute bottom-2 text-xs text-foreground/60">
                Click to flip ({currentCardIndex + 1}/{filteredCards.length})
              </div>
            </div>
            
            {/* Back of card */}
            <div className={`absolute inset-0 backface-hidden p-6 flex flex-col items-center justify-center rotate-y-180 ${flipped ? 'opacity-100' : 'opacity-0'}`}>
              <div className="text-xl md:text-2xl font-medium text-center">
                {filteredCards[currentCardIndex]?.back}
              </div>
              <div className="absolute bottom-2 text-xs text-foreground/60">
                Click to flip back
              </div>
            </div>
          </div>

          {/* Card navigation */}
          <div className="flex items-center justify-between mt-4">
            <Button variant="outline" size="sm" onClick={prevCard}>
              <ArrowLeft size={16} className="mr-1" /> Previous
            </Button>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={shuffleCards} title="Shuffle Cards">
                <Shuffle size={16} />
              </Button>
              
              <Dialog open={!!editingCard} onOpenChange={(open) => !open && setEditingCard(null)}>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingCard(filteredCards[currentCardIndex]);
                    }}
                    title="Edit Card"
                  >
                    <Edit size={16} />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Flashcard</DialogTitle>
                  </DialogHeader>
                  {editingCard && (
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Front</label>
                        <Input
                          value={editingCard.front}
                          onChange={(e) => setEditingCard({...editingCard, front: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Back</label>
                        <Input
                          value={editingCard.back}
                          onChange={(e) => setEditingCard({...editingCard, back: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Deck</label>
                        <Input
                          value={editingCard.deck}
                          onChange={(e) => setEditingCard({...editingCard, deck: e.target.value})}
                          list="edit-existing-decks"
                        />
                        <datalist id="edit-existing-decks">
                          {decks.filter(d => d !== 'All').map(deck => (
                            <option key={deck} value={deck} />
                          ))}
                        </datalist>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Button onClick={updateCard} className="flex-1">
                          Save Changes
                        </Button>
                        <Button 
                          variant="destructive" 
                          onClick={() => {
                            deleteCard(editingCard.id);
                            setEditingCard(null);
                          }}
                          className="gap-1"
                        >
                          <Trash2 size={14} /> Delete
                        </Button>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
            
            <Button variant="outline" size="sm" onClick={nextCard}>
              Next <ArrowRight size={16} className="ml-1" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="aspect-video bg-card/20 rounded-xl border border-dashed border-primary/20 flex flex-col items-center justify-center p-6 text-center">
          <BookOpen className="text-primary/60 w-12 h-12 mb-4" />
          <h3 className="text-xl font-medium mb-2">No Flashcards Yet</h3>
          <p className="text-sm text-foreground/70 mb-4">
            {currentDeck !== 'All' 
              ? `No cards in the "${currentDeck}" deck. Add some cards to get started.` 
              : "Create your first flashcard to start studying."}
          </p>
          <Button
            variant="outline"
            onClick={() => setIsAddingCard(true)}
            className="gap-1"
          >
            <Plus size={14} /> Create Flashcard
          </Button>
        </div>
      )}
    </div>
  );
} 