import React from "react";
import Image from "next/image";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import Packages from "./Packages";


const getPackages = async () => { 

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/packagesServices/api/get-all`)
  const data = await res.json();
  return data?.packages;

}

const SingleResort =async () => {


  const packages = await getPackages() || [];

  console.log(packages);


  const resort = {
    bannerImage:
      "https://i.ibb.co/HB0tX6t/building-decorated-indian-republic-day-1.jpg",
    profileImage: "https://i.ibb.co/PzzJnjz/48812962.jpg",
    name: "Ocean Breeze Resort",
    description: "A serene getaway with breathtaking ocean views.",
    location: "123 Paradise Lane, Beach City",
    contactInfo: {
      phone: "(123) 456-7890",
      email: "info@oceanbreeze.com",
    },
    destinationType: "Beach",
    availableRooms: [
      {
        type: "Deluxe Suite",
        description: "Spacious room with an ocean view and king-size bed.",
        price: 200,
        image:
          "https://i.ibb.co/BcY7nQY/bangkok-thailand-august-12-2016-beautiful-luxury-bedroom-int-1.jpg",
      },
      {
        type: "Standard Room",
        description: "Cozy room with a queen-size bed.",
        price: 120,
        image:
          "https://i.ibb.co/BcY7nQY/bangkok-thailand-august-12-2016-beautiful-luxury-bedroom-int-1.jpg",
      },
      {
        type: "Family Suite",
        description: "Perfect for families, includes two bedrooms and a balcony.",
        price: 300,
        image:
          "https://i.ibb.co/BcY7nQY/bangkok-thailand-august-12-2016-beautiful-luxury-bedroom-int-1.jpg",
      },
    ],
  };





  const {
    bannerImage,
    profileImage,
    name,
    description,
    location,
    contactInfo: { phone, email },
    destinationType,
    availableRooms,
  } = resort;

  return (
    <div className="resort-details">
      <div className="banner relative w-full h-60 md:h-80 lg:h-96">
        <Image
          src={bannerImage}
          alt={`${name} Banner`}
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
        />
        <div className="profile-picture w-36 h-36 absolute bottom-[-40px] left-1/2 transform -translate-x-1/2">
          <Image
            src={profileImage}
            alt={`${name} Profile`}
            layout="fill"
            objectFit="cover"
            className="w-full h-full rounded-full border-4 border-sky-500"
          />
        </div>
      </div>

      <div className="resort-info bg-white shadow-md rounded-md mt-12 p-2 ">
        <h1 className="text-2xl font-bold text-center">{name}</h1>
        <p className="text-gray-600 mt-2 flex justify-center items-center">
          <FaMapMarkerAlt className="text-sky-500 mr-2" />
          {location}
        </p>
        <p className="text-gray-800  text-center"><em>{description}</em></p>
        <div className="flex flex-col justify-center">
          <div className="destination-type ">
            <h3 className="text-md font-thin text-center">Destination Type:{destinationType}</h3>
            {/* <p className="text-gray-600">{destinationType}</p> */}
          </div>


          <div className="contact-info  flex lg:flex-row md:flex-row flex-col justify-center items-center lg:gap-2 md:gap-2">
            <h3 className="text-md font-thin">Contact Information:</h3>
            <p className="text-gray-600 flex items-center">
              <FaPhoneAlt className="text-sky-500 mr-2" />
              <span className="font-thin">Phone: </span>
              <span className="ml-1">{phone}</span>
            </p>
            <p className="text-gray-600 flex items-center ">
              <FaEnvelope className="text-sky-500 mr-2" />
              <span className="font-thin">Email: </span>
              <span className="ml-1">{email}</span>
            </p>
          </div>
        </div>

      </div>

      <div className="relative available-rooms mt-8 mx-24 px-4">
        <h2 className="text-xl font-bold">Available Rooms</h2>
        <div className="room-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {availableRooms.length > 0 ? (
            availableRooms.map((room, index) => (
              <div
                key={index}
                className="room-card bg-white shadow-md rounded-md p-4"
              >
                <div className="relative w-full h-32 md:h-48 lg:h-56">
                  <Image
                    src={room.image}
                    alt={room.type}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <h3 className="text-lg font-semibold mt-2">{room.type}</h3>
                <p className="text-gray-600">{room.description}</p>
                <p className="text-gray-800 font-bold mt-2">
                  ${room.price} / night
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No rooms available at the moment.</p>
          )}
        </div>
        <h2 className="text-xl font-bold mt-5 mb-2">Available Packages</h2>




      </div>


<Packages  />







    </div>
  );
};

export default SingleResort;
