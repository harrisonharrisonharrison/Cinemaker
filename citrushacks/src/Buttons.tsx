import { useState } from "react";

const trailers = [
  "NLOp_6uPccQ",
  "TcMBFSGVi1c",
  "pAsmrKyMqaA",
  "uhUht6vAsMY",
  "9KVG_X_7Naw",
  "rcxnRaZ6slU"
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
        width="1024"
        height="576"
        src={`https://www.youtube.com/embed/${trailers[index]}?autoplay=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        className="rounded-lg shadow-xl"
      ></iframe>

      <div className="absolute">
        <button
          onClick={handleLike}
          className="absolute ml-130 mt-20 px-6 py-2 bg-radial from-slate-900 text-white rounded hover:bg-green-600"
        >
          👍 
        </button>
        <button
          onClick={handleDislike}
          className="absolute ml-130 mt-70 px-6 py-2 bg-radial from-slate-900 text-white rounded hover:bg-red-600"
        >
          👎 
        </button>
        <button
          onClick={handleSkip}
          className="absolute ml-130 mt-120 px-6 py-2 bg-radial from-slate-900 text-white rounded hover:bg-blue-600"
        >
          ⏭ 
        </button>
      </div>
      <div className="font-serif italic">
        Movie description
      </div>
    </div>
  );
}
