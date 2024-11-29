import { connectDB } from "@/lib/connectDB";
import bcrypt from "bcrypt";
export const POST = async(request)=>{
    const newUser = await request.json();
    try{
    const db=await connectDB()
    const userCollection = db.collection('users')
    const resortsCollection = db.collection('resorts');

    const exist = await userCollection.findOne({email:newUser.email})
    if(exist){
        return Response.json({message:"User Exists"},{status:304})
    }
const hashedPassword = bcrypt.hashSync(newUser.password, 14);
    
    const resp = await userCollection.insertOne({...newUser, password:hashedPassword})
    if (newUser?.userType === "resortManager") {
        const { password,
            userType, ...resortData } = newUser; 
        await resortsCollection.insertOne(resortData);
      }
    return Response.json({message:"user created"},{status:200})
} catch (error){
    return Response.json({message:"Something went wrong",error},{status:500})

}

};