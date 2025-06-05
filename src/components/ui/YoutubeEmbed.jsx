"use client";
import React, { useEffect, useState } from "react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
const handleEmbed = (embedId) => {
  const videoId = extractVideoId(embedId);
  return videoId;
  // if (videoId) {
  //   return `https://www.youtube.com/embed/${videoId}`;
  // }
};

const extractVideoId = (url) => {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};
const YoutubeEmbed = ({ embedId }) => {
  const [id, setId] = useState();

  useEffect(() => {
    const fetch = () => {
      if (embedId) {
        setId(handleEmbed(embedId));
      }
    };
    fetch();
  }, [embedId]);

  return (
    <div className="my-0">
      {id && (
        
       <div className=" my-auto">
       <LiteYouTubeEmbed id={id} iframeClass="lite-yt" />
       </div>
      )}
      {/* <iframe
          src={id}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
          className="aspect-video w-full md:h-auto object-contain"
        /> */}
    </div>
  );
};

export default YoutubeEmbed;
