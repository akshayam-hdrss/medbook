import React from "react";
import {
  Button,
  Dialog,
  Typography,
  DialogBody,
} from "@material-tailwind/react";
import { IoClose } from "react-icons/io5";
import { deleteOffer } from "@/firebase/firestore/offers";

function DeleteOffer({ open, setOpen, id }) {
  const handleOpen = () => setOpen(!open);
  const handleClose = () => setOpen(!open);
  const handleDelete = async () => {
    await deleteOffer(id);
    setOpen(!open);
  };
  return (
    <>
      <Button onClick={handleOpen} className="bg-kaavi mx-2 hidden">
        Delete
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        className="w-[250px]"
        size="xs"

      >
        <DialogBody className=" h-full text-black font-inter">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h1 className="font-semibold text-xl">Are you Sure</h1>
              <IoClose fontSize={30} onClick={handleClose} />
            </div>
            <div className="flex justify-around gap-x-8">
              <button
                className="border border-black rounded-md px-4 py-2"
                onClick={() => setOpen(!open)}
              >
                No
              </button>
              <button
                className="bg-kaavi text-white rounded-md px-4 py-2"
                onClick={handleDelete}
              >
                Yes
              </button>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}

export default DeleteOffer;
