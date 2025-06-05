"use client";
import React, { useState, useEffect } from "react";
import { getName } from "@/firebase/firestore/servicesProducts";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import Link from "next/link";
import BackButton from "@/components/ui/BackButton";
import { getYt } from "@/firebase/firestore/servicesyt";
import { getServiceAds } from "@/firebase/firestore/advertisements";
import Advertisement from "@/components/ui/Advertisement";
import YoutubeEmbed from "@/components/ui/YoutubeEmbed";
import { subscribeToServiceAndProductDocs } from "@/firebase/firestore/servicesProducts";
import { MdOutlineCall } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";

function ProductsLevel3({ id, secondid, thirdid }) {
  const [data, setData] = useState();
  const [ads, setAds] = useState();
  const [capitalized, setCapitalized] = useState();
  const [link, setLink] = useState();

  useEffect(() => {
    const unsubscribe = subscribeToServiceAndProductDocs(
      setData,
      thirdid,
      secondid,
      id,
      "products"
    );
    const fetch = async () => {
      const capitalized = await getName(id, secondid, thirdid, "products");
      setCapitalized(capitalized);
      const link = await getYt("products", id, secondid, thirdid);
      setLink(link);
      const ads = await getServiceAds("products", id, secondid, thirdid, null);
      setAds(ads);
    };
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
      <div>
        <h1 className="font-bold text-2xl pb-20 p-6">{capitalized}</h1>

        {data &&
          data.map((item) => (
            <Link
              href={`/products/${encodeURIComponent(id)}/${encodeURIComponent(
                secondid
              )}/${encodeURIComponent(thirdid)}/${encodeURIComponent(item.id)}`}
              key={item.id}
              className="flex justify-start px-6 items-start border-b border-grey pb-3 mb-5 mx-0"
            >
              <div className="h-fit w-[130px] inline-block">
                <img
                  src={item.profile}
                  alt="Profile"
                  className=" rounded-xl object-cover aspect-[4/5]"
                />
              </div>
              <div className="flex flex-col justify-between items-center w-[70%]">
                <h1 className="font-bold text-xl">{item.name}</h1>
                <h2 className="text-lg font-medium">{item.businessname}</h2>
                <p className="font-medium text-grey mt-0 pt-0">{item.area}</p>
                <div className="flex justify-evenly gap-x-2 ml-4 items-center mt-5">
                  <a
                    className="px-4 py-2 rounded-md bg-kaavi text-white"
                    href={`tel:${item.mobile}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MdOutlineCall />
                  </a>
                  <a
                    className="px-4 py-2 rounded-md bg-green-600 text-white"
                    href={`https://wa.me/${item.whatsapp}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaWhatsapp />
                  </a>
                </div>
              </div>
            </Link>
          ))}
      </div>
      <YoutubeEmbed embedId={link} />
      <Footer />
    </div>
  );
}

export default ProductsLevel3;
