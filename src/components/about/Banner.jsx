"use client"
import React from 'react';
import { usePathname } from 'next/navigation';

const Banner = () => {
  const pathName = usePathname();

  // Split the pathname by slashes, capitalize the first letter of each part, then join back
  const formattedPathName = pathName
    .split('/')
    .map((part, index) => {
      // Capitalize first letter of each part
      if (part) {
        return part.charAt(0).toUpperCase() + part.slice(1);
      }
      return part;
    })
    .join(' / ');

  return (
    <div className="">
      <div
        className="w-full h-48 text-center flex flex-col items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(/images/about/aboutBg.jpg)`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          color: '#fff',
        }}
      >
        <h2 className="text-4xl font-bold">About</h2>
        <h6 className="text-lg font-bold pt-1">
          Home 
          <span className="text-sky-500">{formattedPathName}</span>
        </h6>
      </div>
    </div>
  );
};

export default Banner;
