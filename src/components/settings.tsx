"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Clock, Settings as SettingsIcon, Bell, Volume2, Moon, Sun, Globe, Layout, Quote } from "lucide-react"
import { useState } from "react"
import { useTheme } from "next-themes"
import { Separator } from "@radix-ui/react-dropdown-menu"

export function Settings() {
  const { setTheme, theme } = useTheme()
  const [settings, setSettings] = useState({
    notifications: true,
    soundEffects: true,
    autoSave: true,
    compactMode: false,
    showMotivationalQuotes: true,
    language: 'en',
  })

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <SettingsIcon size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem 
          className="gap-2 cursor-pointer" 
          onClick={() => toggleSetting('notifications')}
        >
          <Bell size={16} className={settings.notifications ? 'text-primary' : ''} />
          Notifications
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="gap-2 cursor-pointer" 
          onClick={() => toggleSetting('soundEffects')}
        >
          <Volume2 size={16} className={settings.soundEffects ? 'text-primary' : ''} />
          Sound Effects
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="gap-2 cursor-pointer" 
          onClick={() => toggleSetting('showMotivationalQuotes')}
        >
          <Quote size={16} className={settings.showMotivationalQuotes ? 'text-primary' : ''} />
          Motivational Quotes
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="gap-2 cursor-pointer" 
          onClick={() => toggleSetting('compactMode')}
        >
          <Layout size={16} className={settings.compactMode ? 'text-primary' : ''} />
          Compact Mode
        </DropdownMenuItem>

        <Separator />
        
        {/* <DropdownMenuItem 
          className="gap-2 cursor-pointer" 
          onClick={() => setTheme('light')}
        >
          <Sun size={16} className={theme === 'light' ? 'text-primary' : ''} />
          Light Mode
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="gap-2 cursor-pointer" 
          onClick={() => setTheme('dark')}
        >
          <Moon size={16} className={theme === 'dark' ? 'text-primary' : ''} />
          Dark Mode
        </DropdownMenuItem> */}

        <Separator />

        <DropdownMenuItem className="gap-2">
          <Globe size={16} />
          Language
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}