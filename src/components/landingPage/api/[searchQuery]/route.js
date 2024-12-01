import { connectDB } from "@/lib/connectDB"
import { NextResponse } from "next/server";

export const GET = async (req) => {
    const { searchQuery } = req.nextUrl.searchParams;  // Correct way to access query params in Next.js

    if (!searchQuery) {
        return NextResponse.json({ error: "Search query is missing" }, { status: 400 });
    }

    const db = await connectDB();
    const destinationsCollection = await db.collection('destinations');
    const resortsCollection = await db.collection('resorts');

    try {
        // Search for matching destinations
        const destinationResults = await destinationsCollection.find({
            $or: [
                { name: { $regex: searchQuery, $options: 'i' } },
                { country: { $regex: searchQuery, $options: 'i' } },
                { location: { $regex: searchQuery, $options: 'i' } },
                { seasonality: { $regex: searchQuery, $options: 'i' } },
            ]
        }).toArray();

        // Search for matching resorts
        const resortResults = await resortsCollection.find({
            $or: [
                { name: { $regex: searchQuery, $options: 'i' } },
                { resortName: { $regex: searchQuery, $options: 'i' } },
                { location: { $regex: searchQuery, $options: 'i' } },
            ]
        }).toArray();

        return NextResponse.json({
            destinations: destinationResults,
            resorts: resortResults,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch search results" }, { status: 500 });
    }
};
