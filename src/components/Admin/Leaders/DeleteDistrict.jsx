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
  getDistrictsOfLeaders,
} from "@/firebase/firestore/leaders";
import { IoClose } from "react-icons/io5";
function DeleteDistrict({ open, setOpen }) {
  const [districts, setDistricts] = useState();
  const [deleteselect, setDeleteselect] = useState();
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleDelete = async () => {
    await deleteDistrict(deleteselect);
    setOpen(false);
  };
  useEffect(() => {
    const fetch = async () => {
      const districts = await getDistrictsOfLeaders();
      setDistricts(districts);
    };
    fetch();
  });
  return (
    <>
      <Button onClick={handleOpen} className="bg-kaavi cursor-pointer">
        Delete district
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        className="overflow-scroll"
        style={{ maxHeight: "calc(100vh - 200px)" }}
      >
        <DialogBody className="mx-auto w-full h-full font-inter">
          <div className="flex justify-between items-center">
            <Typography variant="h4" color="blue-gray">
              Delete District
            </Typography>
            <IoClose fontSize={25} onClick={handleOpen} />
          </div>
          <div className="my-6 flex flex-col items-start justify-evenly">
            <h1 className="text-xl font-bold text-red-600">
              Warning: All Leaders under this district will be deleted
            </h1>
            <Typography className="" variant="h6">
              Select the District
            </Typography>
            <select
              name="selectdistrict"
              onChange={(e) => setDeleteselect(e.target.value)}
            >
              <option value=" "></option>
              {districts &&
                districts.map((dis, index) => (
                  <option key={index} value={dis.id}>
                    {dis.name}
                  </option>
                ))}
            </select>
            <button
              onClick={handleDelete}
              className="text-white mt-6 bg-kaavi px-4 py-2 rounded-md"
            >
              Delete
            </button>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}

export default DeleteDistrict;
