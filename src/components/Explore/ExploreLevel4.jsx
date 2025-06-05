"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import BackButton from "@/components/ui/BackButton";
import { getServiceAndProductDocs } from "@/firebase/firestore/servicesProducts";
import YoutubeEmbed from "@/components/ui/YoutubeEmbed";

function ExploreLevel4({ id, secondid, thirdid, fourthid }) {
  const [data, setData] = useState();
  useEffect(() => {
    const fetch = async () => {
      const data = await getServiceAndProductDocs(
        id,
        secondid,
        thirdid,
        fourthid,
        "explore"
      );
      setData(data);
    };
    fetch();
  });
  return (
    <div>
      <Header />
      <BackButton />
      <div className="relative">
        <img
          src={data && data.backgroundPhoto}
          alt="Background Photo"
          className="w-screen z-0"
        />
        <img
          src={data && data.photo}
          alt="Profile"
          className="z-10 absolute -bottom-8 left-[40%] rounded-md object-cover h-[100px] w-[100px] md:w-[200px] md:h-[200px] mx-auto"
        />
      </div>

      <h1 className="font-bold text-2xl mt-10 p-6">{data && data.name}</h1>
      <h1 className="px-8 text-xl font-medium">About</h1>
      <p className="p-8 pt-4 text-justify">{data && data.description}</p>
      <h1 className="px-8 text-xl font-medium">Description</h1>
      <p className="p-8 pt-4 text-justify">{data && data.fullDescription}</p>
      <h1 className="px-8 text-xl font-medium pb-6">Video</h1>
      <YoutubeEmbed embedId={data && data.video} />
      <Footer />
    </div>
  );
}

export default ExploreLevel4;
