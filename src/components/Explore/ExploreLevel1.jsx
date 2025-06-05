"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Advertisement from "@/components/ui/Advertisement";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import YoutubeEmbed from "@/components/ui/YoutubeEmbed";
import BackButton from "@/components/ui/BackButton";
import Link from "next/link";
import { subscribeToServicesAndProducts } from "@/firebase/firestore/servicesProducts";
import { getName } from "@/firebase/firestore/servicesProducts";
import { getServiceAds } from "@/firebase/firestore/advertisements";
import { getYt } from "@/firebase/firestore/servicesyt";

function ExploreLevel1({ id }) {
  const [data, setData] = useState();
  const [capitalized, setCapitalized] = useState();
  const [ads, setAds] = useState();
  const [link, setLink] = useState();
  useEffect(() => {
    const fetch = async () => {
      const name = getName(null, null, id, "explore");
      setCapitalized(name);
      const ad = await getServiceAds("explore", null, null, id, null);
      setAds(ad);
      const yt = await getYt("explore", null, null, id);
      setLink(yt);
    };
    const unsubscribe = subscribeToServicesAndProducts(
      setData,
      id,
      null,
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
      <div className="p-6 py-20 relative overflow-hidden">
        <h1 className="text-center font-bold text-3xl md:text-4xl pb-10">
          {capitalized}
        </h1>
        <Image
          src="/om.svg"
          alt="om"
          width={300}
          height={300}
          className="rotate-45 opacity-[0.04] absolute left-16 -top-2 -z-10"
        ></Image>
        <div className="grid grid-cols-2 gap-y-10 gap-x-4 items-center justify-center">
          {data && data.map((doc, index) => (
            <Link
              href={`/explore/${id}/${doc.id}`}
              key={index}
              className="flex flex-col items-center border border-[#828282] gap-x-6 p-0 justify-center bg-[#F4F5F5] rounded-xl h-60"
            >
              <img
                src={doc.iconUrl}
                alt="Icon"
                className="object-cover rounded-t-xl h-2/3 w-full"
              />
              <h1 className="h-1/3 text-lg py-4 px-2 text-center md:text-xl font-medium mr-0">
                {doc.name}
              </h1>
            </Link>
          ))}
        </div>
      </div>
      <YoutubeEmbed embedId={link} />
      <Footer />
    </div>
  );
}

export default ExploreLevel1;
