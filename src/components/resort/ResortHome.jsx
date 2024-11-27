import React from 'react';
import Banner from './Banner';
import Room from './Room';
import Facilities from './Facilities';
import PhotoGallery from './PhotoGallery';
import Testimonial from './Testimonial';
import Service from './Service';

const ResortHome = () => {
    return (
        <div>
            <Banner/>
            <Room />
            <Facilities/>
            <Service/>
            <PhotoGallery/>
            <Testimonial/>
        </div>
    );
};

export default ResortHome;