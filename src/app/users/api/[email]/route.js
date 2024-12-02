import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const db = await connectDB();
  const usersCollection = await db.collection("users");
  const resortsCollection = await db.collection("resorts");

  const { email } = params;
  console.log('user api:',email);

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const user = await usersCollection.findOne({ email });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  let role = "tourist";  
  let resortData = null;
  console.log(user.userType);

  if (user.userType === "resortManager") {
    role = "resortManager";
    resortData = await resortsCollection.findOne({ email }); 
  }

  return NextResponse.json({
    user: user,
    role: role,
    resortData: resortData, 
  }, { status: 200 });
}
