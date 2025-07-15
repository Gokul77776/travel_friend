

import { NextResponse } from "next/server";
import connectDB from "@/util/db";
import Post from "@/models/Post";

export async function DELETE(request,{params}){
    try {
        await connectDB();
        const { postid } =await params;
        console.log(postid);
        
        const deletepost = await Post.findByIdAndDelete(postid);
        if(!deletepost) {
            return NextResponse.json({message:"Post not found"},{status:404});
        }
        return NextResponse.json({message:"Post Deleted successfully"},{status:200});

    } catch (error) {
        console.log(error);
        return NextResponse.json({err:error},{status:500})
        
    }
}