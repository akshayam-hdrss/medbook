"use client";
import AdminGaurd from "@/components/Admin/AdminGaurd";
import auth from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import SideBar from "@/components/Admin/SideBar";
function AdminLayout({ children }) {
  const [admin, setAdmin] = useState();
  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        const adminEmail = "hdrss.in@gmail.com";
        setAdmin(user.email === adminEmail);
      } else {
        setAdmin(null);
      }
    });
  });
  if (!admin) return <AdminGaurd />;
  return (
    <div className="flex w-max">
      <SideBar />

      <div className="flex-1 px-6 w-[80vw] py-8 overflow-y-auto ml-[20vw] overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;
