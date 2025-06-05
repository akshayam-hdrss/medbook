"use client";
import React, { useEffect, useState } from "react";
import {
  addGalleryHDRSS,
  deleteGalleryPhotoHDRSS,
  getHDRSS,
  updateHDRSS,
} from "@/firebase/firestore/hdrss";
import { Dialog, Typography, DialogBody } from "@material-tailwind/react";
import { IoClose } from "react-icons/io5";

function AdminHdrssPage() {
  const [data, setData] = useState({});
  const [profile, setProfile] = useState();
  const [background, setBackground] = useState();
  const [exisitingData, setExistingData] = useState();
  const [open, setOpen] = useState();
  const [photos, setPhotos] = useState();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = async (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };

  const handleDelete = async (photo) => {
    await deleteGalleryPhotoHDRSS(photo);
  };
  const handleAddGallery = async () => {
    await addGalleryHDRSS(photos);
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateHDRSS(data, profile, background);
  };
  useEffect(() => {
    const fetch = async () => {
      const data = await getHDRSS();
      setExistingData(data);
    };
    fetch();
  });
  return (
    <div>
      <h1 className="text-4xl font-bold mb-10">About HDRSS</h1>
      <p className="font-medium text-lg mt-12 mb-2">Enter Profile Image</p>
      <input
        type="file"
        id="profile"
        onChange={(e) => setProfile(e.target.files[0])}
      />

      <p className="font-medium text-lg mt-12 mb-2">Enter background Image</p>
      <input
        type="file"
        id="background"
        onChange={(e) => setBackground(e.target.files[0])}
      />

      <p className="font-medium text-lg mt-12 mb-2">Enter About</p>
      <textarea
        name="about"
        id="about"
        onChange={handleChange}
        className="md:w-[90%] focus:outline-none border border-kaavi min-h-32 p-2"
      />

      <button
        onClick={handleSubmit}
        className="bg-kaavi text-white px-4 py-2 block rounded-lg my-10"
      >
        Update
      </button>
      <button
        className="bg-kaavi text-white px-4 py-2 rounded-md"
        onClick={handleOpen}
      >
        Edit Gallery
      </button>

      <Dialog
        open={open}
        handler={handleOpen}
        className="overflow-scroll"
        style={{ maxHeight: "calc(100vh - 200px)" }}
      >
        <DialogBody className=" mx-auto w-full h-full">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <Typography variant="h4" color="blue-gray">
                Preview
              </Typography>
              <IoClose fontSize={30} onClick={handleClose} />
            </div>
            <div>
              {exisitingData &&
                exisitingData.gallery.map((photo, index) => (
                  <div key={index} className="relative">
                    <img
                      src={photo}
                      alt="photo index"
                      className="w-[85%] mx-auto rounded-xl my-2 border border-grey"
                    />
                    <IoClose
                      className="bg-white rounded-full absolute top-0 right-4"
                      fontSize={30}
                      onClick={() => handleDelete(photo)}
                    />
                  </div>
                ))}
              <input
                type="file"
                multiple
                onChange={(e) => setPhotos([...e.target.files])}
              />
              <button
                className="bg-kaavi text-white rounded-md px-4 py-2 block mt-8"
                onClick={handleAddGallery}
              >
                Submit photos
              </button>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
}

export default AdminHdrssPage;
