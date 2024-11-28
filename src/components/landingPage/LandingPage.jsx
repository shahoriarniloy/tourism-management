import React from 'react';
import TourismSupport from '../Faq';
import Hero from '../Hero';
import TopDestinations from '../TopDestinations';
import TopResorts from '../TopResorts';
import Testimonial from '../resort/Testimonial';

const LandingPage = () => {
    return (
        <div>
            <Hero />
            <div className="lg:px-16">
                <TopDestinations />
                <TopResorts />
                {/* <Testimonial/> */}
                <TourismSupport />


            </div>
        </div>
    );
};

export default LandingPage;