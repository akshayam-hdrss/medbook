import React from "react";
import { useState, useEffect } from "react";
import { Carousel, IconButton } from "@material-tailwind/react";
import { getNews } from "@/firebase/firestore/news";
import YoutubeEmbed from "../ui/YoutubeEmbed";
import Link from "next/link";

function News() {
  const [news, setNews] = useState();
  useEffect(() => {
    const fetch = async () => {
      const data = await getNews();
      setNews(data);
    };
    fetch();
  }, []);
  return (
    <div className="px-0 md:px-5 pt-2 relative z-0 pb-7">
      <h1 className="font-koulen text-4xl text-grey  px-6 pb-3">News</h1>

      <Carousel
        className="h-[400px] md:h-fit my-0 py-0 "
        prevArrow={false}
        nextArrow={false}
        navigation={false}
        autoplay={true}
        loop
      >
        {news &&
          news.map((doc, index) => (
            <div key={index} className="relative h-full w-full">
              <div className="grid md:grid-cols-7 h-full w-full bg-kaavi/0">
                <div className="col-span-4 object-contain flex flex-col justify-center">
                  <YoutubeEmbed embedId={doc.video} />
                </div>
                <div className="col-span-3 grid grid-cols-5 md:flex flex-col justify-between md:py-5 px-5 ">
                  <h1 className="md:hidden col-span-3 text-[15px] font-bold">
                    {doc.title.slice(0, 40)}...
                  </h1>
                  <h1 className="hidden lg:hidden md:flex col-span-3 text-[15px] font-bold">
                    {doc.title.slice(0, 120)}...
                  </h1>
                  <h1 className="hidden md:hidden lg:flex col-span-3 text-[15px] font-bold">
                    {doc.title.slice(0, 240)}...
                  </h1>
                  <div className="md:flex col-span-2 justify-between items-center w-full">
                    <div className="md:flex hidden">
                      <h1 className="font-semibold">{doc.date}</h1>
                    </div>
                    <Link
                      href={`news/${doc.id}`}
                      className="text-center col-span-2 mx-auto md:m-0 h-fit w-fit py-1 px-3 rounded-md bg-kaavi text-white "
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </Carousel>
    </div>
  );
}

export default News;
