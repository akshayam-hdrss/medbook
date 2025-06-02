"use client";
import Header from "@/components/ui/Header";
import Navbar from "@/components/Navbar";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import Marquee from "react-fast-marquee";
import Footer from "@/components/ui/Footer";
import { useEffect, useState } from "react";
import { getHDRSS } from "@/firebase/firestore/hdrss";
import Link from "next/link";
import Image from "next/image";
import Events from "@/components/Home/Events";

export default function Page() {
  const [data, setData] = useState();
  useEffect(() => {
    const fetch = async () => {
      const data = await getHDRSS();
      setData(data);
    };
    fetch();
  });
  return (
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
                  src="/orangelogo.png"
                  alt=""
                  className="w-[160px] md:w-[200px]"
                />
              </div>
            </div>
            <div className="lg:px-20 px-10">
              <div className="font-semibold text-xl text-center pt-5 grid gap-1">
                <h1>இந்து தர்ம ரக்‌ஷ சேனா</h1>
                <h1>Hindhu Dharma Raksha Sena</h1>
              </div>
              <div className="flex justify-center gap-5 text-3xl text-kaavi py-5 items-center">
                <IoLogoWhatsapp />
                <FaFacebook />
                <FaPhoneAlt />
              </div>
              <div className="">
                <h1 className="font-koulen text-4xl text-grey ">ABOUT US</h1>
                <h5 className="pt-5 text-justify">{data && data.about}</h5>
              </div>
            </div>
            <div className="py-5">
              <h1 className="font-koulen text-4xl text-grey px-10 lg:px-20">
                GALLERY
              </h1>
              <div className="py-5">
                <section className=" overflow-hidden w-full text-center">
                  <Marquee pauseOnClick pauseOnHover>
                    {data &&
                      data.gallery.map((photo, index) => (
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
            <Events />
            <div className="">
                <div className="lg:p-10 p-6">
                  <h1 className="font-koulen text-4xl text-grey ">LEADER</h1>
                  <h1 className="pt-5 text-center text-2xl font-semibold">Rama Sandilyan</h1>
                  <div className="flex justify-center py-5 ">
                    <Link href={"/ramdass"} className="bg-kaavi px-4 py-1.5 rounded-xl font-semibold text-white">Learn More</Link>
                  </div>
                </div>
              </div>
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

              {/*  */}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
