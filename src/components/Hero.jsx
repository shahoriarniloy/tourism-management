"use client";
import React from "react";
import CountUp from "react-countup";
import Image from "next/image";
import {
  SliderBtnGroup,
  ProgressSlider,
  SliderBtn,
  SliderContent,
  SliderWrapper,
} from "@/components/progress-slider";

const items = [
  {
    img: "https://i.ibb.co/xSBh6SN/landscape-railay-beach-sunrise-krabi-thailand-1.jpg",
    title: "Bridge",
    desc: "A breathtaking view of a city illuminated by countless lights, showcasing the vibrant and bustling nightlife.",
    sliderName: "bridge",
  },
  {
    img: "https://i.ibb.co/6R2kS9Y/aerial-view-na-pali-coast-cliffs-hawaii-1.jpg",
    title: "Mountains View",
    desc: "A serene lake reflecting the surrounding mountains and trees, creating a mirror-like surface.",
    sliderName: "mountains",
  },
  {
    img: "https://i.ibb.co/tZR4B99/landmark-pagoda-doi-inthanon-national-park-chiang-mai-thailand-1.jpg",
    title: "Autumn",
    desc: "A picturesque path winding through a dense forest adorned with vibrant autumn foliage.",
    sliderName: "autumn",
  },
  {
    img: "https://i.ibb.co/rs20qhC/wet-vietnam-mountain-flow-stream-rural-1.jpg",
    title: "Foggy",
    sliderName: "foggy",
    desc: "A stunning foggy view over the forest, with the sun casting a golden glow across the landscape.",
  },
];

const Hero = () => {
  return (
    <div className="h-screen relative flex flex-col items-center justify-center text-white overflow-hidden">
      <ProgressSlider vertical={false} activeSlider="bridge" className="absolute inset-0 z-0">
        <SliderContent>
          {items.map((item, index) => (
            <SliderWrapper key={index} value={item?.sliderName}>
              <Image
                className="h-screen w-screen object-cover"
                src={item.img}
                width={1920}
                height={1080}
                alt={item.desc}
              />
            </SliderWrapper>
          ))}
        </SliderContent>
      </ProgressSlider>
      <div className="absolute inset-0 bg-black/50 z-5"></div>

      <div className="text-center z-10 px-4 md:px-8 ">
        <h1 className="lg:text-5xl md:text-6xl text-3xl font-bold leading-tight mb-4">
          Explore the World’s Best Destinations
        </h1>
        <p className="lg:text-xl md:text-xl text-sm font-thin  mb-6 text-gray-200">
          Discover hidden gems and popular spots with our curated travel guides.
        </p>

        <div className="mt-8 flex justify-center items-center">
          <input
            type="text"
            placeholder="Search for destinations, guides, or activities..."
            className="w-full max-w-md px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-500 shadow-md focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <button className="ml-1 h-full px-6 py-3 bg-sky-500 text-white rounded-lg">
            Search
          </button>
        </div>

        <div className="flex flex-wrap justify-center space-x-8 mt-8">
          <div className="text-center">
            <h2 className="lg:text-4xl md:text-4xl text-xl font-bold">
              <CountUp start={0} end={120} duration={2.5} suffix="+" />
            </h2>
            <p className="text-lg">Destinations</p>
          </div>
          <div className="text-center">
            <h2 className="lg:text-4xl md:text-4xl text-xl  font-bold">
              <CountUp start={0} end={50000} duration={3} separator="," suffix="+" />
            </h2>
            <p className="text-lg">Happy Travelers</p>
          </div>
          <div className="text-center">
            <h2 className="lg:text-4xl md:text-4xl text-xl  font-bold">
              <CountUp start={0} end={5000} duration={2} separator="," suffix="+" />
            </h2>
            <p className="text-lg">Reviews</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center mt-8 gap-4 mb-4">
          <button className="px-6 py-3 bg-white text-gray-800 rounded-full shadow-md hover:bg-sky-500 hover:text-white">
            Adventure
          </button>
          <button className="px-6 py-3 bg-white text-gray-800 rounded-full shadow-md hover:bg-sky-500 hover:text-white">
            Luxury
          </button>
          <button className="px-6 py-3 bg-white text-gray-800 rounded-full shadow-md hover:bg-sky-500 hover:text-white">
            Family Trips
          </button>
          <button className="px-6 py-3 bg-white text-gray-800 rounded-full shadow-md hover:bg-sky-500 hover:text-white">
            Budget Travel
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 text-white z-20">
        <p className="mb-2 text-sm">Scroll to Explore</p>
        <div className="animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Hero;
