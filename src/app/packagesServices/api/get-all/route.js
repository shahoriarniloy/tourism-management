import { connectDB } from "@/lib/connectDB"
import { NextResponse } from "next/server";


export const GET =async () => {
    const db = await connectDB()
    const packagesCollection = await db.collection('packages')
    try {

        const packages = await packagesCollection.find().toArray();
        return NextResponse.json({packages})
    } catch (error) {
        console.log(error);
    }
}