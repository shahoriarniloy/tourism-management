"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/Logo";

const SingleResort = () => {
  const [email, setEmail] = useState(null); useEffect(() => { const searchParams = new URLSearchParams(window.location.search); setEmail(searchParams.get('email')); }, []); const [resort, setResort] = useState(null); const [loading, setLoading] = useState(true); const [error, setError] = useState(null); const [packages, setPackages] = useState(null); const [rooms, setRooms] = useState(null);

  useEffect(() => {
    const fetchResortData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/dashboard/myResort/api/${email}`
        );
        if (!response.ok) throw new Error("Failed to fetch resort data");
        const data = await response.json();
        
        setResort(data.myResort ?? null);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching resort data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchResortData();
    }
  }, [email]);

  useEffect(() => {
    if (email) {
      const fetchPackageData = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/singleResort/api/${email}`
          );
          if (!response.ok) throw new Error("Failed to fetch package data");
          const data = await response.json();
          // console.log('packages', data.packages);
          setPackages(data.packages ?? null);
        } catch (error) {
          setError(error.message);
          console.error("Error fetching package data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchPackageData();
    }
  }, [email]);

  useEffect(() => {
    if (email) {
      const fetchRoomData = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/singleResort/rooms/api/${email}`
          );
          if (!response.ok) throw new Error("Failed to fetch room data");
          const data = await response.json();
          // console.log("rooms", data.rooms);
          setRooms(data.rooms ?? null);
        } catch (error) {
          setError(error.message);
          console.error("Error fetching room data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchRoomData();
    }
  }, [email]);

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center">
        <Logo />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  if (!resort) {
    return <p className="text-center">No resort information available.</p>;
  }

  const {
    resortName,
    location,
    description,
    phone,
    email: resortEmail,
    imageUrl,
    bannerImage,
    priceRange,
  } = resort;

  const resortImageUrl = imageUrl || "https://i.ibb.co.com/PzzJnjz/48812962.jpg";
  console.log(resortImageUrl);
  const resortBannerImage = bannerImage || "https://i.ibb.co.com/HB0tX6t/building-decorated-indian-republic-day-1.jpg";
  const nights = parseInt(packages?.duration?.split(" ")[2]) || 0;
  const priceBreakdown = packages?.pricePerNight * nights;

  return (
    <div className="resort-details ">
      <div className="banner relative w-full h-60 md:h-80 lg:h-96">
        <Image
          src={resortBannerImage}
          alt={`${resortName ?? "Resort"} Banner`}
          fill
          className="w-full h-full object-cover"
        />
        <div className="profile-picture w-36 h-36 absolute bottom-[-40px] left-1/2 transform -translate-x-1/2">
          <Image
            src={resortImageUrl}
            alt={`${resortName ?? "Resort"} Profile`}
            fill
            className="w-full h-full rounded-full border-4 border-sky-500"
          />
        </div>
      </div>

      <div className="resort-info bg-white shadow-md rounded-md mt-6 p-4">
        <h1 className="text-2xl font-bold text-center">{resortName ?? "Unknown Resort"}</h1>
        <p className="text-gray-600 mt-2 flex justify-center items-center">
          <FaMapMarkerAlt className="text-sky-500 mr-2" />
          {location ?? "Location not available"}
        </p>
        <p className="text-gray-800 text-center">
          <em>{description ?? "No description available."}</em>
        </p>
        <div className="flex flex-col justify-center items-center mt-4">
          <p className="text-gray-600 flex items-center mb-2">
            <FaPhoneAlt className="text-sky-500 mr-2" />
            <span className="font-thin">Phone: {phone ?? "Phone number not available"}</span>
          </p>
          <p className="text-gray-600 flex items-center">
            <FaEnvelope className="text-sky-500 mr-2" />
            <span className="font-thin">Email: {resortEmail ?? "Email not available"}</span>
          </p>
        </div>
      </div>
      <div className="lg:mx-24 px-4 mb-8">
      <h2 className="text-2xl mb-8 mt-8 font-extrabold leading-tight text-black">Available Rooms</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {rooms &&
          rooms.map((room) => (
            <div
              key={room._id}
              className="room-card bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              <div className="relative w-full h-56">
                <Image
                  src={room?.photoURL1}
                  alt={room?.roomName}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
                <div className="absolute top-2 right-2 bg-gray-900 bg-opacity-75 text-white text-sm font-semibold rounded px-3 py-2">
                  ${room?.pricePerNight} Per Night
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold text-sky-500">
                  {room?.roomName}
                </h2>
                <em><p className="text-gray-600 mt-2">{room?.description}</p></em>
                <div className="flex gap-6 text-gray-600 text-md font-thin">
                  <p>Room:{room?.roomType}</p>
                  <p>Capacity:{room?.capacity}</p>
                </div>
                <Link href={`/singleResort/roomDetails/${room._id}`}>
          <button className="btn bg-green-500 text-white w-full mt-4 py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-300">
            View Details
          </button>
        </Link> 
              </div>
            </div>
          ))}
      </div>

      <h1 className="text-2xl mb-8 mt-8 font-extrabold leading-tight text-black">Available Packages</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages && packages?.map(packageItem => (
          <div
            key={packageItem._id}
            className="room-card bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <div className="relative w-full h-56">
              <Image
                src={packageItem?.photoURL1}
                alt={packageItem?.category}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
              <div className="absolute top-2 right-2 bg-gray-900 bg-opacity-75 text-white text-sm font-semibold rounded px-3 py-2">
                ${packageItem?.totalPrice}
                <br />
                <span className="text-xs font-thin">
                <del>
  ${packageItem?.pricePerNight * 
    (parseInt(packageItem?.duration?.toLowerCase().split("days,")[1]?.split("nights"[0])))
  }
</del>
                </span>
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-sky-500">{packageItem?.category}</h2>
              <h3 className="text-md font-thin text-gray-500 mt-2">Ideal For: {packageItem?.idealFor}</h3>
              <p className="text-gray-600 mt-2 h-24">
  <em>
    {packageItem?.shortDescription
      ?.split(" ")
      .slice(0, 15)
      .join(" ")}
    {packageItem?.shortDescription?.split(" ").length > 10 && (
      <span>
        ...{" "}
        <Link
          href={`/packagesServices/${packageItem._id}`}
          className="text-sky-500 font-semibold hover:underline"
        >
          See More
        </Link>
      </span>
    )}
  </em>
</p>
        <Link href={`/packagesServices/${packageItem._id}`}>
          <button className="btn bg-green-500 text-white w-full mt-4 py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-300">
            Explore This Package
          </button>
        </Link>            </div>
            
          </div>
        ))}
      </div>

      </div>

      
    </div>
  );
};

export default SingleResort;
