import clientPromise from '@/app/lib/mongodb'

export async function GET(request) {
  try {
    const client = await clientPromise
    const db = client.db('DRS') 
    const songs = await db.collection('songs').find({}).toArray()
    return Response.json(songs)
  } catch (error) {
    console.error('GET Error:', error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const client = await clientPromise
    const db = client.db('DRS') 
    
    const body = await request.json()
    const {name, description, guide} = body
    
    const result = await db.collection('songs').insertOne({name,description,guide})
    return Response.json({ success: true, id: result.insertedId })
  } catch (error) {
    console.error('POST Error:', error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}