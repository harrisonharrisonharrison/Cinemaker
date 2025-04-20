import { useState } from "react";

const trailers = [
  "zdG0X-6bNU0", // YouTube video IDs
  "a4sU7b7SSlM",
  "NLOp_6uPccQ",
  "TcMBFSGVi1c",
];

export default function TrailerPlayer() {
  const [index, setIndex] = useState(0);

  const handleSkip = () => {
    setIndex((prev) => (prev + 1) % trailers.length);
  };

  const handleLike = () => {
    console.log("Liked:", trailers[index]);
    handleSkip();
  };

  const handleDislike = () => {
    console.log("Disliked:", trailers[index]);
    handleSkip();
  };

  return (
    <div className="flex flex-col items-center space-y-6 ">
      <iframe
        width="1120"
        height="630"
        src={`https://www.youtube.com/embed/${trailers[index]}?autoplay=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        className="rounded-lg shadow-xl"
      ></iframe>

      <div className="absolute space-x-4">
        <button
          onClick={handleLike}
          className="absolute ml-150 mt-30 px-6 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-600"
        >
          👍 
        </button>
        <button
          onClick={handleDislike}
          className="absolute ml-150 mt-80 px-6 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-600"
        >
          👎 
        </button>
        <button
          onClick={handleSkip}
          className="absolute ml-150 mt-130 px-6 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
        >
          ⏭ 
        </button>
      </div>
    </div>
  );
}
