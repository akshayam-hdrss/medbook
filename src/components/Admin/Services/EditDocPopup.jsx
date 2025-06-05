import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Input,
  Typography,
  DialogBody,
} from "@material-tailwind/react";
import { editServiceAndProductDocs } from "@/firebase/firestore/servicesProducts";
import { IoClose } from "react-icons/io5";

function EditDocPopup({
  open,
  setOpen,
  data,
  rootprevious = null,
  beforeprevious = null,
  previous = null,
  type,
}) {
  const [editOption, setEditOption] = useState(null);
  const [editName, setEditName] = useState();
  const [editBusinessName, setEditBusinessName] = useState();
  const [editWhatsapp, setEditWhatsapp] = useState();
  const [editAddLine1, setEditAddLine1] = useState();
  const [editAddLine2, setEditAddLine2] = useState();
  const [editArea, setEditArea] = useState();
  const [editPincode, setEditPincode] = useState();
  const [editLandmark, setEditLandmark] = useState();
  const [editMapUrl, setEditMapUrl] = useState();
  const [editNumber, setEditNumber] = useState();
  const [editAbout, setEditAbout] = useState();
  const [editDistrict, setEditDistrict] = useState();
  const [editVideo, setEditVideo] = useState();
  const [editExperience, setEditExperience] = useState();
  const [editProfile, setEditProfile] = useState(null);
  const [editPhotos, setEditPhotos] = useState(null);
  const [editBackgroundImage, setEditBackgroundImage] = useState(null);
  const [deleteDoc, setDeleteDoc] = useState();
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(!open);
  };

  let oldprofile;
  let oldphotos;

  const handleAdd = async () => {
    setOpen(!open);
    let updatedData = {
      ...(editName ? { name: editName } : { name: deleteDoc.name }),
      ...(editBusinessName
        ? { businessname: editBusinessName }
        : { businessname: deleteDoc.businessname }),
      ...(editNumber ? { mobile: editNumber } : { mobile: deleteDoc.mobile }),
      ...(editWhatsapp
        ? { whatsapp: editWhatsapp }
        : { whatsapp: deleteDoc.whatsapp }),
      ...(editAddLine1
        ? { addline1: editAddLine1 }
        : { addline1: deleteDoc.addline1 }),
      ...(editAddLine2
        ? { addline2: editAddLine2 }
        : { addline2: deleteDoc.addline2 }),
      ...(editLandmark
        ? { landmark: editLandmark }
        : { landmark: deleteDoc.landmark }),
      ...(editArea ? { area: editArea } : { area: deleteDoc.area }),
      ...(editVideo ? { video: editVideo } : { video: deleteDoc.video }),
      ...(editPincode
        ? { pincode: editPincode }
        : { pincode: deleteDoc.pincode }),
      ...(editDistrict
        ? { district: editDistrict }
        : { district: deleteDoc.district }),
      ...(editExperience
        ? { experience: editExperience }
        : { experience: deleteDoc.experience }),
      ...(editMapUrl ? { mapurl: editMapUrl } : { mapurl: deleteDoc.mapurl }),

      ...(editAbout ? { about: editAbout } : { about: deleteDoc.about }),
    };
    data.map((item) => {
      if (item.id === editOption) {
        oldprofile = item.profile;
        oldphotos = item.photos;
      }
    });
    editServiceAndProductDocs(
      rootprevious,
      beforeprevious,
      previous,
      editOption,
      updatedData,
      editProfile,
      editBackgroundImage,
      editPhotos,
      type
    );

    console.log("edited successfully");
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
                Edit a Service
              </Typography>
              <IoClose fontSize={30} onClick={handleClose} />
            </div>

            <Typography className="-mb-2" variant="h6">
              Select the Service you want to edit
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
                <p className="text-xl font-medium mb-1">Background Image</p>
                <Input
                  type="file"
                  onChange={(e) => setEditBackgroundImage(e.target.files[0])}
                  className="border border-kaavi mb-6 w-60"
                  accept="image/*"
                />
                <p className="text-xl font-medium mb-1">Name</p>
                <Input
                  type="text"
                  defaultValue={deleteDoc?.name}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Name"
                  className="border border-kaavi pl-4 py-3 mb-6"
                />
                <p className="text-xl font-medium mb-1">Business Name</p>
                <Input
                  type="text"
                  defaultValue={deleteDoc?.businessname}
                  onChange={(e) => setEditBusinessName(e.target.value)}
                  placeholder="Business Name"
                  className="border border-kaavi pl-4 py-3 mb-6"
                />
                <p className="text-xl font-medium mb-1">
                  Experience (in Years)
                </p>
                <Input
                  type="text"
                  defaultValue={deleteDoc?.experience}
                  onChange={(e) => setEditExperience(e.target.value)}
                  placeholder="Experience"
                  className="border border-kaavi pl-4 py-3 mb-6"
                />
                <p className="text-xl font-medium mb-1">Mobile Number</p>
                <Input
                  type="number"
                  defaultValue={deleteDoc?.mobile}
                  onChange={(e) => setEditNumber(e.target.value)}
                  placeholder="Mobile Number"
                  className="border border-kaavi pl-4 py-3 mb-6"
                />
                <p className="text-xl font-medium mb-1">Whatsapp Number</p>
                <Input
                  type="number"
                  defaultValue={deleteDoc?.whatsapp}
                  onChange={(e) => setEditWhatsapp(e.target.value)}
                  placeholder="Mobile Number"
                  className="border border-kaavi pl-4 py-3 mb-6"
                />
                <p className="text-xl font-medium mb-1">Address Line 1</p>
                <Input
                  type="text"
                  defaultValue={deleteDoc?.addline1}
                  onChange={(e) => setEditAddLine1(e.target.value)}
                  className="border border-kaavi pl-4 py-3 mb-6"
                />
                <p className="text-xl font-medium mb-1">Address Line 2</p>
                <Input
                  type="text"
                  defaultValue={deleteDoc?.addline2}
                  onChange={(e) => setEditAddLine2(e.target.value)}
                  className="border border-kaavi pl-4 py-3 mb-6"
                />
                <p className="text-xl font-medium mb-1">Landmark</p>
                <Input
                  type="text"
                  defaultValue={deleteDoc?.landmark}
                  onChange={(e) => setEditLandmark(e.target.value)}
                  className="border border-kaavi pl-4 py-3 mb-6"
                />
                <p className="text-xl font-medium mb-1">Area</p>
                <Input
                  type="text"
                  defaultValue={deleteDoc?.area}
                  onChange={(e) => setEditArea(e.target.value)}
                  className="border border-kaavi pl-4 py-3 mb-6"
                />

                <p className="text-xl font-medium mb-1">Pincode</p>
                <Input
                  type="text"
                  defaultValue={deleteDoc?.pincode}
                  onChange={(e) => setEditPincode(e.target.value)}
                  className="border border-kaavi pl-4 py-3 mb-6"
                />

                <p className="text-xl font-medium mb-1">District</p>
                <input
                  type="text"
                  defaultValue={deleteDoc?.district}
                  onChange={(e) => setEditDistrict(e.target.value)}
                  className="border border-kaavi pl-4 py-3 mb-6"
                />

                <p className="text-xl font-medium mb-1">Google Maps Link</p>
                <input
                  type="text"
                  defaultValue={deleteDoc?.mapurl}
                  onChange={(e) => setEditMapUrl(e.target.value)}
                  className="border border-kaavi pl-4 py-3 mb-6"
                />
                <p className="text-xl font-medium mb-1">Youtube Video Link</p>
                <Input
                  type="text"
                  defaultValue={deleteDoc?.video}
                  onChange={(e) => setEditVideo(e.target.value)}
                  placeholder="Youtube Video"
                  className="border border-kaavi pl-4 py-3 mb-6"
                />
                <p className="text-xl font-medium mb-1">About</p>
                <textarea
                  name="about"
                  id="about"
                  defaultValue={deleteDoc?.about}
                  onChange={(e) => setEditAbout(e.target.value)}
                  rows={5}
                  cols={30}
                  className="border border-kaavi pl-4 py-3 mb-6"
                ></textarea>
                <p className="text-xl font-medium mb-1">Photos</p>
                <Input
                  type="file"
                  placeholder="photos"
                  onChange={(e) => setEditPhotos([...e.target.files])}
                  className="border border-kaavi mb-6 w-60"
                  accept="image/*"
                  multiple
                />
              </div>
            </form>
          </div>
          <Button
            className="bg-kaavi text-white"
            type="submit"
            onClick={handleAdd}
            fullWidth
          >
            Enter
          </Button>
        </DialogBody>
      </Dialog>
    </>
  );
}

export default EditDocPopup;
