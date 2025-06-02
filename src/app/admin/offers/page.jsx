"use client";
import React, { useState, useEffect } from "react";
import AddOffer from "@/components/Admin/Offers/AddOffer";
import EditOffer from "@/components/Admin/Offers/EditOffer";
import DeleteOffer from "@/components/Admin/Offers/DeleteOffer";
import { getOffers } from "@/firebase/firestore/offers";

function offersAdmin() {
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [offers, setOffers] = useState();
  const [editId, setEditId] = useState();
  const [deleteId, setDeleteId] = useState();
  useEffect(() => {
    const fetch = async () => {
      const data = await getOffers();
      setOffers(data);
      console.log(data);
    };
    fetch();
  }, [addOpen, editOpen, deleteOpen]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Offers</h1>
      <div className="flex justify-center py-5">
        <button
          className="bg-kaavi mx-2 text-white px-4 py-2 rounded-md"
          onClick={() => setAddOpen(true)}
        >
          Add
        </button>
        <EditOffer open={editOpen} setOpen={setEditOpen} id={editId} />
        <DeleteOffer open={deleteOpen} setOpen={setDeleteOpen} id={deleteId} />
      </div>
      {addOpen && <AddOffer open={addOpen} setOpen={setAddOpen} />}
      <div className="grid grid-cols-1">
        {offers &&
          offers.map((doc, index) => (
            <div
              key={index}
              className="flex justify-center items-center bg-red-100"
            >
              <div className="flex justify-center w-[400px]">
                {/* <div
                  className="w-full h-40 bg-no-repeat bg-cover"
                  style={{ backgroundImage: `url(/coupon.png)` }}
                >
                  <div className="grid grid-cols-2 h-full px-5 gap-5">
                    <h1 className="font-inter font-bold text-4xl text-kaavi uppercase my-auto">
                      {doc.brand}
                    </h1>

                    <div className="flex justify-center items-center h-full">
                      <div className="">
                        <h1 className="font-semibold text-2xl">
                          {doc.percent}
                        </h1>
                        <h3>{doc.subText}</h3>
                      </div>
                    </div>
                  </div>
                </div> */}
                <img src={doc.photo} alt="" className="max-w-[300px]" />
              </div>
              <div className="flex flex-col justify-evenly">
                {/* <button
                  className="bg-kaavi text-white px-4 py-2 rounded-md mt-6"
                  onClick={() => {
                    setEditId(doc.id);
                    setEditOpen(!editOpen);
                  }}
                >
                  Edit
                </button> */}
                <button
                  className="bg-kaavi text-white px-4 py-2 rounded-md mt-6"
                  onClick={() => {
                    setDeleteId(doc.id);
                    setDeleteOpen(!deleteOpen);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default offersAdmin;
