"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaMapMarkerAlt, FaList, FaCog } from "react-icons/fa";
import { IoMenu, IoClose } from "react-icons/io5";

const DashboardSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed bottom-4 right-4 bg-gradient-to-r from-sky-500 to-sky-700 text-white p-4 rounded-full shadow-lg z-50"
      >
        {isSidebarOpen ? (
          <IoClose className="text-3xl" />
        ) : (
          <IoMenu className="text-3xl" />
        )}
      </button>

      <aside
        className={`fixed inset-y-0 left-0 lg:relative lg:w-64 w-64 bg-gradient-to-r from-sky-500 to-sky-700 text-white flex flex-col h-screen p-4 space-y-4 transition-transform duration-300 ease-in-out z-40 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
      >
        <div className="lg:hidden flex justify-between items-center p-4 ">
          <Link href="/">
            <span className="text-gradient border-y-2 rounded-t-full">
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
          <button onClick={toggleSidebar} className="text-xl">
            <IoClose className="text-3xl" />
          </button>
        </div>

        <div className="hidden lg:block p-4 text-center font-bold  shadow-md rounded-xl">
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

        <nav className="flex-1 p-4 space-y-4 h-screen ">
          <Link href="/dashboard/addDestinations">
            <span className="flex items-center px-4 py-2 rounded hover:bg-sky-600 transition duration-300">
              <FaMapMarkerAlt className="mr-2 text-xl" /> Add Destination
            </span>
          </Link>
          <Link href="/dashboard/my-added-spot">
            <span className="flex items-center px-4 py-2 rounded hover:bg-sky-600 transition duration-300">
              <FaList className="mr-2 text-xl" /> Destination List
            </span>
          </Link>
          <Link href="/dashboard/addPackages">
            <span className="flex items-center px-4 py-2 rounded hover:bg-sky-600 transition duration-300">
              <FaMapMarkerAlt className="mr-2 text-xl" /> Add Package
            </span>
          </Link>
          <Link href="/dashboard/my-added-packages">
            <span className="flex items-center px-4 py-2 rounded hover:bg-sky-600 transition duration-300">
              <FaList className="mr-2 text-xl" /> Packages List
            </span>
          </Link>
          <Link href="/dashboard/addResortRoom">
            <span className="flex items-center px-4 py-2 rounded hover:bg-sky-600 transition duration-300">
              <FaMapMarkerAlt className="mr-2 text-xl" /> Add Resort Room
            </span>
          </Link>
          <Link href="/dashboard/myResort">
            <span className="flex items-center px-4 py-2 rounded hover:bg-sky-600 transition duration-300">
              <FaCog className="mr-2 text-xl" /> Settings
            </span>
          </Link>
        </nav>
      </aside>
    </div>
  );
};

export default DashboardSidebar;
