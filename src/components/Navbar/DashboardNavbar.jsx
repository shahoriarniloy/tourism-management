import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Image from 'next/image'; 
import { FaHome } from "react-icons/fa";


const DashboardNavbar = () => {
  const { data: session } = useSession();

  return (
    <div>
      <header className="h-16 bg-white flex items-center justify-between px-6 border-b-2">
        <Link href="/" className="text-3xl text-sky-500 font-semibold">
          <FaHome/>
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
<span className="flex justify-center items-center">
  <div className="w-6 h-6 border-4 border-gray-300 border-t-sky-500 rounded-full animate-spin"></div>
</span>
          )}
        </div>
      </header>
    </div>
  );
};

export default DashboardNavbar;
