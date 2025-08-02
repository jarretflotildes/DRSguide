import { NextRequest, NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'
import clientPromise from '@/app/lib/mongodb'

export async function GET(
  request: NextRequest,
  { params }: { params: { songName: string } }
) {
  try {
    const songName = decodeURIComponent(params.songName)
    
    // Properly type the client
    const client: MongoClient = await clientPromise
    const db = client.db('DRS') 
    const collection = db.collection('songs')
    
    // Find the song by name (case-insensitive search)
    console.log("HELLO WORLD")
    console.log("finding...", song.name)
    const song = await collection.findOne({ 
      name: songName
    })
    
    if (!song) {
      return NextResponse.json(
        { error: 'Song not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(song)
    
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}