import { connectDB } from "@/lib/connectDB"
import { NextResponse } from "next/server"

export const GET = async (request, {params}) => {
const db = await connectDB()
const resortRoomCollection = await db.collection('resortRoom')
try {
    
const myAddedResortRoom = await resortRoomCollection.find({email : params.email}).toArray()
return NextResponse.json({myAddedResortRoom})
} catch (error) {
    console.log(error);
}
}