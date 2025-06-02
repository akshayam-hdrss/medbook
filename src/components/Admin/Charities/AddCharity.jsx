"use client";
import React, { useState } from "react";
import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import { addCharity } from "@/firebase/firestore/charity";

function AddCharity({ open, setOpen }) {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [upiId, setUpiId] = useState();
  const [upiName, setUpiName] = useState();
  const [video, setVideo] = useState();
  const [profile, setProfile] = useState();
  const [background, setBackground] = useState();

  const handleOpen = () => setOpen(!open);
  const handleSubmit = async () => {
    await addCharity(
      name,
      upiId,
      upiName,
      description,
      video,
      profile,
      background
    );
    setOpen(false);
  };

  return (
    <div className="p-6">
      <Button onClick={handleOpen} className="bg-kaavi">
        Add new charity
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        className="overflow-scroll"
        style={{ maxHeight: "calc(100vh - 200px)" }}
      >
        <DialogBody className="mx-auto w-full font-inter text-black">
          <div>
            <h1 className="font-bold text-xl">Add new Charity</h1>
            <div className="pt-10 pb-6 flex flex-col gap-y-6">
              <div className="flex flex-col gap-y-2">
                <p className="font-medium">Enter the name of the charity</p>
                <input
                  type="text"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                  className="border border-kaavi w-fit pr-6 pl-2 py-2"
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <p className="font-medium">Enter the UPI ID of the charity</p>
                <input
                  type="text"
                  placeholder="UPI ID"
                  required
                  onChange={(e) => setUpiId(e.target.value)}
                  className="border border-kaavi w-fit pr-6 pl-2 py-2"
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <p className="font-medium">Enter the UPI Name of the charity</p>
                <input
                  type="text"
                  placeholder="UPI Name"
                  required
                  onChange={(e) => setUpiName(e.target.value)}
                  className="border border-kaavi w-fit pr-6 pl-2 py-2"
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <p className="font-medium">
                  Enter the description of the charity
                </p>
                <textarea
                  rows={15}
                  cols={60}
                  type="text"
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                  className="border border-kaavi w-fit pr-6 pl-2"
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <p className="font-medium">Enter the video link</p>
                <input
                  type="text"
                  onChange={(e) => setVideo(e.target.value)}
                  placeholder="Youtube link"
                  className="border border-kaavi w-fit pr-6 pl-2 py-2"
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <p className="font-medium">
                  Enter the profile picture (Should be 4:5 Aspect Ratio)
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setProfile(e.target.files[0])}
                  className="border border-kaavi w-fit pr-6 pl-2 py-2"
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <p className="font-medium">Enter the background image</p>
                <ul className="list-disc pl-5">
                  <li>
                    Aspect Ratio: <strong>16:9</strong>
                  </li>
                  <li>
                    Resolution: <strong>1920x1080 pixels</strong>
                  </li>
                  <li>
                    File Format: <strong>JPEG or PNG</strong>
                  </li>
                  <li>
                    File Size: <strong>Less than 1MB</strong>
                  </li>
                </ul>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setBackground(e.target.files[0])}
                  className="border border-kaavi w-fit pr-6 pl-2 py-2"
                />
              </div>
              <div className="flex justify-evenly">
                <button
                  onClick={handleOpen}
                  className="border border-grey px-20 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-kaavi text-white px-20 py-2 rounded-md"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
}

export default AddCharity;
