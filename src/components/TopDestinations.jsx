"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronsRight } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";

function TopDestinations() {

  const [destinations, setDestinations] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
        try {
            const resp = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/destinations/api`
            );
            if (!resp.ok) {
                throw new Error("Failed to fetch resorts");
            }
            const data = await resp.json();
           
            setDestinations(data?.destinations|| []);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    fetchData();
}, []);

if (loading) return <div className="h-screen w-full flex justify-center"><Logo/></div>
;
if (error) return <p>Error: {error}</p>;

const topDestinations = destinations.slice(0, 6);
  

  return (
    <section className="pt-16 ">
      <div className="text-center mb-12 px-4">
        <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight text-black ">
          Top Destinations
        </h1>
        <p className="mt-4 text-lg text-black font-thin">
          Discover breathtaking locations, experience unique cultures, and
          immerse yourself in unforgettable adventures.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 lg:px-16 md:px-8 px-4">
        {topDestinations.map((destination, index) => (
          <div
            key={index}
            className="relative h-[400px] group mx-auto dark:bg-black bg-white dark:border-0 border overflow-hidden rounded-md dark:text-white text-black w-full sm:w-[400px] shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <figure className="w-full h-full rounded-md overflow-hidden">
              <Image
                src={destination.photoURL2}
                alt={destination.name}
                width={600}
                height={600}
                className="h-full w-full scale-105 group-hover:scale-100 rounded-lg object-cover transition-all duration-300"
              />
            </figure>
            <div className="absolute top-0 left-0 w-full h-full transition-all duration-300 "></div>
            <article className="p-4 space-y-2 absolute -bottom-10 group-hover:bottom-0 transition-all duration-300 ">
              <div className="text-shadow"> 
              <h1 className="text-xl lg:text-2xl font-semibold capitalize text-shadow">
                {destination.name}
              </h1>
              <p className="text-sm lg:text-base text-white text-shadow">
                {destination.description}
              </p>
              <a
                href="#"
                className="text-sm text-shadow lg:text-base text-white  font-normal group-hover:opacity-100 opacity-0 translate-y-2 group-hover:translate-y-0 pt-2 flex gap-1 transition-all duration-300"
              >
                Explore
                <span>
                  <ChevronsRight />
                </span>
              </a>
              </div>
            </article>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center mt-6">
        <p className="text-sm mb-2 text-black font-thin">
          Ready to start your next adventure? See more of the world’s hidden
          gems and iconic landmarks.
        </p>
     <Link href={`/destinations`}>
     <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 border-2 border-sky-500 px-12 font-medium text-white shadow-md hover:shadow-lg transition-all duration-150 active:translate-x-[2px] active:translate-y-[2px]">
          See More
        </button>
     </Link>
      </div>
    </section>
  );
}

export default TopDestinations;
