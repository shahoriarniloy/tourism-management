import { connectDB } from "@/lib/connectDB"
import { NextResponse } from "next/server"

export const GET = async (request, {params}) => {
const db = await connectDB()
const destinationsCollection = await db.collection('destinations')
try {
    
const myAddedSpots = await destinationsCollection.find({email : params.email}).toArray()
return NextResponse.json({myAddedSpots})
} catch (error) {
    console.log(error);
}



}