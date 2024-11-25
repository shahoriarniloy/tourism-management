import React from 'react';

const Banner = () => {
    return (
<div className="mt-12">
  <div
    className="w-full h-40 text-center flex flex-col items-center justify-center"
    style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(/images/about/aboutBg.jpg)`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      color: '#fff', // Optional: Makes text white for better visibility
    }}
  >
               <h2 className='text-4xl font-bold '>About</h2>
               <h6 className='text-lg font-bold pt-1'>
                Home /
                <span className='text-red-600'>About</span>
               </h6>
            </div>
        </div>
    );
};

export default Banner;