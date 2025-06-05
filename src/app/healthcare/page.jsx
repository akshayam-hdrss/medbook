import React from "react";
import BackButton from "@/components/ui/BackButton";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import YoutubeEmbed from "@/components/ui/YoutubeEmbed";
import ServiceCard from "@/components/ui/ServiceCard";

function Healthcare() {
  return (
    <div>
      <Header />
      <div className="p-6 pt-0">
        <BackButton />
        <YoutubeEmbed embedId="1Cl6ST2hbdg" />
        <h1 className="font-koulen text-4xl text-grey mt-12 mb-6">
          Healthcare
        </h1>

        <div className="grid grid-cols-3 gap-y-10 gap-x-10 mb-10"></div>
        <YoutubeEmbed embedId="1Cl6ST2hbdg" />
      </div>
      <Footer />
    </div>
  );
}

export default Healthcare;
