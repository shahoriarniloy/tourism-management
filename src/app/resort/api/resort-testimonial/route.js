import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const db = await connectDB()
        const feedback = db.collection('feedback');
        const feedbacks = await feedback.find().toArray();
        return NextResponse.json({ feedbacks })
    } catch (error) {
        console.log(error)
    }
}