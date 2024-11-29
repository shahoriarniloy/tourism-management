"use client"
import React, { useEffect, useState } from 'react';
import Banner from './Banner';
import { Loader } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

const ResortRoom = () => {

    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 20]);
    const [categories, setCategories] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [seeMoreCategories, setSeeMoreCategories] = useState(false);
    const [seeMoreAuthors, setSeeMoreAuthors] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State for the mobile filter drawer
    const itemsPerPage = 12;
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    const searchParams = useSearchParams();
    const sort = searchParams.get("sort");

    // Fetch books based on the selected filters
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(
                    `/api/books?page=${currentPage}&limit=${itemsPerPage}&sort=${sort || ""
                    }`
                );

                const data = await response.json();
                if (Array.isArray(data)) {
                    setBooks(data);
                    setFilteredBooks(data);

                    const uniqueCategories = [
                        ...new Set(data.map((book) => book.category)),
                    ];
                    const uniqueAuthors = [...new Set(data.map((book) => book.author))];

                    setCategories(uniqueCategories);
                    setAuthors(uniqueAuthors);
                } else {
                    setBooks([]);
                    setFilteredBooks([]);
                }
            } catch (error) {
                console.error("Failed to fetch books:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [baseUrl, currentPage, sort]);

    useEffect(() => {
        const filtered = books.filter((book) => {
            const inCategory = selectedCategories.length
                ? selectedCategories.includes(book.category)
                : true;
            const inAuthor = selectedAuthors.length
                ? selectedAuthors.includes(book.author)
                : true;
            const inPriceRange =
                book.price >= priceRange[0] && book.price <= priceRange[1];
            const matchesSearchTerm = book.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

            return inCategory && inAuthor && inPriceRange && matchesSearchTerm;
        });

        setFilteredBooks(filtered);
    }, [books, selectedCategories, selectedAuthors, priceRange, searchTerm]);

    // Category filter handler
    const handleCategoryChange = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    };

    // Author filter handler
    const handleAuthorChange = (author) => {
        setSelectedAuthors((prev) =>
            prev.includes(author)
                ? prev.filter((a) => a !== author)
                : [...prev, author]
        );
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const sorting = (sortOption) => {
        const sortedBooks = [...filteredBooks];
        if (sortOption === "LowToHigh") {
            sortedBooks.sort((a, b) => a.price - b.price);
        } else if (sortOption === "HighToLow") {
            sortedBooks.sort((a, b) => b.price - a.price);
        } else if (sortOption === "topRatings") {
            sortedBooks.sort((a, b) => b.ratings - a.ratings);
        } else if (sortOption === "lowRatings") {
            sortedBooks.sort((a, b) => a.ratings - b.ratings);
        }
        setFilteredBooks(sortedBooks);
    };

    const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Toggle drawer function
    const toggleDrawer = () => {
        setIsDrawerOpen((prev) => !prev);
    };

    return (
        <>
            <div>
                <Banner title="Books" linkName="Home" />
                {isLoading ? (
                    <Loader />
                ) : (
                    <>
                        <div className="lg:hidden flex ml-6 mt-6 -mb-10">
                            <button
                                className="flex justify-center items-center gap-4 p-1 px-4 rounded-lg btn btn-outline -mt-3 lg:mt-5"
                                onClick={toggleDrawer}
                            >
                                Filter
                            </button>
                        </div>
                        <div className="flex justify-end pr-10">
                            <div className="dropdown">
                                <div tabIndex={0} className="m-1">
                                    <div className="flex justify-center items-center gap-4 p-1 px-4 rounded-lg btn btn-outline -mt-3 lg:mt-5">
                                        Sort
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="dropdown-content menu bg-base-100 rounded-box z-[1] p-2 shadow w-52 -ml-20"
                                >
                                    <button onClick={() => sorting("LowToHigh")}>
                                        <li>
                                            <a>Sort by price: low to high</a>
                                        </li>
                                    </button>
                                    <button onClick={() => sorting("HighToLow")}>
                                        <li>
                                            <a>Sort by price: high to low</a>
                                        </li>
                                    </button>
                                    <button onClick={() => sorting("topRatings")}>
                                        <li>
                                            <a>Sort by popularity: high to low</a>
                                        </li>
                                    </button>
                                    <button onClick={() => sorting("lowRatings")}>
                                        <li>
                                            <a>Sort by popularity: low to high</a>
                                        </li>
                                    </button>
                                </ul>
                            </div>
                        </div>

                        <div className="grid grid-cols-4 mx-auto mt-6 gap-8 container">
                            <div className="hidden lg:block col-span-1 bg-gray-100 p-4 rounded-lg">
                                <div className="mb-6">
                                    <input
                                        type="text"
                                        placeholder="Search for a book..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded"
                                    />
                                </div>
                                

                                
                                <div className="mb-6">
                                    <h4 className="font-bold mb-2">Price Range</h4>
                                    <input
                                        type="range"
                                        min="0"
                                        max="20"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([0, e.target.value])}
                                        className="w-full range-slider"
                                    />
                                    <p className="mb-10">
                                        Price Range: ${priceRange[0]} - ${priceRange[1]}
                                    </p>
                                </div>
                            </div>

                            {/* Books Grid */}
                            <div className="col-span-4 lg:col-span-3 grid grid-cols-2 lg:grid-cols-6 md:grid-cols-3 justify-center divide-y divide-x p-2 gap-4">
                                {filteredBooks
                                    .slice(indexOfFirstItem, indexOfLastItem)
                                    .map((book) => (
                                        <BooksCard key={book._id} book={book} />
                                    ))}
                            </div>
                        </div>

                        {/* Mobile Filter Drawer */}
                        {isDrawerOpen && (
                            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40">
                                <div className="mt-16 left-0 top-0 w-3/4 h-full bg-white shadow-lg z-50 p-5 overflow-y-auto">
                                    <div className="flex justify-between items-center mb-5">
                                        <h2 className="text-lg font-bold">Filter Options</h2>
                                        <button
                                            className="text-2xl text-gray-600"
                                            onClick={toggleDrawer} // Close the drawer
                                        >
                                            
                                        </button>
                                    </div>
                                    {/* Mobile Filter Options */}
                                    <div className="mb-6">
                                        <input
                                            type="text"
                                            placeholder="Search for a book..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded"
                                        />
                                    </div>
                                    {/* Category Checkboxes */}
                                    
                                    {/* Author Checkboxes */}
                                    
                                    {/* Price Range Slider */}
                                    <div>
                                        <h4 className="font-bold mb-2">Price Range</h4>
                                        <input
                                            type="range"
                                            min="0"
                                            max="20"
                                            value={priceRange[1]}
                                            onChange={(e) => setPriceRange([0, e.target.value])}
                                            className="w-full range-slider"
                                        />
                                        <p className="mb-10">
                                            Price Range: ${priceRange[0]} - ${priceRange[1]}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Pagination */}
                        <div className="flex justify-center lg:ml-96 mt-8">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`px-4 py-2 mx-1 border ${currentPage === index + 1
                                        ? "bg-[#F65D4E] text-white"
                                        : "bg-white text-black"
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default ResortRoom;