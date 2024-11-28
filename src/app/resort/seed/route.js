import { connectDB } from "@/lib/connectDB"
import { resorts } from "@/lib/resorts";
import { NextResponse } from "next/server";


export const GET =async () => {
    const db = await connectDB()
    const resortsCollection = await db.collection('resorts')
    try {
        await resortsCollection.deleteMany();
        const resp = await resortsCollection.insertMany(resorts);
        return NextResponse.json({message : "resort successfully"})
    } catch (error) {
        console.log(error);
    }
}