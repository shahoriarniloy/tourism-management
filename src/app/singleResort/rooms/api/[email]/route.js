import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
    console.log('called');
    console.log(params.email);
    const db = await connectDB();
    const roomsCollection = db.collection('resortRoom');
    
    try {
      const rooms = await roomsCollection.find({ email: params.email }).toArray();
      
      if (!rooms || rooms.length === 0) {
        return NextResponse.json({ message: "No rooms found" }, { status: 404 });
      }

      return NextResponse.json({ rooms });
    } catch (error) {
      console.error("Error fetching rooms:", error);
      return NextResponse.json({ message: "Error fetching rooms" }, { status: 500 });
    }
};
