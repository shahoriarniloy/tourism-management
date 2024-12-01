import Link from 'next/link';
import React, { useState } from 'react';

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState({ destinations: [], resorts: [] });
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!searchQuery) return;
    
        setLoading(true);
    
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/about/Search/api?searchQuery=${searchQuery}`
            );
    
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
    
            const data = await response.json();
    
            setSearchResults({
                destinations: data.destinations || [],
                resorts: data.resorts || [],
            });
        } catch (error) {
            console.error('Error fetching search results:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-8 flex flex-col items-center space-y-2 relative">
            <div className="flex justify-center items-center space-x-2 w-full max-w-md">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-500 shadow-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                <button
                    className="h-full px-6 py-3 bg-sky-500 text-white rounded-lg"
                    onClick={handleSearch}
                    disabled={loading}
                >
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </div>

            {/* Overlay for search results */}
            {searchQuery && (searchResults.destinations.length > 0 || searchResults.resorts.length > 0) && (
                <div className="w-full mt-2 bg-white shadow-lg rounded-lg p-4 z-10">
                    <div className="flex space-x-8">
                        {/* Destinations Column */}
                        <div className="w-1/2">
                            <h3 className="font-bold text-lg text-sky-500">Destinations</h3>
                            <ul className="mt-2">
                                {searchResults.destinations.map((destination) => (
                                    <li key={destination._id} className="mt-2 p-2 border-b border-gray-200 hover:bg-gray-100 transition duration-200">
                                        <p className="font-semibold text-gray-800">{destination.name}</p>
                                        <p className="text-sm text-gray-500">{destination.location}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Resorts Column */}
                        <div className="w-1/2">
                            <h3 className="font-bold text-lg text-sky-500 text-center">Resorts</h3>
                            <ul className="mt-2  items-center">
                                {searchResults.resorts.map((resort) => (
                                    <li key={resort._id} className="mt-2 p-2 border-b border-gray-200 hover:bg-gray-100 transition duration-200 text-center">
                                        <Link href={`/singleResort?email=${resort.email}`}>
                                           
                                                <p className="font-semibold text-gray-800">{resort.resortName}</p>
                                                <p className="text-sm text-gray-500">{resort.location}</p>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
