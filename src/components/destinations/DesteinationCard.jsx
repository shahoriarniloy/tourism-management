import React from 'react';

const DesteinationCard = () => {
    return (
        <div>
            <div className="relative card  bg-base-100 shadow-xl overflow-hidden w-full" data-aos="zoom-in">
                <figure>
                    <img className='w-96'
                        src="/images/destinations/tourism.jpg"
                        alt="Shoes" />
                </figure>
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                    <h2 className="card-title text-3xl text-white" data-aos="fade-up">Peris</h2>
                    <p className='text-xl text-white'>3 place</p>
                </div>
            </div>
        </div>
    );
};

export default DesteinationCard;