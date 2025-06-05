"use client";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { GrLocation } from "react-icons/gr";
import Link from "next/link";
import { getDistrict } from "@/firebase/firestore/servicesProducts";
import { updateUserDocDistrict } from "@/firebase/firestore/user";
import { onAuthStateChanged } from "firebase/auth";
import auth from "@/firebase/config";

function SelectDistrict() {
  const [locations, setLocations] = useState([]);
  const [user, setUser] = useState(null);

  const handleLocation = async (district) => {
    if (user) {
      await updateUserDocDistrict(user, district);
    }
  };

  useEffect(() => {
    const fetchdata = async () => {
      const data = await getDistrict();
      setLocations(data);
    };
    fetchdata();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="p-8">
      <div className="flex items-center mb-8">
        <Link href="/">
          <IoIosArrowDown fontSize={30} />
        </Link>
        <h1 className="text-xl ml-3 font-bold">Select District</h1>
      </div>
      <div className="flex bg-white rounded-xl items-center shadow-[100px_100px_80px_rgba(0,0,0,0.08)] p-3">
        <IoSearch fontSize={25} className="text-kaavi" />
        <input
          type="text"
          placeholder="Search for your District"
          className="bg-inherit ml-5 text-lg"
        />
      </div>
      <div className="p-6">
        {locations &&
          locations.map((value, index) => (
            <div
              className="flex items-center my-4"
              key={index}
              onClick={() => handleLocation(value)}
            >
              <GrLocation className="m-3" fontSize={25} />
              <button className="ml-2 text-xl font-medium">{value}</button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default SelectDistrict;
