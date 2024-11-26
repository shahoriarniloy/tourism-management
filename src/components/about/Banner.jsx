import React from 'react';

const Banner = () => {
    return (
<div className="">
  <div
    className="w-full h-48 text-center flex flex-col items-center justify-center"
    style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(/images/about/aboutBg.jpg)`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      color: '#fff', 
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