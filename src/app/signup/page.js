'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import BackgroundAnimation from '@/components/BackgroundAnimation';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: username, email, password }),
        credentials: 'include',
      });

      const data = await res.json();
      const id = data.user?.id;

      if (res.ok) {
        setMessage('Signup successful! Redirecting...');
        router.push(`/profile/${id}`);
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      setMessage('Something went wrong. Try again!');
      console.error('Signup Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-200">
      {/* Background Animation */}
      <div className="absolute inset-0 z-0">
        <BackgroundAnimation />
      </div>

      {/* Signup Form with animated border */}
      <motion.div
        initial={{ backgroundPosition: '0% 50%' }}
        animate={{ backgroundPosition: '100% 50%' }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        className="p-[3px] rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-[length:200%_200%] relative z-10 max-w-sm w-full"
      >
        <div className="bg-white rounded-lg p-8 shadow-md border border-transparent">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Sign Up</h2>

          <form onSubmit={handleSignup}>
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

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition disabled:opacity-70"
              disabled={loading}
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>
          </form>

          {message && <p className="mt-2 text-center text-red-500">{message}</p>}

          <div className="mt-1 text-center">
            Already have an account?{' '}
            <Link href="/signin" className="text-blue-500">
              Click here
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
