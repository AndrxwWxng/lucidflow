"use client"

import { useState } from 'react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/dialog'
import { Settings } from 'lucide-react'

interface PreferencesSettings {
  notifications: boolean
  soundEffects: boolean
  autoSave: boolean
  compactMode: boolean
  showMotivationalQuotes: boolean
  language: string
}

export function Preferences() {
  const [settings, setSettings] = useState<PreferencesSettings>({
    notifications: true,
    soundEffects: true,
    autoSave: true,
    compactMode: false,
    showMotivationalQuotes: true,
    language: 'en',
  })

  return (
    <DialogContent className="sm:max-w-[425px] glass-effect">
      <DialogHeader>
        <DialogTitle>Preferences</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Notifications</label>
          <input
            type="checkbox"
            checked={settings.notifications}
            onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
            className="rounded border-secondary"
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Sound Effects</label>
          <input
            type="checkbox"
            checked={settings.soundEffects}
            onChange={(e) => setSettings({ ...settings, soundEffects: e.target.checked })}
            className="rounded border-secondary"
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Auto-save</label>
          <input
            type="checkbox"
            checked={settings.autoSave}
            onChange={(e) => setSettings({ ...settings, autoSave: e.target.checked })}
            className="rounded border-secondary"
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Compact Mode</label>
          <input
            type="checkbox"
            checked={settings.compactMode}
            onChange={(e) => setSettings({ ...settings, compactMode: e.target.checked })}
            className="rounded border-secondary"
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Motivational Quotes</label>
          <input
            type="checkbox"
            checked={settings.showMotivationalQuotes}
            onChange={(e) => setSettings({ ...settings, showMotivationalQuotes: e.target.checked })}
            className="rounded border-secondary"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Language</label>
          <select
            value={settings.language}
            onChange={(e) => setSettings({ ...settings, language: e.target.value })}
            className="w-full rounded-md bg-secondary px-3 py-2 text-sm"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="it">Italian</option>
            <option value="pt">Portuguese</option>
          </select>
        </div>
        <Button className="w-full gap-2">
          <Settings size={16} />
          Save Preferences
        </Button>
      </div>
    </DialogContent>
  )
}