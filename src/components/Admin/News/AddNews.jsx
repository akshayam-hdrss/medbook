import React, { useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { addNews } from "@/firebase/firestore/news";

function parseDate(dateString) {
  const [day, month, year] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day); // Month is 0-based in JS Date
}

function AddNews({ open, setOpen }) {
  const [newsTitle, setNewsTitle] = useState("");
  const [newsDetails, setNewsDetails] = useState("");
  const [newsVideo, setNewsVideo] = useState("");
  const [newsPhotos, setNewsPhotos] = useState(null);
  const [newsDate, setNewsDate] = useState("");
  const handlePhotos = (e) => {
    setNewsPhotos([...e.target.files]);
  };
  const handleAdd = async () => {
    setOpen(!open);
    const data = {
      title: newsTitle,
      details: newsDetails,
      video: newsVideo,
      date: newsDate,
      timestamp: parseDate(newsDate),
    };
    await addNews(data, newsPhotos);
  };
  return (
    <>
      <div className=" mx-auto w-full h-full font-inter">
        <div className="flex flex-col gap-4">
          <Typography variant="h4" color="blue-gray">
            Add News
          </Typography>

          <Typography className="-mb-2" variant="h6">
            News Title
          </Typography>
          <input
            type="text"
            onChange={(e) => setNewsTitle(e.target.value)}
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
            className="border mb-5 p-1 border-deep-orange-200"
          />
          <Typography className="-mb-2" variant="h6">
            News Video
          </Typography>
          <input
            type="text"
            onChange={(e) => setNewsVideo(e.target.value)}
            className="border mb-5 p-1 border-deep-orange-200"
          />
          <Typography className="-mb-2" variant="h6">
            News Photos
          </Typography>
          <input
            type="file"
            onChange={handlePhotos}
            multiple
            className="border mb-5 p-1 border-deep-orange-200"
          />
          <Typography className="-mb-2" variant="h6">
            News Date (DD-MM-YYYY)
          </Typography>
          <input
            type="text"
            onChange={(e) => setNewsDate(e.target.value)}
            className="border mb-5 p-1 border-deep-orange-200"
          />
        </div>
      </div>
      <div className="flex justify-evenly items-center pt-6 pb-20">
        <Button
          onClick={() => setOpen(!open)}
          className="bg-white text-black border border-black"
        >
          Cancel
        </Button>
        <Button
          className="bg-kaavi text-white"
          type="submit"
          onClick={handleAdd}
        >
          Enter
        </Button>
      </div>
    </>
  );
}

export default AddNews;
