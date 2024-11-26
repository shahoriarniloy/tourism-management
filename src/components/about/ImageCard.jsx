import React from 'react';

export default function ImageCard() {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="relative w-full lg:mx-32 md:h-3/4 overflow-hidden rounded-lg">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/S2NDPhOeSfI?si=aI9q_JKv-p_WewVe"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="object-cover block rounded-tl-lg rounded-tr-lg"
        ></iframe>
      </div>
    </div>
  );
}
