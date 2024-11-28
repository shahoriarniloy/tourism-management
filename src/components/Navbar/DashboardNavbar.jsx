import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Image from 'next/image'; 

const DashboardNavbar = () => {
  const { data: session } = useSession();

  return (
    <div>
      <header className="h-16 bg-white flex items-center justify-between px-6">
        <Link href="/" className="text-lg font-semibold">
          Home
        </Link>

        <div className="flex items-center space-x-4 relative">
          {session ? (
            <div className="relative group">
              <Image
                src={session.user?.image || '/default-avatar.png'} 
                alt="Profile"
                width={40} 
                height={40} 
                className="rounded-full border-2 border-gray-300"
              />
              
              <div className="absolute bottom-0 left-0 transform translate-y-full bg-black text-white text-sm p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                {session.user?.name || 'User'}
              </div>
            </div>
          ) : (
            <span>Loading...</span> 
          )}
        </div>
      </header>
    </div>
  );
};

export default DashboardNavbar;
