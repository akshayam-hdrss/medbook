import React, { useState } from "react";
import AddDaily from "./Daily/AddDaily";
import EditDaily from "./Daily/EditDaily";
import DeleteDaily from "./Daily/DeleteDaily";
function AdminDaily() {
  const [addOpen, setAddOpen] = useState();
  const [editOpen, setEditOpen] = useState();
  const [deleteOpen, setDeleteOpen] = useState();
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed, so add 1
  const day = currentDate.getDate().toString().padStart(2, "0");

  const formattedDate = `${day}-${month}-${year}`;

  return (
    <div className="py-10">
      <h1 className="font-bold text-xl">Day's Special</h1>
      <h2 className="font-bold my-4">Today {formattedDate}</h2>
 
      <div>
        <AddDaily open={addOpen} setOpen={setAddOpen} />
        <EditDaily open={editOpen} setOpen={setEditOpen} />
        <DeleteDaily open={deleteOpen} setOpen={setDeleteOpen} />
      </div>
    </div>
  );
}

export default AdminDaily;
