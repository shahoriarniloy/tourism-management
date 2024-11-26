import React from 'react';
import Image from 'next/image';
import { ChevronsRight } from 'lucide-react';

function TopResorts() {
    const resorts = [
      {
        image:
          'https://i.ibb.co/LYkf0pr/gondola-ride-in-autumn-in-kashmir-2023-10-18t174214-790-min.png',
        hoverBackground:
          'https://i.ibb.co.com/j85Gjdm/Paris1.jpg',
        name: 'Paradise Resort',
        role: 'Exclusive Luxury Stay',
        description:
          'Immerse yourself in a serene environment with breathtaking views, top-notch amenities, and unforgettable experiences.',
      },
      {
        image:
          'https://i.ibb.co/LYkf0pr/gondola-ride-in-autumn-in-kashmir-2023-10-18t174214-790-min.png',
        hoverBackground:
          'https://i.ibb.co.com/j85Gjdm/Paris1.jpg',
        name: 'Emerald Bay Resort',
        role: 'Premium Beachside Resort',
        description:
          'Feel the ocean breeze as you relax at the most luxurious beachside retreat with world-class dining and spa facilities.',
      },
      {
        image:
          'https://i.ibb.co/LYkf0pr/gondola-ride-in-autumn-in-kashmir-2023-10-18t174214-790-min.png',
        hoverBackground:
          'https://i.ibb.co.com/j85Gjdm/Paris1.jpg',
        name: 'Mountain Bliss Retreat',
        role: 'Nature’s Hidden Gem',
        description:
          'Escape to tranquility surrounded by lush forests and majestic mountains, offering an unparalleled nature experience.',
      },
    ];
  
    return (
      <section className="pt-16">
        <div className="text-center mb-12 px-4">
          <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight text-black">
            Discover Top Resorts
          </h1>
          <p className="mt-4 text-lg text-black font-thin">
            Experience the ultimate blend of luxury, relaxation, and stunning landscapes at these top-rated resorts.
          </p>
        </div>
  
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 lg:px-16 md:px-8 px-4">
          {resorts.map((resort, index) => (
            <div
              key={index}
              className="relative mt-4 h-[450px] overflow-hidden group mx-auto dark:bg-black bg-white dark:border-0 border rounded-md shadow-lg dark:text-white text-black flex flex-col"
            >
              <div className="w-full h-full">
                <Image
                  src={resort.image}
                  alt={resort.name}
                  width={600}
                  height={600}
                  className="h-full w-full scale-105 group-hover:scale-100 object-cover transition-all duration-300 rounded-md"
                />
              </div>
  
              <article
                className="p-8 w-full h-full absolute top-0 flex flex-col justify-end rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black"
                style={{
                  backgroundImage: `url(${resort.hoverBackground})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="translate-y-10 group-hover:translate-y-0 transition-all duration-300 space-y-2 bg-sky-500 p-6 rounded-md ">
                  <h1 className="md:text-2xl font-semibold">{resort.name}</h1>
                  <p className="sm:text-base text-sm">{resort.description}</p>
                  <button className="p-2  flex items-center gap-2 rounded-md text-white bg-sky-600 hover:bg-sky-700 transition-all">
                    See Details <ChevronsRight />
                  </button>
                </div>
              </article>
  
              <article className="p-4 w-full absolute bottom-0 bg-gradient-to-t from-sky-500 to-transparent rounded-b-md opacity-100 group-hover:opacity-0 group-hover:-bottom-4 transition-all duration-300">
                <h1 className="text-lg lg:text-xl font-semibold">{resort.name}</h1>
                <p className="sm:text-base text-sm">{resort.role}</p>
              </article>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center mt-6">
        <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 border-2 border-sky-500 px-12 font-medium text-white shadow-md hover:shadow-lg transition-all duration-150 active:translate-x-[2px] active:translate-y-[2px]">
          See More
        </button>
      </div>
      </section>
    );
  }
  
  

export default TopResorts;
