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
            <div className="min-w-10 pb-1 border-b-4 border-kaavi px-3">
              <h1 className="border rounded-full text-kaavi border-kaavi w-6 h-6 text-center flex justify-center items-center">
                2
              </h1>
            </div>{" "}
            <h1 className="text-kaavi border-b-4 border-kaavi w-fit ">
              Location info
            </h1>
            <div className="w-5 border-b-4 border-grey"></div>
            <div className="w-5 border-b-4 border-grey"></div>
          </div>
          <div className="pt-8">
            <h1 className="font-semibold text-2xl">Location Details</h1>
          </div>
          <form
            onSubmit={handleSubmit}
            action=""
            className="grid pt-5 gap-5 pb-10"
          >
            <div className="grid gap-1 ">
              <label htmlFor="district" className="font-semibold">
                District
              </label>
              <input
                type="text"
                name="district"
                placeholder="eg : Coimbatore"
                id="district"
                className="px-3 py-2 border border-black rounded-md"
              />
            </div>

            <div className="grid gap-1 ">
              <label htmlFor="city" className="font-semibold">
                City / Town{" "}
              </label>
              <input
                type="text"
                name="city"
                placeholder="eg : Coimbatore"
                id="city"
                className="px-3 py-2 border border-black rounded-md"
              />
            </div>
            <div className="grid gap-1 ">
              <label htmlFor="taluk" className="font-semibold">
                Taluk
              </label>
              <input
                type="text"
                name="taluk"
                placeholder="eg:RS puram"
                id="taluk"
                className="px-3 py-2 border border-black rounded-md"
              />
            </div>

            <div className="grid gap-1 num-input">
              <label htmlFor="pincode" className="font-semibold">
                Pin Code
              </label>
              <input
                type="number"
                name="pincode"
                id="pincode"
                placeholder="eg: 641 002"
                className="px-3 py-2 border border-black rounded-md"
              />
            </div>
            <div className="grid gap-1 num-input">
              <label htmlFor="raddress" className="font-semibold">
                Residentail Address
              </label>
              <textarea
                name="raddress"
                id="raddress"
                className="px-3 py-2 border border-black rounded-md min-h-[200px]"
              ></textarea>
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
