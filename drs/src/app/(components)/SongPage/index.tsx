"use client"

import { useState, useEffect } from 'react'

type song = {
  _id: string
  name: string
  description: string
  guide?: string
}

export default function SongList() {


  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchSongs()
  }, [])

  const fetchSongs = async () => {
    try {
      const response = await fetch('/api/songs')
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setSongs(data)
    } catch (error) {
      console.error('Failed to fetch songs:', error)
      setError('Failed to load songs')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="text-center">Loading songs...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="text-red-400 text-center">{error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold text-center mb-8 text-blue-400">
           Songs ({songs.length})
        </h1>

        {songs.length === 0 ? (
          <div className="text-center text-gray-400">
            No songs found.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
            {songs.map(song => (
              <div 
                key={song._id} 
                className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors"
              >
                <h2 className="text-xl font-semibold text-blue-300 mb-3">
                  {song.name}
                </h2>
             </div>
            ))}
          </div>
        )}
        
        <div className="text-center mt-8">
          <button 
            onClick={fetchSongs}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Refresh Songs
          </button>
        </div>
      </div>
    </div>
  )
}