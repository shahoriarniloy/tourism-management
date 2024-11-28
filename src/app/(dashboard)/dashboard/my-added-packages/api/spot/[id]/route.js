import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const DELETE = async (request, {params}) => {
    const db = await connectDB();
    const destinationsCollection = await db.collection('destinations')
    try {
        const resp = await destinationsCollection.deleteOne({_id: new ObjectId(params.id)})
        return NextResponse.json({message : 'deleted the spot', response : resp})
    } catch (error) {
        return NextResponse.json({message : 'Something went wrong'})
    }
}
export const PATCH = async (request, { params }) => {
    try {
        const db = await connectDB();
        const destinationsCollection = await db.collection('destinations');

        // Parse the incoming request body
        const updateDoc = await request.json();

        // Perform the update operation
        const resp = await destinationsCollection.updateOne(
            { _id: new ObjectId(params.id) }, // Match by ID
            { $set: updateDoc }, // Update document
            { upsert: true } // Create a new document if no match is found
        );

        // Respond with success
        return NextResponse.json({ message: 'Spot updated successfully', response: resp });
    } catch (error) {
        console.error('Error updating the spot:', error);
        // Respond with error message
        return NextResponse.json({ message: 'Something went wrong', error: error.message });
    }
};

export const GET = async (request, { params }) => {
    try {
      const db = await connectDB();
      const destinationsCollection = db.collection("destinations");
  
      const resp = await destinationsCollection.findOne({
        _id: new ObjectId(params.id),
      });
  
      if (!resp) {
        return NextResponse.json({ message: "Spot not found", data: null });
      }
  
      return NextResponse.json({ message: "Spot Found", data: resp });
    } catch (error) {
      console.error("Error fetching spot:", error);
      return NextResponse.json({
        message: "Something went wrong",
        error: error.message,
      });
    }
  };