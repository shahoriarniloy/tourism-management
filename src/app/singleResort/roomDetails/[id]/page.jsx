'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const RoomDetails = ({ params }) => {
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
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/singleResort/roomDetails/api/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setPac(data.room);
          setLoading(false); 
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

  const handleBookNow = () => {
    const query = new URLSearchParams({
      roomName: pac?.roomName,
      pricePerNight: pac?.pricePerNight,
      roomId: pac?._id,
    }).toString();

    window.location.href = `/payment?${query}`;
  };

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
          <h2 className="text-3xl font-semibold text-blue-700">{pac?.roomName}</h2>
          <em><p className="text-green-600">${pac?.pricePerNight} Per Night</p></em>
          <p className="text-gray-700 text-md mt-2">{pac?.description}</p>
          <p className="text-gray-700 text-md mt-2">{pac?.roomType} Room, {pac?.capacity} Person</p>
          <h2 className="text-md font-thin text-gray-700">Room No: {pac?.roomNo}</h2>
          {session.data ? (
            <button
            onClick={handleBookNow}
            className="text-white bg-green-500 rounded-md px-6 py-2 mt-4"
          >
            Book Now
          </button>
          ):("")}
          
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
