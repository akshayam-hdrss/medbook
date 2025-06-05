"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import YoutubeEmbed from "@/components/ui/YoutubeEmbed";
import BackButton from "@/components/ui/BackButton";
import Link from "next/link";
import { getServiceAds } from "@/firebase/firestore/advertisements";
import Advertisement from "@/components/ui/Advertisement";
import { getYt } from "@/firebase/firestore/servicesyt";
import Image from "next/image";
import { subscribeToServicesAndProducts } from "@/firebase/firestore/servicesProducts";
import { getName } from "@/firebase/firestore/servicesProducts";
import ServiceCard from "@/components/ui/ServiceCard";

function ServiceLevel1({ id }) {
  const [data, setData] = useState();
  const [ads, setAds] = useState();
  const [capitalized, setCapitalized] = useState();
  const [link, setLink] = useState();
  useEffect(() => {
    const fetch = async () => {
      const ads = await getServiceAds("products", null, null, id, null);
      setAds(ads);
      const capitalized = getName(null, null, id, "products");
      setCapitalized(capitalized);
      const link = await getYt("products", null, null, id);
      setLink(link);
    };
    const unsubscribe = subscribeToServicesAndProducts(
      setData,
      id,
      null,
      "products"
    );
    fetch();
    return () => {
      unsubscribe();
    };
  }, []);
  console.log(data);
  return (
    <div>
      <Header />
      <BackButton />
      <Advertisement ads={ads} />
      <div className="p-6 py-20 relative overflow-hidden">
        <h1 className="text-center font-bold text-2xl md:text-4xl pb-10">
          {capitalized}
        </h1>
        <Image
          src="/om.svg"
          alt="om"
          width={300}
          height={300}
          className="rotate-45 opacity-[0.04] absolute left-16 -top-2 -z-10"
        ></Image>
        <div className="grid grid-cols-3 gap-y-10 gap-x-10 items-center justify-center">
          {data &&
            data.map((item) => (
              <ServiceCard
                name={item.name}
                url={item.iconUrl}
                slug={`/products/${id}/${item.id}`}
              />
            ))}
        </div>
      </div>
      <YoutubeEmbed embedId={link} />
      <Footer />
    </div>
  );
}

export default ServiceLevel1;
