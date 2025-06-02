import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Typography,
  DialogBody,
} from "@material-tailwind/react";
import { editServicesAndProducts } from "@/firebase/firestore/servicesProducts";
import { IoClose } from "react-icons/io5";
import { addReview } from "@/firebase/firestore/reviews";
import { serverTimestamp } from "firebase/firestore";
import { Rating } from "react-simple-star-rating";
import { getUser } from "@/firebase/firestore/user";

function AddReview({
  open,
  setOpen,
  user,
  type,
  id,
  secondid,
  thirdid = null,
  fourthid = null,
}) {
  const [review, setReview] = useState();
  const [rating, setRating] = useState();
  const [userData, setUserData] = useState();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const handleReviewText = (e) => {
    setReview(e.target.value);
  };
  const handleRating = (rate) => {
    setRating(rate);
  };
  const handleEdit = async () => {
    let data = {
      userName: userData.data.name || "Anonymous",
      userId: userData.id,
      review: review,
      rating: rating,
      timestamp: serverTimestamp(),
      id: id,
      secondid: secondid,
      type: type,
    };
    if (type == "services") {
      data.thirdid = thirdid;
      data.fourthid = fourthid;
    }
    await addReview(data);
    handleClose();
  };

  useEffect(() => {
    const fetch = async () => {
      const data = await getUser(user.uid);
      setUserData(data);
    };
    fetch();
  });
  return (
    <>
      <Button onClick={handleOpen} className="bg-kaavi">
        Add Review
      </Button>
      <Dialog
        open={open}
        handler={handleClose}
        className="overflow-scroll"
        style={{ maxHeight: "calc(100vh - 200px)" }}
      >
        <DialogBody className="mx-auto w-full h-full font-inter">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <Typography variant="h4" color="blue-gray">
                Add a review
              </Typography>
              <IoClose fontSize={30} onClick={handleClose} />
            </div>

            <Typography className="mb-2" variant="h6">
              Enter Review
            </Typography>
            <textarea
              rows={5}
              cols={50}
              value={review}
              onChange={handleReviewText}
              className="border mb-5 p-1 border-deep-orange-200 w-full"
            />
            <Typography className="mb-2" variant="h6">
              Enter Star Rating (out of 5)
            </Typography>
            <div className="flex flex-row items-center">
              {" "}
              {/* Add this wrapper */}
              <Rating
                onClick={handleRating}
                initialValue={rating}
                iconsCount={5}
                SVGclassName="inline-block"
                allowFraction
              />
            </div>

            {/* <ReactStars
              count={5}
              onChange={(newRating) => setRating(newRating)}
              size={40}
              activeColor="#ffd700"
              value={rating}
            /> */}
          </div>

          <Button
            className="bg-kaavi text-white mt-8"
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

export default AddReview;
// vercel sample check 1