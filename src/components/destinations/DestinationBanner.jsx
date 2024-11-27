"use client"
import { usePathname } from 'next/navigation';
import React from 'react';
import { MdDoubleArrow } from "react-icons/md";

const DestinationBanner = () => {
    const path = usePathname()
    // console.log(path)
    const pathSplit = path?.split('/')
    const pathDirection = pathSplit?.map(p => {
        if (p) {
            return p.charAt(0).toUpperCase() + p.slice(1);
        }
        return p;
    }).join('')
    console.log(pathDirection)
    return (
        <div>
            <div
                className="hero h-80"
                style={{
                    backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(https://i.ibb.co.com/qkn9yMc/neom-ua-yf-Fm-M-UU-unsplash.jpg)",
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'

                }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-neutral-content text-center flex justify-center items-center">
                    <div className="max-w-md mt-20">
                        <h1 className="mb-5 text-5xl font-bold text-center mx-auto text-white">Destination</h1>
                        <h2 className='flex items-center justify-center gap-1 text-xl font-semibold'><span>Home</span><MdDoubleArrow />{pathDirection}</h2>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DestinationBanner;