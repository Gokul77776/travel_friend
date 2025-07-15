


import Plans from "@/models/Plan";
import connectDB from "@/util/db";
import { NextResponse } from "next/server";



export async function GET() {
    try {
        await connectDB();
         const user = await Plans.find();    
         return NextResponse.json(user,{message:"successfully fetched the data"},{status:200});

    } catch (error) {
        console.log(error);
        return NextResponse.json({error:error.message},{status:500});
        
    }
    
}