
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import TopDestinations from "@/components/TopDestinations";
import TopResorts from "@/components/TopResorts";
import Image from "next/image";
import { FaToiletPaperSlash } from "react-icons/fa";

import LandingPage from "@/components/landingPage/LandingPage";


export default function Home() {
  return (
    <div >
      <Navbar/>
      <Hero/>
      <LandingPage />     


      <div className="lg:px-16">
      <TopDestinations/> 
      <TopResorts/>
    


      </div>
        
      <Footer/>
      
    </div>
  );
}
