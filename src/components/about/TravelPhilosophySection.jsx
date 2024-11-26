import Image from 'next/image';
import React from 'react';

const TravelPhilosophySection = () => {
  return (
    <div
      className="bg-bg-1"
      style={{
        padding: '40px',
        fontFamily: 'Arial, sans-serif',
        backgroundImage: 'url(/images/about/Asset-2.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        height: 'auto', // Automatically adjust height based on content
        minHeight: '100vh', // Ensure it takes full viewport height but no extra space
        overflow: 'hidden', // Prevent extra space caused by overflowing elements
      }}
    >
      {/* Content */}
      <div className="mx-auto max-w-[1380px]">
        <div
          className="flex flex-col md:flex-row"
          style={{
            justifyContent: 'space-between',
            zIndex: 2,
          }}
        >
          {/* Left Content */}
          <div className="flex-1" style={{ padding: '20px' }}>
            <h4
              className="text-xl"
              style={{ color: '#88c0d0', marginBottom: '10px' }}
            >
              Our Value
            </h4>
            <h2 style={{ fontSize: '36px', marginBottom: '20px' }}>
              Our Travel Philosophy
            </h2>

            <div style={{ marginBottom: '20px' }}>
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  marginBottom: '5px',
                }}
              >
                ✔ Customer Focus
              </h3>
              <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
                We prioritize our travelers&apos; needs, ensuring every journey
                is tailored for an exceptional and personalized experience.
              </p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  marginBottom: '5px',
                }}
              >
                ✔ Authentic Experiences
              </h3>
              <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
                We offer genuine, local experiences that reflect the true
                essence of each destination, creating meaningful connections.
              </p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  marginBottom: '5px',
                }}
              >
                ✔ Quality Service
              </h3>
              <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
                Our commitment to excellence ensures top-tier service in every
                detail, from booking to your final destination.
              </p>
            </div>

            <div>
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  marginBottom: '5px',
                }}
              >
                ✔ Sustainable Travel
              </h3>
              <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
                We support responsible tourism by minimizing our environmental
                impact and promoting eco-friendly practices for a better future.
              </p>
            </div>
          </div>

          {/* Right Image */}
          <div className="w-auto h-auto md:h-[1036px]">
            <Image
              src="/images/about/about3.jpg"
              alt="Traveler with a bike"
              width={691}
              height={836}
              style={{
                maxWidth: '80%',
                height: '70%',
                borderRadius: '8px',
                borderTopRightRadius: '12%',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelPhilosophySection;
