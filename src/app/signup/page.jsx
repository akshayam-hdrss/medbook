"use client";
import React, { useState } from "react";
import { PiFlowerLotus } from "react-icons/pi";
import Image from "next/image";
import BackButton from "@/components/ui/BackButton";
import signUp from "@/firebase/auth/signup";
import { MdOutlineEmail } from "react-icons/md";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUp(null,email, password, name,false);
      router.back();
    } catch (error) {
      alert("Error signing up: " + error.message);
    }
  };
  return (
    <div className="p-10 overflow-hidden">
      <PiFlowerLotus fontSize={80} className="mx-auto mb-10 mt-5" />
      <BackButton />
      <div className="py-6 px-4 z-10 relative">
        <h1 className="font-bold uppercase text-3xl mb-12">Sign up</h1>
        <Image
          src="/om.svg"
          alt="om"
          width={300}
          height={300}
          className="rotate-45 opacity-5 absolute top-12 -z-10 right-1"
        />
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
      </div>
    </div>
  );
};

export default Signup;
