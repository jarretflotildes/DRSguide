import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/app/lib/mongodb'

export async function GET(
  request: NextRequest,
  { params }: { params: { name: string } }
) {

  params = await params
  const songName = decodeURIComponent(params.name)
  
  try {
    const db = await getDatabase('DRS')
    const collection = db.collection('songs')
   
    let song = await collection.findOne({ 
      name: songName
    })
   
    if (!song) {
      console.log('Song not found in database')
      return NextResponse.json(
        { 
          error: 'Song not found',
          searchedFor: songName,
        },
        { status: 404 }
      )
    }
    
    console.log('Returning song:', song.name)
    return NextResponse.json(song)
    
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error},
      { status: 500 }
    )
  }
}