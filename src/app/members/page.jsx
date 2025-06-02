"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import BackButton from "@/components/ui/BackButton";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { FaCircleArrowRight } from "react-icons/fa6";

import {
  getDistrictLeaders,
  getLeadersDistrict,
  getStateLeaders,
} from "@/firebase/firestore/leaders";
import {
  collection,
  query,
  limit,
  startAfter,
  getDocs,
  orderBy,
  endBefore,
  getFirestore,
} from "firebase/firestore";
import { app } from "@/firebase/config"; // Ensure you import your Firebase config
const db = getFirestore(app);

function MembersPage() {
  const [stateLeaders, setStateLeaders] = useState();
  const [districtLeaders, setDistrictLeaders] = useState();
  const [district, setDistrict] = useState();
  const [selectedDistrict, setSelectedDistrict] = useState();

  const [lastDoc, setLastDoc] = useState(null);
  const [firstDoc, setFirstDoc] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  const handleNextPage = async () => {
    if (!lastDoc) return;

    const q = query(
      collection(db, "members/state/statecol"),
      orderBy("sno"),
      startAfter(lastDoc),
      limit(pageSize)
    );
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));

    setStateLeaders(data);
    setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
    setFirstDoc(querySnapshot.docs[0]);
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = async () => {
    if (currentPage === 1) return;

    const q = query(
      collection(db, "members/state/statecol"),
      orderBy("sno"),
      endBefore(firstDoc),
      limit(pageSize)
    );
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));

    setStateLeaders(data);
    setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
    setFirstDoc(querySnapshot.docs[0]);
    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      const q = query(
        collection(db, "members/state/statecol"),
        orderBy("sno"),
        limit(pageSize)
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));

      setStateLeaders(data);
      setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
      setFirstDoc(querySnapshot.docs[0]);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data2 = await getDistrictLeaders(selectedDistrict);
      setDistrictLeaders(data2);

      const data3 = await getLeadersDistrict();
      setDistrict(data3);
    };

    fetchData();
  }, [selectedDistrict]);

  return (
    <div>
      <Header />
      <BackButton />
      <div className="p-6 overflow-hidden">
        <h1 className="font-koulen text-3xl text-grey">HDRSS - MEMBERS</h1>
        <h2 className="text-grey font-bold text-xl mt-3 mb-6">
          State Level Leaders
        </h2>
        <div className="grid grid-cols-2 gap-x-5 gap-y-8">
          {stateLeaders &&
            stateLeaders.map((doc, index) => (
              <div
                key={index}
                className="flex flex-col items-center overflow-hidden"
              >
                <div className="w-[130px] h-fit mb-1">
                  <img
                    src={doc.data.profile}
                    alt="Profile"
                    className="object-cover aspect-[4/5] border border-kaavi"
                  />
                </div>
                <p className="font-bold text-center text-lg">{doc.data.name}</p>
                <p className="text-center">{doc.data.position}</p>
                <a
                  href={`tel:${doc.data.mobile}`}
                  className="text-grey text-center text-sm mt-1 font-medium"
                >
                  {doc.data.mobile}
                </a>
              </div>
            ))}
        </div>
        <div className="flex flex-row text-kaavi justify-center gap-x-6 mt-4 items-center">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            <FaCircleArrowLeft fontSize={25} />
          </button>
          <span className="font-bold text-2xl"> {currentPage}</span>
          <button
            onClick={handleNextPage}
            disabled={stateLeaders && stateLeaders.length < pageSize}
          >
            <FaCircleArrowRight fontSize={25} />
          </button>
        </div>
        <h2 className="text-xl text-grey font-bold mt-10 mb-4">
          District Level Leaders
        </h2>
        <select
          name="district"
          id="district"
          className="border border-grey text-kaavi font-bold p-1 rounded-lg mb-6"
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
        >
          <option value="">Select District</option>
          {district &&
            district.map((doc, index) => (
              <option key={index} value={doc.id}>
                {doc.data.name}
              </option>
            ))}
        </select>
        <div className="grid grid-cols-2 gap-x-5 gap-y-8">
          {districtLeaders &&
            districtLeaders.map((doc, index) => (
              <a
                href={`tel:${doc.data.mobile}`}
                key={index}
                className="flex flex-col items-center"
              >
                <div className="w-[130px] h-fit mb-1">
                  <img
                    src={doc.data.profile}
                    alt="Profile"
                    className="object-cover aspect-[4/5] border border-kaavi"
                  />
                </div>
                <p className="font-bold text-center text-lg">{doc.data.name}</p>
                <p className="text-center">{doc.data.position}</p>
              </a>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MembersPage;
