"use client"

import { useState } from 'react'
import { Button } from './ui/button'
import { ArrowLeft, Trash2 } from 'lucide-react'

export function Calculator() {
  const [display, setDisplay] = useState('0')
  const [equation, setEquation] = useState('')
  const [history, setHistory] = useState<string[]>([])

  const handleNumber = (num: string) => {
    if (display === '0' && num === '0') return
    if (num === '.' && display.includes('.')) return

    setDisplay((prev) => (prev === '0' && num !== '.' ? num : prev + num))
    setEquation((prev) => prev + num)
  }

  const handleOperator = (op: string) => {
    if (!equation || /\s[+\-*/%]\s$/.test(equation)) return

    setDisplay('0')
    setEquation((prev) => prev + ' ' + op + ' ')
  }

  const handleEqual = () => {
    if (!equation || /\s[+\-*/%]\s$/.test(equation)) return

    try {
      const calculationString = equation.replace(/×/g, '*').replace(/÷/g, '/')

      const calculatedResult = new Function('return ' + calculationString)()

      let result = parseFloat(Number(calculatedResult).toFixed(10))
      const resultString = result.toString()

      setDisplay(resultString)
      setEquation(resultString)

      setHistory((prev) =>
        [equation + ' = ' + resultString, ...prev].slice(0, 5),
      )
    } catch (error) {
      console.error('Calculation Error:', error)
      setDisplay('Error')
      setEquation('')
    }
  }

  const handleClear = () => {
    setDisplay('0')
    setEquation('')
  }

  const handleBackspace = () => {
    if (display === 'Error') {
      handleClear()
      return
    }

    if (!equation.includes(' ')) {
      handleClear()
      return
    }

    setEquation((prev) => {
      const trimmed = prev.trimEnd()
      if (/\s[+\-*/%]$/.test(trimmed)) {
        return trimmed.slice(0, -1).trimEnd()
      } else {
        return trimmed.slice(0, -1)
      }
    })

    setEquation((currentEquation) => {
      if (!currentEquation) {
        setDisplay('0')
        return ''
      }
      const parts = currentEquation.split(' ')
      setDisplay(parts[parts.length - 1] || '0')
      return currentEquation
    })
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

  const getButtonClasses = (
    type: 'number' | 'operator' | 'special' | 'equal' | 'clear',
  ) => {
    let baseClasses =
      'border-none font-medium h-12 px-6 text-lg rounded-lg'
    switch (type) {
      case 'number':
        return `${baseClasses} bg-background/50 hover:bg-background/70 dark:bg-white/5 dark:hover:bg-white/10`
      case 'operator':
        return `${baseClasses} bg-primary/5 hover:bg-primary/10 text-primary`
      case 'special':
        return `${baseClasses} bg-primary/5 hover:bg-primary/10`
      case 'clear':
        return `${baseClasses} bg-destructive/10 hover:bg-destructive/20 text-destructive`
      case 'equal':
        return `${baseClasses} bg-primary hover:bg-primary/90 text-primary-foreground`
      default:
        return baseClasses
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto md:max-w-xl">
      <div className="flex-1 space-y-4">
        <div className="glass-card rounded-xl overflow-hidden shadow-sm">
          <div className="text-right text-xs font-mono text-foreground/60 px-4 pt-2 h-6 truncate">
            {equation || ' '}
          </div>
          <div className="text-right text-4xl font-mono font-semibold text-primary p-4 h-16 flex items-center justify-end break-all">
            {display}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 p-1">
          <Button
            variant="outline"
            onClick={handleClear}
            className={getButtonClasses('clear')}
          >
            AC
          </Button>
          <Button
            variant="outline"
            onClick={handleBackspace}
            className={getButtonClasses('special')}
          >
            <ArrowLeft size={20} className='text-white'/>
          </Button>
          <Button
            variant="outline"
            onClick={() => handleOperator('%')}
            className={getButtonClasses('special')}
          >
            %
          </Button>
          <Button
            variant="outline"
            onClick={() => handleOperator('/')}
            className={getButtonClasses('operator')}
          >
            ÷
          </Button>

          {['7', '8', '9', '×'].map((btn) => (
            <Button
              key={btn}
              variant="outline"
              onClick={() =>
                btn.match(/\d/) ? handleNumber(btn) : handleOperator(btn)
              }
              className={getButtonClasses(
                btn.match(/\d/) ? 'number' : 'operator',
              )}
            >
              {btn}
            </Button>
          ))}

          {['4', '5', '6', '-'].map((btn) => (
            <Button
              key={btn}
              variant="outline"
              onClick={() =>
                btn.match(/\d/) ? handleNumber(btn) : handleOperator(btn)
              }
              className={getButtonClasses(
                btn.match(/\d/) ? 'number' : 'operator',
              )}
            >
              {btn}
            </Button>
          ))}

          {['1', '2', '3', '+'].map((btn) => (
            <Button
              key={btn}
              variant="outline"
              onClick={() =>
                btn.match(/\d/) ? handleNumber(btn) : handleOperator(btn)
              }
              className={getButtonClasses(
                btn.match(/\d/) ? 'number' : 'operator',
              )}
            >
              {btn}
            </Button>
          ))}

          <Button
            variant="outline"
            onClick={() => handleNumber('0')}
            className={`${getButtonClasses('number')} col-span-2`}
          >
            0
          </Button>
          <Button
            variant="outline"
            onClick={() => handleNumber('.')}
            className={getButtonClasses('number')}
          >
            .
          </Button>
          <Button onClick={handleEqual} className={getButtonClasses('equal')}>
            =
          </Button>
        </div>
      </div>

      <div className="w-full md:w-48 glass-card rounded-xl p-3 shadow-sm flex-shrink-0">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-semibold">History</h3>
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
          <div className="py-1 text-center text-xs text-foreground/50">
            No calculations yet
          </div>
        ) : (
          <div className="space-y-1 max-h-[280px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-secondary">
            {history.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                onClick={() => applyHistoryItem(item)}
                className="w-full justify-start text-xs py-1 h-auto text-left font-mono text-foreground/80 hover:bg-primary/5"
              >
                <span className="truncate">
                  {item.replace(/\*/g, '×').replace(/\//g, '÷')}
                </span>
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
