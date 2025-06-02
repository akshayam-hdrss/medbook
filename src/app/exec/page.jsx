"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/ui/Header";
import { Inter, Koulen } from "next/font/google";
import auth from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { getExecutive } from "@/firebase/firestore/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
const inter = Inter({ subsets: ["latin"] });

function executiveHome() {
  const [userData, setUserData] = useState();
  const router = useRouter();
  const handleLogout = () => {
    auth.signOut();
    router.push("/login/exec");
  };
  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId = user.uid;
        const data = await getExecutive(userId);
        setUserData(data);
      }
    });
  }, []);

  return (
    <div>
      <Header exec={true} />
      <div className="p-6">
        <h1 className="font-inter font-medium text-2xl mt-4">
          Executive Dashboard
        </h1>
        <div className="flex flex-col gap-y-2 mt-10 text-lg">
          <div className="flex justify-end gap-x-4">
            <p className="w-1/2 text-right">Membership No:</p>
            <p className="text-gray-600 font-bold w-1/2">
              {userData && userData.data.membershipNo}
            </p>
          </div>
          <div className="flex justify-end gap-x-4">
            <p className="w-1/2 text-right">Name:</p>
            <p className="text-gray-600 font-bold w-1/2">
              {userData && userData.data.name}
            </p>
          </div>
          <div className="flex justify-end gap-x-4">
            <p className="w-1/2 text-right">Mobile:</p>
            <p className="text-gray-600 font-bold w-1/2">
              {userData && userData.data.mobile}
            </p>
          </div>
          <table className="text-base mt-6">
            <thead>
              <tr>
                <th className="px-4 py-2 border border-gray-300 w-[30px]">
                  Clients Enrolled
                </th>
                <th className="px-4 py-2 border border-gray-300 w-[30px]">
                  Confirmed
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border border-gray-300">10</td>
                <td className="px-4 py-2 border border-gray-300">20</td>
              </tr>
            </tbody>
          </table>
          <Link
            href="/exec/add"
            className="flex mt-10 bg-kaavi text-white w-fit px-4 py-2 rounded-md items-center justify-between"
          >
            Add new client
          </Link>
          <button
            onClick={handleLogout}
            className="fixed bottom-4 right-4 bg-kaavi text-white w-fit px-4 py-2 rounded-md items-center justify-between"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default executiveHome;
