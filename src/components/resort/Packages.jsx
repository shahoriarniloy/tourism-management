import Image from 'next/image';
import Link from 'next/link';
import React from 'react';





const getPackages = async () => { 

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/packagesServices/api/get-all`)
    const data = await res.json();
    return data?.packages;
  
  }
const Packages =async () => {

    const packages =await getPackages() || [];

    console.log(packages);

    return (
        <div className="max-w-[1700px] mx-auto mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {packages.length > 0 ? (
            packages.map((p, index) => (
                <div
                key={index}
                className="room-card bg-white shadow-md rounded-md p-4 flex flex-col justify-between h-full"
              >
                <div>
                  <div className="relative w-full h-32 md:h-48 lg:h-56">
                    <Image
                      src={p?.photoURL1}
                      alt={p?.photoURL1}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mt-2">idealFor - {p?.idealFor}</h3>
                  <p className="text-gray-600">{p?.shortDescription}</p>
                  <p className="text-gray-800 font-bold mt-2">
                    ${p?.pricePerNight} / night
                  </p>
                </div>
                
                <Link href={`/resort/${p?._id}`} className="mt-auto">
                  <button className="btn w-full mt-4">
                    View Details
                  </button>
                </Link>
              </div>
              
            ))
          ) : (
            <p className="text-gray-600">No Packages available at the moment.</p>
          )}
        </div>
    );
};

export default Packages;