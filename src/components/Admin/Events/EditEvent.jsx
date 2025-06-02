import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Typography,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { IoClose } from "react-icons/io5";
import { editEvent } from "@/firebase/firestore/events";

function EditEvent({ open, setOpen, data }) {
  const [editOption, setEditOption] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDetails, setEditDetails] = useState("");
  const [editPfp, setEditPfp] = useState(null);
  const [editImages, setEditImages] = useState([]);
  const [editVideo, setEditVideo] = useState("");
  const [editDate, setEditDate] = useState("");
  const [selectedEvent, setSelectedEvent] = useState([]);
  let oldpfp;
  let oldimages;
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const handleEdit = async () => {
    setOpen(false);
    const updatedData = {
      ...(editTitle
        ? { title: editTitle }
        : { title: selectedEvent.data.title }),
      ...(editDetails
        ? { title: editDetails }
        : { details: selectedEvent.data.details }),

      ...(editVideo
        ? { video: editVideo }
        : { video: selectedEvent.data.video }),

      ...(editDate ? { date: editDate } : { date: selectedEvent.data.date }),
    };
    data.map((item) => {
      if (item.id === editOption) {
        oldpfp = item.data.pfp;
        oldimages = item.data.images;
      }
    });
    await editEvent(editOption, updatedData, editPfp, editImages);
    console.log("edited successfully");
  };
  const handleEditOption = (e) => {
    setEditOption(e.target.value);
  };
  const handleFileChange = (e) => {
    setEditImages([...e.target.files]);
  };
  useEffect(() => {
    const fetch = () => {
      data.map((doc) => {
        if (doc.id == editOption) {
          setSelectedEvent(doc);
        }
      });
    };
    fetch();
  }, [editOption]);
  return (
    <>
      <Button onClick={handleOpen} className="bg-kaavi mx-2">
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
                Edit an Event
              </Typography>
              <IoClose fontSize={30} onClick={handleClose} />
            </div>

            <Typography className="-mb-2" variant="h6">
              Select the Event you want to change
            </Typography>
            <select
              name="eventname"
              id="name"
              value={editOption}
              onChange={handleEditOption}
              className="p-3 border-deep-orange-200 border rounded-xl"
            >
              <option value=" ">Select any option</option>
              {data &&
                data.map((item, key) => (
                  <option key={key} value={item.id}>
                    {item.data.title}
                  </option>
                ))}
            </select>
            <Typography className="-mb-2" variant="h6">
              Event Title
            </Typography>
            <input
              type="text"
              defaultValue={selectedEvent && selectedEvent?.data?.title}
              onChange={(e) => setEditTitle(e.target.value)}
              className="border mb-5 p-1 border-deep-orange-200"
            />
            <Typography className="-mb-2" variant="h6">
              Event Description
            </Typography>
           
            <textarea
              rows={4}
              cols={50}
              type="text"
              defaultValue={selectedEvent && selectedEvent?.data?.details}
              onChange={(e) => setEditDetails(e.target.value)}
              className="border mb-5 p-1 border-deep-orange-200"
            />
            <Typography className="-mb-2" variant="h6">
              Event Video
            </Typography>
            <input
              type="text"
              defaultValue={selectedEvent && selectedEvent?.data?.video}
              onChange={(e) => setEditVideo(e.target.value)}
              className="border mb-5 p-1 border-deep-orange-200"
            />
            <Typography className="-mb-2" variant="h6">
              Event Date
            </Typography>
            <input
              type="text"
              defaultValue={selectedEvent && selectedEvent?.data?.date}
              onChange={(e) => setEditDate(e.target.value)}
              className="border mb-5 p-1 border-deep-orange-200"
            />

            <Typography className="-mb-2" variant="h6">
              Event Photo
            </Typography>
            <input
              type="file"
              placeholder="Enter the main image"
              accept="image/*"
              onChange={(e) => setEditPfp(e.target.files[0])}
            />
            <Typography className="-mb-2" variant="h6">
              Other Photos
            </Typography>
            <input
              type="file"
              placeholder="Enter the other image"
              accept="image/*"
              onChange={handleFileChange}
              multiple
            />
          </div>
        </DialogBody>
        <DialogFooter className="pt-0">
          <Button
            className="bg-kaavi text-white"
            type="submit"
            onClick={handleEdit}
            fullWidth
          >
            Enter
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default EditEvent;
