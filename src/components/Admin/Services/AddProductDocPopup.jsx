"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Input,
  DialogBody,
  Typography,
} from "@material-tailwind/react";
import { addProduct } from "@/firebase/firestore/products";
import { IoClose } from "react-icons/io5";

function AddProductDocPopup({
  open,
  setOpen,
  previous,
  beforeprevious,
  rootprevious,
  previousname,
}) {
  const [data, setData] = useState({});
  const [profile, setProfile] = useState();
  const [youtubeLinks, setYoutubeLinks] = useState([]); //State for storing youtube links
  const [newLink, setNewLink] = useState(""); //State for current youtube link
  const [photos, setPhotos] = useState([]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData({
      ...data,
      [id]: value,
    });
  };
  const handleClose = () => {
    setOpen(!open);
  };
  const handleAddLink = () => {
    if (newLink) {
      setYoutubeLinks([...youtubeLinks, newLink]); // Add new link to the state
      setNewLink(""); // Clear the input field
    }
  };

  const handleProfile = (e) => {
    setProfile(e.target.files[0]);
  };
  const handleOpen = () => setOpen(!open);

  const handleCancel = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setOpen(!open);
    data.disabled = false;
    await addProduct(
      previous,
      beforeprevious,
      rootprevious,
      data,
      profile,
      youtubeLinks
    );
  };

  useEffect(() => {
    setData({});
    setYoutubeLinks([]); // Reset youtube links when dialog opens
  }, [open]);

  return (
    <>
      <Button className="bg-kaavi" onClick={handleOpen}>
        Add new {previousname}
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        className="overflow-scroll"
        dismiss={{ enabled: false }}
        style={{ maxHeight: "calc(100vh - 200px)" }}
      >
        <DialogBody className="mx-auto w-full font-inter">
          <div className="flex justify-between items-center mb-4">
            <Typography variant="h4" color="blue-gray">
              Add a Product
            </Typography>
            <IoClose fontSize={30} onClick={handleClose} />
          </div>

          <form action="submit">
            <div className="flex flex-col justify-between items-start">
              <p className="text-xl font-medium mb-1">Profile Picture</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfile}
                className="mb-4"
              />
              <p className="text-xl font-medium mb-1">Photos</p>
              <Input
                type="file"
                placeholder="photos"
                onChange={(e) => setPhotos([...e.target.files])}
                className="border border-kaavi mb-6 w-60"
                accept="image/*"
                multiple
              />
              <p className="text-xl font-medium mb-1">YouTube Links</p>
              <Input
                type="text"
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)} // Update newLink state
                placeholder="Enter YouTube link"
                className="border border-kaavi pl-4 py-3 mb-6"
              />
              <Button onClick={handleAddLink} className="my-4 bg-kaavi">
                Add Link
              </Button>
              {youtubeLinks && (
                <div className="text-black text-xl my-4">
                  <h1>Added Youtube Links</h1>
                  {youtubeLinks.map((link, index) => (
                    <p key={index}>{link}</p> // Display the added links
                  ))}
                </div>
              )}

              <p className="text-xl font-medium mb-1">Name</p>

              <Input
                type="text"
                id="name"
                onChange={handleChange}
                placeholder="Name"
                className="border border-kaavi pl-4 py-3 mb-6"
              />
              <p className="text-xl font-medium mb-1">Experience (in Years)</p>
              <input
                type="number"
                id="experience"
                onChange={handleChange}
                placeholder="Experience"
                className="border border-kaavi pl-4 py-3 mb-6"
              />
              <p className="text-xl font-medium mb-1">About</p>
              <textarea
                name="about"
                id="about"
                onChange={handleChange}
                rows={5}
                cols={60}
                className="border border-kaavi pl-4 py-3 mb-6"
              ></textarea>
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
              <p className="text-xl font-medium mb-1">Contact Number</p>
              <Input
                type="number"
                id="mobile"
                onChange={handleChange}
                placeholder="Contact Number"
                className="border border-kaavi pl-4 py-3 mb-6"
              />
              <p className="text-xl font-medium mb-1">Whatsapp Number</p>
              <Input
                type="number"
                id="whatsapp"
                onChange={handleChange}
                placeholder="Whatsapp Number"
                className="border border-kaavi pl-4 py-3 mb-6"
              />
              <p className="text-xl font-medium mb-1">Google Maps Link</p>

              <Input
                type="text"
                id="mapsurl"
                onChange={handleChange}
                placeholder="Maps URL"
                className="border border-kaavi pl-4 py-3 mb-6"
              />

              <p className="text-xl font-medium mb-1">Buy Link 1</p>

              <Input
                type="text"
                id="buylink1"
                onChange={handleChange}
                placeholder="Link to a service"
                className="border border-kaavi pl-4 py-3 mb-6"
              />
              <p className="text-xl font-medium mb-1">Buy Link 2</p>

              <Input
                type="text"
                id="buylink2"
                onChange={handleChange}
                placeholder="Link to another service"
                className="border border-kaavi pl-4 py-3 mb-6"
              />

              <div className="flex justify-between mt-6">
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

export default AddProductDocPopup;
