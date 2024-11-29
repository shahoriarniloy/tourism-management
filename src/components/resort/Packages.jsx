import { getPackages } from '@/services/getPackages';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Packages = async () => {
  const packages = await getPackages() || [];

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
              <h3 className="text-lg font-semibold mt-2 text-blue-700">Ideal For: {p?.idealFor}</h3>
              <p className="text-gray-600">{p?.shortDescription}</p>
              <p className=" font-bold mt-2 text-green-600">${p?.pricePerNight} / night</p>
            </div>

            <Link href={`/packagesServices/${p?._id}`} className="mt-auto">
              <button className="btn bg-green-500 text-white w-full mt-4 py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-300">
                Explore This Package
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
