'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const PackagePage = ({ params }) => {
  const [pac, setPac] = useState({});
  const [id, setId] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unwrapParams = async () => {
      const unwrappedParams = await params;
      setId(unwrappedParams?.id); 
    };

    unwrapParams();
  }, [params]); 

  useEffect(() => {
    if (id) {
      setLoading(true); // set loading to true before fetching data
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/packagesServices/api/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setPac(data?.packages);
          setLoading(false); // set loading to false after data is fetched
        });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full border-t-4 border-blue-600 w-16 h-16"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Image Carousel */}
        <Carousel showThumbs={false} infiniteLoop useKeyboardArrows autoPlay>
          {pac?.photoURL1 && (
            <div>
              <Image
                src={pac?.photoURL1}
                alt="Package Image 1"
                className="w-full h-full object-cover"
                width={864}
                height={256}
              />
            </div>
          )}
          {pac?.photoURL2 && (
            <div>
              <Image
                src={pac?.photoURL2}
                alt="Package Image 2"
                className="w-full h-full object-cover"
                width={864}
                height={256}
              />
            </div>
          )}
          {/* Add more images as needed */}
        </Carousel>

        {/* Package Details */}
        <div className="p-6">
          <h2 className="text-3xl font-semibold text-blue-700">{pac?.category}</h2> {/* Blue color for category */}
          <p className="text-gray-700 text-lg mt-2">{pac?.shortDescription}</p> {/* Dark Gray color for short description */}

          {/* Price and Duration */}
          <div className="flex justify-between mt-4">
            <p className="text-xl font-bold text-green-600">${pac?.pricePerNight} / night</p> {/* Green color for price */}
            <p className="text-xl text-purple-600">{pac?.duration}</p> {/* Purple color for duration */}
          </div>

          {/* Inclusions and Activities */}
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-orange-600">Inclusions</h3> {/* Orange color for Inclusions */}
            <p className="text-gray-600">{pac?.inclusions}</p>

            <h3 className="text-xl font-semibold text-teal-600 mt-4">Activities</h3> {/* Teal color for Activities */}
            <p className="text-gray-600">{pac?.activities}</p>
          </div>

          {/* Ideal For and Country */}
          <div className="flex justify-between mt-4">
            <p className="text-gray-600">Ideal for: <span className="font-semibold text-blue-500">{pac?.idealFor}</span></p> {/* Blue color for idealFor */}
            <p className="text-gray-600">Country: <span className="font-semibold text-red-500">{pac?.country}</span></p> {/* Red color for country */}
          </div>

          {/* Total Price */}
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-yellow-500">Total Price</h3> {/* Yellow color for Total Price */}
            <p className="text-gray-600">${pac?.totalPrice}</p>
          </div>

          {/* Contact Email */}
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-indigo-600">Contact</h3> {/* Indigo color for Contact */}
            <p className="text-gray-600">{pac?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackagePage;
