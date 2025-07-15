import { uploadToCloudinary } from "@/util/upload";
import { NextResponse } from "next/server";
import UserProfile from "@/models/Profile";
import connectDB from "@/util/db";


// Post method for creating the profile
export async function POST(req, { params }) { 
  try {
    await connectDB();
    const formData = await req.formData();
    const file = formData.get("profileImage");  
    const bio = formData.get("bio");            
    const location = formData.get("location");
    const dateOfBirth = formData.get("dateOfBirth");
    const { id } = await params;
    console.log("File size (bytes):", file.size);
    
    const existingProfile = await UserProfile.findOne({ user: id });
    if (existingProfile) {
      return NextResponse.json(
        { message: "Profile already exists for this user" },
        { status: 400 }
      );   
    }  

    let imageUrl = null;
    if (file && typeof file === "object") {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadResult = await uploadToCloudinary(buffer, file.name);

      if (!uploadResult.success) {
        return NextResponse.json({ message: "Upload failed" }, { status: 500 });
      }  

      imageUrl = uploadResult.result.secure_url;
    }
    const newProfile = new UserProfile({
      user: id,
      profileImage: imageUrl,
      bio,
      location,
      dateOfBirth,
    });
    await newProfile.save();  
    return NextResponse.json(
      { message: "Profile created successfully", profile: newProfile },
      { status: 201 }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}


// Get function for the user profile
export async function GET(req,{params}){
  try {
      const {id} = await params;
      console.log(id);
      await connectDB();
      if(!id) return NextResponse.json({message:"User not found"}, {status:404});
      const user = await UserProfile.findOne({ user: id }).populate('user');
      // console.log(user);
      return NextResponse.json({user:user},{message:"User profile found successfully"},{status:200});
  } catch (error) {
      console.log(error);
      return NextResponse.json({message:"Internal server error"},{status:500});        
  }
}


// Update method for user profile 
export async function PATCH(req, { params }) {
  try {
    await connectDB();
    const formData = await req.formData();
    const file = formData.get("profileImage");
    const bio = formData.get("bio");
    const location = formData.get("location");
    const dateOfBirth = formData.get("dateOfBirth");
    const { id } = await params;

    const existingProfile = await UserProfile.findOne({ user: id });
    if (!existingProfile) {
      return NextResponse.json(
        { message: "Profile not found" },
        { status: 404 }
      );
    }

    let imageUrl = existingProfile.profileImage;
    if (file && typeof file === "object" && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadResult = await uploadToCloudinary(buffer, file.name);

      if (!uploadResult.success) {
        return NextResponse.json({ message: "Upload failed" }, { status: 500 });
      }

      imageUrl = uploadResult.result.secure_url;
    }

    // Update fields
    existingProfile.profileImage = imageUrl;
    existingProfile.bio = bio || existingProfile.bio;
    existingProfile.location = location || existingProfile.location;
    existingProfile.dateOfBirth = dateOfBirth || existingProfile.dateOfBirth;

    await existingProfile.save();

    return NextResponse.json(
      { message: "Profile updated successfully", profile: existingProfile },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}