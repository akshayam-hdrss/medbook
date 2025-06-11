"use client";
import Image from "next/image";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdLocationOn } from "react-icons/md";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { useState, useEffect } from "react";
import ExploreCarousel from "@/components/ui/ExploreCarousel";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { getUser } from "@/firebase/firestore/user";
import Level1Services from "@/components/ui/Level1Services";
import { getStateLeaders } from "@/firebase/firestore/leaders";
import { getServiceAds } from "@/firebase/firestore/advertisements";
import auth from "@/firebase/config.js";
import { onAuthStateChanged } from "firebase/auth";
import News from "@/components/Home/News";
import Products from "@/components/Home/Products";
import Daily from "@/components/Home/Daily";
import { getNumberofComplaints } from "@/firebase/firestore/complaints";
import TopStars from "@/components/Home/topstars";
import AdCarousel from "@/components/ui/AdCarousel";

export default function Home() {
  const [randomData, setRandomData] = useState(null);
  const [ads, setAds] = useState([]);
  const [user, setUser] = useState(null);
  const [userDoc, setUserDoc] = useState(null);
  const [numberOfComplaints, setNumberOfComplaints] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const leaders = await getStateLeaders();
        setRandomData(leaders[0] || null);

        const serviceAds = await getServiceAds(null, null, null, null, "home");
        setAds(serviceAds || []);

        const complaints = await getNumberofComplaints();
        setNumberOfComplaints(complaints || 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const data = await getUser(currentUser.uid);
        setUserDoc(data);
      } else {
        setUserDoc(null);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[url('/bg.jpg')] bg-cover bg-center bg-no-repeat bg-fixed font-sans text-black">
      {/* Overlay for slight shading */}
      <div className="sticky top-0 z-50 shadow-md bg-white/90 backdrop-blur-md">
        <Header />
      </div>
      <main className="relative z-10 flex-1">
        <div>
          <AdCarousel ads={ads} />

        </div>
        

        <section className="py-5">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-16">
              <h2 className="text-5xl font-extrabold mb-4 tracking-tight leading-tight">
                Explore <br className="hidden sm:inline" />
              </h2>
              <Link
                href="/services"
                className="inline-flex items-center px-7 py-3.5 bg-white text-orange-600 border border-orange-500 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:bg-orange-600 hover:text-white group text-lg"
              >
                View All Services
                <IoIosArrowForward className="ml-2 text-xl group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 px-4 sm:px-6 md:px-10">
              <Level1Services />
            </div>
          </div>
        </section>

        <section className="py-10 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-extrabold mb-4 tracking-tight leading-tight">
              Topstars <br className="hidden sm:inline" />
            </h2>
            <TopStars />
          </div>
        </section>

        <section className="py-10 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
              <h2 className="text-5xl font-extrabold mb-4 tracking-tight leading-tight">
                Health Products <br className="hidden sm:inline" />
              </h2>
              <Link
                href="/products"
                className="flex items-center text-orange-600 hover:text-orange-800 font-semibold transition-colors group"
              >
                View all
                <IoIosArrowForward className="ml-2 text-xl group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <Products />
          </div>
        </section>

        <section className="py-10 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <Daily />
          </div>
        </section>

        <section className="py-10 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-extrabold mb-4 tracking-tight leading-tight">
              Explore More Categories <br className="hidden sm:inline" />
            </h2>
            <ExploreCarousel />
          </div>
        </section>

        <section className="py-10 px-6 md:px-12">
          <h2 className="text-5xl font-extrabold mb-4 tracking-tight leading-tight">
            Complaints and Feedback <br className="hidden sm:inline" />
          </h2>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 flex justify-center">
              <Image
                src="/complaint.avif"
                alt="Complaint illustration"
                width={600}
                height={450}
                className="rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="md:w-1/2 text-center md:text-left">
              <h2 className="text-4xl font-extrabold mb-6 leading-tight">
                Have a Concern? <br /> Report Social Complaints
              </h2>
              <p className="text-xl text-gray-800 mb-8 max-w-md mx-auto md:mx-0">
                Report issues in your area to our dedicated team. Your voice is
                crucial in building a better, more responsive community.
              </p>
              <div className="flex justify-center md:justify-start gap-8 mb-10">
                <div className="bg-white p-7 rounded-2xl shadow-xl text-center border border-blue-100">
                  <span className="text-5xl font-extrabold text-orange-600 block">
                    {numberOfComplaints}+
                  </span>
                  <p className="text-gray-700 mt-3 text-lg">
                    Complaints Registered
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start">
                <Link
                  href="/complaint"
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-bold text-lg text-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Report an Issue
                </Link>
                <Link
                  href="/all-complaints"
                  className="bg-white hover:bg-gray-50 text-orange-600 px-8 py-4 rounded-xl font-bold text-lg text-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border border-orange-200"
                >
                  View All Complaints
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
         
    </div>
  );
}
