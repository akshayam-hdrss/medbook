import React, { useEffect } from "react";
import { useState } from "react";
import {
  Button,
  Dialog,
  Typography,
  DialogBody,
} from "@material-tailwind/react";
import {
  deleteDistrict,
  editDistrictofLeaders,
  getDistrictsOfLeaders,
  getOneDistrict,
} from "@/firebase/firestore/leaders";
import { IoClose } from "react-icons/io5";

function EditDistrict({ open, setOpen }) {
  const [districts, setDistricts] = useState();
  const [editselect, setEditselect] = useState();
  const [old, setOld] = useState();
  const [newData, setNewData] = useState();
  const handleOpen = () => {
    setOpen(!open);
    setOld(null);
  };
  const handleEdit = async () => {
    await editDistrictofLeaders(editselect, newData);
    setOpen(false);
  };
  useEffect(() => {
    const fetch = async () => {
      const districts = await getDistrictsOfLeaders();
      setDistricts(districts);
    };
    fetch();
  }, [open]);

  useEffect(() => {
    const fetch = async () => {
      const name = await getOneDistrict(editselect);
      setOld(name);
    };
    fetch();
  }, [editselect]);
  return (
    <>
      <Button onClick={handleOpen} className="bg-kaavi cursor-pointer">
        Edit district
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        className="overflow-scroll"
        style={{ maxHeight: "calc(100vh - 200px)" }}
      >
        <DialogBody className="mx-auto w-full h-full font-inter text-black">
          <div className="flex justify-between items-center">
            <Typography variant="h4">Edit District</Typography>
            <IoClose fontSize={25} onClick={handleOpen} />
          </div>
          <div>
            <p>Select the District</p>
            <select
              name="select"
              onChange={(e) => {
                setEditselect(e.target.value);
              }}
            >
              <option value=" "></option>
              {districts &&
                districts.map((dis, index) => (
                  <option key={index} value={dis.id}>
                    {dis.name}
                  </option>
                ))}
            </select>

            <p>Enter new Name for the District</p>
            <input
              type="text"
              defaultValue={old && old}
              onChange={(e) => setNewData(e.target.value)}
              className="border border-kaavi"
            />

            <button
              className="bg-kaavi text-white px-4 py-2 rounded-md block mt-8"
              onClick={handleEdit}
            >
              Update
            </button>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}

export default EditDistrict;
