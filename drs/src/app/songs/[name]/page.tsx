"use client"

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

type Song = {
  _id: string
  name: string
  original_name:string
  artist:string
  album:string
  bpm:string
  length:string
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
  // console.log(song);

  return (
    <div>
      <div className="min-h-screen bg-gray-900 text-white p-8">
        {/* Song Content */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Song Image */}
          <div className="flex justify-center">
            <Image
              src={`/jackets/${encodeURIComponent(song.name)}.png`}
              width={200}
              height={200}
              alt={`${song.name} jacket`}
              className="max-w-full h-auto border border-gray-700 rounded-lg"
              onError={(e) => {
                e.currentTarget.src = '/placeholder-image.png' 
              }}
            />
          </div>

          {/* Description */}
          <div>
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">
                  {song.name}
                  </h1>

                  <div>
                    Artist: {song.artist}
                  </div>

                  <div>
                    Album: {song.album}
                  </div>

                  <div>
                    BPM:{song.bpm}
                  </div>
                  <div>
                    Length: {song.length}
                  </div>
                </div>
              </div>
            </div>
      
            <div>
            {/* Guide */}
            {(
              <div className="mb-6 text-center">
                <h2 className="text-xl font-semibold mb-2 text-orange-400">Tips/Tricks</h2>
                <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {song.guide || 'No guide available'}
                </div>
              </div>
            )}

            {/* Relevant Links
            {(song.links && <div className="mb-6 text-center">
                {song.links || 'No links'}
               </div> 
              )
            }*/}

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
  )
}