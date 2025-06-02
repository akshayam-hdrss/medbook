"use client";
import React, { useState, useEffect, useRef } from "react";
import { getServiceAndProductDocs } from "@/firebase/firestore/servicesProducts";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { formatDistanceToNow } from "date-fns";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import BackButton from "@/components/ui/BackButton";
import GalleryCarousel from "@/components/ui/GalleryCarousel";
import UserAuth from "../UserAuth";
import AddReview from "../AddReview";
import auth from "@/firebase/config.js";
import { IoStar } from "react-icons/io5";
import { PiSuitcaseSimple } from "react-icons/pi";
import { app } from "@/firebase/config";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getReviews } from "@/firebase/firestore/reviews";
import YoutubeEmbed from "../ui/YoutubeEmbed";
const db = getFirestore(app);

function ServiceLevel4({ id, secondid, thirdid, fourthid }) {
  const [data, setData] = useState();
  const [reviewsOpen, setReviewsOpen] = useState();
  const user = UserAuth();
  const [reviews, setReviews] = useState();
  const [checkReview, setCheckReview] = useState();
  const [averageRating, setAverageRating] = useState(0);
  const [para, setPara] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const data = await getServiceAndProductDocs(
        id,
        secondid,
        thirdid,
        fourthid,
        "services"
      );
      const data2 = await getReviews(fourthid);
      setReviews(data2);
      setData(data);
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetch = () => {
      if (user) {
        const data1 =
          reviews && reviews.filter((item) => item.userId === user.uid);
        setCheckReview(data1);
        if (reviews) {
          const totalRating = reviews.reduce(
            (acc, curr) => acc + curr.rating,
            0
          );
          const avgRating = totalRating / reviews.length;
          const avg = Math.round(avgRating * 2) / 2;
          setAverageRating(avg);
        } else {
          setAverageRating(0); // No reviews, no rating
        }
      }
    };
    fetch();
  }, [user, reviews]);

  return (
    <div>
      <Header />
      <BackButton />
      {data && (
        <div>
          <div className="w-full">
          <img
  src={data.background}
  alt="background image"
  className="border-4 border-red-400 w-full"
/>

<div className="border-4 border-red-400 rounded-md inline-block shadow-md -mt-[80px] ml-[26vw]">
  <img
    src={data.profile}
    alt="profile"
    className="object-cover aspect-[4/5] w-24 h-30"
  />
</div>
            <div className="flex flex-col items-center text-center justify-evenly py-6 pt-0">
              <h1 className="font-bold text-3xl pb-4">{data.name}</h1>
              <div className="flex justify-evenly items-center h-[60px] gap-x-6 mb-6 border border-grey px-4 rounded-lg">
                <p className="flex items-center gap-x-2 py-4">
                  <IoStar className="text-yellow-800" fontSize={25} />
                  {averageRating} Ratings
                </p>
                <div className="h-full w-[1px] bg-grey"></div>
                <p className="flex items-center gap-x-2 py-4">
                  <PiSuitcaseSimple fontSize={25} />
                  {data?.experience} Years Exp
                </p>
              </div>
              <p className="text-grey font-medium">
                {data?.addline1} {data?.addline2} {data?.area} {data?.landmark}{" "}
                {data?.district} - {data?.pincode}
              </p>

              <div className="my-4">
                <a
                  href={`tel:${data.mobile}`}
                  className="my-6 mr-2 font-medium bg-kaavi text-white rounded-lg p-3 px-4"
                >
                  Contact
                </a>
                <a
                  href={`https://wa.me/${data.whatsapp}`}
                  className="my-6 font-medium bg-green-600 text-white rounded-lg p-3 px-4"
                >
                  Whatsapp
                </a>
              </div>
            </div>

            <h1 className="font-koulen text-3xl text-grey pb-4">About</h1>
            <p
              className={`px-2 text-justify relative transition-all duration-500 ${
                !para
                  ? "max-h-[200px] overflow-hidden text-opacity-100 before:absolute before:bottom-0 before:left-0 before:w-full before:h-12 before:bg-gradient-to-t before:from-white before:to-transparent"
                  : "text-opacity-100"
              }`}
            >
              {data.about}
            </p>
            <div className="flex justify-center p-2 ">
              <h1
                onClick={() => setPara(!para)}
                className="border-2 px-4 py-2 rounded-xl bg-kaavi text-white cursor-pointer"
              >
                {para ? "Show Less" : "Learn More"}
              </h1>
            </div>
            <h1 className="font-koulen text-3xl pt-10 text-grey">Video</h1>
            {data.video && <YoutubeEmbed embedId={data.video} />}

            <div className="py-6">
              <div className="flex justify-between items-center">
                <h1 className="font-koulen text-3xl text-grey mr-14">
                  Reviews
                </h1>

                {!user ? (
                  <a
                    href="/login"
                    className="bg-kaavi text-white px-4 py-2 rounded-md"
                  >
                    Login to add review
                  </a>
                ) : checkReview && checkReview.length < 1 ? (
                  <AddReview
                    open={reviewsOpen}
                    setOpen={setReviewsOpen}
                    user={user}
                    id={id}
                    secondid={secondid}
                    thirdid={thirdid}
                    fourthid={fourthid}
                    type={"services"}
                  />
                ) : (
                  <p className="bg-green-600 text-white px-4 py-2 rounded-lg flex justify-between items-center gap-x-2">
                    Review added <IoIosCheckmarkCircle />
                  </p>
                )}
              </div>
              <div className="flex flex-row overflow-x-scroll pt-4 nosc">
                {reviews &&
                  reviews.map((doc, index) => (
                    <div
                      className="min-w-[86vw] mx-10 first:ml-0 rounded-md px-6 py-4 overflow-clip border border-grey"
                      key={index}
                    >
                      <p className="text-grey font-medium">{doc.userName}</p>
                      <p className="flex items-center pt-2 gap-x-2">
                        <IoStar className="text-yellow-800" />
                        {doc.rating}
                      </p>
                      <p className="py-2 break-words text-justify">
                        {doc.review}
                      </p>
                      <p className="font-medium text-grey">
                        {formatDistanceToNow(
                          new Date(doc.timestamp.seconds * 1000)
                        )}{" "}
                        ago
                      </p>
                    </div>
                  ))}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <h1 className="font-koulen text-3xl text-grey">
                Google Maps Link
              </h1>
              <a
                className="bg-kaavi px-4 py-2 text-white rounded-md text-center mx-auto block w-fit"
                href={data.mapurl}
              >
                Maps Link
              </a>
            </div>
            <h1 className="font-koulen text-3xl pt-10 text-grey">Gallery</h1>
            {data.photos && <GalleryCarousel data={data.photos} />}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default ServiceLevel4;
