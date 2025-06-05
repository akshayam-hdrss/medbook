"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { subscribeToServicesAndProducts } from "@/firebase/firestore/servicesProducts";

function ServiceCard({ name, url, slug }) {
  let serviceName = slug.split("/")[2];
  let productName = slug.split("/")[1];

  const [data, setData] = useState();

  useEffect(() => {
    const unsubscribe = subscribeToServicesAndProducts(
      setData,
      serviceName,
      null,
      "services"
    );
    return () => {
      unsubscribe();
    };
  }, []);

  const iconUrl = url
    ? url
    : "https://via.placeholder.com/100?text=No+Image"; // default icon

  const targetSlug =
    productName === "products"
      ? slug
      : data && data.length > 0
      ? `${slug}/${data[0].id}`
      : slug; // fallback if no nested data

  return (
    <Link
      href={targetSlug}
      className="bg-gradient-to-b m-auto from-[#FCEDED] to-[#F6F6F6] text-center flex flex-col justify-center items-center w-[100px] h-[100px] bg-white border-2 border-solid border-[#909090] rounded-2xl cursor-pointer z-30"
    >
      <img src={iconUrl} alt={name} width={40} height={40} />
      <p
        className="font-medium text-md capitalize mt-1"
        style={{ wordBreak: "break-word" }}
      >
        {name || "No Name"}
      </p>
    </Link>
  );
}

export default ServiceCard;
