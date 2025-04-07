"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { TimerSettings } from "@/components/timer-settings"
import {
  Clock,
  Settings as SettingsIcon,
  Bell,
  Volume2,
  Moon,
  Sun,
  Globe,
  Layout,
  Quote,
} from "lucide-react"
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
    language: "en",
  })

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }))
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
          onClick={() => toggleSetting("notifications")}
        >
          <Bell
            size={16}
            className={settings.notifications ? "text-primary" : ""}
          />
          Notifications
        </DropdownMenuItem>
        <DropdownMenuItem
          className="gap-2 cursor-pointer"
          onClick={() => toggleSetting("soundEffects")}
        >
          <Volume2
            size={16}
            className={settings.soundEffects ? "text-primary" : ""}
          />
          Sound Effects
        </DropdownMenuItem>
        {/* <DropdownMenuItem
          className="gap-2 cursor-pointer"
          onClick={() => toggleSetting("showMotivationalQuotes")}
        >
          <Quote
            size={16}
            className={settings.showMotivationalQuotes ? "text-primary" : ""}
          />
          Motivational Quotes
        </DropdownMenuItem>
        <DropdownMenuItem
          className="gap-2 cursor-pointer"
          onClick={() => toggleSetting("compactMode")}
        >
          <Layout
            size={16}
            className={settings.compactMode ? "text-primary" : ""}
          />
          Compact Mode
        </DropdownMenuItem> */}

        <Separator />

        <Dialog>
          <DialogTrigger asChild>
            <DropdownMenuItem
              className="gap-2 cursor-pointer"
              onSelect={(event) => event.preventDefault()}
            >
              <Clock size={16} />
              Timer Settings
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Timer Settings</DialogTitle>
            </DialogHeader>
            <TimerSettings />
          </DialogContent>
        </Dialog>

        {/* <DropdownMenuSeparator />
        <DropdownMenuItem
          className="gap-2 cursor-pointer"
          onClick={() => setTheme("light")}
        >
          <Sun size={16} className={theme === "light" ? "text-primary" : ""} />
          Light Mode
        </DropdownMenuItem>
        <DropdownMenuItem
          className="gap-2 cursor-pointer"
          onClick={() => setTheme("dark")}
        >
          <Moon size={16} className={theme === "dark" ? "text-primary" : ""} />
          Dark Mode
        </DropdownMenuItem> */}

        <Separator />

        {/* <DropdownMenuItem className="gap-2">
          <Globe size={16} />
          Language
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
