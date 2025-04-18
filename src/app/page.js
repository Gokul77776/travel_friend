'use client'
import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Page(){
  return (
    <div>
      <Header />
      {/* Main page content */} 
    <div className="relative w-full h-[500px] md:h-[600px]">
  {/* Background Image */}
    <Image 
      src="/imgone.jpg"  
      alt="Background Image"
      fill
      className="object-cover" 
    />    

  {/* Overlay with Opacity */}
  <div className="absolute inset-0 bg-black opacity-70 flex flex-col items-center justify-center text-center px-6">
    <h2 className="text-white text-2xl md:text-4xl font-bold">
      Waiting for your friends to start the trip?
    </h2>
    <motion.p 
          className="text-white text-lg md:text-xl mt-2"
          initial={{ letterSpacing: "0px", opacity: 0 }}
          animate={{ letterSpacing: "3px", opacity: 1 }}
          transition={{ duration: 3, ease: "easeOut" }}
        >
          Don't wait anymore! Join now and start your journey.
        </motion.p>
        <Link href="/signup">
            <button className="w-full px-4 mt-4 py-2 bg-[var(--secondary-color)] text-[var(--primary-color)] rounded-md hover:bg-[var(--primary-color)] hover:text-[var(--secondary-color)] transition">
              Sign Up
            </button>
        </Link>
  </div>
</div>
    </div>
  );
}

