import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const db = await connectDB();
  const ResortRoomCollection = await db.collection("resortRoom");

  try {
    const body = await req.json(); 
    const result = await ResortRoomCollection.insertOne(body);

    return NextResponse.json(
      { message: "Resort Room Added Successfully!", result },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding Resort Room:", error);
    return NextResponse.json({ error: "Failed to add the Resort Room." }, { status: 500 });
  }
};
