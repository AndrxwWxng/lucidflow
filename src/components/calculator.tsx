"use client"

import { useState } from 'react'
import { Button } from './ui/button'

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
      // Use Function instead of eval for better security
      const calculatedResult = new Function('return ' + equation)();
      const result = Number(calculatedResult).toFixed(2).replace(/\.00$/, '');
      setDisplay(result.toString())
      setEquation(result.toString())
      
      // Add to history
      setHistory(prev => [equation + ' = ' + result, ...prev].slice(0, 5))
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
    
    // Remove the last character
    const newEquation = equation.slice(0, -1)
    setEquation(newEquation)
    
    // Update display
    const lastSpace = newEquation.lastIndexOf(' ')
    if (lastSpace !== -1) {
      const lastPart = newEquation.slice(lastSpace + 1)
      setDisplay(lastPart || '0')
    } else {
      setDisplay(newEquation || '0')
    }
  }

  return (
    <div className="space-y-4">
      {/* Calculator Display */}
      <div className="rounded-lg overflow-hidden">
        <div className="text-right text-2xl font-mono font-semibold text-primary p-2">
          {display}
        </div>
        <div className="text-right text-xs font-mono text-foreground/60 px-2 pb-2 h-4 overflow-hidden">
          {equation}
        </div>
      </div>
      
      {/* Calculator Keypad */}
      <div className="grid grid-cols-4 gap-1.5">
        {/* First row */}
        <Button
          variant="outline"
          onClick={handleClear}
          className="bg-destructive/10 hover:bg-destructive/20 text-destructive border-none"
        >
          AC
        </Button>
        <Button
          variant="outline"
          onClick={handleBackspace}
          className="bg-primary/5 hover:bg-primary/10 border-none"
        >
          ←
        </Button>
        <Button
          variant="outline"
          onClick={() => handleOperator('%')}
          className="bg-primary/5 hover:bg-primary/10 border-none"
        >
          %
        </Button>
        <Button
          variant="outline"
          onClick={() => handleOperator('/')}
          className="bg-primary/5 hover:bg-primary/10 border-none"
        >
          ÷
        </Button>
        
        {/* Number pad and operators */}
        {['7', '8', '9', '*'].map((btn, i) => (
          <Button
            key={btn}
            variant="outline"
            onClick={() => btn.match(/\d/) ? handleNumber(btn) : handleOperator(btn)}
            className={`${btn.match(/\d/) ? 'bg-background hover:bg-background/80' : 'bg-primary/5 hover:bg-primary/10'} border-none`}
          >
            {btn === '*' ? '×' : btn}
          </Button>
        ))}
        
        {['4', '5', '6', '-'].map(btn => (
          <Button
            key={btn}
            variant="outline"
            onClick={() => btn.match(/\d/) ? handleNumber(btn) : handleOperator(btn)}
            className={`${btn.match(/\d/) ? 'bg-background hover:bg-background/80' : 'bg-primary/5 hover:bg-primary/10'} border-none`}
          >
            {btn}
          </Button>
        ))}
        
        {['1', '2', '3', '+'].map(btn => (
          <Button
            key={btn}
            variant="outline"
            onClick={() => btn.match(/\d/) ? handleNumber(btn) : handleOperator(btn)}
            className={`${btn.match(/\d/) ? 'bg-background hover:bg-background/80' : 'bg-primary/5 hover:bg-primary/10'} border-none`}
          >
            {btn}
          </Button>
        ))}
        
        {/* Last row */}
        <Button
          variant="outline"
          onClick={() => handleNumber('0')}
          className="col-span-2 bg-background hover:bg-background/80 border-none"
        >
          0
        </Button>
        <Button
          variant="outline"
          onClick={() => handleNumber('.')}
          className="bg-background hover:bg-background/80 border-none"
        >
          .
        </Button>
        <Button
          onClick={handleEqual}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          =
        </Button>
      </div>
      
      {/* History (collapsible) */}
      {history.length > 0 && (
        <div className="mt-4 pt-3 border-t border-white/10">
          <div className="text-xs text-foreground/60 mb-1">History</div>
          <div className="space-y-1">
            {history.map((item, index) => (
              <div key={index} className="text-xs text-right font-mono">
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}