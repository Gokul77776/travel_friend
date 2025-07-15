'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useParams, usePathname } from 'next/navigation';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  const pathname = usePathname();
  const userId = params.id;

  const menuItems = [
    { href: `/profile/${userId}/main`, label: "Profile" },
    { href: `/profile/plans`, label: "View the updates" },
    { href: `/profile/${userId}/edit`, label: "Edit the profile" },
    // { href: "/settings", label: "Delete" },
    { href: `/profile/${userId}/post`, label: "Add post" },
    { href: `/profile/${userId}/plan`, label: "Add plan" },
    { href: '/', label: "Logout" },
  ];

  return (
    <>
      {/* Mobile Hamburger Button */}
      <div className="md:hidden p-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-[var(--primary-color)]"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          fixed z-50 top-0 left-0 md:static
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          transition-transform duration-300 ease-in-out
          md:translate-x-0
          w-64 min-h-screen bg-[var(--primary-color)] text-[var(--secondary-color)] p-4
        `}
      >
        <h2 className="text-2xl font-bold mb-6">Menu</h2>
        <ul className="space-y-6">
          {menuItems.map((item, idx) => {
            const isActive = pathname === item.href;

            return (
              <li key={idx}>
                <Link
                  href={item.href}
                  className={`block w-full px-4 py-2 font-bold text-lg rounded transition-colors duration-200
                    ${isActive
                      ? 'bg-[var(--secondary-color)] text-[var(--primary-color)]'
                      : item.label === "Delete"
                        ? 'hover:bg-red-600 hover:text-white'
                        : 'hover:bg-[var(--secondary-color)] hover:text-[var(--primary-color)]'
                    }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
