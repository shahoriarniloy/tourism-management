import React from 'react';
import Image from 'next/image';
import { ChevronsRight } from 'lucide-react';

function TopDestinations() {
  const destinations = [
    {
      image: 'https://i.ibb.co/fQvj78y/braden-jarvis-pr-Sog-Oo-Fmkw-unsplash.jpg',
      title: 'Hawaii',
      description:
        'Visiting Hawaii offers a unique blend of stunning beaches, lush landscapes, and rich cultural experiences.',
    },
    {
      image: 'https://i.ibb.co/LYkf0pr/gondola-ride-in-autumn-in-kashmir-2023-10-18t174214-790-min.png',
      title: 'Maldives',
      description:
        'The Maldives is a tropical paradise known for crystal-clear waters, overwater bungalows, and serene beauty.',
    },
    {
      image: 'https://i.ibb.co/j85Gjdm/Paris1.jpg',
      title: 'Paris',
      description:
        'Paris enchants visitors with its iconic landmarks, rich history, art, and exquisite cuisine.',
    },
  ];

  return (
    <section className="py-16 ">
      <div className="text-center mb-12 px-4">
        <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight text-black ">
          Top Destinations
        </h1>
        <p className="mt-4 text-lg text-black font-thin">
          Discover breathtaking locations, experience unique cultures, and immerse yourself in unforgettable adventures.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 lg:px-16 md:px-8 px-4">
        {destinations.map((destination, index) => (
          <div
            key={index}
            className="relative h-[400px] group mx-auto dark:bg-black bg-white dark:border-0 border overflow-hidden rounded-md dark:text-white text-black w-full sm:w-[400px] shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <figure className="w-full h-full rounded-md overflow-hidden">
              <Image
                src={destination.image}
                alt={destination.title}
                width={500}
                height={300}
                className="h-full w-full scale-105 group-hover:scale-100 rounded-lg object-cover transition-all duration-300"
              />
            </figure>
            <div className="absolute top-0 left-0 w-full h-full transition-all duration-300 bg-gradient-to-b from-[#2b2f3325] via-[#2832365b] to-[#0a52be] opacity-45"></div>
            <article className="p-4 space-y-2 absolute -bottom-10 group-hover:bottom-0 transition-all duration-300">
              <h1 className="text-xl lg:text-2xl font-semibold capitalize">
                {destination.title}
              </h1>
              <p className="text-sm lg:text-base text-white">
                {destination.description}
              </p>
              <a
                href="#"
                className="text-sm lg:text-base text-white  font-normal group-hover:opacity-100 opacity-0 translate-y-2 group-hover:translate-y-0 pt-2 flex gap-1 transition-all duration-300"
              >
                Explore
                <span>
                  <ChevronsRight />
                </span>
              </a>
            </article>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center mt-6">
        <p className="text-sm mb-2 text-black font-thin">
          Ready to start your next adventure? See more of the world’s hidden gems and iconic landmarks.
        </p>
        <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 border-2 border-sky-500 px-12 font-medium text-white shadow-md hover:shadow-lg transition-all duration-150 active:translate-x-[2px] active:translate-y-[2px]">
          See More
        </button>
      </div>
    </section>
  );
}

export default TopDestinations;
