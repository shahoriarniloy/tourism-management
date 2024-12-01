import { connectDB } from "@/lib/connectDB"
import { NextResponse } from "next/server";

export const GET = async () => {
    const db = await connectDB();
    const testimonialsCollection = await db.collection('testimonials');
    const destinationsCollection = await db.collection('destinations');
    const usersCollection = await db.collection('users');

    try {
        const testimonials = await testimonialsCollection.find().toArray();

        const destinationsCount = await destinationsCollection.countDocuments();
        const usersCount = await usersCollection.countDocuments();
        const testimonialsCount = await testimonialsCollection.countDocuments();

        return NextResponse.json({
            testimonials,
            counts: {
                destinations: destinationsCount,
                users: usersCount,
                testimonials: testimonialsCount,
            },
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }
};
