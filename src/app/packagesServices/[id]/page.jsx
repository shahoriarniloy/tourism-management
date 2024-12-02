'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const PackagePage = ({ params }) => {
  const [pac, setPac] = useState({});
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(true);
  const session = useSession();


  useEffect(() => {
    const unwrapParams = async () => {
      const unwrappedParams = await params;
      setId(unwrappedParams?.id);
    };

    unwrapParams();
  }, [params]);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/packagesServices/api/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setPac(data?.packages);
          setLoading(false);
        });
    }
  }, [id]);

  const handleBooking = () => {
    const queryParams = new URLSearchParams({
      id: pac._id,
      totalPrice: pac.totalPrice,
      category: pac.category,
      duration: pac.duration,
    }).toString();

    window.location.href = `/packageBooking?${queryParams}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full border-t-4 border-blue-600 w-16 h-16"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto mb-4">
      <div className="bg-sky-700 h-16 mb-6"></div>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden flex lg:flex-row md:flex-row flex-col lg:mx-24 px-4 py-8">
        <div className="lg:w-1/2 md:w-1/2 w-full p-4">
          <Carousel showThumbs={false} infiniteLoop useKeyboardArrows autoPlay>
            {pac?.photoURL1 && (
              <div className="h-64 w-full">
                <Image
                  src={pac?.photoURL1}
                  alt="Package Image 1"
                  className="w-full h-full object-cover"
                  layout="fill"
                />
              </div>
            )}
            {pac?.photoURL2 && (
              <div className="h-96 w-full">
                <Image
                  src={pac?.photoURL2}
                  alt="Package Image 2"
                  className="w-full h-full object-cover"
                  layout="fill"
                />
              </div>
            )}
          </Carousel>
        </div>

        <div className="lg:w-1/2 md:w-1/2 w-full py-2 px-6">
          <h2 className="text-3xl font-semibold text-blue-700">{pac?.category}</h2>
          <p className="text-green-600">${pac?.totalPrice}</p>
          <p className="text-gray-700 text-md mt-2">{pac?.shortDescription}</p>

          <div className="flex justify-between mt-4">
            <p className="text-sm text-purple-600">Duration: {pac?.duration}</p>
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-semibold text-orange-600">Inclusions</h3>
            <p className="text-gray-600">{pac?.inclusions}</p>

            <h3 className="text-sm font-semibold text-teal-600 mt-4">Activities</h3>
            <p className="text-gray-600">{pac?.activities}</p>
          </div>

          <div className="flex justify-between mt-4">
            <p className="text-gray-600">
              Ideal for: <span className="font-semibold text-blue-500">{pac?.idealFor}</span>
            </p>
          </div>

          {session.data ? (
            <button
            onClick={handleBooking}
            className="text-white bg-green-500 px-6 py-2 mt-4 rounded-md"
          >
            Book Now
          </button>
          ):("")}

          
        </div>
      </div>
    </div>
  );
};

export default PackagePage;
