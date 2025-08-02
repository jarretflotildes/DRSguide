"use client"

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

// You can move this to a separate types file if you want to share it
type Song = {
  _id: string
  name: string
  description: string
  guide?: string
}

export default function SongPage() {
  const params = useParams()
  const songName = params.name as string
  console.log(params)
  console.log("as string is " + {songName} as string)
  
  const [song, setSong] = useState<Song | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (songName) {
      console.log('=== DEBUG: Song Page ===')
      console.log('Raw songName from params:', songName)
      console.log('Decoded songName:', decodeURIComponent(songName))
      fetchSong(decodeURIComponent(songName))
    }
  }, [songName])

  const fetchSong = async (name: string) => {
    console.log('Starting fetchSong for:',name)
    setLoading(true) // Ensure loading is set to true
    setError(null)   // Clear any previous errors
    
    try {
      const apiUrl = `/api/songs/${encodeURIComponent(name)}`
      console.log('Fetching from API:', apiUrl)
      
      // Add timeout to the fetch
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
      
      const response = await fetch(apiUrl, {
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)
      console.log('Response status:', response.status)
      
      if (!response.ok) {
        const errorData = await response.json()
        console.log('Error response:', errorData)
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('Song data received:', data)
      setSong(data)
    } catch (error) {
      console.error('Failed to fetch song:', error)
      if (error.name === 'AbortError') {
        setError('Request timed out')
      } else {
        setError('Failed to load song')
      }
    } finally {
      console.log('Setting loading to false')
      setLoading(false)
    }
  }

  console.log('Component state - loading:', loading, 'error:', error, 'song:', song?.name)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="text-center">Loading song...</div>
      </div>
    )
  }

  if (error || !song) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/" 
            className="text-blue-400 hover:text-blue-300 mb-4 inline-block"
          >
            ← Back to Songs
          </Link>
          <div className="text-red-400 text-center">
            {error || 'Song not found'}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <Link 
          href="/" 
          className="text-blue-400 hover:text-blue-300 mb-6 inline-block"
        >
          ← Back to Songs
        </Link>

        {/* Song Content */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Song Image */}
          <div className="flex justify-center">
            <img 
              src={`/jackets/${encodeURIComponent(song.name)}.png`}
              alt={`${song.name} jacket`}
              className="max-w-full h-auto border border-gray-700 rounded-lg"
              onError={(e) => {
                e.currentTarget.src = '/placeholder-image.png' // fallback image
              }}
            />
          </div>

          {/* Song Details */}
          <div>
            <h1 className="text-4xl font-bold mb-4">{song.name}</h1>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-blue-400">Description</h2>
              <p className="text-gray-300 leading-relaxed">
                {song.description || 'No description available.'}
              </p>
            </div>

            {song.guide && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2 text-blue-400">Guide</h2>
                <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {song.guide}
                </div>
              </div>
            )}

            {/* Additional sections can go here */}
            <div className="mt-8">
              <button 
                onClick={() => window.history.back()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}