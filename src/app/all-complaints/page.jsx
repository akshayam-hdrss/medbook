"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import BackButton from "@/components/ui/BackButton";
import YoutubeEmbed from "@/components/ui/YoutubeEmbed";
import { Carousel } from "@material-tailwind/react";
import { getServiceAds } from "@/firebase/firestore/advertisements";
import { getYt } from "@/firebase/firestore/servicesyt";
import { subscribeToServicesAndProducts } from "@/firebase/firestore/servicesProducts";
import ServiceCard from "@/components/ui/ServiceCard";
import { useRouter } from "next/navigation";
import { getComplaints } from "@/firebase/firestore/complaints";
import Slider from "react-slick";
import { FaLocationDot } from "react-icons/fa6";
import { submitComplaint } from "@/firebase/firestore/complaints";

import Navbar from "@/components/Navbar";
import Image from "next/image";
function Services() {
  const [complaint, setComplaint] = useState({});
  const [photos, setPhotos] = useState();
  const [allcom, setAllcom] = useState();
  const router = useRouter();
  console.log(allcom);

  useEffect(() => {
    const fetch = async () => {
      const allc = await getComplaints();
      setAllcom(allc);
    };
    fetch();
  }, []);
  const handleChange = (e) => {
    const { id, value } = e.target;
    setComplaint((prev) => ({ ...prev, [id]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitComplaint(complaint, photos);
    router.push("/");
  };
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="overflow-hidden">
      <div className="fixed w-full top-0 z-[50]">
        <Header />
      </div>
      <div className="grid lg:grid-cols-4 grid-cols-1 relative z-[0]">
        <Navbar />
        <div className="col-span-3 pt-[70px]">
          <BackButton />
          <div className="w-full ">
            <div className="">
              {allcom && allcom.length > 1 ? (
                <Slider {...settings}>
                  {allcom &&
                    allcom.map((complaint, index) => {
                      return (
                        <div key={index} className="w-full p-5">
                          <div className=" p-5  bg-kaavi/10 rounded-xl">
                            {complaint.photos && (
                              <img
                                src={complaint.data.photos[0]}
                                alt=""
                                className="w-full h-[200px]"
                              />
                            )}
                            <div className="flex justify-between pt-5 ">
                              <div className="">
                                <h1 className="font-semibold">
                                  {complaint.data.subject}
                                </h1>
                              </div>
                              <div className="">
                                <h1>{complaint.data.date}</h1>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600 pt-2">
                              <FaLocationDot />

                              <h1>{complaint.data.location}</h1>
                            </div>
                            <div className="pt-2 text-justify">
                              <h1>{complaint.data.description}</h1>
                            </div>
                            <div className="pt-5">
                              {/* <h1>Status</h1> */}
                              <div className="px-3 py-1 rounded-md bg-kaavi text-white w-fit">
                                Pending
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </Slider>
              ) : (
                allcom &&
                allcom.map((complaint, index) => {
                  return (
                    <div key={index} className="w-full p-5">
                      <div className=" p-5  bg-kaavi/10 rounded-xl">
                        {complaint.photos && (
                          <img
                            src={complaint.data.photos[0]}
                            alt=""
                            className="w-full h-[200px]"
                          />
                        )}
                        <div className="flex justify-between pt-5 ">
                          <div className="">
                            <h1 className="font-semibold">
                              {complaint.data.subject}
                            </h1>
                          </div>
                          <div className="">
                            <h1>{complaint.data.date}</h1>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 pt-2">
                          <FaLocationDot />

                          <h1>{complaint.data.location}</h1>
                        </div>
                        <div className="pt-2 text-justify">
                          <h1>{complaint.data.description}</h1>
                        </div>
                        <div className="pt-5">
                          {/* <h1>Status</h1> */}
                          <div className="px-3 py-1 rounded-md bg-kaavi text-white w-fit">
                            Pending
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
          <div className="flex justify-center relative overflow-hidden">
            <Image
              src="/om.svg"
              alt="om"
              width={300}
              height={300}
              className="rotate-45 opacity-[0.04] absolute right-7 -top-4 -z-10"
            ></Image>
            <div className="px-8 max-w-[600px]">
              <h1 className="font-koulen text-grey text-3xl">
                MAKE A COMPLAINT
              </h1>
              <h5>
                Submit your concerns and complaints to help us improve society.
                Your feedback is invaluable in addressing social issues and
                fostering positive change. Together, we can make a difference.
              </h5>
              <div className="">
                <form action="submit" onSubmit={handleSubmit}>
                  <div className="grid pt-10 gap-5">
                    <div className="">
                      <input
                        type="text"
                        placeholder="Complaint Subject"
                        name="subject"
                        id="subject"
                        onChange={handleChange}
                        className="w-full placeholder:text-black/80 rounded-xl border-2 border-black px-2 py-2 focus:outline-none "
                      />
                      <h5 className="text-[14px] pt-2 pl-1">Max 20 words</h5>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <label htmlFor="date">Select Date</label>
                      <input
                        type="date"
                        name="date"
                        id="date"
                        onChange={handleChange}
                        className="focus:outline-none"
                      />
                    </div>
                    <textarea
                      name=""
                      id="description"
                      cols="30"
                      rows="10"
                      placeholder="Describe your complaint in detail"
                      onChange={handleChange}
                      className="w-full placeholder:text-black/80 rounded-xl border-2 border-black px-2 py-1 focus:outline-none min-h-[200px]"
                    ></textarea>
                    <input
                      type="text"
                      placeholder="Location / Address"
                      name="location"
                      id="location"
                      onChange={handleChange}
                      className="w-full placeholder:text-black/80 rounded-xl border-2 border-black px-2 py-2 focus:outline-none "
                    />
                    <input
                      type="file"
                      onChange={(e) => setPhotos([...e.target.files])}
                    />
                    <input
                      type="submit"
                      value="Make a complaint"
                      className="text-white w-full py-2 bg-kaavi rounded-xl"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Services;
