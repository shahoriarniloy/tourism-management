import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function POST(req, { params }) {
  const db = await connectDB();
  const packagesCollection = await db.collection("packages");
  const bookingHistoryCollection = await db.collection("bookingHistory");

  try {
    const { packageId } = params;

    if (!packageId) {
      return NextResponse.json({ error: "Room ID not provided" }, { status: 400 });
    }

    const objectIdPackageId = new ObjectId(packageId);

    const room = await packagesCollection.findOne({ _id: objectIdPackageId });

    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    const bookingInfo = room.bookingInfo || {};

    const historyData = {
      packageId: packageId,
      customerEmail: bookingInfo.customerEmail || "",
      checkInDate: bookingInfo.checkInDate || "",
      checkOutDate: bookingInfo.checkOutDate || "",
      checkOut: new Date(), 
    };

    await bookingHistoryCollection.insertOne(historyData);

    const roomUpdateResult = await packagesCollection.updateOne(
      { _id: objectIdPackageId },
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

    return NextResponse.json({ message: "Package checkout successful and booking history saved" }, { status: 200 });

  } catch (error) {
    console.error("Error during Package checkout:", error);
    return NextResponse.json({ error: "Error during Package checkout" }, { status: 500 });
  }
}
