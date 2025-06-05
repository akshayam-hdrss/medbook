"use client";
import React from "react";
import { useState, useEffect } from "react";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import BackButton from "@/components/ui/BackButton";
import YoutubeEmbed from "@/components/ui/YoutubeEmbed";
import { subscribeToServicesAndProducts } from "@/firebase/firestore/servicesProducts";
import { getServiceAds } from "@/firebase/firestore/advertisements";
import { getYt } from "@/firebase/firestore/servicesyt";
import ServiceCard from "@/components/ui/ServiceCard";
import Navbar from "@/components/Navbar";
import { Carousel } from "@material-tailwind/react";

function Products() {
  const [data, setData] = useState(null);
  const [ads, setAds] = useState([]);
  const [link, setLink] = useState();
  useEffect(() => {
    const unsubscribe = subscribeToServicesAndProducts(
      setData,
      null,
      null,
      "products"
    );
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    const fetch = async () => {
      const ads = await getServiceAds("products", null, null, null, null);

      setAds(ads);

      const link = await getYt("products", null, null, null);
      setLink(link);
    };
    fetch();
  }, []);

  return (
    <div>
      <div className="fixed w-full top-0 z-[50]">
        <Header />
      </div>
      <div className="grid lg:grid-cols-4 relative z-[0]">
        <Navbar />
        <div className="col-span-3 pt-[70px]">
          <BackButton />
          <div>
            <Carousel>
              {ads &&
                ads.map((ad, index) => (
                  <div
                    key={index}
                    className="max-h-[300px] md:max-h-[500px] w-full  mx-auto overflow-hidden "
                  >
                    <img
                      src={ad}
                      alt="advertisement"
                      className="w-full object-contain aspect-video"
                    />
                  </div>
                ))}
            </Carousel>
          </div>
          <div className="mt-12 p-6 text-center">
            <h1 className="font-koulen uppercase text-4xl text-grey">
              products
            </h1>
            <div className="grid grid-cols-3 gap-y-10 gap-x-10 mt-8">
              {data &&
                data.map((item) => (
                  <ServiceCard
                    name={item.id}
                    url={item.iconUrl}
                    slug={`/products/${item.id}`}
                  />
                ))}
            </div>
          </div>
          <YoutubeEmbed embedId={link} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Products;
