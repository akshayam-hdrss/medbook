"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/ui/Header";
import BackButton from "@/components/ui/BackButton";
import { getOffers } from "@/firebase/firestore/offers";

export default function Page() {
  const [offers, setOffers] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const data = await getOffers();
      setOffers(data);
    };
    fetch();
  }, []);
  return (
    <div>
      <Header />
      <main>
        <BackButton />
        <div className="px-8">
          <h1 className="font-koulen text-grey text-3xl">REWARD COUPONS</h1>
          <div className="grid gap-2 pt-5">
            {offers &&
              offers.map((doc, index) => (
                <div className="flex justify-center" key={index}>
                  <img src={doc.photo} alt="" className="max-w-[300px] md:max-w-[500px]" />
                </div>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
}
