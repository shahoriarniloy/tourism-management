import Image from 'next/image';
import React from 'react';

const TravelPhilosophySection = () => {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat relative w-full pt-12"
      style={{
        backgroundImage: 'url(/images/about/Asset-2.png)', 
      }}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col md:flex-row lg:flex-row justify-between items-center">
          <div className="flex-1 p-6 lg:py-12 pr-12 pl-0">
            <h4 className="text-xl mb-4 text-sky-500">Our Value</h4>
            <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight text-black">
              Our Travel Philosophy
            </h2>

            <div className="mt-8">
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-2">✔ Customer Focus</h3>
                <p className="text-sm leading-6 text-gray-700">
                  We prioritize our travelers&apos; needs, ensuring every journey
                  is tailored for an exceptional and personalized experience.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold mb-2">✔ Authentic Experiences</h3>
                <p className="text-sm leading-6 text-gray-700">
                  We offer genuine, local experiences that reflect the true
                  essence of each destination, creating meaningful connections.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold mb-2">✔ Quality Service</h3>
                <p className="text-sm leading-6 text-gray-700">
                  Our commitment to excellence ensures top-tier service in every
                  detail, from booking to your final destination.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">✔ Sustainable Travel</h3>
                <p className="text-sm leading-6 text-gray-700">
                  We support responsible tourism by minimizing our environmental
                  impact and promoting eco-friendly practices for a better future.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 lg:w-1/3 flex justify-center mb-6 md:mb-0">
            <Image
              src="/images/about/about3.jpg"
              alt="Traveler with a bike"
              width={691}
              height={836}
              className="max-w-full h-auto rounded-lg rounded-tl-[12%] shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelPhilosophySection;
