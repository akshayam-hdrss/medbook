"use client";
import Header from "@/components/ui/Header";
import BackButton from "@/components/ui/BackButton";
import Link from "next/link";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Page() {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const handleSubmit = () => {
    router.push("/membership/2")
  }
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
            <h1 className="text-kaavi border-b-4 border-kaavi w-fit ">
              Create Account
            </h1>
            <div className="w-10 border-b-4 border-grey"></div>
            <div className="w-5 border-b-4 border-grey"></div>
            <div className="w-5 border-b-4 border-grey"></div>
          </div>
          <div className="flex gap-2 text-sm pt-2">
            <h1>Already have a account ? </h1>
            <Link href={"/login"} className="text-blue-400">
              Log in
            </Link>
          </div>
          <form onSubmit={handleSubmit} action="" className="grid pt-5 gap-5 pb-10">
            <div className="grid gap-1">
              <label htmlFor="email" className="font-semibold">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="eg:abcd@gmail.com"
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
                id="otp"
                className="px-3 py-2 border border-black rounded-md"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="password" className="font-semibold">
                Password
              </label>
              <div className="flex items-center">
                <input
                  type={show ? "text" : "password"}
                  name="password"
                  id="password"
                  required
                  className="w-full border px-3 border-black rounded-md py-2 placeholder:text-black/60"
                  placeholder="Password"
                />
                <div className="ml-[-25px] " onClick={() => setShow(!show)}>
                  {show ? <FaRegEye /> : <FaRegEyeSlash />}
                </div>
              </div>
              <div className="grid grid-cols-2 text-gray-500 text-sm">
                <div className="">
                  <h1>8 Characters minimum</h1>
                  <h1>1 uppercase character</h1>
                </div>
                <div className="">
                  <h1>1 lowercase character</h1>
                  <h1>1 numeric character</h1>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="grid gap-2">
                <label htmlFor="" className="font-semibold">
                  First Name
                </label>
                <input
                  type="text"
                  name="fname"
                  id="fname"
                  className="px-2 py-3 rounded-md border border-black w-full"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="" className="font-semibold">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lname"
                  id="lname"
                  className="px-2 py-3 rounded-md border border-black w-full"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="terms" id="terms" />
              <div className="text-sm">
                <h1 className="text-gray-600">
                  I agree to Hindu Dharma raksha Sena’s
                </h1>
                <h1 className="text-blue-400">Terms and Conditions</h1>
              </div>
            </div>
            <input
              type="submit"
              value="Create Account and Continue"
              className="w-full rounded-md bg-blue-400 text-white font-semibold py-2"
            />
          </form>
        </div>
      </main>
    </div>
  );
}
