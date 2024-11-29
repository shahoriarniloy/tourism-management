import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const DELETE = async (request, {params}) => {
    const db = await connectDB();
    const packagesCollection = await db.collection('packages')
    try {
        const resp = await packagesCollection.deleteOne({_id: new ObjectId(params.id)})
        return NextResponse.json({message : 'deleted the Package', response : resp})
    } catch (error) {
        return NextResponse.json({message : 'Something went wrong'})
    }
}
export const PATCH = async (request, { params }) => {
    try {
        const db = await connectDB();
        const packagesCollection = await db.collection('packages');

        // Parse the incoming request body
        const updateDoc = await request.json();

        // Perform the update operation
        const resp = await packagesCollection.updateOne(
            { _id: new ObjectId(params.id) }, // Match by ID
            { $set: updateDoc }, // Update document
            { upsert: true } // Create a new document if no match is found
        );

        // Respond with success
        return NextResponse.json({ message: 'Package updated successfully', response: resp });
    } catch (error) {
        console.error('Error updating the Package:', error);
        // Respond with error message
        return NextResponse.json({ message: 'Something went wrong', error: error.message });
    }
};

export const GET = async (request, { params }) => {
    try {
      const db = await connectDB();
      const packagesCollection = db.collection("packages");
  
      const resp = await packagesCollection.findOne({
        _id: new ObjectId(params.id),
      });
  
      if (!resp) {
        return NextResponse.json({ message: "Package not found", data: null });
      }
  
      return NextResponse.json({ message: "Package Found", data: resp });
    } catch (error) {
      console.error("Error fetching Package:", error);
      return NextResponse.json({
        message: "Something went wrong",
        error: error.message,
      });
    }
  };