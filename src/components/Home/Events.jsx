import React from "react";
import { useState, useEffect } from "react";
import { getEvents } from "@/firebase/firestore/events";
import Image from "next/image";
import Link from "next/link";

function Events() {
  const [events, setEvents] = useState();

  useEffect(() => {
    const fetchdata = async () => {
      const data = await getEvents();
      setEvents(data);
    };
    fetchdata();
  }, []);
  return (
    <div className="p-6 relative overflow-hidden">
      <Image
        src="/om.svg"
        alt="om"
        width={300}
        height={300}
        className="rotate-45 opacity-[0.04] absolute right-7 -top-4 -z-10"
      ></Image>
      <h1 className="text-grey font-koulen text-4xl mb-4">Events</h1>
      <div className="border border-grey md:border-none mx-auto w-[80vw] md:w-full rounded-md bg-white md:bg-inherit">
        {events && (
          <>
            <div className="md:grid grid-cols-7">
              <div className="bg-white col-span-4">
                <img
                  src={events[0].data.pfp}
                  alt="event image"
                  className="w-full object-contain m-auto"
                />
              </div>
              <div className="col-span-3 px-5 py-5 md:py-5 flex flex-col justify-between">
                <p>{events[0].data.title.slice(0, 100)}</p>
                <div className="flex justify-between mt-2 items-center">
                  <h1 className="font-bold">{events[0].data.date}</h1>
                  <Link
                    href={`/events/${events[0].id}`}
                    className="py-1 px-3 rounded-md bg-kaavi text-white"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <a
        href="/all-events"
        className="py-1 px-3 bg-kaavi text-white my-5 mt-8 rounded-md block mx-auto w-fit"
      >
        Load More
      </a>
    </div>
  );
}

export default Events;
