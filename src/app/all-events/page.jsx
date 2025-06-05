"use client";
import React, { useEffect, useState } from "react";
import BackButton from "@/components/ui/BackButton";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import { IoSearch } from "react-icons/io5";
import { getEvents } from "@/firebase/firestore/events";
import Link from "next/link";

function Events() {
  const [events, setEvents] = useState();
  useEffect(() => {
    const fetchevents = async () => {
      const data = await getEvents();
      setEvents(data);
    };
    fetchevents();
  });

  return (
    <div>
      <Header />
      <BackButton />
      <div className="p-6 flex justify-between items-center">
        <div>
          <h1 className="font-koulen text-4xl uppercase text-grey">Events</h1>
          <h2 className="text-lg font-bold text-grey">May 2024</h2>
        </div>
        {/* <div className="p-2 border border-black w-fit h-fit rounded-xl">
          <IoSearch fontSize={30} className="text-kaavi" />
        </div> */}
      </div>
      <div>
        {events &&
          events.map((event, index) => (
            <>
              <Link
                href={`/events/${event.id}`}
                key={index}
                className="md:grid grid-cols-7 block mx-10 my-4 border border-kaavi"
              >
                <div className="bg-white col-span-4">
                  <img
                    src={event.data.pfp}
                    alt="event image"
                    className="w-full object-contain m-auto"
                  />
                </div>
                <div className="col-span-3 px-5 py-5 md:py-10 flex flex-col justify-between">
                  <p>{event.data.title.slice(0, 100)}</p>
                  <div className="flex justify-end">
                    <h1 className="py-1 px-3 rounded-md bg-kaavi text-white">
                      Read More
                    </h1>
                  </div>
                </div>
              </Link>
            </>
          ))}
      </div>

      <Footer />
    </div>
  );
}

export default Events;
