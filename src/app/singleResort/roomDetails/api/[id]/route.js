import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb"; 

export const GET = async (request, { params }) => {
    console.log(request);
  const db = await connectDB();
  const roomCollection = await db.collection("resortRoom");

  try {

    const roomId = new ObjectId(params.id);
    
    const room = await roomCollection.findOne({ _id: roomId });

    if (!room) {
      return NextResponse.json({ message: "Package not found" }, { status: 404 });
    }

    return NextResponse.json({ room });
  } catch (error) {
    console.error("Error fetching room:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
