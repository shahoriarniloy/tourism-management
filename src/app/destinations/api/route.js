import { connectDB } from "@/lib/connectDB"
import { NextResponse } from "next/server";


export const GET =async () => {
    const db = await connectDB()
    const destinationsCollection = await db.collection('destinations')
    try {

        const destinations = await destinationsCollection.find().toArray();
        return NextResponse.json({destinations})
    } catch (error) {
        console.log(error);
    }
}