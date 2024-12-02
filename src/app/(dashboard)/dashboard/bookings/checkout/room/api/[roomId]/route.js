import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function POST(req, { params }) {
  const db = await connectDB();
  const roomsCollection = await db.collection("resortRoom");
  const bookingHistoryCollection = await db.collection("bookingHistory");

  try {
    const { roomId } = params;

    if (!roomId) {
      return NextResponse.json({ error: "Room ID not provided" }, { status: 400 });
    }

    const objectIdRoomId = new ObjectId(roomId);

    const room = await roomsCollection.findOne({ _id: objectIdRoomId });

    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    const bookingInfo = room.bookingInfo || {};

    const historyData = {
      roomId: roomId,
      customerEmail: bookingInfo.customerEmail || "",
      checkInDate: bookingInfo.checkInDate || "",
      checkOutDate: bookingInfo.checkOutDate || "",
      checkOut: new Date(), 
    };

    await bookingHistoryCollection.insertOne(historyData);

    const roomUpdateResult = await roomsCollection.updateOne(
      { _id: objectIdRoomId },
      {
        $set: {
          status: "", 
          bookingInfo: {
            checkInDate: "",
            checkOutDate: "",
            customerEmail: "",
          },
        },
      }
    );

    if (roomUpdateResult.modifiedCount === 0) {
      return NextResponse.json({ error: "Failed to update room" }, { status: 500 });
    }

    return NextResponse.json({ message: "Room checkout successful and booking history saved" }, { status: 200 });

  } catch (error) {
    console.error("Error during room checkout:", error);
    return NextResponse.json({ error: "Error during room checkout" }, { status: 500 });
  }
}
