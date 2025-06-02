"use client";
import React from "react";
import { Carousel } from "@material-tailwind/react";

function AdCarousel({ ads }) {
  return (
    <div className="md:px-20">
      <Carousel
        autoplay="true"
        loop="true"
        className="rounded-xl h-56 w-[95%] md:w-full md:h-[70vh]  z-10 mt-8 ml-2"
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
      >
        {ads &&
          ads.map((ad, index) => (
            <img
              src={ad}
              alt={`ad ${index}`}
              className="h-full w-full object-cover md:object-contain"
            />
          ))}
      </Carousel>
    </div>
  );
}

export default AdCarousel;
