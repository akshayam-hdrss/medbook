"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { subscribeToServicesAndProducts } from "@/firebase/firestore/servicesProducts";
import BackButton from "@/components/ui/BackButton";
import AddServicePopup from "@/components/Admin/Services/AddServicePopup";
import EditServicePopup from "@/components/Admin/Services/EditServicePopup";
import DeleteServicePopup from "@/components/Admin/Services/DeleteServicePopup";
import Ads from "./Advertisements/Ads";
import { getServiceAds } from "@/firebase/firestore/advertisements";
import { getYt } from "@/firebase/firestore/servicesyt";
import EditSno from "./Services/EditSno";
import Link from "next/link";
import EditYt from "./Services/EditYt";

function AdminPanel2() {
  const [open, setOpen] = useState(false);
  const [link, setLink] = useState();
  const [ads, setAds] = useState();
  const [data, setData] = useState();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [adsOpen, setAdsOpen] = useState(false);
  const [ytOpen, setYtOpen] = useState();
  const [snoOpen, setSnoOpen] = useState();
  let level;
  const searchparam = useSearchParams();
  const previous = searchparam.get("previous");
  const type = searchparam.get("type");

  const content =
    data &&
    data.map((item, index) => (
      <Link
        href={`/admin/${type}/level3?previous=${encodeURIComponent(
          item.id
        )}&beforeprevious=${previous}&type=${type}&name=${encodeURIComponent(
          item.name
        )}`}
        key={index}
        className="flex items-center md:gap-x-6 justify-center bg-[#F4F5F5] rounded-xl h-20 md:h-28 p-6 px-3"
      >
        <div className="w-1/3 md:w-1/5 h-fit mr-3">
          <img
            src={item.iconUrl}
            alt="Icon"
            className="object-scale-down aspect-square"
          />
        </div>
        <h1 className="w-2/3 md:w-4/5 md:text-xl md:font-medium mr-0">
          {item.name}
        </h1>
      </Link>
    ));

  useEffect(() => {
    const unsubscribe = subscribeToServicesAndProducts(
      setData,
      previous,
      null,
      type
    );

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const data = await getServiceAds(type, null, null, previous, null);
      setAds(data);
      const data2 = await getYt(type, null, null, previous);
      setLink(data2);
    };
    fetch();
  }, [adsOpen, ytOpen]);

  return (
    <div className="p-10">
      <BackButton />
      <div className="flex justify-between items-center mb-14">
        <h1 className=" font-bold text-2xl md:text-4xl mr-10">
          {previous.charAt(0).toUpperCase() + previous.slice(1)}
        </h1>
        <div className="flex items-center gap-x-10">
          <EditSno
            beforeprevious={null}
            previous={previous}
            open={snoOpen}
            setOpen={setSnoOpen}
            type={type}
          />

          <EditServicePopup
            open={editOpen}
            setOpen={setEditOpen}
            data={data}
            rootprevious={null}
            beforeprevious={null}
            previous={previous}
            type={type}
          />
          <DeleteServicePopup
            open={deleteOpen}
            setOpen={setDeleteOpen}
            data={data}
            rootprevious={null}
            beforeprevious={null}
            previous={previous}
            type={type}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-y-10 gap-x-14 items-center justify-center py-6 px-10">
        {content}

        <AddServicePopup
          open={open}
          setOpen={setOpen}
          rootprevious={null}
          beforeprevious={null}
          previous={previous}
          type={type}
        />
      </div>

      <div>
        <div className="flex justify-between items-center">
          <h1>Advertisements</h1>
          <Ads
            open={adsOpen}
            setOpen={setAdsOpen}
            rootprevious={null}
            beforeprevious={null}
            previous={previous}
            type={type}
            data={ads}
            home={null}
          />
        </div>
        <div className="flex justify-between items-center my-4">
          <h1>Youtube Link</h1>
          <EditYt
            open={ytOpen}
            setOpen={setYtOpen}
            type={type}
            previous={previous}
            beforeprevious={null}
            rootprevious={null}
            data={link}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminPanel2;
