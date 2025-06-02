"use client";
import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getRamadass } from "@/firebase/firestore/ramadass";
import { submitFooterForm } from "../../firebase/firestore/footerform";
import { IoIosDoneAll } from "react-icons/io";

function Footer() {
  const [leader, setLeader] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      const data = await getRamadass();
      setLeader(data);
    };
    fetchdata();
  }, []);
  return (
    <div className="">
      <div
        id="footer"
        className="bg-[#B72C00] lg:px-20 px-10 py-5 pb-4 text-[#F7DF25] "
      >
        <div className="flex justify-around items-center z-50 mt-2 ml-5 md:py-10">
          <Link href={"/games"} className="text-center grid gap-2 md:scale-125">
            <div className="border border-[#F7DF25] rounded-full p-4 h-20 w-20 flex justify-center items-center ">
              <img src="/games.png" alt="games" width={40} height={40} />
            </div>
            <h2>Games</h2>
          </Link>

          <Link
            href={"/offers"}
            className="text-center grid gap-2 md:scale-125"
          >
            <div className="border border-[#F7DF25] rounded-full p-4 h-20 w-20 flex justify-center items-center ">
              <img src="/offers.png" alt="offers" width={40} height={40} />
            </div>
            <h2>Offers</h2>
          </Link>
          <Link
            href={"/charities"}
            className="text-center grid gap-2 md:scale-125"
          >
            <div className="border border-[#F7DF25] rounded-full p-4 h-20 w-20 flex justify-center items-center ">
              <img
                src="/charities.png"
                alt="charities"
                width={40}
                height={40}
              />
            </div>
            <h2>Charities</h2>
          </Link>
        </div>
      </div>
      <div
        id="footer"
        className="bg-[#B72C00] text-primary lg:px-20 px-10"
      >
        {/* <div className="grid grid-cols-2 gap-2 grid-rows-1 mb-6">
          <div className="lg:mr-auto">
            <div className="text-center">
              <Link href="/ramdass" className="flex justify-center">
                <img src="/ramdass.png" alt="Ram Dass" width={80} height={80} />
              </Link>
              <div>
                <h1 className="font-bold text-lg leading-6 mb-1">
                  {leader.name}
                </h1>
                <h2 className="text-sm text-center">Founder/President</h2>
              </div>
            </div>
          </div>
          <Link
            href={"/about"}
            className="lg:flex items-center justify-center text-center lg:ml-auto"
          >
            <div className="flex justify-center">
              <Image src="/hdrss.png" alt="logo" width={80} height={80} />
            </div>
            <div className="lg:text-start text-center">
              <p className="font-semibold text-xl">Hindu Dharma Raksha Sena</p>
              <div className="hidden lg:block">
                <p>Coimbatore- 639386</p>
                <p>hdrss.cbe@gmail.com</p>
              </div>
            </div>
          </Link>
        </div> */}
        {/* <section className="md:grid flex flex-col grid-cols-2 gap-5 md:pt-8">
          <div className="md:mx-auto lg:m-0">
            <h1 className="text-white text-xl font-semibold">
              Contact Information
            </h1>
            <div className="text-white text-sm md:text-[16px] grid gap-3 pt-4">
              <Link href={"/"}>Phone : +91 9677717474</Link>
              <Link href={"/"}>Email : hdrss.in@gmail.com</Link>
              <Link href={"/"}>
                <h5 className="text-white">
                  No: 13, Bhairavai 2nd Street, <br /> Edayarpalayam, <br />{" "}
                  Coimbatore - 641 025
                </h5>
              </Link>
            </div>
          </div>
          <div className="">
            <h1 className="font-semibold text-xl ">Our Companies</h1>
            <div className="grid lg:grid-cols-2 gap-1 pt-3">
              <Link href={"/companies/ak-technologies"}>Ak Technologies</Link>
              <Link href={"/companies/ak-media"}>Ak Media</Link>
              <Link href={"/companies/ak-associates"}>Ak Associates</Link>
              <Link href={"/companies/ak-finearts"}>Ak FineArts</Link>
              <Link href={"/companies/ak-publishers"}>Ak Publishers</Link>
            </div>
          </div>
        </section> */}

        {/* <div className="flex justify-center text-center py-8">
          <div className="lg:flex items-center gap-2">
            <h1>Copyright 2024@ All rights reserved</h1>
            <h1 className="mt-3 mb-1">This website was built by</h1>
            <div className="flex justify-center pt-2 lg:pt-0">
              <img
                src="/companylogo.png"
                alt=""
                className="lg:w-[200px] w-[180px]"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-center items-center text-2xl gap-5">
          <FaFacebook />
          <FaYoutube />
          <FaTwitter />
          <FaInstagram />
        </div> */}
      </div>
    </div>
  );
}

export default Footer;
