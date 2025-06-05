"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/ui/Header";
import BackButton from "@/components/ui/BackButton";
import Footer from "@/components/ui/Footer";
import { getCharities, getCharity } from "@/firebase/firestore/charity";
import YoutubeEmbed from "./ui/YoutubeEmbed";
function CharityPage({ id }) {
  const [data, setData] = useState();
  const [amount, setAmount] = useState();
  const handleUPIPayment = (amount) => {
    const upiId = data && data.upiId; // Replace with your charity's UPI ID
    const name = data && data.upiName; // Replace with your charity's name
    const url = `upi://pay?pa=${encodeURIComponent(
      upiId
    )}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR`;
    // Redirect to UPI payment
    console.log(url);
    window.location.href = url;
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await getCharity(id);
      setData(res);
    };
    fetch();
  });

  return (
    <div>
      <Header />
      <BackButton />
      {data && (
        <div className="p-6 lg:px-20 px-8">
          <img
            src={data.background}
            alt=""
            className="w-full mx-auto max-w-[600px]"
          />
          <div className="mx-auto mt-[-80px]">
            <img
              src={data.profile}
              alt=""
              className="w-[150px] rounded-full mx-auto"
            />
          </div>
          <div className="pt-5">
            <h1 className="font-semibold lg:text-3xl text-xl text-center">
              {data.name}
            </h1>
            <h5 className="text-justify py-3">{data.description}</h5>
          </div>
          <YoutubeEmbed embedId={data.video} />
          <div className="pt-5">
            <h1>Choose amount</h1>
            <div className="grid gap-3 pt-5">
              {/* <h1
                onClick={() => handleUPIPayment(100)}
                className={
                  "bg-gray-200 hover:bg-kaavi/20 rounded-md text-center py-1.5"
                }
              >
                100
              </h1>
              <h1
                onClick={() => handleUPIPayment(200)}
                className={
                  "bg-gray-200 hover:bg-kaavi/20 rounded-md text-center py-1.5"
                }
              >
                200
              </h1> */}
              <input
                type="text"
                placeholder="₹50+"
                className="border border-kaavi pr-4 pl-1 py-2 rounded-md"
                onChange={(e) => setAmount(e.target.value)}
              />
              <h1
                className="bg-kaavi text-white rounded-md text-center py-2"
                onClick={() => handleUPIPayment(amount)}
              >
                Donate
              </h1>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default CharityPage;
