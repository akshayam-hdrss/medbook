"use client";
import Image from "next/image";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdLocationOn } from "react-icons/md";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { useState, useEffect } from "react";
import ExploreCarousel from "@/components/ui/ExploreCarousel";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { getUser } from "@/firebase/firestore/user";
import Level1Services from "@/components/ui/Level1Services";
import { getStateLeaders } from "@/firebase/firestore/leaders";

import {
  getHomeAdvertisements,
  getServiceAds,
} from "@/firebase/firestore/advertisements";
import auth from "@/firebase/config.js";
import { onAuthStateChanged } from "firebase/auth";
import AdCarousel from "@/components/ui/AdCarousel";
import News from "@/components/Home/News";
import Navbar from "@/components/Navbar";
import Products from "@/components/Home/Products";
import Daily from "@/components/Home/Daily";
import { getNumberofComplaints } from "@/firebase/firestore/complaints";
export default function Home() {
  const [randomData, setRandomData] = useState();
  const [ads, setAds] = useState();
  const [user, setUser] = useState();
  const [userDoc, setUserDoc] = useState();
  const [numberOfComplaints, setNumberOfComplaints] = useState();
  useEffect(() => {
    const fetchdata = async () => {
      const data = await getStateLeaders();
      const random = data[0];
      setRandomData(random);
      const data2 = await getServiceAds(null, null, null, null, "home");
      setAds(data2);
      const no = await getNumberofComplaints();
      setNumberOfComplaints(no);
    };
    fetchdata();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const data = await getUser(currentUser.uid);
        setUserDoc(data);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <div className="fixed w-full top-0 z-[50]">
        <Header />
      </div>
      <div className="lg:grid lg:grid-cols-5 relative z-[0]">
        <Navbar />
        <div className="lg:col-span-4 lg:order-2 relative w-full pt-[70px] bg-[#FFFAF8]">
          {/* Hero Section */}

          <div
            style={{
              background:
                "linear-gradient(180deg, hsla(172, 73%, 94%, 1) 0%, hsla(18, 92%, 62%, 1) 100%)",
            }}
            className="relative pt-30 h-[350px] md:min-h-[500px] lg:h-screen pb-0 flex flex-row items-center justify-center z-0 "
          >
            {/* Location */}

            <Link
              href="/district"
              className="bg-white z-10 absolute top-5 left-2 px-2 py-2 flex items-center justify-around rounded-3xl cursor-pointer shadow-md"
            >
              <MdLocationOn fontSize={28} className="pr-1 text-[#E53700]" />
              <p className="font-bold text-secondary">
                {userDoc ? userDoc.district : "District"}
              </p>
              <RiArrowDropDownLine fontSize={30} />
            </Link>

            <Link
              href="/location"
              className="bg-white z-10 absolute top-5 right-2 px-2 py-2 flex items-center justify-around rounded-3xl cursor-pointer shadow-md"
            >
              <MdLocationOn fontSize={28} className="pr-1 text-[#E53700]" />
              <p className="font-bold text-secondary">
                {userDoc ? userDoc.location : " Select Location"}
              </p>
              <RiArrowDropDownLine fontSize={30} />
            </Link>
            <Image
              src="/temple-bells.png"
              alt="temple-bells"
              width={150}
              height={150}
              className="opacity-30 absolute top-0 right-0 z-0 md:w-[200px]"
            />
            <AdCarousel ads={ads} />
            <Image
              src="/ram-temple.png"
              alt="ram-temple"
              width={150}
              height={150}
              className="z-0 opacity-30 absolute left-0 bottom-0 md:w-[250px]"
            />
          </div>

          {/* Services Section */}

          <div className="bg-[#FFFAF8] text-black relative w-full h-max py-6 px-6 z-10 overflow-hidden rounded-[30px] -mt-10">
            <Image
              src="/om.svg"
              alt="om"
              width={300}
              height={300}
              className="rotate-45 md:w-[400px] opacity-5 absolute -right-7 -top-16 -z-10"
            />
            <div className="flex justify-between mb-8">
              <h1 className="font-koulen text-4xl text-grey ">Services</h1>
            </div>
            <div className="grid grid-cols-3 gap-y-10 gap-x-4 items-center justify-center">
              <Level1Services />
            </div>
            <div className="flex justify-end w-full pt-5 lg:pr-5">
              <div className="">
                <Link
                  href="/services"
                  className="flex flex-row justify-center bg-kaavi text-white font-semibold items-center w-fit mx-auto px-5 py-1.5 rounded-xl cursor-pointer"
                >
                  <p>See all</p>
                </Link>
              </div>
            </div>
          </div>

          {/* News Section */}
          <News />

          {/* Products Section */}
          <div className="bgom overflow-hidden pb-5 pt-0">
            <div className="px-6 relative ">
              <Image
                src="/om.svg"
                alt="om"
                width={300}
                height={300}
                className="rotate-45 opacity-[0.04] absolute left-16 -top-4 -z-10"
              ></Image>

              <h1 className="font-koulen text-4xl text-grey ">Products</h1>
              <Products />
              <div className="flex justify-end w-full pt-5 lg:pr-5">
                <div className="">
                  <Link
                    href="/products"
                    className="flex flex-row justify-center bg-kaavi text-white font-semibold items-center w-fit mx-auto px-5 py-1.5 rounded-xl cursor-pointer"
                  >
                    <p>See all</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* daily */}
          <Daily />
          {/* Explore Section */}
          <div className="py-2 relative overflow-hidden">
            <Image
              src="/om.svg"
              alt="om"
              width={300}
              height={300}
              className="rotate-45 opacity-[0.04] absolute left-16 -top-2 -z-10"
            ></Image>
            <h1 className="px-6 font-koulen text-4xl text-grey">explore</h1>

            <ExploreCarousel />
          </div>

         

          {/* Social complaints */}
          <div className="px-0 pb-5 relative overflow-hidden z-0">
            <Image
              src="/om.svg"
              alt="om"
              width={300}
              height={300}
              className="rotate-45 opacity-[0.04] absolute right-7 -top-4 -z-10"
            ></Image>
            <h1 className="px-6 font-koulen text-4xl text-grey mb-6">
              Social Complaints
            </h1>
            <div className="grid md:flex gap-5">
              <div className="px-6 hidden  md:flex">
                <div className=" w-full">
                  <img src="/complaint.png" alt="" className=" w-[450px]" />
                </div>
              </div>
              <div className="md:p-5 px-2 flex flex-col justify-between max-w-[600px]">
                <p className="md:text-xl text-md text-justify md:text-start px-6">
                  Complaint if you have any problem in your area or location.
                  After submitting your complaint, you will be contacted by our
                  members and the complaint will be resolved by us as soon as
                  possible.
                </p>
                <div className="flex mx-auto text-center md:ml-0 md:text-left pt-5">
                  <div className="">
                    <h1 className="text-4xl font-semibold">
                      {numberOfComplaints}+
                    </h1>
                    <h5>Complaints Raised</h5>
                  </div>
                </div>
                <div className="flex justify-evenly mt-4">
                  <Link
                    href={"/complaint"}
                    className=" bg-kaavi text-white p-2  rounded-md font-medium"
                  >
                    Make a complaint
                  </Link>
                  <Link
                    href={"/all-complaints"}
                    className=" bg-kaavi text-white p-2  rounded-md font-medium"
                  >
                    See all complaints
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Events Section */}
          {/* <Events /> */}

          {/* Join us
          <div className="p-6 pt-0 md:p-0 relative overflow-hidden">
            <Image
              src="/om.svg"
              alt="om"
              width={300}
              height={300}
              className="rotate-45 opacity-[0.04] absolute right-7 -top-4 z-10"
            ></Image>
            <div className="md:hidden">
              <h1 className="font-koulen text-4xl text-grey mb-6">Join us</h1>
              <p className="text-xl">
                Sign up to become a member and make a positive impact in your
                community and beyond. Let's collaborate to build a stronger
                Tamil Nadu.
              </p>
              <Link
                href={"/membership/1"}
                className="text-center flex justify-center"
              >
                <h1 className="bg-kaavi text-white p-3 mt-6 rounded-xl px-5 z-50">
                  Become a member
                </h1>
              </Link>
            </div>
            <div
              className="hidden md:flex items-center md:h-[600px] lg:h-screen bg-cover bg-center bg-no-repeat"
              style={{ background: `url(/membermd.png)` }}
            >
              <div className="p-10 w-full grid gap-8">
                <div className="">
                  <div className="font-koulen flex justify-center text-white text-5xl ">
                    <h1>BECOME A MEMBER</h1>
                  </div>
                  <div className="flex justify-center w-full pt-5">
                    <h5 className="text-center text-white text-xl max-w-[800px]">
                      Lorem ipsum dolor sit amet consectetur. Eleifend dis
                      pellentesque malesuada sed est. Nunc id sem tincidunt
                      turpis cras. Nulla neque lorem massa at. Odio consequat
                      nibh imperdiet euismod dolor velit. Amet curabitur felis
                      pellentesque sapien ultricies egestas nulla. Natoque
                      maecenas eu in est. Duis metus id vulputate nulla.
                    </h5>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="grid grid-cols-3 gap-x-10">
                    <div className="text-white">
                      <h1 className=" text-5xl font-semibold">500+</h1>
                      <h5>Member</h5>
                    </div>
                    <div className="text-white">
                      <h1 className=" text-5xl font-semibold">100+</h1>
                      <h5>Social Changes</h5>
                    </div>
                    <div className="text-white">
                      <h1 className=" text-5xl font-semibold">100+</h1>
                      <h5>Lorem ipsum dolo</h5>
                    </div>
                  </div>
                </div>
                <div className="">
                  <Link
                    href={"/membership/1"}
                    className="text-center justify-center flex"
                  >
                    <h1 className="bg-white text-3xl p-3 px-8 rounded-xl font-semibold">
                      Join Our Family
                    </h1>
                  </Link>
                </div>
              </div>
            </div>
          </div>

        
          <div className="p-6 md:py-10 overflow-hidden relative z-0">
            <Image
              src="/om.svg"
              alt="om"
              width={300}
              height={300}
              className="rotate-45 opacity-[0.04] absolute right-7 -bottom-4 -z-10"
            ></Image>
            <h1 className="font-koulen text-4xl text-grey mb-2">Members</h1>
            <h2 className="text-lg text-grey font-bold">State Level Leaders</h2>
            <div className="grid md:grid-cols-4 z-50">
              {randomData && (
                <div className="p-6 flex md:grid justify-evenly gap-x-4 items-center my-2">
                  <img
                    src={randomData.data.profile}
                    alt="user profile"
                    className="w-[70px]"
                  />
                  <div>
                    <h1 className="font-medium text-xl">
                      {randomData.data.name}
                    </h1>
                    <h2 className="text-base">{randomData.data.position}</h2>
                    <p className="text-grey text-sm">
                      {randomData.data.mobile}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="flex z-50 justify-center items-center w-fit bg-kaavi text-white mx-auto py-2 px-4 rounded-xl">
              <Link href="/members">All members</Link>
              <IoIosArrowDown className="ml-1" />
            </div>
          </div> */}

          {/* Offers and rewards */}
          {/* <div className="px-6">
            <h1 className="font-koulen text-4xl text-grey mb-2 z-50">
              Offers and rewards
            </h1>
            <div className="flex justify-around items-center z-50 mt-2 ml-5 md:py-10">
              <Link
                href={"/games"}
                className="text-center grid gap-2 md:scale-125"
              >
                <div className="bg-[#FBE9E9] rounded-full p-4 h-20 w-20 flex justify-center items-center ">
                  <img src="/games.svg" alt="games" width={40} height={40} />
                </div>
                <h2>Games</h2>
              </Link>

              <Link
                href={"/offers"}
                className="text-center grid gap-2 md:scale-125"
              >
                <div className="bg-[#FBE9E9] rounded-full p-4 h-20 w-20 flex justify-center items-center ">
                  <img src="/offers.svg" alt="offers" width={40} height={40} />
                </div>
                <h2>Offers</h2>
              </Link>
              <Link
                href={"/charities"}
                className="text-center grid gap-2 md:scale-125"
              >
                <div className="bg-[#FBE9E9] rounded-full p-4 h-20 w-20 flex justify-center items-center ">
                  <img
                    src="/charities.svg"
                    alt="charities"
                    width={40}
                    height={40}
                  />
                </div>
                <h2>Charities</h2>
              </Link>
            </div>
            <div className="flex justify-around items-center mt-1"></div>
          </div> */}
        </div>
      </div>
      <Footer />
    </>
  );
}
