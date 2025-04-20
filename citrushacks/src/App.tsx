import './App.css'
import { useEffect, useState } from 'react'
import curtain from './assets/curtain.png'
import { Typewriter } from 'react-simple-typewriter'
import thumb from './assets/thumbs.png'
import dthumb from './assets/dthumb.png'

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const trendingURL = `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`;

interface Trailer {
  title: string;
  key: string;
}

function App() {
  const [slideOut, setSlideOut] = useState(false);
  const [trailers, setTrailers] = useState<Trailer[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setSlideOut(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(trendingURL);
        const data = await response.json();

        const trailerList: Trailer[] = [];

        for (const media of data.results) {
          const videoKey = await fetchVideoKey(media.id, media.media_type);
          if (videoKey) {
            trailerList.push({
              title: media.title || media.name || 'Untitled',
              key: videoKey,
            });
          }
        }

        setTrailers(trailerList);
      } catch (err) {
        console.error('Failed to fetch trailers:', err);
      }
    }

    async function fetchVideoKey(id: number, mediaType: string) {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=${apiKey}`);
        const data = await res.json();
        const trailer = data.results.find(
          (vid: any) => vid.type === 'Trailer' && vid.site === 'YouTube'
        );
        return trailer ? trailer.key : null;
      } catch (err) {
        console.error('Failed to fetch video key:', err);
        return null;
      }
    }

    fetchMovies();
  }, []);

  const handleSkip = () => {
    setCurrentIndex((prev) => (prev + 1) % trailers.length);
  };

  const handleLike = () => {
    
  };

  const handleDislike = () => {
    
  };

  const currentTrailer = trailers[currentIndex];

  return (
    <div className="text-white text-center relative">
      <div className="text-4xl font-serif font-bold">
        <Typewriter words={["Welcome to Cinemaker"]}
        loop = {1}
        typeSpeed = {100}
        deleteSpeed = {50}
        delaySpeed = {10000}
        />
      </div>

      {/* Curtain animation */}
      <div className="bg-conic from-red-600 to-black">
        <div className={`absolute inset-0 z-1 transition-transform duration-[2000ms] ease-in-out ${slideOut ? 'translate-x-full' : 'translate-x-0'}`}>
          <img src={curtain} className="top-0 left-1/2 w-full object-cover" />
        </div>
        <div className={`absolute inset-0 z-1 transition-transform duration-[2000ms] ease-in-out ${slideOut ? '-translate-x-full' : 'translate-x-0'}`}>
          <img src={curtain} className="top-0 right-1/2 w-full object-cover" />
        </div>
      </div>

      {/* Trailer + Buttons */}
      <div className="flex justify-center items-start mt-5 gap-6">
        {currentTrailer ? (
          <>
            <div className="relative">
              <h2 className="bg-radial to-black text-amber-200 text-2xl font-serif font-semibold">{currentTrailer.title}</h2>
              <iframe
                width="1120"
                height="630"
                src={`https://www.youtube.com/embed/${currentTrailer.key}`}
                title={currentTrailer.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="rounded-lg shadow-lg"
              />
            </div>

            {/* Right-side Buttons */}
            <div className="absolute ml-300 flex flex-col gap-4 mt-14">
              <button
                onClick={handleLike}
                className=" text-white px-6 py-2 rounded-xl hover:bg-green-800 transition"
              >
                <img src={thumb}/>
              </button>
              <button
                onClick={handleDislike}
                className=" text-white px-6 py-2 rounded-xl hover:bg-pink-800 transition"
              >
                <img src={dthumb}/>
              </button>
              <button
                onClick={handleSkip}
                className=" text-black px-6 py-2 rounded-xl hover:bg-blue-600 transition"
              >
                ⏭
              </button>
            </div>
          </>
        ) : (
          <p className="text-xl mt-10">Loading trailers...</p>
        )}
      </div>
    </div>
  );
}

export default App;
