import Image from 'next/image';
import React from 'react';

export default function ImageCard() {
  return (
    <div
      style={{
        backgroundColor: '#E6FAF8', // Light blue background
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div 
      className='h-[100%] md:h-[70%]'
        style={{
          position: 'relative',
          width: '70%',
          borderRadius: '16px',
          overflow: 'hidden',

        }}
      >
<Image
className='absolute'
  src="/images/about/bg2.jpg"
  alt="A person taking a selfie by the sea"
  layout="responsive"
  width={700}
  height={320}

  style={{
    objectFit: 'cover',
    display: 'block',
    borderTopRightRadius: '12%',
  }}
/>


        {/* Play Button */}
        <button

          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="black"
            width="32px"
            height="32px"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
