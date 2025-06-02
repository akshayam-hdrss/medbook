"use client";
import { getComplaints,deleteComplaint } from "@/firebase/firestore/complaints";
import React, { useEffect, useState } from "react";
import { Dialog, DialogBody, Spinner } from "@material-tailwind/react";

function page() {
  useEffect(() => {
    const fetchComplaints = async() => {
      const res = await getComplaints();
      setComplaints(res)
    }
   fetchComplaints();
  }, [])
  const [complaints,setComplaints] = useState([])
  console.log(complaints);
  const [open, setOpen] = useState(false);
  const [deleteId,setDeleteId] = useState("")
  console.log(deleteId);
  const handleDelete = async() => {
    try {
      await deleteComplaint(deleteId);
      console.log("deleted")
      handleOpen();
    } catch (error) {
      console.log(error)
    }
  };

  const handleOpen = (id) => {
    setDeleteId(id);
    setOpen(!open);
  };
  return (
    <div>
      <Dialog
        className="bg-gray-100 w-[100px]"
        open={open}
        handler={handleOpen}
        size="xs"
      >
        <DialogBody>
          <div className="cursor-pointer text-black">
            <h1 className="text-center pb-5 "> Are you Sure ?</h1>
            <div className="py-2 flex justify-center gap-8">
              <h1 onClick={handleDelete} className="bg-red-500 px-3 py-1 rounded-lg text-white">Yes</h1>
              <h1 onClick={handleOpen}  className="bg-green-200 px-3 py-1 rounded-lg text-white">No</h1>
            </div>
          </div>
        </DialogBody>
      </Dialog>
      <h1 className="text-4xl font-bold">Complaints</h1>
      <h2 className="mt-6 font-medium text-2xl">
        Number of complaints: {complaints.length}
      </h2>
      {complaints.map((complaint, index) => (
        <div className="border rounded-2xl border-grey my-6 w-max mx-auto px-6 pt-6">
          <h1 className="font-bold">Subject</h1>
          <h1>{complaint.data.subject}</h1>
          <h1 className="font-bold">Description</h1>
          <p>{complaint.data.description}</p>
          <h1 className="font-bold">Location</h1>
          <p>{complaint.data.location}</p>
          <div className="flex justify-center">
            <h1 onClick={()=>handleOpen(complaint.id)} className="px-5 cursor-pointer py-1.5 bg-red-500 text-white rounded-t-xl">
              Delete
            </h1>
          </div>
        </div>
      ))}
    </div>
  );
}

export default page;
