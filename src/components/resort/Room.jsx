"use client"
import { ChevronsRight } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import TitleSection from './TitleSection';
import ReactSlider from 'react-slider';

const Room = () => {
    const resorts = [
        {
            image: "https://i.ibb.co.com/F5tTtdq/Sunset-Beach-Resort.jpg",
            name: "Sunset Beach Resort",
            location: "Malibu, California, USA",
            price_range: "$300 - $600",
            category: "Luxury",
            description: "A beachfront luxury resort offering stunning views of the Pacific Ocean, world-class amenities, and private villas with direct beach access.",
            destinationType: "beach",
        },
        {
            image: "https://i.ibb.co.com/MMKP16Z/Mountain-Retreat.jpg",
            name: "Mountain Retreat",
            location: "Aspen, Colorado, USA",
            price_range: "$500 - $1,200",
            category: "Premium",
            description: "Nestled in the heart of the Rocky Mountains, this exclusive resort provides ski-in, ski-out access, luxurious chalets, and fine dining experiences.",
            destinationType: "mountain",
        },
        {
            image: "https://i.ibb.co.com/z7KmBDX/Tropical-Oasis.jpg",
            name: "Tropical Oasis",
            location: "Koh Samui, Thailand",
            price_range: "$150 - $400",
            category: "Mid-range",
            description: "A serene resort surrounded by lush jungles and white-sand beaches, perfect for couples looking for a relaxing getaway with access to spa treatments and local cuisine.",
            destinationType: "beach",
        },
        {
            image: "https://i.ibb.co.com/DGm7XHP/Island-Escape-Resort.jpg",
            name: "Island Escape Resort",
            location: "Bora Bora, French Polynesia",
            price_range: "$700 - $2,000",
            category: "Luxury",
            description: "An overwater bungalow resort located in the crystal-clear waters of Bora Bora, offering unparalleled luxury, privacy, and breathtaking views of Mount Otemanu.",
            destinationType: "beach",
        },
        {
            image: "https://i.ibb.co.com/xjgb6J1/Desert-Mirage-Resort.jpg",
            name: "Desert Mirage Resort",
            location: "Dubai, UAE",
            price_range: "$250 - $500",
            category: "Luxury",
            description: "A modern desert resort offering opulent accommodations, camel rides, and a range of activities, set against the stunning backdrop of the Arabian Desert.",
            destinationType: "desert",
        },
        {
            image: "https://i.ibb.co.com/T40W0KB/Savannah-Hills-Resort.jpg",
            name: "Savannah Hills Resort",
            location: "Tanzania, East Africa",
            price_range: "$200 - $450",
            category: "Mid-range",
            description: "Located near Serengeti National Park, this safari resort offers luxury tents with spectacular views of wildlife, perfect for adventure seekers and nature lovers.",
            destinationType: "safari",
        }
    ];

    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
        price: [50, 3000],
        destination: "",
        destinationType: "",
    });
    const [sortOption, setSortOption] = useState("name"); // Default sorting by name

    // Handle search term change
    const handleSearch = (e) => {
        e.preventDefault();
    };

    const handleFilterChange = (key, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [key]: value,
        }));
    };

    // Filter resorts based on the search term, price range, and destination type
    const filteredResorts = resorts.filter((resort) => {
        const priceMin = parseInt(resort.price_range.split(' - ')[0].replace('$', '').replace(',', ''));
        const priceMax = parseInt(resort.price_range.split(' - ')[1].replace('$', '').replace(',', ''));

        return (
            (resort.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (priceMin >= filters.price[0] && priceMax <= filters.price[1]) &&
            (filters.destinationType ? resort.destinationType.toLowerCase() === filters.destinationType.toLowerCase() : true) &&
            (filters.destination ? resort.location.toLowerCase().includes(filters.destination.toLowerCase()) : true)
        );
    });

    // Sort resorts based on the selected sort option
    const sortedResorts = filteredResorts.sort((a, b) => {
        if (sortOption === "price") {
            const priceA = parseInt(a.price_range.split(' - ')[0].replace('$', '').replace(',', ''));
            const priceB = parseInt(b.price_range.split(' - ')[0].replace('$', '').replace(',', ''));
            return priceA - priceB;
        } else if (sortOption === "category") {
            return a.category.localeCompare(b.category);
        } else {
            return a.name.localeCompare(b.name);
        }
    });

    return (
        <section className="">
            <div className="flex flex-col items-center justify-center space-y-4 mt-6">
                <form
                    onSubmit={handleSearch}
                    className="w-full max-w-6xl bg-white shadow-md rounded-lg p-4"
                >
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
                        {/* Price Range Filter */}
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

                        {/* Destination Type Filter */}
                        <div className="flex flex-col w-full">
                            <label
                                htmlFor="destinationType"
                                className="text-sm font-medium text-gray-600"
                            >
                                Destination Type
                            </label>
                            <select
                                id="destinationType"
                                value={filters.destinationType}
                                onChange={(e) =>
                                    handleFilterChange("destinationType", e.target.value)
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                <option value="">Select Destination Type</option>
                                <option value="beach">Beach</option>
                                <option value="mountain">Mountain</option>
                                <option value="desert">Desert</option>
                                <option value="safari">Safari</option>
                            </select>
                        </div>

                        {/* Destination Filter */}
                        <div className="flex flex-col w-full">
                            <label
                                htmlFor="destination"
                                className="text-sm font-medium text-gray-600"
                            >
                                Destination (e.g., Paris, Malaysia)
                            </label>
                            <input
                                type="text"
                                id="destination"
                                value={filters.destination}
                                onChange={(e) =>
                                    handleFilterChange("destination", e.target.value)
                                }
                                placeholder="Enter a destination"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                    </div>
                </form>
            </div>

            <div className="text-center mt-8 mb-8 px-4">
                <TitleSection mainHeader={"RESORT"} subHeader={"Our Exquisite Resorts & Suites Collection"} />
            </div>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 lg:px-16 md:px-8 px-4">
                {sortedResorts.map((resort, index) => (
                    <div
                        key={index}
                        className="relative mt-4 h-[450px] overflow-hidden group mx-auto dark:bg-black bg-white dark:border-0 border rounded-md shadow-lg dark:text-white text-white flex flex-col"
                    >
                        {/* Resort Image */}
                        <div className="w-full h-full relative">
                            <Image
                                src={resort.image}
                                alt={resort.name}
                                width={600}
                                height={600}
                                className="h-full w-full scale-105 group-hover:scale-100 object-cover transition-all duration-300 rounded-md"
                            />

                            {/* Price Badge */}
                            <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full text-lg font-semibold shadow-md">
                                {resort.price_range}
                            </div>
                        </div>

                        {/* Hover Effect Overlay */}
                        <article
                            className="p-8 w-full h-full absolute top-0 flex flex-col justify-end rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black"
                        >
                            <div className="translate-y-10 group-hover:translate-y-0 transition-all duration-300 space-y-2 bg-sky-500 p-6 rounded-md ">
                                <h1 className="md:text-2xl font-semibold">{resort.name}</h1>
                                <p className="sm:text-base text-sm">{resort.description}</p>
                                <button className="p-2 flex items-center gap-2 rounded-md text-white bg-sky-600 hover:bg-sky-700 transition-all">
                                    See Details <ChevronsRight />
                                </button>
                            </div>
                        </article>

                        {/* Bottom Info */}
                        <article className="p-4 w-full absolute bottom-0 bg-gradient-to-t from-sky-500 to-transparent rounded-b-md opacity-100 group-hover:opacity-0 group-hover:-bottom-4 transition-all duration-300">
                            <h1 className="text-lg lg:text-xl font-semibold">{resort.name}</h1>
                            <p className="sm:text-base text-sm">{resort.category}</p>
                        </article>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Room;












//......................Main Code....................


// import { ChevronsRight } from 'lucide-react';
// import Image from 'next/image';
// import React from 'react';
// import TitleSection from './TitleSection';
// import SearchResort from './SearchResort';

// const Room = () => {
//     const resorts = [
//         {
//             image: "https://i.ibb.co.com/F5tTtdq/Sunset-Beach-Resort.jpg",
//             name: "Sunset Beach Resort",
//             location: "Malibu, California, USA",
//             price_range: "$300 - $600",
//             category: "Luxury",
//             description: "A beachfront luxury resort offering stunning views of the Pacific Ocean, world-class amenities, and private villas with direct beach access."
//         },
//         {
//             image: "https://i.ibb.co.com/MMKP16Z/Mountain-Retreat.jpg",
//             name: "Mountain Retreat",
//             location: "Aspen, Colorado, USA",
//             price_range: "$500 - $1,200",
//             category: "Premium",
//             description: "Nestled in the heart of the Rocky Mountains, this exclusive resort provides ski-in, ski-out access, luxurious chalets, and fine dining experiences."
//         },
//         {
//             image: "https://i.ibb.co.com/z7KmBDX/Tropical-Oasis.jpg",
//             name: "Tropical Oasis",
//             location: "Koh Samui, Thailand",
//             price_range: "$150 - $400",
//             category: "Mid-range",
//             description: "A serene resort surrounded by lush jungles and white-sand beaches, perfect for couples looking for a relaxing getaway with access to spa treatments and local cuisine."
//         },
//         {
//             image: "https://i.ibb.co.com/DGm7XHP/Island-Escape-Resort.jpg",
//             name: "Island Escape Resort",
//             location: "Bora Bora, French Polynesia",
//             price_range: "$700 - $2,000",
//             category: "Luxury",
//             description: "An overwater bungalow resort located in the crystal-clear waters of Bora Bora, offering unparalleled luxury, privacy, and breathtaking views of Mount Otemanu."
//         },
//         {
//             image: "https://i.ibb.co.com/xjgb6J1/Desert-Mirage-Resort.jpg",
//             name: "Desert Mirage Resort",
//             location: "Dubai, UAE",
//             price_range: "$250 - $500",
//             category: "Luxury",
//             description: "A modern desert resort offering opulent accommodations, camel rides, and a range of activities, set against the stunning backdrop of the Arabian Desert."
//         },
//         {
//             image: "https://i.ibb.co.com/T40W0KB/Savannah-Hills-Resort.jpg",
//             name: "Savannah Hills Resort",
//             location: "Tanzania, East Africa",
//             price_range: "$200 - $450",
//             category: "Mid-range",
//             description: "Located near Serengeti National Park, this safari resort offers luxury tents with spectacular views of wildlife, perfect for adventure seekers and nature lovers."
//         }
//     ];
//     return (
//         <section className="pt-8">
//             <SearchResort />
//             <div className="text-center mt-10 mb-8 px-4">
//                 <TitleSection mainHeader={"RESORT"} subHeader={"Our Exquisite Resorts & Suites Collection"} />
//             </div>

//             <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 lg:px-16 md:px-8 px-4">
//                 {resorts.map((resort, index) => (
//                     <div
//                         key={index}
//                         className="relative mt-4 h-[450px] overflow-hidden group mx-auto dark:bg-black bg-white dark:border-0 border rounded-md shadow-lg dark:text-white text-white flex flex-col"
//                     >
//                         {/* Resort Image */}
//                         <div className="w-full h-full relative">
//                             <Image
//                                 src={resort.image}
//                                 alt={resort.name}
//                                 width={600}
//                                 height={600}
//                                 className="h-full w-full scale-105 group-hover:scale-100 object-cover transition-all duration-300 rounded-md"
//                             />

//                             {/* Price Badge */}
//                             <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full text-lg font-semibold shadow-md">
//                                 {resort.price_range}
//                             </div>
//                         </div>

//                         {/* Hover Effect Overlay */}
//                         <article
//                             className="p-8 w-full h-full absolute top-0 flex flex-col justify-end rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black"
//                             style={{
//                                 backgroundImage: `url(${resort.hoverBackground})`,
//                                 backgroundSize: 'cover',
//                                 backgroundPosition: 'center',
//                             }}
//                         >
//                             <div className="translate-y-10 group-hover:translate-y-0 transition-all duration-300 space-y-2 bg-sky-500 p-6 rounded-md ">
//                                 <h1 className="md:text-2xl font-semibold">{resort.name}</h1>
//                                 <p className="sm:text-base text-sm">{resort.description}</p>
//                                 <button className="p-2 flex items-center gap-2 rounded-md text-white bg-sky-600 hover:bg-sky-700 transition-all">
//                                     See Details <ChevronsRight />
//                                 </button>
//                             </div>
//                         </article>

//                         {/* Bottom Info */}
//                         <article className="p-4 w-full absolute bottom-0 bg-gradient-to-t from-sky-500 to-transparent rounded-b-md opacity-100 group-hover:opacity-0 group-hover:-bottom-4 transition-all duration-300">
//                             <h1 className="text-lg lg:text-xl font-semibold">{resort.name}</h1>
//                             <p className="sm:text-base text-sm">{resort.category}</p>
//                         </article>
//                     </div>
//                 ))}
//             </div>
//         </section>

//     );
// };

// export default Room;