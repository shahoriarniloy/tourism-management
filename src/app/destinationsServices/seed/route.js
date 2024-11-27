import { connectDB } from "@/lib/connectDB"
import { destinationsServices } from "@/lib/destinationsServices";
import { NextResponse } from "next/server";


export const GET =async () => {
    const db = await connectDB()
    const destinationsCollection = await db.collection('destinations')
    try {
        await destinationsCollection.deleteMany();
        const resp = await destinationsCollection.insertMany(destinationsServices);
        return NextResponse.json({message : "seed successfully"})
    } catch (error) {
        console.log(error);
    }
}