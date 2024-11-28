import { connectDB } from "@/lib/connectDB"
import { NextResponse } from "next/server";


export const GET =async () => {
    const db = await connectDB()
    const resortsCollection = await db.collection('resorts')
    try {

        const resorts = await resortsCollection.find().toArray();
        return NextResponse.json({resorts})
    } catch (error) {
        console.log(error);
    }
}