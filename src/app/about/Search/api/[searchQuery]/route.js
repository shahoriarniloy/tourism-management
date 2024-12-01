import { connectDB } from "@/lib/connectDB"
import { NextResponse } from "next/server";

export const GET = async (req) => {
    const { searchQuery } = req.nextUrl.searchParams;  
    ;
    const db = await connectDB();

    const destinationsCollection = await db.collection('destinations');
    const resortsCollection = await db.collection('resorts');

    try {
        const destinationResults = await destinationsCollection.find({
            $or: [
                { name: { $regex: searchQuery, $options: 'i' } },
                { country: { $regex: searchQuery, $options: 'i' } },
                { location: { $regex: searchQuery, $options: 'i' } },
                { seasonality: { $regex: searchQuery, $options: 'i' } },
            ]
        }).toArray();
    
        const resortResults = await resortsCollection.find({
            $or: [
                { name: { $regex: searchQuery, $options: 'i' } },
                { resortName: { $regex: searchQuery, $options: 'i' } },
                { location: { $regex: searchQuery, $options: 'i' } },
            ]
        }).toArray();
    
        console.log("Sending response...");
        return NextResponse.json({
            destinations: destinationResults,
            resorts: resortResults,
        });
    
    } catch (error) {
        console.error("Error during search operation:", error);
        return NextResponse.json({ error: "Failed to fetch search results" }, { status: 500 });
    }
     
};
