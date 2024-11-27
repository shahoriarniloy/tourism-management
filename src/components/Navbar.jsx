"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { usePathname } from 'next/navigation';
import { SliderBtn } from "./progress-slider";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathName = usePathname();
  const session = useSession();

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
        <div
          className={`text-2xl font-semibold ${
            scrolled ? "text-gray-800" : "text-white"
          }`}
        >
          <Link href="/">
            <span className="text-gradient border-y-2 rounded-t-full ">
              <span className="text-xs">T</span>
              <span className="text-sm">r</span>
              <span className="text-base">a</span>
              <span className="text-lg">i</span>
              <span className="text-xl">l</span>
              <span className="text-2xl text-sky-500">B</span>
              <span className="text-xl text-sky-500">l</span>
              <span className="text-lg text-sky-500">i</span>
              <span className="text-base text-sky-500">s</span>
              <span className="text-sm text-sky-500">s</span>
            </span>
          </Link>
        </div>

        <div
          className={`hidden lg:flex items-center space-x-8 ${
            scrolled ? "text-gray-800" : "text-white"
          }`}
        >
          <Link
            href="/"
            className={`text-lg hover:text-sky-500 transition duration-300 ${
              pathName === "/" ? "font-bold" : ""
            }`}
          >
            Home
          </Link>
          <Link
            href="/destinations"
            className={`text-lg hover:text-sky-500 transition duration-300 ${
              pathName === "/destinations" ? "font-bold" : ""
            }`}
          >
            Destinations
          </Link>
          <Link
            href="/resorts"
            className={`text-lg hover:text-sky-500 transition duration-300 ${
              pathName === "/resorts" ? "font-bold" : ""
            }`}
          >
            Resorts
          </Link>
          <Link
            href="/about"
            className={`text-lg hover:text-sky-500 transition duration-300 ${
              pathName === "/about" ? "font-bold" : ""
            }`}
          >
            About
          </Link>
        </div>

        <div
          className={`hidden lg:block ${
            scrolled ? "text-gray-800" : "text-white"
          }`}
        >
          {!session.data?
          <Link
            href="/login"
            className="px-6 py-2 rounded-md border-2 transition duration-300 hover:bg-sky-500 hover:text-white hover:scale-105"
          >
            Join Us
          </Link>:<button onClick={()=>signOut()} className="btn border-2 px-4 py-2 rounded-md">Logout</button>}
        </div>

        <button
          className="lg:hidden text-white text-2xl focus:outline-none"
          onClick={toggleMenu}
        >
          {menuOpen ? (
            <FaTimes className={`${scrolled ? "text-gray-800" : "text-white"}`} />
          ) : (
            <FaBars />
          )}
        </button>

        <div
          className={`lg:hidden absolute top-16 right-0 w-3/4 bg-white p-6 rounded-l-md shadow-md transition-transform transform ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          } duration-500`}
        >
          <Link
            href="/"
            className={`block py-2 text-gray-800 hover:text-sky-500 ${
              pathName === "/" ? "font-bold" : ""
            }`}
          >
            Home
          </Link>
          <Link
            href="/destinations"
            className={`block py-2 text-gray-800 hover:text-sky-500 ${
              pathName === "/destinations" ? "font-bold" : ""
            }`}
          >
            Destinations
          </Link>
          <Link
            href="/resorts"
            className={`block py-2 text-gray-800 hover:text-sky-500 ${
              pathName === "/resorts" ? "font-bold" : ""
            }`}
          >
            Resorts
          </Link>
          <Link
            href="/about"
            className={`block py-2 text-gray-800 hover:text-sky-500 ${
              pathName === "/about" ? "font-bold" : ""
            }`}
          >
            About
          </Link>
          <Link
            href="/join"
            className="block mt-4 px-6 py-2 bg-sky-500 text-white text-center rounded-md"
          >
            Join Us
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
