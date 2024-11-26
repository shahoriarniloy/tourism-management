import React from 'react';
import TourismSupport from '../Faq';
import Hero from '../Hero';
import TopDestinations from '../TopDestinations';
import TopResorts from '../TopResorts';

const LandingPage = () => {
    return (
        <div>
            <Hero />
            <div className="lg:px-16">
      <TopDestinations/> 
      <TopResorts/>
    
            <TourismSupport />


      </div>
        </div>
    );
};

export default LandingPage;