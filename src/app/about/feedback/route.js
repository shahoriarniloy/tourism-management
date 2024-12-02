import { connectDB } from "@/lib/connectDB"


export const POST = async (request) => {

    try {
        const db = await connectDB()
        const feedback = db.collection('feedback');
        const feed = await request.json();
        const result = await feedback.insertOne(feed)


        return Response.json({
            message: 'post method is ok'
        })
    } catch (error) {
        return Response.json({ message: 'something is wrong' })
    }
}