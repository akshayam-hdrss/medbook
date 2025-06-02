"use client";
import React, { useEffect, useState } from "react";

import { Dialog, Typography, DialogBody } from "@material-tailwind/react";
import { IoClose } from "react-icons/io5";

import { useParams } from "next/navigation";
import {
  addCompany,
  getCompany,
  deleteGalleryPhoto,
  addGallery,
} from "../../../../firebase/firestore/companies";

function Company() {
  const [companyPhoto, setCompanyPhoto] = useState(null);
  const [companyCoverPhoto, setCompanyCoverPhoto] = useState(null);
  const [companyDetails, setCompanyDetails] = useState({});
  const [exisitingCompany, setExistingCompany] = useState();
  const [companyGallery, setCompanyGallery] = useState([]);
  const [open, setOpen] = useState();
  const [photos, setPhotos] = useState();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { id, value } = e.target;

    setCompanyDetails({
      ...companyDetails,
      [id]: value,
    });
  };

  const { name } = useParams();

  const handleCompany = async (e) => {
    e.preventDefault();
    await addCompany(companyDetails, companyPhoto,companyCoverPhoto, name);
  };
  const handleDelete = async (photo) => {
    await deleteGalleryPhoto(photo, name);
  };
  const handleAddGallery = async () => {
    await addGallery(photos, name);
    setOpen(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      const data = await getCompany(name);
      setExistingCompany(data);
      setCompanyGallery(data.gallery);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col justify-evenly items-start gap-y-4">
      <div>
        <p className="font-medium lg:text-lg">Enter the Name</p>
        <input
          type="text"
          placeholder="Name of the Company"
          id="name"
          className="border-2 border-kaavi py-1 pl-1 pr-5 rounded-md"
          defaultValue={exisitingCompany && exisitingCompany.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <p className="font-medium lg:text-lg">Enter about</p>
        <textarea
          type="text"
          placeholder="About the Leader"
          id="about"
          className="border-2 md:w-96 md:h-96 border-kaavi py-1 my-2 pl-1 pr-5 rounded-md"
          rows={4}
          cols={35}
          defaultValue={exisitingCompany && exisitingCompany.about}
          onChange={handleChange}
        />
      </div>

      <div className="flex justify-evenly gap-x-8">
        <div>
          <p className="font-medium lg:text-lg">Email Address</p>
          <input
            type="text"
            placeholder="Email Address"
            id="email"
            className="border-2 border-kaavi py-1 pl-1 pr-5 rounded-md"
            defaultValue={exisitingCompany && exisitingCompany?.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <p className="font-medium lg:text-lg">Mobile Number</p>
          <input
            type="text"
            placeholder="Mobile Number"
            id="mobile"
            className="border-2 border-kaavi py-1 pl-1 pr-5 rounded-md"
            defaultValue={exisitingCompany && exisitingCompany?.mobile}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <p className="font-medium lg:text-lg">Give Profile Picture</p>
        <input
          type="file"
          className="border-2 border-kaavi py-1 pl-1 rounded-md"
          onChange={(e) => setCompanyPhoto(e.target.files[0])}
        />
      </div>

      <div>
        <p className="font-medium lg:text-lg">Give Background Cover Picture</p>
        <input
          type="file"
          className="border-2 border-kaavi py-1 pl-1 rounded-md"
          onChange={(e) => setCompanyCoverPhoto(e.target.files[0])}
        />
      </div>
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
              {companyGallery &&
                companyGallery.map((photo, index) => (
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
      <button
        onClick={handleCompany}
        className="bg-kaavi font-bold text-white px-4 py-2 rounded-md my-6"
      >
        Update
      </button>
    </div>
  );
}

export default Company;
