"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";  
import Image from "next/image";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // Shared motion props for buttons
  const motionProps = {
    whileHover: { scale: 1.05, opacity: 0.9, boxShadow: "0px 4px 15px rgba(0,0,0,0.2)" },
    whileTap: { scale: 0.95 }
  };

  return (
    <header className="bg-[var(--primary-color)] text-[var(--secondary-color)] py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <Image
      src="/logo.jpeg"      
      alt="MyLogo"
      width={40}            
      height={40}
      className="mr-2"
    />
        </Link>

        {/* Mobile Menu Button */}
        <button className="md:hidden block" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4">
          <Link href="/signin">
            <motion.button
              {...motionProps}
              className="px-4 py-2 border border-[var(--secondary-color)] rounded-md hover:bg-[var(--secondary-color)] hover:text-[var(--primary-color)] transition duration-200"
            >
              Sign In
            </motion.button>
          </Link>
          <Link href="/signup">
            <motion.button
              {...motionProps}
              className="px-4 py-2 bg-[var(--secondary-color)] text-[var(--primary-color)] rounded-md hover:bg-[var(--primary-color)] hover:text-[var(--secondary-color)] transition duration-200"
            >
              Sign Up
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 mt-4">
          <Link href="/signin">
            <motion.button
              {...motionProps}
              className="w-full px-4 py-2 border border-[var(--secondary-color)] rounded-md hover:bg-[var(--secondary-color)] hover:text-[var(--primary-color)] transition duration-200"
            >
              Sign In
            </motion.button>
          </Link>
          <Link href="/signup">
            <motion.button
              {...motionProps}
              className="w-full px-4 py-2 bg-[var(--secondary-color)] text-[var(--primary-color)] rounded-md hover:bg-[var(--primary-color)] hover:text-[var(--secondary-color)] transition duration-200"
            >
              Sign Up
            </motion.button>
          </Link>
        </div>
      )}
    </header>
  );
}
