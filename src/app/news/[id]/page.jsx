import React from "react";
import { getNews, getOneNews } from "@/firebase/firestore/news";
import Header from "@/components/ui/Header";
import BackButton from "@/components/ui/BackButton";
import Footer from "@/components/ui/Footer";
import YoutubeEmbed from "@/components/ui/YoutubeEmbed";
import Navbar from "@/components/Navbar";

export async function generateStaticParams() {
  const result = await getNews();
  return result.map((doc) => ({
    id: doc.id,
  }));
}

async function newsPage({ params }) {
  const { id } = params;
  const news = await getOneNews(id);
  return (
    <div>
      <div className="fixed w-full top-0 z-[50]">
        <Header />
      </div>
      <div className="grid lg:grid-cols-4">
        <Navbar />
        <main className="col-span-3 pt-[70px] ">
          <div className="p-5 md:p-10">
            <BackButton />
            <h1 className="text-4xl font-bold font-koulen text-grey pl-4 mb-10">
              News
            </h1>
            <h2 className="px-4 font-bold mb-6 text-lg">{news.title}</h2>
            <YoutubeEmbed embedId={news.video} />
            <p className="px-2 my-6 text-justify">{news.details}</p>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default newsPage;
