import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
    const db = await connectDB();
    const packagesCollection = db.collection('packages');
    
    try {
      const packages = await packagesCollection.find({ email: params.email }).toArray();
      
      if (!packages || packages.length === 0) {
        return NextResponse.json({ message: "No packages found" }, { status: 404 });
      }

      return NextResponse.json({ packages });
    } catch (error) {
      console.error("Error fetching packages:", error);
      return NextResponse.json({ message: "Error fetching packages" }, { status: 500 });
    }
};



