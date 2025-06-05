"use client";
import React, { useEffect, useState } from "react";
import Ads from "@/components/Admin/Advertisements/Ads";
import { getServiceAds } from "@/firebase/firestore/advertisements";

function AdminDashboard() {
  const [adsOpen, setAdsOpen] = useState();
  const [ads, setAds] = useState();

  useEffect(() => {
    const fetch = async () => {
      const res = await getServiceAds(null, null, null, null, true);
      setAds(res);
    };
    fetch();
  }, []);

  return (
    <div className="px-6 py-10">
      <h1 className="text-4xl font-bold mb-20">Hello, Admin</h1>

      <h2 className="font-bold text-2xl mt-10 mb-4">Home Page Ads</h2>
      <Ads
        open={adsOpen}
        setOpen={setAdsOpen}
        type={null}
        rootprevious={null}
        beforeprevious={null}
        previous={null}
        home={true}
        data={ads}
      />

     
    </div>
  );
}

export default AdminDashboard;
