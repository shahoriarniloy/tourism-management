"use client";
import React from "react";
import { usePathname } from "next/navigation";

const Banner = () => {
  const pathName = usePathname();

  const formattedPathName = pathName
    .split("/")
    .map((part, index) => {
      if (part) {
        return part.charAt(0).toUpperCase() + part.slice(1);
      }
      return part;
    })
    .join(" / ");

  return (
    <div className="">
      <div
        className="w-full h-48 text-center flex flex-col items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(https://i.ibb.co/6ggRm25/smile-bridge-woman-resort-bungalow-1.jpg)`,
          backgroundSize: "cover",  
          backgroundPosition: "center",  
          backgroundRepeat: "no-repeat",
          color: "#fff",
        }}
      >
        <h2 className="text-4xl font-bold">Join Us Now!</h2>
        <h6 className="text-lg font-bold pt-1">
          Home{" "}
          <span className="text-sky-500">{formattedPathName}</span>
        </h6>
      </div>
    </div>
  );
};

export default Banner;