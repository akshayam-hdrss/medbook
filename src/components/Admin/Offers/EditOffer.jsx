import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Typography,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { IoClose } from "react-icons/io5";
import { editOffer, getOneOffer } from "../../../firebase/firestore/offers";

function EditOffer({ open, setOpen, id }) {
  const [editOfferPercent, setEditOfferPercent] = useState();
  const [editSubText, setEditSubText] = useState();
  const [editOfferPhoto, setEditOfferPhoto] = useState(null);
  const [editOfferBrand, setEditOfferBrand] = useState();
  const [existingData, setExistingData] = useState();
  const handleOpen = () => setOpen(!open);

  const handleEdit = async () => {
    let data = {
      ...(editOfferPercent
        ? { percent: editOfferPercent }
        : { percent: existingData.percent }),
      ...(editOfferBrand
        ? { brand: editOfferBrand }
        : { brand: existingData.brand }),
      ...(editSubText
        ? { subText: editSubText }
        : { subText: existingData.subText }),
    };
    await editOffer(id, data, editOfferPhoto);
    setOpen(false);
  };

  useEffect(() => {
    const fetch = async () => {
      const data = await getOneOffer(id);
      setExistingData(data);
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
            <Typography variant="h4" color="blue-gray">
              Edit an Offer
            </Typography>

            <Typography className="-mb-2" variant="h6">
              Offer Brand
            </Typography>
            <input
              type="text"
              defaultValue={existingData && existingData.brand}
              onChange={(e) => setEditOfferBrand(e.target.value)}
              className="border mb-5 p-1 border-deep-orange-200"
            />
            <Typography className="-mb-2" variant="h6">
              Offer (Percentage or rupees)
            </Typography>
            <input
              type="text"
              defaultValue={existingData && existingData.percent}
              onChange={(e) => setEditOfferPercent(e.target.value)}
              className="border mb-5 p-1 border-deep-orange-200"
            />
            <Typography className="-mb-2" variant="h6">
              Offer Description
            </Typography>
            <input
              type="text"
              defaultValue={existingData && existingData.subText}
              onChange={(e) => setEditSubText(e.target.value)}
              className="border mb-5 p-1 border-deep-orange-200"
            />

            {/* <Typography className="-mb-2" variant="h6">
            Brand Photo
          </Typography>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhoto}
            className="border mb-5 p-1 border-deep-orange-200"
          /> */}
          </div>
          <div className="flex justify-evenly items-center pt-6">
            <Button
              onClick={() => setOpen(!open)}
              className="bg-white text-black border border-black"
            >
              Cancel
            </Button>
            <Button
              className="bg-kaavi text-white"
              type="submit"
              onClick={handleEdit}
            >
              Enter
            </Button>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}

export default EditOffer;
