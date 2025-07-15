import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/util/upload";
import connectDB from "@/util/db";
import Post from "@/models/Post";

export async function POST(req, { params }) {
  try {
    await connectDB();

    const formData = await req.formData();
    const file = formData.get("image");
    const description = formData.get("description");
    const location = formData.get("location");
    const { id } = await params;

    if (!file || !description || !location) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
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

    const newPost = new Post({
      user: id,
      image: imageUrl,
      description,
      location,
    });

    await newPost.save();
    
    return NextResponse.json(
      { message: "Post created successfully", post: newPost },
      { status: 201 }
    );

  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}


// GET 
export async function GET(req, { params }) {
  try {
    const { id } = await params;
    await connectDB();

    if (!id) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    const posts = await Post.find({ user: id }).populate("user");

    return NextResponse.json(
      { posts, message: "Posts retrieved successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving posts:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

 