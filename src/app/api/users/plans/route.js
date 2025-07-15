import Plan from "@/models/Plan";
import connectDB from "@/util/db";
import { NextResponse } from "next/server";





export async function GET(){
    try {
        await connectDB();
        const plans = await Plan.find().populate('user', 'name');
        return NextResponse.json(plans,{message:'Successfully got all the updates'},{status:200});

    } catch (error) {
        console.log(error);
        return NextResponse.json({error:error.message},{status:500});
    }
}