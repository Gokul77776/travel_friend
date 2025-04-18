"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";  

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-[var(--primary-color)] text-[var(--secondary-color)] py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <span className="text-2xl font-bold cursor-pointer">MyLogo</span>
        </Link>

        {/* Mobile Menu Button */}
        <button className="md:hidden block" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4">
          <Link href="/signin">
            <button className="px-4 py-2 border border-[var(--secondary-color)] rounded-md hover:bg-[var(--secondary-color)] hover:text-[var(--primary-color)] transition">
              Sign In
            </button>
          </Link>
          <Link href="/signup">
            <button className="px-4 py-2 bg-[var(--secondary-color)] text-[var(--primary-color)] rounded-md hover:bg-[var(--primary-color)] hover:text-[var(--secondary-color)] transition">
              Sign Up
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 mt-4">
          <Link href="/signin">
            <button className="w-full px-4 py-2 border border-[var(--secondary-color)] rounded-md hover:bg-[var(--secondary-color)] hover:text-[var(--primary-color)] transition">
              Sign In
            </button>
          </Link>
          <Link href="/signup">
            <button className="w-full px-4 py-2 bg-[var(--secondary-color)] text-[var(--primary-color)] rounded-md hover:bg-[var(--primary-color)] hover:text-[var(--secondary-color)] transition">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </header>
  );
}
