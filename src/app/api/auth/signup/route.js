import { createSession } from "@/util/session"; 
import connectDB from "@/util/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

     
    const existingUser = await User.findOne({ email });
    if (existingUser) { 
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

     
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    
    await createSession({ id: newUser._id, name: newUser.name, email: newUser.email });

    return NextResponse.json({ 
      message: "User registered successfully!", 
      user: { id: newUser._id, name: newUser.name, email: newUser.email }
    }, { status: 201 });

  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
