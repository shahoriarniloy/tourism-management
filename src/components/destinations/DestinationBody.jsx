import React from 'react';
import DesteinationCard from './DesteinationCard';

const DestinationBody = () => {
    return (
        <div className='text-center mt-28'>
            <p>Get Ready To </p>
            <h2 className='text-5xl font-bold py-3'>Explore Top Destination</h2>
            <p className='text-gray-400 text-lg w-11/12 mx-auto'>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old</p>
            <DesteinationCard></DesteinationCard>
        </div>
    );
};

export default DestinationBody;