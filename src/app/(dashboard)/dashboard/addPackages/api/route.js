import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const db = await connectDB();
  const packagesCollection = await db.collection("packages");

  try {
    const body = await req.json(); 
    const result = await packagesCollection.insertOne(body);

    return NextResponse.json(
      { message: "Package Added Successfully!", result },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding Package:", error);
    return NextResponse.json({ error: "Failed to add the Package." }, { status: 500 });
  }
};
