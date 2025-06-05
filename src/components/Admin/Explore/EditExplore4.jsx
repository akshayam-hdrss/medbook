import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Input,
  Typography,
  DialogBody,
} from "@material-tailwind/react";
import { IoClose } from "react-icons/io5";
import {
  editAstrology,
  editBooks,
  editOtherExplore,
} from "@/firebase/firestore/explore";

function EditExplore4({
  open,
  setOpen,
  rootprevious,
  beforeprevious,
  previous,
  data,
}) {
  const [editName, setEditName] = useState();
  const [editPhoto, setEditPhoto] = useState(null);
  const [editBook, setEditBook] = useState(null);
  const [editAstrologyDate, setEditAstrologyDate] = useState();
  const [editDescription, setEditDescription] = useState();
  const [editVideo, setEditVideo] = useState();
  const [editOption, setEditOption] = useState();
  const [deleteDoc, setDeleteDoc] = useState();

  const handleEdit = async (e) => {
    e.preventDefault();
    let updatedData = {
      ...(editName ? { name: editName } : { name: deleteDoc.data.name }),
      ...(editDescription
        ? { description: editDescription }
        : { description: deleteDoc.data.description }),
      ...(editVideo ? { video: editVideo } : { video: deleteDoc.data.video }),
    };
    if (rootprevious == "library" || rootprevious == "history") {
      await editBooks(
        rootprevious,
        beforeprevious,
        previous,
        editOption,
        editBook,
        editPhoto,
        updatedData
      );
    } else if (rootprevious == "astrology") {
      updatedData.date = editAstrologyDate
        ? editAstrologyDate
        : deleteDoc.data.date;
      await editAstrology(
        rootprevious,
        beforeprevious,
        previous,
        editOption,
        updatedData
      );
    } else {
      await editOtherExplore(
        rootprevious,
        beforeprevious,
        previous,
        editOption,
        editPhoto,
        updatedData
      );
    }
    handleClose();
  };
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(!open);
  };
  useEffect(() => {
    const fetch = () => {
      data &&
        data.map((item) => {
          if (item.id === editOption) {
            setDeleteDoc(item);
          }
        });
    };
    fetch();
  }, [editOption]);
  return (
    <>
      <Button onClick={handleOpen} className="bg-kaavi mx-2 my-3">
        Edit
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        className="overflow-scroll"
        style={{ maxHeight: "calc(100vh - 200px)" }}
      >
        <DialogBody className="mx-auto w-full font-inter">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <Typography variant="h4" color="blue-gray">
                Edit an Explore
              </Typography>
              <IoClose fontSize={30} onClick={handleClose} />
            </div>

            <Typography className="-mb-2" variant="h6">
              Select the Explore you want to edit
            </Typography>
            <select
              name="explorename"
              id="name"
              value={editOption}
              onChange={(e) => setEditOption(e.target.value)}
              className="p-3 border-deep-orange-200 border rounded-md"
            >
              <option value="">Select any option</option>
              {data &&
                data.map((item, key) => (
                  <option key={key} value={item.id}>
                    {item.data.name}
                  </option>
                ))}
            </select>
            <form action="submit">
              <div className="flex flex-col justify-between items-start">
                <p className="text-xl font-medium mb-1">Photo</p>
                <Input
                  type="file"
                  onChange={(e) => setEditPhoto(e.target.files[0])}
                  className="border border-kaavi mb-6 w-60"
                  accept="image/*"
                />
                {(rootprevious == "library" || rootprevious == "history") && (
                  <>
                    <p className="text-xl font-medium mb-1">Book</p>
                    <Input
                      type="file"
                      onChange={(e) => setEditBook(e.target.files[0])}
                      className="border border-kaavi mb-6 w-60"
                    />
                  </>
                )}
                <p className="text-xl font-medium mb-1">Name</p>
                <Input
                  type="text"
                  defaultValue={deleteDoc?.data.name}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Name"
                  className="border border-kaavi pl-4 py-3 mb-6"
                />
                {rootprevious == "astrology" && (
                  <>
                    <p className="text-xl font-medium mb-1">Astrology Date</p>
                    <Input
                      type="date"
                      defaultValue={deleteDoc?.data.date}
                      onChange={(e) => setEditAstrologyDate(e.target.value)}
                      placeholder="Date"
                      className="border border-kaavi pl-4 py-3 mb-6"
                    />
                  </>
                )}

                <p className="text-xl font-medium mb-1">Video</p>
                <Input
                  type="text"
                  defaultValue={deleteDoc?.data.video}
                  onChange={(e) => setEditVideo(e.target.value)}
                  placeholder="Video"
                  className="border border-kaavi pl-4 py-3 mb-6"
                />
                <p className="text-xl font-medium mb-1">Description</p>
                <textarea
                  name="about"
                  id="about"
                  defaultValue={deleteDoc?.data.description}
                  onChange={(e) => setEditDescription(e.target.value)}
                  rows={5}
                  cols={40}
                  className="border border-kaavi pl-4 py-3 mb-6"
                ></textarea>
              </div>
            </form>
          </div>
          <Button
            className="bg-kaavi text-white"
            type="submit"
            onClick={handleEdit}
            fullWidth
          >
            Enter
          </Button>
        </DialogBody>
      </Dialog>
    </>
  );
}

export default EditExplore4;
