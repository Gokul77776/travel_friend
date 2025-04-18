import User from "@/models/User";
import connectDB from "@/util/db";
import { NextResponse } from "next/server";




export async function GET(req,{params}){
    try {
        await connectDB();
         const {id} = await params;
        //  console.log(id);
        if(!id){
            return NextResponse.json({message:"Invalid user id"},{status:400});
        }
        const user = await User.findById(id);
        if(!user){
            return NextResponse.json({message:"user not found"},{status:400});
        }
        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}