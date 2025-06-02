"use client";
import React, { useState, useEffect } from "react";
import AddNews from "./News/AddNews";
import EditNews from "./News/EditNews";
import DeleteNews from "./News/DeleteNews";
import { getNews } from "@/firebase/firestore/news";
import { Button } from "@material-tailwind/react";
import YoutubeEmbed from "@/components/ui/YoutubeEmbed";
function AdminNews() {
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [news, setNews] = useState();
  const [editId, setEditId] = useState();
  const [deleteId, setDeleteId] = useState();
  useEffect(() => {
    const fetch = async () => {
      const data = await getNews();
      setNews(data);
    };
    fetch();
  }, [addOpen, editOpen, deleteOpen]);
  return (
    <div>
      <h1 className="text-2xl font-bold mt-6">Manage news</h1>
      <div className="flex justify-evenly my-6">
        <Button className="bg-kaavi mx-2" onClick={() => setAddOpen(true)}>
          Add
        </Button>
        <EditNews open={editOpen} setOpen={setEditOpen} id={editId} />

        <DeleteNews open={deleteOpen} setOpen={setDeleteOpen} id={deleteId} />
      </div>
      {addOpen && <AddNews open={addOpen} setOpen={setAddOpen} />}
      <div className="flex flex-col items-center text-center justify-evenly">
        {news &&
          news.map((doc, index) => (
            <div
              key={index}
              className="my-6 pb-6 border border-kaavi w-[400px] flex flex-col items-center justify-center"
            >
              <div className="h-[250px] w-[400px]">
                <YoutubeEmbed embedId={doc.video} />
              </div>
              <h1>{doc.title}</h1>
              <h2 className="text-left font-bold mt-4">{doc.date}</h2>
              <div className="flex justify-evenly items-center gap-x-4">
                <button
                  className="bg-kaavi text-white px-4 py-2 rounded-md mt-6"
                  onClick={() => {
                    setEditId(doc.id);
                    setEditOpen(!editOpen);
                  }}
                >
                  Edit
                </button>
                <button
                  className="bg-kaavi text-white px-4 py-2 rounded-md mt-6"
                  onClick={() => {
                    setDeleteId(doc.id);
                    setDeleteOpen(!deleteOpen);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default AdminNews;
