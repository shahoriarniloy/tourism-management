import Image from 'next/image';
import React from 'react';

const DestinationDetailModal = ({ spot, closeModal }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out">
      <div className="bg-white p-8 rounded-lg w-11/12 sm:w-3/4 lg:w-1/2 relative shadow-lg">
        <button
          className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-800 transition-colors duration-200"
          onClick={closeModal}
        >
          ×
        </button>
        <h2 className="text-3xl font-bold mb-6 text-center">{spot.name}</h2>
        
        <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4 mb-6 ">
          <div className="relative w-64 sm:w-full h-48">
            <Image
              src={spot.photoURL1}
              alt={spot.name}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="relative w-64 sm:w-full h-48">
            <Image
              src={spot.photoURL2}
              alt={spot.name}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </div>
        <p className='font-bold'><em>Description:{spot.description}</em> </p>


        <div className="space-y-4 mb-6">
            <div className='flex justify-between'>
            <em>{spot.location}, {spot.country}</em>
            {/* <p><strong>Location:</strong> {spot.location}</p> */}

            </div>
            <div className='font-thin'>
            <em>Seasonality: {spot.seasonality}, </em>
          <em>Average Price: ${spot.average}, </em>
          <em>Total Spots: {spot.total}</em>

            </div>
          
          
        </div>

        <div className="flex justify-end">
          <button
            onClick={closeModal}
            className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-lg transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetailModal;
