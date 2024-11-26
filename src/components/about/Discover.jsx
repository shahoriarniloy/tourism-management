import Image from 'next/image'
import React from 'react'

export default function Discover() {
  return (
    <div>
        
        <section className=" pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h4 className="text-lg italic text-gray-700 mb-2">About Us</h4>
          <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight text-black">Discover Our Journey</h2>
          <p className="text-gray-600 mt-4">
            Passionate about creating memorable travel experiences, we bring the
            world’s best destinations closer to you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 w-full">
          <div 
           style={{
      
                borderTopRightRadius: '33%',
              }}
               className="bg-sky-100 rounded-lg p-8 flex items-start ">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md mr-6">
              <span className="text-gray-600 text-xl">✈️</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Our Vision
              </h3>
              <p className="text-gray-700">
                Our knowledgeable and friendly guides provide in-depth insight.
              </p>
            </div>
          </div>

          <div 
          style={{
      
            borderTopRightRadius: '33%',
          }}
          className="bg-sky-100 rounded-lg p-8 flex items-start">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md mr-6">
              <span className="text-gray-600 text-lg">❤️</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Our Mission
              </h3>
              <p className="text-gray-700">
                Learn essential tips and guidelines to ensure your journey is smooth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>


    <div>

    </div>

    <section className=" pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-lg overflow-hidden">
          <Image 
          className="" style={{ borderTopRightRadius: '12%' }}
          height={834} width={957} alt='1' src={`/images/about/about1.jpg`}  />
                    <div className="col-span-1 flex flex-col justify-center text-gray-800">
            <p className="text-base pt-5">
              At Tourism, we&apos;re passionate about crafting journeys that go
              beyond the ordinary, connecting travelers to breathtaking places
              and unique cultures with every adventure. Our mission is to make
              travel accessible and exciting for everyone, offering guided
              experiences that create unforgettable memories across the globe.
              Founded on a passion for travel, Tourism is here to make every
              journey inspiring, fulfilling, and uniquely yours.
            </p>
          </div>

        <div  className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center pt-7">
          <div 
          style={{
      
            borderTopRightRadius: '33%',
          }}
          className="bg-[#d4eff3] py-6 rounded-lg">
            <h3 className="text-4xl font-bold text-gray-900">90%</h3>
            <p className="text-lg text-gray-700 mt-2">Happy Client</p>
          </div>
          <div 
          style={{
      
            borderTopRightRadius: '33%',
          }}
          className="bg-[#d4eff3] py-6 rounded-lg">
            <h3 className="text-4xl font-bold text-gray-900">5k+</h3>
            <p className="text-lg text-gray-700 mt-2">Active Member</p>
          </div>
          <div 
          style={{
      
            borderTopRightRadius: '33%',
          }}
          className="bg-[#d4eff3] py-6 rounded-lg">
            <h3 className="text-4xl font-bold text-gray-900">15+</h3>
            <p className="text-lg text-gray-700 mt-2">Years Experience</p>
          </div>
        </div>

          </div>



          <div  className="rounded-lg overflow-hidden h-[770px]" style={{ borderTopRightRadius: '12%' }}>
  <Image 
  className='rounded-tr-3xl'
    height={500} 
    width={944} 
    alt="1" 
    src="/images/about/about2.jpg" 
    layout="intrinsic"
  />
</div>

        </div>


      </div>
    </section>

    
    </div>
  )
}
