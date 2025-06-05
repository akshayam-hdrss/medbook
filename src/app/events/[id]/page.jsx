import BackButton from "@/components/ui/BackButton";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import YoutubeEmbed from "@/components/ui/YoutubeEmbed";
import { getEventData, getEvents } from "@/firebase/firestore/events";
import React from "react";
import AdCarousel from "@/components/ui/AdCarousel";
import Navbar from "@/components/Navbar";

export async function generateStaticParams() {
  const result = await getEvents();
  return result.map((event) => ({ id: event.id }));
}

async function eventspage({ params }) {
  const { id } = params;
  const events = await getEventData(id);
  console.log(events);
  return (
    <div>
      <div className="fixed w-full top-0 z-[50]">
        <Header />
      </div>
      {/* <BackButton />
      {events && (
        <div key={events.id} className="event-card px-6">
          <h1 className="font-bold text-xl mt-6 mb-2">{events.title}</h1>
          <h2 className="font-medium">{events.date}</h2>
          <img className="my-4" src={events.pfp} alt="" />
          <p>{events.details}</p>
          <AdCarousel ads={events.images} />
          <YoutubeEmbed embedId={events.video} />
        </div>
      )} */}
      <div className="grid lg:grid-cols-4 grid-cols-1 relative z-[0]">
        <Navbar />
        <div className="col-span-3 pt-[70px]">
          <BackButton />
          {events && (
            <div key={events.id} className="event-card px-6">
              <h1 className="font-bold text-xl mt-6 mb-2">{events.title}</h1>
              <h2 className="font-medium">{events.date}</h2>
              <img className="my-4" src={events.pfp} alt="" />
              <p>{events.details}</p>
              <AdCarousel ads={events.images} />
              <YoutubeEmbed embedId={events.video} />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default eventspage;
