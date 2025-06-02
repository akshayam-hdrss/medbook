"use client";
import React, { useState } from "react";
import { addServicesAndProductsDoc } from "@/firebase/firestore/servicesProducts";
import { Button, Dialog, DialogBody, Input } from "@material-tailwind/react";

function AddServiceDocPopup({
  open,
  setOpen,
  previous,
  beforeprevious,
  rootprevious,
  previousname,
}) {
  const [profile, setProfile] = useState();
  const [addData, setAddData] = useState();
  const [backgroundImage, setBackgroundImage] = useState();
  const [photos, setPhotos] = useState([]);

  const handleOpen = () => setOpen(!open);
  const handleCancel = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setAddData({
      ...addData,
      [id]: value,
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setOpen(!open);
    const id = addData.name.replace(/\s+/g, "").toLowerCase();
    addData.disabled = false;
    addServicesAndProductsDoc(
      rootprevious,
      beforeprevious,
      previous,
      addData,
      profile,
      backgroundImage,
      photos,
      "services",
      id
    );
  };
  return (
    <>
      <Button className="bg-kaavi" onClick={handleOpen}>
        Add
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        className="overflow-scroll"
        style={{ maxHeight: "calc(100vh - 200px)" }}
      >
        <DialogBody className="mx-auto w-full font-inter">
          <form action="submit">
            <div className="flex flex-col justify-between items-start">
              <p className="text-xl font-medium mb-1">Profile Picture</p>
              <Input
                type="file"
                onChange={(e) => setProfile(e.target.files[0])}
                className="border border-kaavi mb-6 w-60"
                accept="image/*"
              />
              <p className="text-xl mt-2 font-medium mb-1">
                Background Image (1920 * 1080 pixels)
              </p>
              <Input
                type="file"
                onChange={(e) => setBackgroundImage(e.target.files[0])}
                className="border border-kaavi mb-6 w-60"
                accept="image/*"
              />
              <p className="text-xl font-medium mb-1">Name</p>
              <Input
                type="text"
                id="name"
                onChange={handleChange}
                placeholder="Name"
                className="border border-kaavi pl-4 py-3 mb-6"
              />
              <p className="text-xl font-medium mb-1">Business Name</p>
              <Input
                type="text"
                id="businessName"
                onChange={handleChange}
                placeholder="Name"
                className="border border-kaavi pl-4 py-3 mb-6"
              />
              <p className="text-xl font-medium mb-1">Experience (in Years)</p>
              <Input
                type="number"
                id="experience"
                onChange={handleChange}
                placeholder="Experience"
                className="border border-kaavi pl-4 py-3 mb-6"
              />
              <p className="text-xl font-medium mb-1">Mobile Number</p>
              <Input
                type="number"
                id="mobile"
                onChange={handleChange}
                placeholder="Mobile Number"
                className="border border-kaavi pl-4 py-3 mb-6"
              />
              <p className="text-xl font-medium mb-1">Whatsapp Number</p>
              <Input
                type="text"
                id="whatsapp"
                onChange={handleChange}
                placeholder="Whatsapp Number"
                className="border border-kaavi pl-4 py-3 mb-6"
              />
              <p className="text-xl font-medium mb-1">About</p>
              <textarea
                name="about"
                id="about"
                onChange={handleChange}
                rows={5}
                cols={40}
                className="border border-kaavi pl-4 py-3 mb-6"
              ></textarea>
              <p className="text-xl font-medium mb-1">Photos</p>
              <Input
                type="file"
                placeholder="photos"
                onChange={(e) => setPhotos([...e.target.files])}
                className="border border-kaavi mb-6 w-60"
                accept="image/*"
                multiple
              />
              <p className="text-xl font-medium mb-1">Address Line 1</p>
              <input
                type="text"
                id="addLine1"
                onChange={handleChange}
                className="border border-kaavi pl-4 py-3 mb-6"
              />
              <p className="text-xl font-medium mb-1">Address Line 2</p>
              <input
                type="text"
                id="addLine2"
                onChange={handleChange}
                className="border border-kaavi pl-4 py-3 mb-6"
              />
              <p className="text-xl font-medium mb-1">Landmark</p>
              <input
                type="text"
                id="landmark"
                onChange={handleChange}
                className="border border-kaavi pl-4 py-3 mb-6"
              />
              <p className="text-xl font-medium mb-1">Area</p>
              <input
                type="text"
                id="area"
                placeholder="Eg: RS Puram"
                onChange={handleChange}
                className="border border-kaavi pl-4 py-3 mb-6"
              />
              <p className="text-xl font-medium mb-1">Pincode</p>
              <input
                type="text"
                placeholder="Eg: 641032"
                id="pincode"
                onChange={handleChange}
                className="border border-kaavi pl-4 py-3 mb-6"
              />
              <p className="text-xl font-medium mb-1">District</p>
              <input
                type="text"
                placeholder="District"
                id="district"
                onChange={handleChange}
                className="border border-kaavi pl-4 py-3 mb-6"
              />
              <p className="text-xl font-medium mb-1">Youtube Video Link</p>
              <input
                type="text"
                id="video"
                onChange={handleChange}
                className="border border-kaavi pl-4 py-3 mb-6"
              />
              <p className="text-xl font-medium mb-1">Google Maps Link</p>
              <input
                type="text"
                placeholder="Google Maps URL"
                id="mapurl"
                onChange={handleChange}
                className="border border-kaavi pl-4 py-3 mb-6"
              />
              <div className="flex justify-between">
                <button
                  className="border border-black mr-2 p-2 px-14"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  className="text-white bg-kaavi p-2 px-14"
                  onClick={handleAdd}
                >
                  Add
                </button>
              </div>
            </div>
          </form>
        </DialogBody>
      </Dialog>
    </>
  );
}

export default AddServiceDocPopup;
