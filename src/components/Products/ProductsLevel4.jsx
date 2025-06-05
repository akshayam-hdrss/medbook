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
import VideosCarousel from "../ui/VideosCarousel";
import { Carousel } from "@material-tailwind/react";

const db = getFirestore(app);

function ProductsLevel4({ id, secondid, thirdid, fourthid }) {
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
        "products"
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
            <Carousel
              autoplay="true"
              loop="true"
              className="h-52 w-full mt-4"
              navigation={({ setActiveIndex, activeIndex, length }) => (
                <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                  {new Array(length).fill("").map((_, i) => (
                    <span
                      key={i}
                      className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                        activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                      }`}
                      onClick={() => setActiveIndex(i)}
                    />
                  ))}
                </div>
              )}
            >
              {data &&
                data.photos.map((item, i) => (
                  <img
                    src={item}
                    key={i}
                    alt="image 1"
                    className="h-full w-full object-cover rounded-md border border-gray-900 shadow-sm"
                  />
                ))}
            </Carousel>
          </div>
          <div className="p-6 pt-0">
            <div className="flex flex-col items-start justify-evenly py-6 pt-0">
              <div className="mb-6 flex gap-x-4 mt-4 px-0 w-full overflow-clip">
                <div className="w-1/3 h-fit">
                  <img
                    src={data.profile}
                    alt="profile"
                    className="rounded-md border border-gray-300 shadow-sm object-cover aspect-[4/5]"
                  />
                </div>
                <div className="w-2/3">
                  <h1 className="font-bold text-3xl pb-3">{data.name}</h1>
                  <p className="text-grey font-medium overflow-clip">
                    {data?.addLine1} {data?.addLine2} {data?.area}{" "}
                    {data?.landmark} {data?.district} - {data?.pincode}
                  </p>
                </div>
              </div>

              <div className="flex justify-evenly ml-4 items-center h-[60px] gap-x-6 mb-6  border border-grey px-4 rounded-lg">
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

              <div className="my-4 w-full flex items-center justify-evenly py-0 h-6">
                <a
                  href={`https://wa.me/${data.whatsapp}`}
                  className="my-6 font-medium bg-green-600 text-white rounded-lg p-3 px-4 h-fit"
                >
                  Whatsapp
                </a>
                <a
                  href={`tel:${data.mobile}`}
                  className="my-6 mr-2 font-medium bg-kaavi text-white rounded-lg p-3 px-4 h-fit"
                >
                  Contact
                </a>
              </div>
            </div>

            <h1 className="font-koulen text-2xl text-grey pb-4">About</h1>
            <p
              className={
                para
                  ? "px-2 text-justify"
                  : "px-2 text-justify max-h-[200px] overflow-hidden mb-[-50px]"
              }
            >
              {data.about}
            </p>
            <div className="flex justify-center backdrop-blur-sm p-2 ">
              <h1
                onClick={() => setPara(!para)}
                className="border-2 px-4 py-2 rounded-xl bg-kaavi text-white cursor-pointer"
              >
                {para ? "Show Less" : "Learn More"}
              </h1>
            </div>
            <div className="pt-6">
              <h1 className="font-koulen text-2xl text-grey">Videos</h1>
              <VideosCarousel data={data.links} />
            </div>
            <div className="pb-6">
              <div className="flex justify-between items-center">
                <h1 className="font-koulen text-2xl text-grey mr-14">
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
              <h1 className="font-koulen text-2xl text-grey">
                Google Maps Link
              </h1>
              <a
                className="bg-kaavi px-4 py-2 text-white rounded-md text-center mx-auto block w-fit"
                href={data.mapurl}
              >
                Maps Link
              </a>
            </div>
            <div className="flex justify-between pt-6 items-center">
              <h1 className="font-koulen text-2xl text-grey">
                Where to buy?
              </h1>

              <a
                className="bg-kaavi text-white px-4 py-2 rounded-md"
                href={data?.buylink1}
              >
                Link 1
              </a>
              <a
                className="bg-kaavi text-white px-4 py-2 rounded-md"
                href={data?.buylink2}
              >
                Link 2
              </a>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default ProductsLevel4;
