"use client"

import { useState } from 'react'
import { Button } from './ui/button'
import { Music } from 'lucide-react'

export function SpotifyPlayer() {
  const [playlistUrl, setPlaylistUrl] = useState('https://open.spotify.com/embed/playlist/37i9dQZF1DX8NTLI2TtZa6')
  const [inputUrl, setInputUrl] = useState('')

  const handlePlaylistChange = () => {
    if (!inputUrl.trim()) return
    
    const playlistId = inputUrl.split('/playlist/')[1]?.split('?')[0]
    if (!playlistId) return
    
    setPlaylistUrl(`https://open.spotify.com/embed/playlist/${playlistId}`)
    setInputUrl('')
  }

  return (
    <div className="space-y-4">
      <div className="glass-effect p-4 rounded-lg">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="Paste Spotify playlist URL..."
            className="flex-1 rounded-md bg-secondary px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <Button onClick={handlePlaylistChange} className="flex items-center gap-2">
            <Music size={16} />
            Change
          </Button>
        </div>
      </div>
      <div className="glass-effect rounded-lg overflow-hidden">
        <div className="spotify-theme">
          <iframe
            src={playlistUrl}
            width="100%"
            height="152"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="border-0"
            style={{ colorScheme: 'dark' }}
          />
        </div>
      </div>
    </div>
  )
}