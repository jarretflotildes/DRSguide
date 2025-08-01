"use client"

import { useState, useEffect } from 'react'

export default function addSong() {
  const [song, setSong] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [guide, setGuide] = useState('')

  useEffect(() => {
    fetchSongs()
  }, [])

  const fetchSongs = async () => {
    const response = await fetch('/api/song')
    const data = await response.json()
    setSong(data)
  }

  const addSong = async (e) => {
    e.preventDefault()
    await fetch('/api/song', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({name,description,guide})
    })
    setName('')
    setDescription('')
    setGuide('')
    fetchSongs()
  }

  return (
    <div>
      <form onSubmit={addSong}>
        <input 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Song name" 
        />
        <input 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Description" 
        />
        <input 
          value={guide} 
          onChange={(e) => setGuide(e.target.value)} 
          placeholder="Guide" 
        />
        <button type="submit">Add Song</button>
      </form>
      
      <ul>
        {song.map(song => (
          <li key={song._id}>{song.name} - {song.description} - {song.guide}</li>
        ))}
      </ul>
    </div>
  )
}