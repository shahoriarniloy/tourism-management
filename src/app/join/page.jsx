import Banner from '@/components/join/Banner';
import Link from 'next/link';
import React from 'react';

const JoinAs = () => {
  return (
    <div>
            <Banner/>
            <div className="join-as-container bg-white shadow-md rounded-md p-6 mt-12 text-center">
      <h2 className="text-2xl font-bold mb-4">Welcome to Our Resort Platform!</h2>
      <p className="text-gray-700 mb-6">What would you like to do?</p>
      <div className="join-options flex justify-center gap-8">
      <Link href="/signup">

        <div className="join-option bg-blue-500 text-white p-4 rounded-md shadow-md cursor-pointer hover:bg-blue-600">
          <h3 className="text-lg font-semibold">Join as Tourist</h3>
          <p className="text-sm">Explore and book your perfect getaway.</p>
        </div>
        </Link>


        <Link href="/resort-manager-register">
      <div className="join-option bg-green-500 text-white p-4 rounded-md shadow-md cursor-pointer hover:bg-green-600">
        <h3 className="text-lg font-semibold">Join as Resort Manager</h3>
        <p className="text-sm">Manage your resort and welcome new guests.</p>
      </div>
    </Link>
      </div>
    </div>

    </div>
    
  );
};

export default JoinAs;
