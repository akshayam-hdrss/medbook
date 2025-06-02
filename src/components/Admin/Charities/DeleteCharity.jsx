"use client";
import React from "react";
import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import { deleteCharity } from "@/firebase/firestore/charity";

function DeleteCharity({ open, setOpen, id, name }) {
  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(!open);
  };

  const handleDelete = async () => {
    await deleteCharity(id, name);
  };

  return (
    <>
      <Button onClick={handleOpen} className="bg-kaavi mx-2 my-3 hidden">
        Delete
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        className="overflow-scroll"
        style={{ maxHeight: "calc(100vh - 200px)" }}
      >
        <DialogBody className="mx-auto w-full font-inter text-black">
          <div>
            <h1 className="text-3xl font-bold mb-20">Are you Sure?</h1>
            <div className="flex justify-evenly">
              <button
                onClick={handleClose}
                className="border font-medium border-grey px-20 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="font-medium text-white bg-kaavi px-20 py-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}

export default DeleteCharity;
