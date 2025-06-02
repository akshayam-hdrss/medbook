"use client";
import BackButton from "@/components/ui/BackButton";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";
import { MdOutlineCall } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { getRamadass } from "@/firebase/firestore/ramadass";
import YoutubeEmbed from "@/components/ui/YoutubeEmbed";
import Navbar from "@/components/Navbar";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import Marquee from "react-fast-marquee";
import { getPartner } from "../../firebase/firestore/partner";

function About() {
  const [partner, setPartner] = useState();
  const [para, setPara] = useState(false);
  useEffect(() => {
    const fetchdata = async () => {
      const data = await getPartner();
      setPartner(data);
    };
    fetchdata();
  }, []);

  return (
    <div>
      <div>
        <div className="fixed w-full top-0 z-[50]">
          <Header />
        </div>
        <main>
          <div className="lg:grid grid-cols-5 relative z-[0]">
            <Navbar />
            <div className="col-span-4 pt-[60px]">
              <img src="/membermd.png" alt="" className="w-full" />
              <div className="flex justify-center w-full mt-[-100px] ">
                <div className="p-3 rounded-full shadow-2xl bg-white">
                  <img
                    src={partner && partner.profile}
                    alt="About"
                    className="w-[160px] md:w-[200px] h-[160px] md:h-[200px] object-cover object-top rounded-full"
                  ></img>
                </div>
              </div>
              <div className="lg:px-20 px-8">
                <div className="font-semibold text-xl text-center pt-5 grid gap-1">
                  <h1 className="font-bold text-xl mt-3">
                    {partner && partner.name}
                  </h1>
                </div>
                <div className="flex justify-center gap-5 text-3xl text-kaavi py-5 items-center">
                  <IoLogoWhatsapp />
                  <FaFacebook />
                  <FaPhoneAlt />
                </div>
                <div className="">
                  <h1 className="font-koulen text-4xl text-grey ">ABOUT US</h1>
                  <p
                    className={
                      para
                        ? "pt-5 text-justify"
                        : "pt-5 text-justify max-h-[400px] overflow-hidden mb-[-50px]"
                    }
                  >
                    {partner && partner.about}
                  </p>
                  <div className="flex justify-center backdrop-blur-sm p-2 ">
                    <h1
                      onClick={() => setPara(!para)}
                      className="border-2 px-4 py-2 rounded-xl bg-kaavi text-white cursor-pointer"
                    >
                      {para ? "Show Less" : "Learn More"}
                    </h1>
                  </div>
                </div>
                <div className="mt-10 ">
                  <h1 className="font-koulen text-4xl text-grey">Contact</h1>
                  <div className="pt-3">
                    <div className="flex mb-4  items-center  gap-5">
                      <MdOutlineEmail fontSize={30} />
                      <p className="ml-3">{partner && partner.email}</p>
                    </div>
                    <div className="flex items-center  gap-5">
                      <MdOutlineCall fontSize={30} />
                      <p className="mr-16">{partner && partner.mobile}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="py-5">
                <h1 className="font-koulen text-4xl text-grey px-10 lg:px-20">
                  GALLERY
                </h1>
                <div className="py-5">
                  <section className=" overflow-hidden w-full text-center">
                    <Marquee pauseOnClick pauseOnHover>
                      {partner &&
                        partner.gallery.map((photo, index) => (
                          <img
                            src={photo}
                            alt="gallery"
                            key={index}
                            className="h-[200px] mx-2"
                          />
                        ))}
                    </Marquee>
                  </section>
                </div>
              </div>

              <div className="py-5 px-10 lg:px-20">
                <h1 className="font-koulen text-4xl text-grey ">LOCATION</h1>
                <div className="flex justify-center">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.9876107511063!2d76.9215539736997!3d11.039555454287871!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba858b160b58e27%3A0x421a7f182d275d42!2s80%2C%2080%2F3%2C%20Bhaghavath%20Singh%20Street%203%2C%20Edayarpalayam%2C%20Velandipalayam%2C%20Coimbatore%2C%20Tamil%20Nadu%20641025!5e0!3m2!1sen!2sin!4v1736150604450!5m2!1sen!2sin"
                    width="600"
                    height="450"
                    allowfullscreen=""
                    loading="lazy"
                    className="max-w-[400px] max-h-[300px] border-2 border-grey rounded-2xl my-3"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <br />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default About;
