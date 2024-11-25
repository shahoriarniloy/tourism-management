import Image from 'next/image'
import React from 'react'

export default function AboutUs() {
  return (
    <div className='bg-bg-1 py-10' >
<div className='max-w-[1280px] flex flex-col md:flex-row justify-between mx-auto gap-8' style={{ display: 'flex', alignItems: 'center', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
          {/* Left Image Section */}
          <div >
        <Image
          src="/images/about/about4.jpg"
          alt="Hot air balloons over rock formations"
          width={447}
          height={681}
    
        />


      </div>

      {/* Right Text Section */}
      <div style={{ flex: 1, marginLeft: '20px' }}>
        <h2 style={{ fontSize: '32px', marginBottom: '16px' }}>About Us</h2>
        <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '16px' }}>
          Our tour agency offers unique and exciting travel experiences for individuals and groups. With a focus on
          adventure, culture, and sustainable tourism, we strive to create unforgettable memories for our clients.
        </p>
        <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '16px' }}>
          Our team of knowledgeable guides and friendly staff are dedicated to providing excellent service and ensuring
          a safe and enjoyable trip for all. From exploring exotic destinations to trying new activities and cuisines,
          we specialize in customized itineraries that cater to diverse interests and budgets. Join us for a memorable
          journey that will broaden your horizons and leave you feeling inspired.
        </p>
        <button
        className='hover:bg-bg-1'
          style={{
            padding: '10px 20px',
            backgroundColor: '#a0765c',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Read More
        </button>
      </div>
</div>
    </div>
  )
}
