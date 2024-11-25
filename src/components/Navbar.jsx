"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed w-full py-4 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'} z-20`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="text-white text-2xl font-semibold">
          <Link href="/">TrailBliss</Link>
        </div>

        <div className="flex-1 flex justify-center space-x-8">
          <Link href="/" className={`text-white hover:text-gray-300 ${scrolled ? 'text-gray-800' : ''}`}>
            Home
          </Link>
          <Link href="/destinations" className={`text-white hover:text-gray-300 ${scrolled ? 'text-gray-800' : ''}`}>
            Destinations
          </Link>
          <Link href="/resorts" className={`text-white hover:text-gray-300 ${scrolled ? 'text-gray-800' : ''}`}>
            Resorts
          </Link>
          <Link href="/about" className={`text-white hover:text-gray-300 ${scrolled ? 'text-gray-800' : ''}`}>
            About
          </Link>
        </div>

        <div className="text-white">
          <Link href="/join" className="px-6 py-2 rounded-md border-2 transition duration-300 hover:bg-sky-900 hover:scale-105">
            Join Us
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
