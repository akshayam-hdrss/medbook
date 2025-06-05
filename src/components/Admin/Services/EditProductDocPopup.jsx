import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Input,
  Typography,
  DialogBody,
} from "@material-tailwind/react";
import { deleteYtLink, editProducts } from "@/firebase/firestore/products";
import { IoClose } from "react-icons/io5";
import { IoCloseCircle } from "react-icons/io5";

import YoutubeEmbed from "@/components/ui/YoutubeEmbed";
function EditProductDocPopup({
  open,
  setOpen,
  data,
  previous,
  beforeprevious,
  rootprevious,
}) {
  const [editOption, setEditOption] = useState(null);
  const [editProfile, setEditProfile] = useState(null);
  const [oldData, setOldData] = useState(null);
  const [newData, setNewData] = useState({});
  const [editYoutubeLinks, setEditYoutubeLinks] = useState([]); //State for storing youtube links
  const [editNewLink, setEditNewLink] = useState(""); //State for current youtube link
  const [editPhotos, setEditPhotos] = useState(null);
  const handleChange = (e) => {
    const { id, value } = e.target;
    setNewData({
      ...newData,
      [id]: value,
    });
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(!open);
    setOldData(null);
    setEditOption(null); // Reset the edit option
    setNewData({});
  };
  const handleDeleteLink = async (link) => {
    await deleteYtLink(
      link,
      rootprevious,
      beforeprevious,
      previous,
      editOption
    );

    if (oldData) {
      const updatedLinks = oldData.links.filter((item) => item !== link);
      setOldData({ ...oldData, links: updatedLinks });
    }
  };
  const handleEdit = async () => {
    setOpen(!open);
    await editProducts(
      previous,
      beforeprevious,
      rootprevious,
      editOption,
      newData,
      editProfile,
      oldData.profile,
      editPhotos,
      oldData.photos
    );
    console.log("edited successfully");
  };
  useEffect(() => {
    const fetch = () => {
      data &&
        data.map((item) => {
          if (item.id === editOption) {
            setOldData(item);
          }
        });
    };
    fetch();
  }, [editOption, open]);

  return (
    <>
      <Button onClick={handleOpen} className="bg-kaavi mx-2 my-3">
        Edit
      </Button>

      <Dialog
        open={open}
        handler={handleClose}
        className="overflow-scroll"
        dismiss={{ enabled: false }}
        style={{ maxHeight: "calc(100vh - 200px)" }}
      >
        <DialogBody className="mx-auto w-full font-inter">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <Typography variant="h4" color="blue-gray">
                Edit a Product
              </Typography>
              <IoClose fontSize={30} onClick={handleClose} />
            </div>

            <Typography className="-mb-2" variant="h6">
              Select the Product you want to edit
            </Typography>
            <select
              name="servicename"
              id="name"
              value={editOption}
              onChange={(e) => setEditOption(e.target.value)}
              className="p-3 border-deep-orange-200 border rounded-md"
            >
              <option value="">Select any option</option>
              {data &&
                data.map((item, key) => (
                  <option key={key} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
            <form action="submit">
              <div className="flex flex-col justify-between items-start">
                <p className="text-xl font-medium mb-1">Profile Picture</p>
                <Input
                  type="file"
                  onChange={(e) => setEditProfile(e.target.files[0])}
                  className="border border-kaavi mb-6 w-60"
                  accept="image/*"
                />
                <p className="text-xl font-medium mb-1">Photos</p>
                <Input
                  type="file"
                  placeholder="photos"
                  onChange={(e) => setEditPhotos([...e.target.files])}
                  className="border border-kaavi mb-6 w-60"
                  accept="image/*"
                  multiple
                />
                <p className="text-xl font-medium mb-1">Name</p>
                <Input
                  type="text"
                  id="name"
                  defaultValue={oldData?.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="border border-kaavi pl-4 py-3 mb-6"
                />
                <p className="text-xl font-medium mb-1">Address Line 1</p>
                <input
                  type="text"
                  id="addLine1"
                  defaultValue={oldData?.addLine1}
                  onChange={handleChange}
                  className="border border-kaavi pl-4 py-3 mb-6"
                />
                <p className="text-xl font-medium mb-1">Address Line 2</p>
                <input
                  type="text"
                  id="addLine2"
                  defaultValue={oldData?.addLine2}
                  onChange={handleChange}
                  className="border border-kaavi pl-4 py-3 mb-6"
                />
                <p className="text-xl font-medium mb-1">Area</p>
                <input
                  type="text"
                  id="area"
                  defaultValue={oldData?.area}
                  placeholder="Eg: RS Puram"
                  onChange={handleChange}
                  className="border border-kaavi pl-4 py-3 mb-6"
                />
                <p className="text-xl font-medium mb-1">Pincode</p>
                <input
                  type="text"
                  placeholder="Eg: 641032"
                  id="pincode"
                  defaultValue={oldData?.pincode}
                  onChange={handleChange}
                  className="border border-kaavi pl-4 py-3 mb-6"
                />
                <p className="text-xl font-medium mb-1">District</p>
                <input
                  type="text"
                  placeholder="District"
                  id="district"
                  defaultValue={oldData?.district}
                  onChange={handleChange}
                  className="border border-kaavi pl-4 py-3 mb-6"
                />
                <p className="text-xl font-medium mb-1">
                  Experience (in Years)
                </p>
                <Input
                  type="text"
                  id="experience"
                  defaultValue={oldData?.experience}
                  onChange={handleChange}
                  placeholder="Experience"
                  className="border border-kaavi pl-4 py-3 mb-6"
                />
                <p className="text-xl font-medium mb-1">Mobile Number</p>
                <Input
                  type="number"
                  id="mobile"
                  defaultValue={oldData?.mobile}
                  onChange={handleChange}
                  placeholder="Mobile Number"
                  className="border border-kaavi pl-4 py-3 mb-6"
                />

                <p className="text-xl font-medium mb-1">Whatsapp Number</p>
                <Input
                  type="number"
                  id="whatsapp"
                  defaultValue={oldData?.whatsapp}
                  onChange={handleChange}
                  placeholder="Whatsapp Number"
                  className="border border-kaavi pl-4 py-3 mb-6"
                />

                <p className="text-xl font-medium mb-1">Buy Link 1</p>

                <Input
                  type="text"
                  id="buylink1"
                  defaultValue={oldData?.buylink1}
                  onChange={handleChange}
                  placeholder="Link to a service"
                  className="border border-kaavi pl-4 py-3 mb-6"
                />
                <p className="text-xl font-medium mb-1">Buy Link 2</p>

                <Input
                  type="text"
                  id="buylink2"
                  defaultValue={oldData?.buylink2}
                  onChange={handleChange}
                  placeholder="Link to another service"
                  className="border border-kaavi pl-4 py-3 mb-6"
                />
                <p className="text-xl font-medium mb-1 mt-4">Youtube Links</p>
                {oldData &&
                  oldData.links.map((link) => (
                    <div className="w-[50%] my-6 relative ">
                      <YoutubeEmbed embedId={link} />
                      <IoCloseCircle
                        onClick={() => handleDeleteLink(link)}
                        className="absolute top-0 right-0 text-white"
                        fontSize={40}
                      />
                    </div>
                  ))}
                <p className="text-xl font-medium mb-1">About</p>
                <textarea
                  name="about"
                  id="about"
                  defaultValue={oldData?.about}
                  onChange={handleChange}
                  rows={5}
                  cols={70}
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

export default EditProductDocPopup;
