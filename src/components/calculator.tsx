"use client"

import { useState } from 'react'
import { Button } from './ui/button'
import { ArrowLeft, Trash2 } from 'lucide-react'

export function Calculator() {
  const [display, setDisplay] = useState('0')
  const [equation, setEquation] = useState('')
  const [history, setHistory] = useState<string[]>([])

  const handleNumber = (num: string) => {
    setDisplay(prev => prev === '0' ? num : prev + num)
    setEquation(prev => prev + num)
  }

  const handleOperator = (op: string) => {
    setDisplay('0')
    setEquation(prev => prev + ' ' + op + ' ')
  }

  const handleEqual = () => {
    try {
      const calculatedResult = new Function('return ' + equation)();
      const result = Number(calculatedResult).toFixed(2).replace(/\.00$/, '');
      setDisplay(result.toString())
      setEquation(result.toString())
      
      setHistory(prev => [equation + ' = ' + result, ...prev].slice(0, 10))
    } catch (error) {
      setDisplay('Error')
      setEquation('')
    }
  }

  const handleClear = () => {
    setDisplay('0')
    setEquation('')
  }

  const handleBackspace = () => {
    if (equation.length <= 1) {
      setDisplay('0')
      setEquation('')
      return
    }
    
    const newEquation = equation.slice(0, -1)
    setEquation(newEquation)
    
    const lastSpace = newEquation.lastIndexOf(' ')
    if (lastSpace !== -1) {
      const lastPart = newEquation.slice(lastSpace + 1)
      setDisplay(lastPart || '0')
    } else {
      setDisplay(newEquation || '0')
    }
  }

  const clearHistory = () => {
    setHistory([])
  }

  const applyHistoryItem = (historyItem: string) => {
    const parts = historyItem.split(' = ')
    if (parts.length === 2) {
      setDisplay(parts[1])
      setEquation(parts[1])
    }
  }

  return (
    <div className="flex gap-4">
      <div className="flex-1 space-y-3">
        <div className="glass-card rounded-xl overflow-hidden">
          <div className="text-right text-3xl font-mono font-semibold text-primary p-2 h-14 flex items-center justify-end">
            {display}
          </div>
          <div className="text-right text-xs font-mono text-foreground/60 px-3 pb-1 h-4 overflow-hidden">
            {equation}
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-1.5">
          <Button
            variant="outline"
            onClick={handleClear}
            className="bg-destructive/10 hover:bg-destructive/20 text-destructive border-none font-medium h-10"
          >
            AC
          </Button>
          <Button
            variant="outline"
            onClick={handleBackspace}
            className="bg-primary/5 hover:bg-primary/10 border-none h-10"
          >
            <ArrowLeft size={16} />
          </Button>
          <Button
            variant="outline"
            onClick={() => handleOperator('%')}
            className="bg-primary/5 hover:bg-primary/10 border-none h-10"
          >
            %
          </Button>
          <Button
            variant="outline"
            onClick={() => handleOperator('/')}
            className="bg-primary/5 hover:bg-primary/10 border-none font-medium h-10"
          >
            ÷
          </Button>
          
          {['7', '8', '9', '*'].map((btn, i) => (
            <Button
              key={btn}
              variant="outline"
              onClick={() => btn.match(/\d/) ? handleNumber(btn) : handleOperator(btn)}
              className={`${btn.match(/\d/) ? 'bg-background/50 hover:bg-background/80' : 'bg-primary/5 hover:bg-primary/10'} border-none font-medium h-10`}
            >
              {btn === '*' ? '×' : btn}
            </Button>
          ))}
          
          {['4', '5', '6', '-'].map(btn => (
            <Button
              key={btn}
              variant="outline"
              onClick={() => btn.match(/\d/) ? handleNumber(btn) : handleOperator(btn)}
              className={`${btn.match(/\d/) ? 'bg-background/50 hover:bg-background/80' : 'bg-primary/5 hover:bg-primary/10'} border-none font-medium h-10`}
            >
              {btn}
            </Button>
          ))}
          
          {['1', '2', '3', '+'].map(btn => (
            <Button
              key={btn}
              variant="outline"
              onClick={() => btn.match(/\d/) ? handleNumber(btn) : handleOperator(btn)}
              className={`${btn.match(/\d/) ? 'bg-background/50 hover:bg-background/80' : 'bg-primary/5 hover:bg-primary/10'} border-none font-medium h-10`}
            >
              {btn}
            </Button>
          ))}
          
          <Button
            variant="outline"
            onClick={() => handleNumber('0')}
            className="col-span-2 bg-background/50 hover:bg-background/80 border-none font-medium h-10"
          >
            0
          </Button>
          <Button
            variant="outline"
            onClick={() => handleNumber('.')}
            className="bg-background/50 hover:bg-background/80 border-none font-medium h-10"
          >
            .
          </Button>
          <Button
            onClick={handleEqual}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium h-10"
          >
            =
          </Button>
        </div>
      </div>
      
      {/* Side History */}
      <div className="w-56 glass-card rounded-xl p-4 hidden md:block">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium">History</h3>
          {history.length > 0 && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={clearHistory}
              className="h-6 w-6 rounded-full text-destructive/70 hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 size={14} />
            </Button>
          )}
        </div>
        
        {history.length === 0 ? (
          <div className="py-3 text-center text-xs text-foreground/40">
            No calculations yet
          </div>
        ) : (
          <div className="space-y-1 max-h-[250px] overflow-y-auto pr-1">
            {history.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                onClick={() => applyHistoryItem(item)}
                className="w-full justify-between text-xs py-1.5 h-auto text-left font-mono"
              >
                <span className="truncate">{item}</span>
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}