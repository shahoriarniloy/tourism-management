import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request, context) => {
  const { params } = context; 
  const db = await connectDB();
  const resortsCollection = db.collection('resorts');

  try {
    const myResort = await resortsCollection.findOne({ email: params.email });
    if (!myResort) {
      return NextResponse.json({ message: "Resort not found" }, { status: 404 });
    }
    return NextResponse.json({ myResort });
  } catch (error) {
    console.error("Error fetching resort:", error);
    return NextResponse.json({ message: "Error fetching resort" }, { status: 500 });
  }
};

export const PATCH = async (request, context) => {
  try {
    const { params } = context; 
    const db = await connectDB();
    const resortsCollection = db.collection('resorts');

    const updateDoc = await request.json();
    const { email } = params;

    const filteredUpdateDoc = Object.fromEntries(
      Object.entries(updateDoc).filter(([_, value]) => value !== null && value !== undefined && value !== '')
    );

    if (Object.keys(filteredUpdateDoc).length === 0) {
      return NextResponse.json({ message: 'No valid fields to update' });
    }

    const resp = await resortsCollection.updateOne(
      { email },
      { $set: filteredUpdateDoc },
      { upsert: true }
    );

    return NextResponse.json({ message: 'Spot updated successfully', response: resp });
  } catch (error) {
    console.error('Error updating the spot:', error);
    return NextResponse.json({ message: 'Something went wrong', error: error.message });
  }
};
