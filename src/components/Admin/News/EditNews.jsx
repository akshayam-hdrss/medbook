import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Typography,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { IoClose } from "react-icons/io5";
import { editNews, getOneNews } from "@/firebase/firestore/news";

function parseDate(dateString) {
  const [day, month, year] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day); // Month is 0-based in JS Date
}

function EditNews({ open, setOpen, id }) {
  const [newsTitle, setNewsTitle] = useState(null);
  const [newsDetails, setNewsDetails] = useState(null);
  const [newsVideo, setNewsVideo] = useState(null);
  const [newsDate, setNewsDate] = useState(null);
  const [data, setData] = useState();
  const handleOpen = () => setOpen(!open);
  const handleClose = () => setOpen(!open);
  const handleEdit = async () => {
    let data = {};
    if (newsTitle != null) data.title = newsTitle;
    if (newsDetails != null) data.details = newsDetails;
    if (newsVideo != null) data.video = newsVideo;
    if (newsDate != null) data.date = newsDate;
    if (newsDate != null) data.timestamp = parseDate(newsDate);
    await editNews(data, null, id);
    setOpen(!open);
  };
  useEffect(() => {
    const fetch = async () => {
      const data = await getOneNews(id);
      setData(data);
    };
    fetch();
  }, [open]);

  return (
    <>
      <Button onClick={handleOpen} className="bg-kaavi mx-2 hidden">
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
                Edit News
              </Typography>
              <IoClose fontSize={30} onClick={handleClose} />
            </div>

            <Typography className="-mb-2" variant="h6">
              News Title
            </Typography>
            <input
              type="text"
              onChange={(e) => setNewsTitle(e.target.value)}
              defaultValue={data && data.title}
              className="border mb-5 p-1 border-deep-orange-200"
            />
            <Typography className="-mb-2" variant="h6">
              Event Description
            </Typography>

            <textarea
              rows={4}
              cols={50}
              type="text"
              onChange={(e) => setNewsDetails(e.target.value)}
              defaultValue={data && data.details}
              className="border mb-5 p-1 border-deep-orange-200"
            />
            <Typography className="-mb-2" variant="h6">
              News Video
            </Typography>
            <input
              type="text"
              onChange={(e) => setNewsVideo(e.target.value)}
              defaultValue={data && data.video}
              className="border mb-5 p-1 border-deep-orange-200"
            />
            <Typography className="-mb-2" variant="h6">
              News Date (DD-MM-YYYY)
            </Typography>
            <input
              type="text"
              onChange={(e) => setNewsDate(e.target.value)}
              defaultValue={data && data.date}
              className="border mb-5 p-1 border-deep-orange-200"
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
            Update
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default EditNews;
