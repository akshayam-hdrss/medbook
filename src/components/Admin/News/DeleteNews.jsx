import React from "react";
import {
  Button,
  Dialog,
  Typography,
  DialogBody,
} from "@material-tailwind/react";
import { IoClose } from "react-icons/io5";
import { deleteNews } from "@/firebase/firestore/news";

function DeleteNews({ open, setOpen, id }) {
  const handleOpen = () => setOpen(!open);
  const handleClose = () => setOpen(!open);
  const handleDelete = async () => {
    await deleteNews(id);
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
        className="overflow-scroll"
        style={{ maxHeight: "calc(100vh - 200px)" }}
      >
        <DialogBody className=" mx-auto w-full h-full font-inter">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <Typography variant="h4" color="blue-gray">
                Are you sure?
              </Typography>
              <IoClose fontSize={30} onClick={handleClose} />
            </div>
            <div className="flex justify-evenly gap-x-8">
              <button
                className="border w-1/2 border-black rounded-md px-4 py-2"
                onClick={() => setOpen(!open)}
              >
                No
              </button>
              <button
                className="bg-kaavi w-1/2 text-white rounded-md px-4 py-2"
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

export default DeleteNews;
