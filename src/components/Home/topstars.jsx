"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const topDoctors = [
  { name: "Dr. Priya Sharma", rating: 4.8, image: "/ramdass.png" },
  { name: "Dr. Arjun Reddy", rating: 4.7, image: "/ramdass.png" },
  { name: "Dr. Meena Rao", rating: 4.9, image: "/ramdass.png" },
  { name: "Dr. Anil Kapoor", rating: 4.6, image: "/ramdass.png" },
  { name: "Dr. Leena Joseph", rating: 4.8, image: "/ramdass.png" },
  { name: "Dr. Raj Malhotra", rating: 4.5, image: "/ramdass.png" },
];

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="flex gap-0.5 text-yellow-400">
      {Array(fullStars).fill(0).map((_, i) => (
        <FaStar key={`full-${i}`} />
      ))}
      {hasHalf && <FaStarHalfAlt key="half" />}
      {Array(emptyStars).fill(0).map((_, i) => (
        <FaRegStar key={`empty-${i}`} />
      ))}
    </div>
  );
};

export default function TopStars() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative px-6 md:px-14 py-16 bg-gradient-to-b from-blue-50 to-white">
      {/* <h2 className="text-4xl font-extrabold text-center text-blue-900 mb-12 tracking-tight">
        Meet Our Top-Rated Doctors
      </h2> */}

      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hover:bg-blue-100 transition"
        onClick={() => scroll("left")}
      >
        <IoIosArrowBack size={24} />
      </button>

      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hover:bg-blue-100 transition"
        onClick={() => scroll("right")}
      >
        <IoIosArrowForward size={24} />
      </button>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 pb-4 scroll-smooth snap-x snap-mandatory scrollbar-hide"
      >
        {topDoctors.map((doctor, index) => (
          <div
            key={index}
            className="min-w-[260px] snap-start bg-white rounded-3xl shadow-md hover:shadow-xl transition-transform duration-300 flex-shrink-0"
          >
            <div className="flex flex-col items-center p-6">
              <div className="relative">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  width={100}
                  height={100}
                  className="rounded-full border-4 border-white shadow-lg object-cover"
                />
                <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-[11px] font-semibold px-2 py-0.5 rounded-full shadow">
                  {doctor.rating.toFixed(1)} ★
                </div>
              </div>

              <h3 className="mt-4 text-lg font-semibold text-gray-900 text-center">
                {doctor.name}
              </h3>

              <div className="mt-2">{renderStars(doctor.rating)}</div>
              <p className="text-gray-500 text-xs mt-1">{doctor.rating} / 5.0</p>

              <button className="mt-4 px-5 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-all">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
