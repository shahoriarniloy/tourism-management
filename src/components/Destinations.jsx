import React from "react";
import Image from "next/image";
import { ChevronsRight } from "lucide-react";
import Link from "next/link";
import {destinationsServices} from '../lib/destinationsServices'


const getDestinations = async () => { 

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destinationsServices/api/get-all`)
  const data = await res.json();
  return data?.destinations;

}

const Destinations = async () => {
   
const destinations =await getDestinations() || [];

  return (
    <section className="py-16 max-w-[1380px] mx-auto">
      <div className="text-center mb-12 px-4">
        <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight text-black ">
       Destinations
        </h1>
        <p className="mt-4 text-lg text-black font-thin">
          Discover breathtaking locations, experience unique cultures, and
          immerse yourself in unforgettable adventures.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-12 lg:px-16 md:px-8 px-4">
        {destinations?.map((destination, index) => (
          <div
            key={index}
            className="relative  h-[400px] group mx-auto dark:bg-black bg-white dark:border-0 border overflow-hidden rounded-md dark:text-white text-black w-full sm:w-[400px] shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <figure className="w-full h-full rounded-md overflow-hidden">
              <Image
                src={destination.photoURL1}
                alt={destination.title}
                width={400}
                height={400}
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
              <p className="text-sm lg:text-xl font-bold text-[#73D0EA]">
               Price : {destination.average}$
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

 
    </section>
  );
}

export default Destinations;
