import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/util/db";
import User from "@/models/User";
import { createSession } from "@/util/session"; 

export async function POST(req) {
    try {
        await connectDB();
        const { email, password } = await req.json();

        // Email validation regex
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // Check if email or password is missing
        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }  
            );
        }

        // Validate the email format
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 }
            );
        }

        // Fetch user from database
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // Create session with user ID
        await createSession({ id: user._id, email: user.email, name: user.name });

        return NextResponse.json({ message: "Sign-in successful", id: user._id }, { status: 200 });

    } catch (error) {
        console.error("Sign-in error:", error.message);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
