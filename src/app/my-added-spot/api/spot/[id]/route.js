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
// export const PATCH = async (request, {params}) => {
//     const db = await connectDB();
//     const destinationsCollection = await db.collection('destinations')
//     try {
//         const resp = await destinationsCollection.deleteOne({_id: new ObjectId(params.id)})
//         return NextResponse.json({message : 'deleted the spot', response : resp})
//     } catch (error) {
//         return NextResponse.json({message : 'Something went wrong'})
//     }
// }
export const GET = async (request, {params}) => {
    const db = await connectDB();
    const destinationsCollection = await db.collection('destinations')
    try {
        const resp = await destinationsCollection.findOne({_id: new ObjectId(params.id)})
        return NextResponse.json({message : 'Spot Found', response : resp})
    } catch (error) {
        return NextResponse.json({message : 'Something went wrong'})
    }
}