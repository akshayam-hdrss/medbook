"use client";
import React, { useState, useEffect } from "react";
import { getName } from "@/firebase/firestore/servicesProducts";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import YoutubeEmbed from "@/components/ui/YoutubeEmbed";
import BackButton from "@/components/ui/BackButton";
import Link from "next/link";
import { getYt } from "@/firebase/firestore/servicesyt";
import { getServiceAds } from "@/firebase/firestore/advertisements";
import Advertisement from "@/components/ui/Advertisement";
import { subscribeToServicesAndProducts } from "@/firebase/firestore/servicesProducts";
import ServiceCard from "@/components/ui/ServiceCard";

function ProductsLevel2({ id, secondid }) {
  const [data, setData] = useState();
  const [ads, setAds] = useState();
  const [capitalized, setCapitalized] = useState();
  const [link, setLink] = useState();
  useEffect(() => {
    const fetch = async () => {
      const capitalized = await getName(null, id, secondid, "products");
      setCapitalized(capitalized);
      const link = await getYt("products", null, id, secondid);
      setLink(link);
      const ads = await getServiceAds("products", null, id, secondid, null);
      setAds(ads);
    };
    const unsubscribe = subscribeToServicesAndProducts(
      setData,
      secondid,
      id,
      "products"
    );
    fetch();
    return () => {
      unsubscribe();
    };
  });
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
          <div className="grid grid-cols-3 gap-y-10 gap-x-10 items-center justify-center">
            {data &&
              data.map((item) => (
                <ServiceCard
                  name={item.name}
                  url={item.iconUrl}
                  slug={`/products/${encodeURIComponent(
                    id
                  )}/${encodeURIComponent(secondid)}/${encodeURIComponent(
                    item.id
                  )}`}
                />
              ))}
          </div>
        </div>
      </div>
      <YoutubeEmbed embedId={link} />
      <Footer />
    </div>
  );
}

export default ProductsLevel2;