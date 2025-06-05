import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Typography,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { IoClose } from "react-icons/io5";
import {
  editDaily,
  getDaily,
  getOneDaily,
} from "../../../firebase/firestore/daily";
function parseDate(dateString) {
  const [day, month, year] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day); // Month is 0-based in JS Date
}
function EditDaily({ open, setOpen }) {
  const [editId, setEditId] = useState();
  const [daily, setDaily] = useState();
  const [title, setTitle] = useState(null);
  const [link, setLink] = useState(null);
  const [date, setDate] = useState(null);
  const [existing, setExisting] = useState(null);
  let data = {};
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setExisting(null);
  };
  const handleSubmit = async () => {
    console.log(editId);
    if (title != null) {
      data.title = title;
    }
    if (date != null) {
      data.date = date;
      data.timestamp = parseDate(date);
    }
    if (link != null) {
      data.link = link;
    }
    await editDaily(data, editId);
    setOpen(false);
  };
  useEffect(() => {
    const fetch = async () => {
      const daily = await getDaily();
      setDaily(daily);
    };
    fetch();
  }, [open]);
  useEffect(() => {
    const fetch = async () => {
      const ex = await getOneDaily(editId);
      setExisting(ex);
    };
    fetch();
  }, [editId]);

  return (
    <>
      <Button onClick={handleOpen} className="bg-kaavi">
        Edit
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
                Edit Daily Astrology
              </Typography>
              <IoClose fontSize={30} onClick={handleClose} />
            </div>
            <div>
              <Typography variant="h4" color="blue-gray">
                Select for Edit
              </Typography>
              <select
                name="select"
                id="select"
                onChange={(e) => setEditId(e.target.value)}
              >
                <option value=" "></option>
                {daily &&
                  daily.map((item) => (
                    <option value={item.id}>{item.data.title}</option>
                  ))}
              </select>

              <Typography variant="h4" color="blue-gray">
                Enter new title
              </Typography>
              <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                defaultValue={existing && existing.title}
                className="w-full"
              />

              <Typography variant="h4" color="blue-gray">
                Enter new Date (DD-MM-YYYY)
              </Typography>
              <input
                type="text"
                onChange={(e) => setDate(e.target.value)}
                defaultValue={existing && existing.date}
              />

              <Typography variant="h4" color="blue-gray">
                Enter new Link
              </Typography>
              <input
                type="text"
                onChange={(e) => setLink(e.target.value)}
                defaultValue={existing && existing.link}
              />
              <button
                className="p-3 text-white bg-kaavi rounded-lg w-full"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}

export default EditDaily;
