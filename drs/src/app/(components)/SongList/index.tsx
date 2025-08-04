"use client"

import { useState, useEffect } from 'react'
import Link from "next/link"

type song = {
  _id: string
  name: string
  original_name: string
  artist: string
  album: string
  bpm: string
  length: string
  description: string
  guide?: string
}

export default function SongList() {
  const [showNames, setShowNames] = useState<boolean>(false);
  const toggleNames = () => {
    setShowNames(prev => !prev);
  };

  // Fix: Properly type the songs state
  const [songs, setSongs] = useState<song[]>([])
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
      // Ensure data is an array before setting
      setSongs(Array.isArray(data) ? data : [])
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
    <div className="min-h-screen bg-gray-900 p-5">
      <div className="max-w-4xl mx-auto">
        <div>
          <h1 className="text-4xl font-bold text-center mb-8 text-white">
            Songs
          </h1>
          <button
            onClick={toggleNames}
            className={`mb-6 px-6 py-2 rounded-lg font-semibold transition-colors duration-200 ${
            showNames
               ? 'bg-orange-500 hover:bg-orange-600 text-white'
               : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
          {showNames ? 'Hide Names' : 'Show Names'}
          </button>
        </div>
        
        {!songs || songs.length === 0 ? (
          <div className="text-center text-gray-400">
            No songs found.
          </div>
        ) : (
          <div>
            <div className="text-white">
              Click one of the following to get more information about the song!
            </div>
             
           <div className="grid gap-0 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6">
             {songs.map(song => (
               <Link
                 key={song._id} href={`/songs/${song.name}`}
                 className="border border-gray-700 hover:border-blue-600 transition-colors"
               >
              <img
                 src={ `/jackets/${encodeURIComponent(song.name)}.png`}
                alt="Error 404"
                className="border-black w-full object-fill"
              />
              {showNames && (<h2 className="text text-white text-center">
                  {song.original_name}
                </h2>
                 )
              }
              </Link>
             ))}
           </div>
          </div>
        )}
        {/**
                <div className="text-center mt-8">
          <button 
             onClick={fetchSongs}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Refresh Songs
          </button>
        </div>
         */}
        </div>
    </div>
  )
}