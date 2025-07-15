"use client";
import { Instagram, Facebook, Twitter } from "lucide-react";  

export default function Page() {
  return (
    <div>
      {/* Your page content here */}

      {/* Footer Section */}
      <footer className="bg-[var(--primary-color)] text-white py-6">
        <div className="container mx-auto flex justify-between items-center px-6">
          {/* Left Section: Logo */}
          <div className="flex items-center">
            <img
              src="/logo.png" // Replace with your logo image source
              alt="Logo"
              className="h-12"
            />
          </div>

          {/* Center Section: Footer Content */}
          <div className="text-center">
            <p className="text-lg mb-2">Your Adventure Starts Here</p>
            <p className="text-sm">© 2024, Made with love in India</p>
          </div>

          {/* Right Section: Social Media Links */}
          <div className="flex space-x-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-primary transition-colors"
            >
              <Instagram size={24} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-primary transition-colors"
            >
              <Facebook size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-primary transition-colors"
            >
              <Twitter size={24} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
