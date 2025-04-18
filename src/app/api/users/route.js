


import User from "@/models/User";
import connectDB from "@/util/db";
import { NextResponse } from "next/server";



export async function GET() {
    try {
        await connectDB();
         const user = await User.find();    
        // user.forEach(user => 
        //     console.log(user.email)
        // );
         return NextResponse.json(user,{message:"successfully fetched the data"},{status:200});

    } catch (error) {
        console.log(error);
        return NextResponse.json({error:error.message},{status:500});
        
    }
    
}