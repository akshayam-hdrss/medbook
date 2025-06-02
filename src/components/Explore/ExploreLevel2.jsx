"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import YoutubeEmbed from "@/components/ui/YoutubeEmbed";
import BackButton from "@/components/ui/BackButton";
import Link from "next/link";
import Advertisement from "@/components/ui/Advertisement";
import { subscribeToServicesAndProducts } from "@/firebase/firestore/servicesProducts";
import { getName } from "@/firebase/firestore/servicesProducts";
import { getServiceAds } from "@/firebase/firestore/advertisements";
import { getYt } from "@/firebase/firestore/servicesyt";

function ExploreLevel2({ id, secondid }) {
  const [data, setData] = useState();
  const [capitalized, setCapitalized] = useState();
  const [ads, setAds] = useState();
  const [link, setLink] = useState();

  useEffect(() => {
    const fetch = async () => {
      const name = getName(null, id, secondid, "explore");
      setCapitalized(name);
      const ad = await getServiceAds("explore", null, id, secondid, null);
      setAds(ad);
      const yt = await getYt("explore", null, id, secondid);
      setLink(yt);
    };
    const unsubscribe = subscribeToServicesAndProducts(
      setData,
      secondid,
      id,
      "explore"
    );
    fetch();
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <Header />
      <BackButton />
      <Advertisement ads={ads} />
      <div className="p-6 py-20">
        <h1 className="font-bold text-2xl md:text-4xl text-center pb-20">
          {capitalized}
        </h1>
        <div className="grid grid-cols-2 gap-y-10 gap-x-4 items-center justify-center">
          {data && data.map((doc, index) => (
            <Link
              href={`/explore/${id}/${secondid}/${doc.id}`}
              key={index}
              className="flex items-center justify-center bg-[#F4F5F5] rounded-xl h-20 md:h-28 md:gap-x-6 p-6 px-3"
            >
              <div className="w-1/3 md:w-1/5 lg:w-1/6 h-fit mr-3">
                <img
                  src={doc.iconUrl}
                  alt="Icon"
                  className="object-scale-down aspect-square"
                />
              </div>
              <h1 className="w-2/3 md:w-4/5 lg:w-5/6 mr-0">{doc.name}</h1>
            </Link>
          ))}
        </div>
      </div>
      <YoutubeEmbed embedId={link} />
      <Footer />
    </div>
  );
}

export default ExploreLevel2;
