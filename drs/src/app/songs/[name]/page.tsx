"use client"

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/app/(components)/Navbar'

type Song = {
  _id: string
  name: string
  description: string
  guide?: string
}

export default function SongPage() {
  const params = useParams()
 
  const songName = params.name as string
  
  const [song, setSong] = useState<Song | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (songName) {
      fetchSong(decodeURIComponent(songName))
    }
  }, [songName])

  const fetchSong = async (name: string) => {
    try {
      const apiUrl = `/api/songs/${encodeURIComponent(name)}`
      const response = await fetch(apiUrl)
      
      if (!response.ok) {
        const errorData = await response.json()
        console.log('Error response:', errorData)
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setSong(data)
    } catch (error) {
      setError('Failed to load song')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div>
          <Navbar/>
          <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="text-center">Loading song...</div>
          </div>
      </div>
    )
  }

  if (error || !song) {
    return (
      <div>
        <div className="min-h-screen bg-gray-900 text-white p-8">
          <Navbar/>
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
      </div>
    )
  }

  return (
    <div>
      <Navbar/>
      <div className="min-h-screen bg-gray-900 text-white p-8">

        {/* Song Content */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Song Image */}
          <div className="flex justify-center">
            <img 
              src={`/jackets/${encodeURIComponent(song.name)}.png`}
              alt={`${song.name} jacket`}
              className="max-w-full h-auto border border-gray-700 rounded-lg"
              onError={(e) => {
                e.currentTarget.src = '/placeholder-image.png' 
              }}
            />
          </div>

          {/* Description */}
          <div>
            <h1 className="text-4xl font-bold mb-4">{song.name}</h1>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-blue-400">Description</h2>
              <p className="text-gray-300 leading-relaxed">
                {song.description || 'No description available.'}
              </p>
            </div>

            {/* Guide */}
            {song.guide && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2 text-blue-400">Guide</h2>
                <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {song.guide}
                </div>
              </div>
            )}

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
                    {/* Navigation */}
        <div className="max-w-4xl mx-auto align-bottom">
          <Link 
            href="/" 
            className="text-blue-400 hover:text-blue-300 mb-6 inline-block"
          >
            Home
          </Link>

          </div>
      </div>
    </div>
  )
}