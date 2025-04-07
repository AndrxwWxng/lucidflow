"use client"

import { useState } from 'react'
import { Button } from './ui/button'

export function Calculator() {
  const [display, setDisplay] = useState('0')
  const [equation, setEquation] = useState('')

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
      const result = eval(equation)
      setDisplay(result.toString())
      setEquation(result.toString())
    } catch (error) {
      setDisplay('Error')
      setEquation('')
    }
  }

  const handleClear = () => {
    setDisplay('0')
    setEquation('')
  }

  return (
    <div className="grid gap-4">
      <div className="glass-effect p-4 rounded-lg text-right text-3xl font-mono font-bold text-primary">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {['7', '8', '9', '/'].map(btn => (
          <Button
            key={btn}
            variant={btn.match(/\d/) ? 'outline' : 'default'}
            onClick={() => btn.match(/\d/) ? handleNumber(btn) : handleOperator(btn)}
            className="h-12 text-lg font-medium"
          >
            {btn}
          </Button>
        ))}
        {['4', '5', '6', '*'].map(btn => (
          <Button
            key={btn}
            variant={btn.match(/\d/) ? 'outline' : 'default'}
            onClick={() => btn.match(/\d/) ? handleNumber(btn) : handleOperator(btn)}
            className="h-12 text-lg font-medium"
          >
            {btn}
          </Button>
        ))}
        {['1', '2', '3', '-'].map(btn => (
          <Button
            key={btn}
            variant={btn.match(/\d/) ? 'outline' : 'default'}
            onClick={() => btn.match(/\d/) ? handleNumber(btn) : handleOperator(btn)}
            className="h-12 text-lg font-medium"
          >
            {btn}
          </Button>
        ))}
        {['0', '.', '=', '+'].map(btn => (
          <Button
            key={btn}
            variant={btn === '=' ? 'default' : btn.match(/\d|\./) ? 'outline' : 'default'}
            onClick={() => {
              if (btn === '=') handleEqual()
              else if (btn.match(/\d|\./)) handleNumber(btn)
              else handleOperator(btn)
            }}
            className={`h-12 text-lg font-medium ${btn === '=' ? 'bg-primary hover:bg-primary/90' : ''}`}
          >
            {btn}
          </Button>
        ))}
        <Button
          className="col-span-4 h-12 text-lg font-medium"
          variant="destructive"
          onClick={handleClear}
        >
          Clear
        </Button>
      </div>
    </div>
  )
}