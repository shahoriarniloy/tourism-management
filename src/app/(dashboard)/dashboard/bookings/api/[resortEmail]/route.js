import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { resortEmail } = params;
    console.log(resortEmail);

    if (!resortEmail) {
      return NextResponse.json({ error: "Email not found in session" }, { status: 400 });
    }

    const db = await connectDB();

    // Fetch booked rooms
    const roomsCollection = await db.collection("resortRoom");
    const bookedRooms = await roomsCollection.find({
      "email": resortEmail,
      status: "Booked",
    }).toArray();

    // Fetch booked packages
    const packagesCollection = await db.collection("packages");
    const bookedPackages = await packagesCollection.find({
      "email": resortEmail,
      status: "Booked",
    }).toArray();

    // Combine the results and return both
    return NextResponse.json({
      bookedRooms,
      bookedPackages,
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching booked rooms and packages:", error);
    return NextResponse.json({ error: "Failed to fetch booked rooms and packages" }, { status: 500 });
  }
}
