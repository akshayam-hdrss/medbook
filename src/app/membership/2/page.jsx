"use client";
import Header from "@/components/ui/Header";
import BackButton from "@/components/ui/BackButton";
import Link from "next/link";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { useRouter } from "next/navigation";

export default function Page() {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const handleSubmit = () => {
    router.push("/membership/3");
  };
  return (
    <div>
      <Header />
      <main>
        <BackButton />
        <div className="px-8">
          <div className="">
            <h1 className="text-kaavi font-semibold text-center text-xl">
              Membership Form
            </h1>
          </div>
          <div className="pt-5 flex gap-3">
            <div className="min-w-10 pb-1 border-b-4 border-kaavi px-3">
              <h1 className="border rounded-full text-kaavi border-kaavi w-6 h-6 text-center flex justify-center items-center">
                1
              </h1>
            </div>
            <h1 className="text-kaavi border-b-4 border-kaavi w-fit ">
              Personal Info
            </h1>
            <div className="w-5 border-b-4 border-grey"></div>
            <div className="w-5 border-b-4 border-grey"></div>
          </div>
          <div className="pt-8">
            <h1 className="font-semibold text-2xl">Welcome to HDRSS!</h1>
            <div className="pt-1 flex items-center gap-1 text-gray-400">
              <CiMail />
              <h1>abcd@gmail.com</h1>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            action=""
            className="grid pt-5 gap-5 pb-10"
          >
            <div className="grid gap-1">
              <label htmlFor="email" className="font-semibold">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder="+91"
                className="px-3 py-2 border border-black rounded-md placeholder:text-black/60"
              />
              <h1 className="text-sm">
                In the next step we will send you an email with a OTP that you
                can use to verify your account
              </h1>
            </div>
            <div className="grid gap-1 num-input">
              <label htmlFor="otp" className="font-semibold">
                Enter OTP
              </label>
              <input
                type="number"
                name="otp"
                placeholder="OTP"
                id="otp"
                className="px-3 py-2 border border-black rounded-md"
              />
            </div>
            <div className="grid gap-1 ">
              <label htmlFor="dob" className="font-semibold">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                placeholder="DD-MM-YY"
                id="db"
                className="px-3 py-2 border border-black rounded-md"
              />
            </div>
            <div className="grid gap-1 ">
              <label htmlFor="gname" className="font-semibold">
                Father / Husband Name
              </label>
              <input
                type="text"
                name="gname"
                placeholder="name"
                id="gname"
                className="px-3 py-2 border border-black rounded-md"
              />
            </div>
            <div className="grid gap-1 ">
              <label htmlFor="blood" className="font-semibold">
                Blood Group
              </label>
              <input
                type="text"
                name="blood"
                placeholder="eg : A +ve"
                id="blood"
                className="px-3 py-2 border border-black rounded-md"
              />
            </div>
            <div className="grid gap-1 ">
              <label htmlFor="edu" className="font-semibold">
                Education
              </label>
              <input
                type="text"
                name="edu"
                placeholder="eg : Bachelor of Engineering"
                id="edu"
                className="px-3 py-2 border border-black rounded-md"
              />
            </div>
            <div className="grid gap-1 ">
              <label htmlFor="prof" className="font-semibold">
                Profession
              </label>
              <input
                type="text"
                name="prof"
                placeholder="eg : Engineer"
                id="prof"
                className="px-3 py-2 border border-black rounded-md"
              />
            </div>
            <div className="grid gap-1 num-input">
              <label htmlFor="aadhar" className="font-semibold">
                Aadhar Number
              </label>
              <input
                type="number"
                name="aadhar"
                id="aadhar"
                className="px-3 py-2 border border-black rounded-md"
              />
            </div>

            <input
              type="submit"
              value="Save and proceed"
              className="w-full rounded-md bg-blue-400 text-white font-semibold py-2"
            />
          </form>
        </div>
      </main>
    </div>
  );
}
