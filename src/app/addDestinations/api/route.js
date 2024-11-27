import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const db = await connectDB();
  const destinationsCollection = await db.collection("destinations");

  try {
    const body = await req.json(); // Parse the request body
    const result = await destinationsCollection.insertOne(body);

    return NextResponse.json(
      { message: "Tourist Spot Added Successfully!", result },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding spot:", error);
    return NextResponse.json({ error: "Failed to add the spot." }, { status: 500 });
  }
};
