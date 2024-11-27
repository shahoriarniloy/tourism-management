import React from 'react';
import Banner from './Banner';
import Room from './Room';
import Facilities from './Facilities';
import PhotoGallery from './PhotoGallery';

const ResortHome = () => {
    return (
        <div>
            <Banner/>
            <Room />
            <Facilities/>
            <PhotoGallery/>
        </div>
    );
};

export default ResortHome;