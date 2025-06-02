"use client";
import { addEvent, getEvents } from "@/firebase/firestore/events";
import React, { useEffect, useState } from "react";
import EditEvent from "@/components/Admin/Events/EditEvent";
import DeleteEvent from "@/components/Admin/Events/DeleteEvent";

function AdminEvents() {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [pfp, setPfp] = useState(null);
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState("");
  const [date, setDate] = useState("");
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([]);

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };
  const handleSubmit = async () => {
    console.log("before");
    let data = { title: title, details: details, video: video, date: date };
    await addEvent(data, pfp, images);
    console.log("after event added");
    setTitle("");
    setDetails("");
    setPfp(null);
    setImages([]);
    setVideo("");
    setDate("");

    setOpen(!open);
  };
  useEffect(() => {
    const fetchdata = async () => {
      const data = await getEvents();
      setEvents(data);
    };
    fetchdata();
  }, []);
  useEffect(() => {
    console.log(typeof events); // <--- This will log the updated events state
  }, [events]);
  return (
    <div className="p-6">
      <h1 className="font-bold text-2xl">Manage Events</h1>
      <button
        onClick={() => setOpen(!open)}
        className="p-3 rounded-xl text-white bg-kaavi my-10"
      >
        Add an Event
      </button>
      <EditEvent open={editOpen} setOpen={setEditOpen} data={events} />
      <DeleteEvent open={deleteOpen} setOpen={setDeleteOpen} data={events}/>

      <div className={` ${open ? " " : "hidden"}`}>
        <div className="flex flex-col gap-y-8">
          <div className="flex flex-col gap-y-4">
            <p className="font-medium text-lg">Event Title</p>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the event title"
            />
          </div>
          <div className="flex flex-col gap-y-4">
            <p className="font-medium text-lg">Event Date(DD-MM-YYY)</p>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Enter the event Date"
            />
          </div>
          <div className="flex flex-col gap-y-4">
            <p className="font-medium text-lg">Event Details</p>
            <textarea
              rows={4}
              cols={10}
              type="text"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Enter the event details"
            />
          </div>
          <div className="flex flex-col gap-y-4">
            <p className="font-medium text-lg">Title Image</p>
            <input
              type="file"
              placeholder="Enter the main image"
              accept="image/*"
              onChange={(e) => setPfp(e.target.files[0])}
            />
          </div>
          <div className="flex flex-col gap-y-4">
            <p className="font-medium text-lg">Other Images</p>
            <input
              type="file"
              placeholder="Enter the other image"
              accept="image/*"
              onChange={handleFileChange}
              multiple
            />
          </div>
          <div className="flex flex-col gap-y-4">
            <p className="font-medium text-lg">Event Video</p>
            <input
              type="text"
              placeholder="Enter the youtube video link"
              value={video}
              onChange={(e) => setVideo(e.target.value)}
            />
          </div>
        </div>
        <div className="my-10 flex justify-evenly">
          <button
            onClick={() => setOpen(!open)}
            className="font-medium p-3 px-8 rounded-xl border border-black"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="font-medium p-3 px-12 bg-kaavi text-white rounded-xl"
          >
            Add
          </button>
        </div>
      </div>

      <div>
        {events.map((doc) => (
          <p>{doc.data.title}</p>
        ))}
      </div>
    </div>
  );
}

export default AdminEvents;
