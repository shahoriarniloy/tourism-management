import React from 'react';
import Banner from './Banner';
import Room from './Room';
import Facilities from './Facilities';
import PhotoGallery from './PhotoGallery';
import Testimonial from './Testimonial';
import Service from './Service';
import SearchResort from './SearchResort';
import ResortRoom from './ResortRoom';

const ResortHome = () => {
    return (
        <div>
            <Banner/>
            {/* <SearchResort/> */}
            <Room />
            {/* <Facilities/>
            <Service/> */}
            <PhotoGallery/>
            {/* <Testimonial/> */}
            {/* <ResortRoom/> */}
        </div>
    );
};

export default ResortHome;