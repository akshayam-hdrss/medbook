"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import AddServicePopup from "@/components/Admin/Services/AddServicePopup";
import BackButton from "@/components/ui/BackButton";
import { subscribeToServicesAndProducts } from "@/firebase/firestore/servicesProducts";
import EditServicePopup from "@/components/Admin/Services/EditServicePopup";
import DeleteServicePopup from "@/components/Admin/Services/DeleteServicePopup";
import EditSno from "./Services/EditSno";
import { getYt } from "@/firebase/firestore/servicesyt";
import EditYt from "./Services/EditYt";
import Link from "next/link";
import Ads from "@/components/Admin/Advertisements/Ads";
import { getServiceAds } from "@/firebase/firestore/advertisements";
function AdminPanel3() {
  const [link, setLink] = useState();
  const [data, setData] = useState();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [snoOpen, setSnoOpen] = useState();
  const [ytOpen, setYtOpen] = useState();
  const [adsOpen, setAdsOpen] = useState();
  const [ads, setAds] = useState();

  const searchparam = useSearchParams();
  const tempprevious = searchparam.get("previous");
  const previous = decodeURIComponent(tempprevious);
  const temppname = searchparam.get("name");
  const name = decodeURIComponent(temppname);
  const beforeprevious = searchparam.get("beforeprevious");
  const type = searchparam.get("type");
  const content =
    data &&
    data.map((item, index) => (
      <Link
        href={`/admin/${type}/level4?previous=${encodeURIComponent(
          item.id
        )}&beforeprevious=${previous}&rootprevious=${beforeprevious}&type=${type}&name=${encodeURIComponent(
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
      beforeprevious,
      type
    );

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const data = await getServiceAds(
        type,
        null,
        beforeprevious,
        previous,
        null
      );
      setAds(data);
      const data2 = await getYt(type, null, beforeprevious, previous);
      setLink(data2);
    };
    fetch();
  }, [adsOpen]);

  return (
    <div className="p-10">
      <BackButton />
      <div className="flex justify-between items-center mb-14">
        <h1 className="font-bold text-2xl md:text-4xl mr-10">{name}</h1>
        <div className="flex gap-x-10">
          <EditSno
            beforeprevious={beforeprevious}
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
            beforeprevious={beforeprevious}
            previous={previous}
            type={type}
          />
          <DeleteServicePopup
            open={deleteOpen}
            setOpen={setDeleteOpen}
            data={data}
            rootprevious={null}
            beforeprevious={beforeprevious}
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
          beforeprevious={beforeprevious}
          previous={previous}
          type={type}
        />
      </div>
      <div className="flex justify-between items-center">
        <h1>Advertisements</h1>
        <Ads
          open={adsOpen}
          setOpen={setAdsOpen}
          rootprevious={null}
          beforeprevious={beforeprevious}
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
          beforeprevious={beforeprevious}
          rootprevious={null}
          data={link}
        />
      </div>
    </div>
  );
}

export default AdminPanel3;
