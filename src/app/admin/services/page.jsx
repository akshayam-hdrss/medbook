"use client";
import React, { useState, useEffect } from "react";
import ServiceCard from "@/components/ui/ServiceCard";
import AddServicePopup from "@/components/Admin/Services/AddServicePopup";
import { subscribeToServicesAndProducts } from "@/firebase/firestore/servicesProducts";
import EditServicePopup from "@/components/Admin/Services/EditServicePopup";
import DeleteServicePopup from "@/components/Admin/Services/DeleteServicePopup";
import Ads from "@/components/Admin/Advertisements/Ads";
import EditSno from "@/components/Admin/Services/EditSno";
import EditYt from "@/components/Admin/Services/EditYt";
import { getServiceAds } from "@/firebase/firestore/advertisements";
import { getYt } from "@/firebase/firestore/servicesyt";

function page() {
  const [snoOpen, setSnoOpen] = useState();
  const [ytOpen, setYtOpen] = useState();
  const [link, setLink] = useState();
  const [editOpen, setEditOpen] = useState();
  const [deleteOpen, setDeleteOpen] = useState();
  const [addOpen, setAddOpen] = useState();
  const [services, setServices] = useState();
  const [adsOpen, setAdsOpen] = useState();
  const [ads, setAds] = useState();

  useEffect(() => {
    const unsubscribe = subscribeToServicesAndProducts(
      setServices,
      null,
      null,
      "services"
    );

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const data = await getServiceAds("services", null, null, null, null);
      setAds(data);
      const data2 = await getYt("services", null, null, null);
      setLink(data2);
    };
    fetch();
  }, [adsOpen]);
  return (
    <div className="my-8 mt-14">
      <div className="flex justify-between gap-x-10 items-center mb-14">
        <h1 className="font-bold text-2xl md:text-4xl">Services</h1>
        <div className="gap-x-10 flex ">
          <EditSno open={snoOpen} setOpen={setSnoOpen} type="services" />
          <EditServicePopup
            open={editOpen}
            setOpen={setEditOpen}
            data={services}
            rootprevious={null}
            beforeprevious={null}
            previous={null}
            type="services"
          />
          <DeleteServicePopup
            open={deleteOpen}
            setOpen={setDeleteOpen}
            data={services}
            rootprevious={null}
            beforeprevious={null}
            previous={null}
            type="services"
          />
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-medium">Advertisement</h2>
          <Ads
            open={adsOpen}
            setOpen={setAdsOpen}
            type="services"
            rootprevious={null}
            beforeprevious={null}
            previous={null}
            home={null}
            data={ads}
          />
        </div>
        <div className="flex justify-between my-4 items-center">
          <h2 className="text-xl font-medium">Youtube Link</h2>
          <EditYt
            open={ytOpen}
            setOpen={setYtOpen}
            type="services"
            rootprevious={null}
            beforeprevious={null}
            previous={null}
            data={link}
          />
        </div>
      </div>
      <div className="grid grid-cols-3 place-items-center md:grid-cols-4 mt-10 gap-y-10 gap-x-10">
        {services &&
          services.map((item) => (
            <ServiceCard
              name={item.name}
              url={item.iconUrl}
              slug={`/admin/services/level2?previous=${item.id}&type=services`}
            />
          ))}
        <AddServicePopup
          open={addOpen}
          setOpen={setAddOpen}
          beforeprevious={null}
          previous={null}
          type="services"
        />
      </div>
    </div>
  );
}

export default page;
