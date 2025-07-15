import {
    NextResponse
} from "next/server";
import Plan from '@/models/Plan';
import { uploadToCloudinary } from "@/util/upload";
import connectDB from "@/util/db";
import User from '@/models/User';
import {sendBulkEmail} from '@/util/resend'
 


export async function POST(req, {
    params
}) {
    try {
        connectDB();
        const formData = await req.formData();
        const file = formData.get("image");
        const des = formData.get("description");
        const location = formData.get("location");
        const date = formData.get("date");
        const totalAmount = formData.get("totalAmount");
        const requiredAmount = formData.get("requiredAmount");
        const totalMembers = formData.get("totalMembers");
        const requiredMembers = formData.get("requiredMembers");
        console.log("File size (bytes):", file.size);
        const {id} = await params;
         
        

        if (!file || !des || !location || !date || !totalAmount || !requiredAmount || !totalMembers || !requiredMembers || !id) {
            return NextResponse.json({
                message: "All fields are required"
            }, {
                status: 400
            });
        }

     let imageUrl = null;
       if (file && typeof file === "object") {
         const bytes = await file.arrayBuffer();
         const buffer = Buffer.from(bytes);
         const uploadResult = await uploadToCloudinary(buffer, file.name);
   
         if (!uploadResult.success) {
           return NextResponse.json(
             { message: "Image upload failed" },
             { status: 500 }
           );
         }
   
         imageUrl = uploadResult.result.secure_url;
       }
 
        const newPlan = new Plan({
            user: id,
            image: imageUrl,
            des,
            location,
            date,
            totalAmount,
            requiredAmount,
            totalMembers,
            requiredMembers
        });
        await newPlan.save();

        const currentUser = await User.findById(id) 
         
         
        

        const users = await User.find();
        console.log(users);
        const userEmails = users.map(user => user.email);
        console.log(userEmails);
        


        const subject = `Check for the new plan`;
        const message = `A new plan has been posted by ${currentUser.name} view it and make a trip with them, have fun and create a best memory!!.`;
        const from = `${currentUser.email}`;

        const emailResult = await sendBulkEmail(userEmails, subject, message, from);
        console.log("Emails sent:", emailResult);

        return NextResponse.json({
            message: "Post created successfully",
            plan: newPlan
        }, {
            status: 201
        });

    } catch (error) {
        console.error("Unexpected error:", error);
        return NextResponse.json({
            message: "Server error"
        }, {
            status: 500
        });
    }
}



