'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Page = ({ params }) => {
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
        {/* Main Image */}
        <div className="relative w-full h-64">
          <Image
            src={pac?.photoURL1}
            alt="Package Image"
            className="w-full h-full object-cover"
            width={864}
            height={256}
          />
        </div>

        {/* Additional Images (Gallery) */}
        <div className="flex space-x-4 p-6">
          {pac?.photoURL2 && (
            <Image
              src={pac?.photoURL2}
              alt="Additional Image"
              className="w-1/2 h-48 object-cover rounded-lg shadow-md"
              width={408}
              height={192}
            />
          )}
        </div>

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

export default Page;
