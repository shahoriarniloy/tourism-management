
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import TopDestinations from "@/components/TopDestinations";
import Image from "next/image";

export default function Home() {
  return (
    <div >
      <Navbar></Navbar>
      <Hero></Hero>   
      <TopDestinations></TopDestinations>    
      
    </div>
  );
}
