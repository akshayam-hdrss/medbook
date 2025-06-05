import React, { useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { addOffer } from "../../../firebase/firestore/offers";

function AddOffer({ open, setOpen }) {
  const [offerPhoto, setOfferPhoto] = useState();

  const handleAdd = async () => {
    setOpen(!open);
    await addOffer(offerPhoto);
  };
  return (
    <>
      <div className=" mx-auto w-full h-full font-inter">
        <div className="flex flex-col gap-4">
          <Typography variant="h4" color="blue-gray">
            Add an Offer
          </Typography>

          <div className="flex justify-center pb-5">
            <input
              type="file"
              name="photo"
              id="photo"
              onChange={(e) => setOfferPhoto(e.target.files[0])}
            />
          </div>

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

export default AddOffer;
