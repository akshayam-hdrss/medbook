"use client";
import AddDaily from "@/components/Admin/Daily/AddDaily";
import DeleteDaily from "@/components/Admin/Daily/DeleteDaily";
import EditDaily from "@/components/Admin/Daily/EditDaily";
import { getDaily } from "@/firebase/firestore/daily";
import { useEffect, useState } from "react";
import YoutubeEmbed from "@/components/ui/YoutubeEmbed";
export default function Page() {
  const [addOpen, setAddOpen] = useState();
  const [editOpen, setEditOpen] = useState();
  const [deleteOpen, setDeleteOpen] = useState();
  const [data, setData] = useState();
  useEffect(() => {
    const fetch = async () => {
      const res = await getDaily();
      setData(res);
    };
    fetch();
  }, []);
  return (
    <div>
      <h1 className="text-4xl font-bold">Day's Special</h1>
      <div className="flex justify-evenly my-10">
        <AddDaily open={addOpen} setOpen={setAddOpen} />
        <EditDaily open={editOpen} setOpen={setEditOpen} />
        <DeleteDaily open={deleteOpen} setOpen={setDeleteOpen} />
      </div>
      <div>
        {data &&
          data.map((daily) => (
            <div className="border border-kaavi my-14">
              <YoutubeEmbed embedId={daily.data.link} />
              <h1>{daily.data.title}</h1>
            </div>
          ))}
      </div>
    </div>
  );
}
