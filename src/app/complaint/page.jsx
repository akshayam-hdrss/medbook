"use client";
import Header from "@/components/ui/Header";
import BackButton from "@/components/ui/BackButton";
import Image from "next/image";
import { useState } from "react";
import { submitComplaint } from "@/firebase/firestore/complaints";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/ui/Footer";
export default function Page() {
  const [complaint, setComplaint] = useState({});
  const [photos, setPhotos] = useState();
  const router = useRouter();
  const handleChange = (e) => {
    const { id, value } = e.target;
    setComplaint((prev) => ({ ...prev, [id]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitComplaint(complaint, photos);
    router.push("/");
  };
  return (
    <div>
      <div className="fixed w-full top-0 z-[50]">
        <Header />
      </div>

      <div className="grid lg:grid-cols-4 grid-cols-1 relative z-[0]">
        <Navbar />
        <div className="col-span-3 pt-[70px]">
          <main className="relative overflow-hidden py-10">
            <Image
              src="/om.svg"
              alt="om"
              width={300}
              height={300}
              className="rotate-45 opacity-[0.04] absolute right-7 -top-4 -z-10"
            ></Image>
            <BackButton />
            <div className="px-6">
              <h1 className="font-koulen text-grey text-3xl">
                MAKE A COMPLAINT
              </h1>
              <h5 className="text-justify">
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
                        className=" placeholder:text-black/80 rounded-xl border-2 border-black px-2 py-2 focus:outline-none "
                      />
                      <h5 className="text-[14px] pt-2 pl-1">Max 20 words</h5>
                    </div>
                    <div className="flex justify-between mr-6 font-semibold">
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
                      cols="10"
                      rows="10"
                      placeholder="Describe your complaint in detail"
                      onChange={handleChange}
                      className="mr-6 placeholder:text-black/80 rounded-xl border-2 border-black px-2 py-1 focus:outline-none min-h-[200px]"
                    ></textarea>
                    <input
                      type="text"
                      placeholder="Location / Address"
                      name="location"
                      id="location"
                      onChange={handleChange}
                      className="mr-6 placeholder:text-black/80 rounded-xl border-2 border-black px-2 py-2 focus:outline-none "
                    />
                    <input
                      type="file"
                      onChange={(e) => setPhotos([...e.target.files])}
                    />
                    <input
                      type="submit"
                      value="Make a complaint"
                      className="text-white mr-6 py-2 bg-kaavi rounded-xl"
                    />
                  </div>
                </form>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
