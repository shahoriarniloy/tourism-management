"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import TitleSection from './TitleSection';

const Testimonial = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/about/api`);
                if (!resp.ok) {
                    throw new Error("Failed to fetch testimonials");
                }
                const data = await resp.json();
                setTestimonials(data?.testimonials || []);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const nextTestimonial = () => {
        setCurrentTestimonial((prevIndex) => (prevIndex + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentTestimonial((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    };

    if (loading) {
        return <p>Loading testimonials...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <section>
            <div className="mt-12 font-[sans-serif] mb-12">
                <div className="max-w-4xl mx-auto relative">
                    <div className="text-center mb-8 px-4">
                        <TitleSection
                            mainHeader={"What our happy clients say"}
                            subHeader={"Discover the experiences of our satisfied clients and hear firsthand how our services have exceeded their expectations. Read their testimonials to see why we're trusted by so many!"}
                        />
                    </div>

                    <div className="max-w-xl mt-16 mx-auto">
                        <div className="flex flex-col items-center text-center">
                            <Image
                                width={600}
                                height={600}
                                src={testimonials[currentTestimonial].photoURL}
                                alt={testimonials[currentTestimonial].username}
                                className="w-28 h-28 rounded-full shadow-[0_2px_22px_-4px_rgba(93,96,127,0.6)] border-2 border-white"
                            />
                            <div className="mt-4">
                                <h4 className="text-gray-800 text-base font-extrabold">{testimonials[currentTestimonial].username}</h4>
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            <p className="text-sm leading-relaxed">{testimonials[currentTestimonial].feedback}</p>
                        </div>

                        <div className="flex justify-center space-x-1.5 mt-4">
                            {[...Array(5)].map((_, index) => (
                                <svg
                                    key={index}
                                    className={`w-[18px] ${index < testimonials[currentTestimonial].rating ? 'fill-[#facc15]' : 'fill-[#CED5D8]'}`}
                                    viewBox="0 0 14 13"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                                    />
                                </svg>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-300 w-10 h-10 grid items-center justify-center rounded-full rotate-90 shrink-0 cursor-pointer absolute left-0 top-0 bottom-0 my-auto" onClick={prevTestimonial}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-[#fff] inline" viewBox="0 0 24 24">
                            <path
                                d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                                clipRule="evenodd"
                                data-original="#000000"
                            ></path>
                        </svg>
                    </div>
                    <div className="bg-gray-300 w-10 h-10 grid items-center justify-center rounded-full -rotate-90 shrink-0 cursor-pointer absolute right-0 top-0 bottom-0 my-auto" onClick={nextTestimonial}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-[#fff] inline" viewBox="0 0 24 24">
                            <path
                                fillRule="evenodd"
                                d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                                data-original="#000000"
                            ></path>
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonial;
