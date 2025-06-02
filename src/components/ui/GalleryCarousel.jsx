"use client";
import { Carousel } from "@material-tailwind/react";
import React from "react";

function GalleryCarousel({ data }) {
  return (
    <Carousel
      autoplay="true"
      loop="true"
      className="rounded-xl h-52 w-[95%] z-10 mt-4"
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
      {data && data.map((item, i) => (
        <img
          src={item}
          key={i}
          alt="image 1"
          className="h-full w-full object-cover"
        />
      ))}
    </Carousel>
  );
}

export default GalleryCarousel;
