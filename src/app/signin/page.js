'use client';
// import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSignin = async (e) => {
    e.preventDefault();  

    try {
      const res = await fetch('/api/auth/signin', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", 
      });

      const data = await res.json();
      
      if (res.ok) {
        router.push(`/profile/${data.id}`);
        
      } else {
        setErrorMessage(data.error || "Invalid credentials");  
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
      console.error("Signin Error:", error);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 border-2 border-orange-500">
        {/* Logo */}
        {/* <div className="flex justify-center mb-6">
          <Image src="/logo.png" alt="Logo" width={80} height={80} />
        </div> */}

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Sign In
        </h2>

       
        {/* Form */}
        <form onSubmit={handleSignin}>
          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            />
          </div>

           
        {errorMessage && (
          <p className="text-red-500 text-sm text-center mb-4">{errorMessage}</p>
        )}


          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
          >
            Sign In
          </button>
        </form>
        <div className="mt-1">
                  Do not have an account?{" "}
                  <Link href="/signup" className="text-blue-500">
                    Click here
                  </Link>
                </div>
      </div>
    </div>
  );
}
