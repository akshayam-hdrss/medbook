import React, { useEffect, useState } from "react";
import { Dialog, DialogBody } from "@material-tailwind/react";
import signUp from "@/firebase/auth/signup";

function CreateExecutive({ open, setOpen }) {
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [mobile, setMobile] = useState();
  const [password, setPassword] = useState();
  const handleOpen = () => setOpen(!open);
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUp(mobile, email, password, userName, true);
      setOpen(!open);
    } catch (error) {
      alert("Error signing up: " + error.message);
    }
  };

  return (
    <>
      <button
        className="bg-kaavi text-white px-4 py-2 rounded-md mb-6"
        onClick={handleOpen}
      >
        Create New Executive
      </button>
      <Dialog
        open={open}
        handler={handleOpen}
        className="overflow-scroll"
        dismiss={{ enabled: false }}
        style={{ maxHeight: "calc(100vh - 200px)" }}
      >
        <DialogBody className="mx-auto w-full font-inter">
          <h1 className="text-2xl font-medium mb-4">Create New Executive</h1>
          <div className="flex flex-col justify-between items-start">
            <p className="text-xl font-medium mb-1">User Name</p>
            <input
              type="text"
              id="username"
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Eg: Exec 5"
              className="border border-kaavi pl-4 py-2 rounded-sm mb-6"
            />
            <p className="text-xl font-medium mb-1">Mobile Number</p>
            <input
              type="number"
              id="mobile"
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Email"
              className="border border-kaavi pl-4 py-2 rounded-sm mb-6"
            />
            <p className="text-xl font-medium mb-1">Email</p>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="border border-kaavi pl-4 py-2 rounded-sm mb-6"
            />
            <p className="text-xl font-medium mb-1">Password</p>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="border border-kaavi pl-4 py-2 rounded-sm mb-6"
            />
          </div>

          <div className="w-full flex justify-evenly items-center">
            <button
              className="border border-black px-4 py-2 rounded-md"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button
              className="bg-kaavi text-white px-4 py-2 rounded-md"
              onClick={handleSignUp}
            >
              Create
            </button>
          </div>
        </DialogBody>
      </Dialog>
      {/* <form action="submit">
            <div className="grid grid-cols-2 gap-x-4">
              <div className="flex flex-col justify-between items-start">
                <p className="text-xl font-medium mb-1">Profile Picture</p>
                <input
                  type="file"
                  onChange={(e) => setExecProfile(e.target.files[0])}
                  className="border border-kaavi rounded-sm mb-6 w-60"
                  accept="image/*"
                />

                <p className="text-xl font-medium mb-1">Name</p>
                <input
                  type="text"
                  id="name"
                  onChange={handleChange}
                  placeholder="Name"
                  className="border border-kaavi pl-4 py-2 rounded-sm mb-6"
                />

                <p className="text-xl font-medium mb-1">Father/Husband Name</p>
                <input
                  type="text"
                  id="father/husband-name"
                  onChange={handleChange}
                  placeholder="Father/Husband Name"
                  className="border border-kaavi pl-4 py-2 rounded-sm mb-6"
                />
                <p className="text-xl font-medium mb-1">Door Number & Street</p>
                <input
                  type="text"
                  id="address"
                  onChange={handleChange}
                  placeholder="Address"
                  className="border border-kaavi pl-4 py-2 rounded-sm mb-6"
                />
                <p className="text-xl font-medium mb-1">Village/Area</p>
                <input
                  type="text"
                  id="address"
                  onChange={handleChange}
                  placeholder="Address"
                  className="border border-kaavi pl-4 py-2 rounded-sm mb-6"
                />
              </div>
            </div>
          </form> */}
    </>
  );
}

export default CreateExecutive;
