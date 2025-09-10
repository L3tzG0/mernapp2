// components/cards/VideoCard.jsx
import React from "react";

const VideoCard = ({ video }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <iframe
        className="w-full h-52"
        src={`https://www.youtube.com/embed/${video.videoId}`}
        title={video.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <div className="p-3">
        <h3 className="text-sm font-semibold line-clamp-2">{video.title}</h3>
        <p className="text-xs text-gray-600 line-clamp-2">
          {video.channelTitle}
        </p>
      </div>
    </div>
  );
};

export default VideoCard;
