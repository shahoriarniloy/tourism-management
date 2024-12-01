"use client";
import { ChevronsRight } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import TitleSection from "./TitleSection";
import ReactSlider from "react-slider";
import Link from "next/link";
import Logo from "../Logo";

const Room = () => {
    const [resorts, setResorts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
        price: [50, 3000],
        destination: "",
    });
    const [sortOption, setSortOption] = useState("name");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visibleCount, setVisibleCount] = useState(6); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/resort/api/resort-data`
                );
                if (!resp.ok) {
                    throw new Error("Failed to fetch resorts");
                }
                const data = await resp.json();
                setResorts(data?.resorts || []);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleFilterChange = (key, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [key]: value,
        }));
    };

    const filteredResorts = resorts.filter((resort) => {
        const priceMin = parseInt(resort?.priceRange?.split(" - ")[0]?.replace("$", "") || 0);
        const priceMax = parseInt(resort?.priceRange?.split(" - ")[1]?.replace("$", "") || Infinity);

        return (
            resort?.resortName?.toLowerCase().includes(searchTerm.toLowerCase()) &&
            priceMin >= filters.price[0] &&
            priceMax <= filters.price[1] &&
            (filters.destination ? resort?.location?.toLowerCase().includes(filters.destination.toLowerCase()) : true)
        );
    });

    const sortedResorts = filteredResorts.sort((a, b) => {
        if (sortOption === "price") {
            const priceA = parseInt(a?.priceRange?.split(" - ")[0]?.replace("$", "") || 0);
            const priceB = parseInt(b?.priceRange?.split(" - ")[0]?.replace("$", "") || 0);
            return priceA - priceB;
        } else {
            return a?.resortName?.localeCompare(b?.resortName || "");
        }
    });

    const displayedResorts = sortedResorts.slice(0, visibleCount); 

    const handleSeeMore = () => {
        setVisibleCount((prevCount) => prevCount + 6); 
    };

    if (loading) return <div className="h-screen w-full flex justify-center"><Logo/></div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <section className="lg:mx-24 lg:px-4 px-2">
            <div className="flex flex-col items-center justify-center space-y-4 mt-6">
                <form className="w-full max-w-6xl bg-white shadow-md rounded-lg p-4">
                    <div className="flex items-center mb-4">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search resorts by name..."
                            className="flex-grow px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <div className="flex flex-col w-full">
                            <label htmlFor="price" className="text-sm font-medium text-gray-600">
                                Price Range: ${filters.price[0]} - ${filters.price[1]}
                            </label>
                            <ReactSlider
                                className="w-full h-4 bg-gray-200 rounded-lg cursor-pointer"
                                thumbClassName="h-6 w-6 bg-blue-600 rounded-full cursor-grab focus:outline-none focus:ring-2 focus:ring-blue-400"
                                trackClassName="bg-blue-400 rounded-lg"
                                value={filters.price}
                                min={50}
                                max={3000}
                                step={30}
                                onChange={(value) => handleFilterChange("price", value)}
                                pearling
                                minDistance={10}
                            />
                        </div>

                        <div className="flex flex-col w-full">
                            <label htmlFor="destination" className="text-sm font-medium text-gray-600">
                                Destination (e.g., Dhaka, Sylhet)
                            </label>
                            <input
                                type="text"
                                id="destination"
                                value={filters.destination}
                                onChange={(e) => handleFilterChange("destination", e.target.value)}
                                placeholder="Enter a destination"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                    </div>
                </form>
            </div>

            <div className="text-center mt-8 mb-8 lg:px-4">
                <TitleSection mainHeader={"RESORT"} subHeader={"Explore the Best Resorts All Around the World!"} />
            </div>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 ">
          {displayedResorts.map((resort, index) => (
            <div
              key={index}
              className="relative mt-4 h-[450px] overflow-hidden group mx-auto dark:bg-black bg-white dark:border-0 border rounded-md shadow-lg dark:text-white text-black flex flex-col"
            >
              <div className="w-full h-full">
                <Image
                  src={resort.imageUrl}
                  alt={resort.name}
                  width={600}
                  height={600}
                  className="h-full w-full scale-105 group-hover:scale-100 object-cover transition-all duration-300 rounded-md"
                />
              </div>
  
              <article
                className="p-8 w-full h-full absolute top-0 flex flex-col justify-end rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black"
                style={{
                  backgroundImage: `url(${resort.bannerImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="translate-y-10 group-hover:translate-y-0 transition-all duration-300 space-y-2 bg-sky-500 p-6 rounded-md ">
                  <h1 className="md:text-2xl font-semibold">{resort.name}</h1>
                  <p className="sm:text-base text-sm">{resort.description}</p>
                  <Link
href={`/singleResort?email=${resort.email}`}
className="p-2 flex items-center gap-2 rounded-md text-white bg-sky-600 hover:bg-sky-700 transition-all"
>
  See Details <ChevronsRight /></Link>
                </div>
              </article>
  
              <article className="p-4 w-full absolute bottom-0 bg-gradient-to-t from-sky-500 to-transparent rounded-b-md opacity-100 group-hover:opacity-0 group-hover:-bottom-4 transition-all duration-300">
                <h1 className="text-lg lg:text-xl font-semibold">{resort.name}</h1>
                <p className="sm:text-base text-sm">{resort.role}</p>
              </article>
            </div>
          ))}
        </div>

            {visibleCount < sortedResorts.length && (
                <div className="text-center mt-8">
                    <button
                        onClick={handleSeeMore}
                        className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
                    >
                        See More
                    </button>
                </div>
            )}
        </section>
    );
};

export default Room;
