"use client";
import React, { useState, useEffect } from "react";
import AddLeaderPopup from "@/components/Admin/Leaders/AddLeaderPopup";
import {
  getDistrictLeaders,
  getExistingSNos,
  getLeadersDistrict,
  getMaxSno,
  getStateLeaders,
} from "@/firebase/firestore/leaders";
import EditLeaderPopup from "@/components/Admin/Leaders/EditLeaderPopup";
import DeleteLeaderPopup from "@/components/Admin/Leaders/DeleteLeaderPopup";
import BackButton from "@/components/ui/BackButton";
import AddDistrict from "@/components/Admin/Leaders/AddDistrict";
import DeleteDistrict from "@/components/Admin/Leaders/DeleteDistrict";
import EditDistrict from "@/components/Admin/Leaders/EditDistrict";
function LeadersPage() {
  const [districtLeaders, setDistrictLeaders] = useState("");
  const [stateLeaders, setStateLeaders] = useState();
  const [existingdistricts, setExistingDistricts] = useState();
  const [selectedDistrict, setSelectedDistrict] = useState();
  const [addOpen, setAddOpen] = useState();
  const [editOpen, setEditOpen] = useState();
  const [deleteOpen, setDeleteOpen] = useState();
  const [maxSnoState, setMaxSnoState] = useState();
  const [existingSnos, setExistingSnos] = useState();
  const [stateAvailableSNos, setStateAvailableSnos] = useState();
  const [districtOpen, setDistrictOpen] = useState();
  const [deleteDistrictOpen, setDeleteDistrictOpen] = useState();
  const [editDistrictOpen, setEditDistrictOpen] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const data2 = await getStateLeaders();
      setStateLeaders(data2);
      const data3 = await getLeadersDistrict();
      setExistingDistricts(data3);
    };
    fetchData();
  }, [
    addOpen,
    editOpen,
    deleteOpen,
    districtOpen,
    editDistrictOpen,
    deleteDistrictOpen,
  ]);
  useEffect(() => {
    const fetchData = async () => {
      const data1 = await getDistrictLeaders(selectedDistrict);
      setDistrictLeaders(data1);
    };
    fetchData();
  }, [selectedDistrict, addOpen, editOpen, deleteOpen]);
  useEffect(() => {
    const fetch = async () => {
      const data = await getMaxSno();
      setMaxSnoState(data);
    };

    const fetch2 = async () => {
      const data = await getExistingSNos();
      setExistingSnos(data);
    };
    fetch();
    fetch2();
  }, [addOpen, editOpen]);
  return (
    <div className="p-10">
      <BackButton />
      <h1 className="text-2xl mb-10 font-bold">Leaders</h1>
      <AddLeaderPopup
        open={addOpen}
        setOpen={setAddOpen}
        maxSnoState={maxSnoState}
        districts={existingdistricts}
      />
      <EditLeaderPopup
        open={editOpen}
        setOpen={setEditOpen}
        districts={existingdistricts}
      />
      <DeleteLeaderPopup
        open={deleteOpen}
        setOpen={setDeleteOpen}
        districts={existingdistricts}
      />
      <h1 className="text-xl font-bold mt-4 mb-10">State Level Leaders</h1>
      <div className="grid grid-cols-2 gap-x-6 gap-y-6 ">
        {stateLeaders &&
          stateLeaders.map((doc, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-[130px] h-fit mb-1">
                <img
                  src={doc.data.profile}
                  alt="Profile"
                  className="object-cover aspect-[4/5] border border-kaavi"
                />
              </div>
              <h1 className="font-bold text-lg">{doc.data.name}</h1>
              <h2 className="text-center">{doc.data.position}</h2>
            </div>
          ))}
      </div>

      <h1 className="text-xl font-bold mt-10">District Level Leaders</h1>
      <div className="flex justify-between mx-2 items-center mb-10 mt-6">
        <select
          name="districtleaders"
          id="districts"
          value={selectedDistrict}
          className=" border-2 p-3 rounded-xl border-kaavi"
          onChange={(e) => setSelectedDistrict(e.target.value)}
        >
          <option value=" ">District</option>
          {existingdistricts &&
            existingdistricts.map((doc, index) => (
              <option value={doc.id} key={index}>
                {doc.data.name}
              </option>
            ))}
        </select>
        <AddDistrict open={districtOpen} setOpen={setDistrictOpen} />
        <EditDistrict open={editDistrictOpen} setOpen={setEditDistrictOpen} />
        <DeleteDistrict
          open={deleteDistrictOpen}
          setOpen={setDeleteDistrictOpen}
        />
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-6 ">
        {districtLeaders &&
          districtLeaders.map((doc, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-[130px] h-fit mb-1">
                <img
                  src={doc.data.profile}
                  alt="Profile"
                  className="object-cover aspect-[4/5] border border-kaavi"
                />
              </div>
              <h1 className="font-bold text-lg">{doc.data.name}</h1>
              <h2 className="text-center">{doc.data.position}</h2>
            </div>
          ))}
      </div>
    </div>
  );
}

export default LeadersPage;
