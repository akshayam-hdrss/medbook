"use client";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { GrLocation } from "react-icons/gr";
import Link from "next/link";
import {getLocation} from "@/firebase/firestore/servicesProducts";
import { updateUserDoc } from "@/firebase/firestore/user";
import { onAuthStateChanged } from "firebase/auth";
import auth from "@/firebase/config";

function SelectLocation() {
  const [locations, setLocations] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state

  const handleLocation = async (district) => {
    if (user) {
      await updateUserDoc(user, district);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getLocation();
        setLocations(data);
      } catch (error) {
        console.error("Error fetching locations:", error);
        setError("Failed to fetch locations.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);
  console.log(user && user);
  return (
    <div className="p-8">
      <div className="flex items-center mb-8">
        <Link href="/">
          <IoIosArrowDown fontSize={30} />
        </Link>
        <h1 className="text-xl ml-3 font-bold">Select Location</h1>
      </div>
      <div className="flex bg-white rounded-xl items-center shadow-[100px_100px_80px_rgba(0,0,0,0.08)] p-3">
        <IoSearch fontSize={25} className="text-kaavi" />
        <input
          type="text"
          placeholder="Search for your city"
          className="bg-inherit ml-5 text-lg"
        />
      </div>
      <div className="p-6">
        {loading ? (
          <p>Loading locations...</p>
        ) : (
          locations.map((district, index) => (
            <div
              key={index}
              className="flex items-center my-4 cursor-pointer"
              onClick={() => handleLocation(district)}
            >
              <GrLocation className="m-3" fontSize={25} />
              <p className="ml-2 text-xl font-medium">{district}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SelectLocation;
