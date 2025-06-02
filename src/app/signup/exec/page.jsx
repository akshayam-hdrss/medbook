"use client";
import React, { useState } from "react";
import { PiFlowerLotus } from "react-icons/pi";
import Image from "next/image";
import BackButton from "@/components/ui/BackButton";
import signUp from "@/firebase/auth/signup";
import { MdOutlineEmail } from "react-icons/md";
import { useRouter } from "next/navigation";
import { MdOutlinePhone } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";

function execSignupPage() {
  const [name, setName] = useState();
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState();
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUp(mobile, email, password, name, true);
      setSuccess(true);
    } catch (error) {
      alert("Error signing up: " + error.message);
    }
  };
  return (
    <div className="p-10 overflow-hidden">
      <PiFlowerLotus fontSize={80} className="mx-auto mb-10 mt-5" />
      <BackButton />
      <div className="py-6 px-4 z-10 relative">
        <h1 className="font-bold uppercase text-3xl mb-12">Sign up as executive</h1>
        <Image
          src="/om.svg"
          alt="om"
          width={300}
          height={300}
          className="rotate-45 opacity-5 absolute top-12 -z-10 right-1"
        />
        {!success ? (
          <form onSubmit={handleSignUp}>
            <div className="flex justify-center items-center mb-8 border-b border-black pb-2">
              <Image src="/user1.svg" alt="user" width={100} height={100} />
              <input
                type="text"
                required
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-inherit font-bold ml-5 inline"
              />
            </div>
            <div className="flex justify-center items-center mb-8 border-b border-black pb-2">
              <MdOutlinePhone fontSize={30} className="text-grey" />

              <input
                type="text"
                required
                placeholder="Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="bg-inherit font-bold ml-5 inline"
              />
            </div>
            <div className="flex justify-center items-center mb-8 border-b w-full border-black pb-2">
              <MdOutlineEmail fontSize={30} className="text-grey" />

              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-inherit font-bold ml-4 inline"
              />
            </div>
            <div className="flex justify-center items-center mb-8 border-b border-black pb-2">
              <Image src="/password.svg" alt="user" width={20} height={20} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-inherit font-bold ml-5 inline"
              />
            </div>
            <div className="flex justify-center items-center">
              <input type="checkbox" required className="rounded-none" />
              <p className="text-sm ml-1">
                I agree to all the terms and conditions
              </p>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="mt-5 p-3 bg-kaavi text-white rounded-xl w-full"
              >
                Create Account
              </button>
            </div>
          </form>
        ) : (
          <div>
            <div className="flex w-fit px-4 py-2 mx-auto bg-green-600 text-white gap-x-4 rounded-md items-center">
              <p>Request Recieved</p>
              <FaCircleCheck />
            </div>
            <p className="mt-10 text-xl">
              We'll contact you once you're approved
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default execSignupPage;
