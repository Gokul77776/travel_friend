"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Page({ userName }) {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <div>
      <header className="bg-[var(--primary-color)] text-[var(--secondary-color)] p-3 flex items-center justify-between shadow-md gap-4 flex-wrap">
        
        {/* User Name on Left */}
        <div className="text-lg font-medium">
          Welcome, {userName ? userName : "Guest"}!
        </div>

        {/* Centered Logo */}
        <div className="flex-1 flex justify-center">
          <Image src="/logo.png" alt="Logo" width={50} height={50} priority />
        </div>

        {/* Logout Button on Right */}
        <button 
          onClick={handleLogout} 
          className="bg-white text-orange-500 px-4 py-2 rounded-md font-semibold hover:bg-gray-200 transition"
          aria-label="Logout"
        >
          Logout
        </button>

      </header>
    </div>
  );
}
