"use client";
import { useState } from "react";
import ReactSlider from "react-slider";

const SearchResort = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    price: [50, 3000], 
    destination: "",
    destinationType: "",
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({
        searchTerm,
        ...filters,
      });
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  return (
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

          {/* Full Width Row for Destination Type and Destination */}
          <div className="flex w-full gap-4">
            <div className="flex flex-col w-1/2">
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
                <option value="city">City</option>
                <option value="countryside">Countryside</option>
              </select>
            </div>

            <div className="flex flex-col w-1/2">
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
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchResort;
