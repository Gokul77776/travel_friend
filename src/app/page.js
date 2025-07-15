"use client";
import Header from "@/components/Header";
import Image from "next/image";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";   

export default function Page() {
  return (
    <div>
      <Header />

      {/* Hero Section */}
      <div className="relative w-full h-screen md:h-[600px]">
        <Image
          src="/banner.jpg"
          alt="Background Image"
          fill
          
        />

        <div className="absolute inset-0 bg-black opacity-70 flex flex-col items-center justify-center text-center px-6">
          <motion.h2
            className="text-white text-2xl md:text-4xl font-bold font-heading transition-all duration-300 hover:scale-105 hover:text-[var(--primary-color)] hover:underline"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
           Never Cancel a Trip Again—Find Your Travel Buddy Today!

          </motion.h2>

          <motion.p
            className="text-white text-lg md:text-xl mt-2 font-paragraph transition-all duration-300 hover:scale-105 hover:text-[var(--primary-color)] hover:underline"
            initial={{ letterSpacing: "0px", opacity: 0 }}
            animate={{ letterSpacing: "3px", opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
          >
             Travel solo no more—connect, plan, and explore together!
          </motion.p>
        </div>
      </div>

      {/* About Section */}
      <section className="bg-white py-12 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 font-heading transition-all duration-300 hover:scale-105 hover:text-[var(--primary-color)] hover:underline">
          About Us
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-paragraph transition-all duration-300 hover:scale-105 hover:text-[var(--primary-color)] hover:underline">
"We're on a mission to ensure no travel plan gets canceled due to missing company. Our platform connects like-minded travelers so you can explore the world together, safely and affordably."
        
        </p>

      </section>

    

     
      <Footer />
    </div>
  );
}
