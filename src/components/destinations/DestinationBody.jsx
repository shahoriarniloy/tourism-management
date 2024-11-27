import React from 'react';
import DesteinationCard from './DesteinationCard';

const DestinationBody = () => {
    return (
        <div className='text-center mt-28 w-11/12 mx-auto'>
            <p className='font-sans'>Get Ready To </p>
            <h2 className='text-5xl font-bold py-3'>Explore Top Destination</h2>
            <p className='text-gray-400 text-lg w-11/12 mx-auto mb-3'>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old</p>
            {/* here card will be shown dynamically */}
            <div className='grid grid-cols-4 gap-2 justify-between'>
                <DesteinationCard></DesteinationCard>
                <DesteinationCard></DesteinationCard>
                <DesteinationCard></DesteinationCard>
                <DesteinationCard></DesteinationCard>
                <DesteinationCard></DesteinationCard>
                <DesteinationCard></DesteinationCard>
            </div>
        </div>
    );
};

export default DestinationBody;