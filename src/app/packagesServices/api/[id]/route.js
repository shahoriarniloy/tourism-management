import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb"; 

export const GET = async (request, { params }) => {
    console.log(request);
  const db = await connectDB();
  const packagesCollection = await db.collection("packages");

  try {

    const packageId = new ObjectId(params.id);
    
    const packages = await packagesCollection.findOne({ _id: packageId });

    if (!packages) {
      return NextResponse.json({ message: "Package not found" }, { status: 404 });
    }

    return NextResponse.json({ packages });
  } catch (error) {
    console.error("Error fetching package:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
