"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav
      className={`fixed w-full py-4 transition-all duration-500 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      } z-20`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className={`lg:text-2xl md:text-2xl text-xl font-semibold ${scrolled ? "text-gray-800" : "text-white"}`}>
          <Link href="/">TrailBliss</Link>
        </div>

        <button
          className="lg:hidden text-white text-2xl focus:outline-none"
          onClick={toggleMenu}
        >
          {menuOpen ? <FaTimes className={`${scrolled ? "text-gray-800" : "text-white"}`} /> : <FaBars />}
        </button>

        <div
          className={`lg:flex lg:items-center lg:space-x-8 ${
            menuOpen ? "flex flex-col items-center bg-white lg:bg-transparent rounded-l-full" : "hidden lg:flex"
          } absolute lg:static top-16 right-0 w-3/4 lg:w-auto p-6 lg:p-0 lg:shadow-none transition-transform transform ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          } duration-1000 ${
            scrolled ? "lg:bg-transparent" : "bg-white lg:bg-transparent"
          }`}
        >
          <Link
            href="/"
            className={`block lg:inline-block py-2 lg:py-0 text-lg hover:text-sky-500 ${
              scrolled ? "text-gray-800" : "text-black lg:text-white"
            }`}
          >
            Home
          </Link>
          <Link
            href="/destinations"
            className={`block lg:inline-block py-2 lg:py-0 text-lg hover:text-sky-500 ${
              scrolled ? "text-gray-800" : "text-black lg:text-white"
            }`}
          >
            Destinations
          </Link>
          <Link
            href="/resorts"
            className={`block lg:inline-block py-2 lg:py-0 text-lg hover:text-sky-500 ${
              scrolled ? "text-gray-800" : "text-black lg:text-white"
            }`}
          >
            Resorts
          </Link>
          <Link
            href="/about"
            className={`block lg:inline-block py-2 lg:py-0 text-lg hover:text-sky-500 ${
              scrolled ? "text-gray-800" : "text-black lg:text-white"
            }`}
          >
            About
          </Link>
        </div>

        <div className={`hidden lg:block ${scrolled ? "text-gray-800" : "text-white"}`}>
          <Link
            href="/join"
            className="px-6 py-2 rounded-md border-2 transition duration-1000 hover:bg-sky-900 hover:scale-105"
          >
            Join Us
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
