"use client";

// import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: username, email, password }),
        credentials: "include", 
      });
    const data = await res.json();
    const id = data.user.id;
    console.log(id);
        
      if (res.ok) {
        setMessage("Signup successful! Redirecting...");
        router.push(`/profile/${id}`);
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      setMessage("Something went wrong. Try again!");
      console.error("Signup Error:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 border-2 border-orange-500">
        {/* Logo */}
        {/* <div className="flex justify-center mb-6">
          <Image src="/logo.png" alt="Logo" width={80} height={80} />
        </div> */}

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Sign Up
        </h2>

        {/* Signup Form */}
        <form onSubmit={handleSignup}>
          {/* Username Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Username</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {/* Message Display */}
        {message && <p className="mt-2 text-center text-red-500">{message}</p>}

        {/* Redirect to Sign In */}
        <div className="mt-1">
          Already have an account?{" "}
          <Link href="/signin" className="text-blue-500">
            Click here
          </Link>
        </div>
      </div>
    </div>
  );
}
