import Link from 'next/link';
import React from 'react';

const Logo = () => {
  return (
    <div className='flex justify-center items-center border-t-2 rounded-t-full w-fit animate-pulse'>
      <div className="logo-container">
        <Link href="/">
          <span className="text-gradient border-b-2 shimmer-border border-t-rounded-full">
            <span className="text-lg">T</span>
            <span className="text-xl">r</span>
            <span className="text-2xl">a</span>
            <span className="text-3xl">i</span>
            <span className="text-4xl">l</span>
            <span className="text-5xl text-sky-500">B</span>
            <span className="text-4xl text-sky-500">l</span>
            <span className="text-3xl text-sky-500">i</span>
            <span className="text-2xl text-sky-500">s</span>
            <span className="text-xl text-sky-500">s</span>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Logo;
