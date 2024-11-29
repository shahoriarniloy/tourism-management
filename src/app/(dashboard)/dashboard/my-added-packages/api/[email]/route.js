import { connectDB } from "@/lib/connectDB"
import { NextResponse } from "next/server"

export const GET = async (request, {params}) => {
const db = await connectDB()
const packagesCollection = await db.collection('packages')
try {
    
const myAddedPackages = await packagesCollection.find({email : params.email}).toArray()
return NextResponse.json({myAddedPackages})
} catch (error) {
    console.log(error);
}



}