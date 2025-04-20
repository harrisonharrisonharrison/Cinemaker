import './App.css'
import { useEffect, useState } from 'react'
import curtain from './assets/curtain.png'
import { Typewriter } from 'react-simple-typewriter'
import thumb from './assets/thumbs.png'
import dthumb from './assets/dthumb.png'
import axios from "axios";
import { motion, AnimatePresence } from 'framer-motion'

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const trendingURL = `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`;

interface Trailer {
  title: string;
  key: string;
  id: number;
  media_type: string;
}

interface Genre {
  id: number;
 name: string;
 media_type: string;
}

// Single white button → hover to reveal Like / Dislike / Skip
function DropdownActions({
  onLike,
  onDislike,
  onSkip,
}: {
  onLike: () => void
  onDislike: () => void
  onSkip: () => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* The white “menu” button */}
      <button className="w-10 h-10 bg-slate-900 rounded-full shadow flex items-center justify-center">
        ⋮
      </button>

      {/* Dropdown panel with a fixed width */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="dropdown"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-40 flex flex-col gap-2 bg-white rounded-lg p-2 shadow-lg z-10"
          >
            {/* Like */}
            <motion.button
              onClick={onLike}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full flex items-center gap-2 p-2 bg-green-500 hover:bg-green-600 text-black rounded"
            >
              <img src={thumb} alt="Like" className="w-6 h-6" />
              Like
            </motion.button>

            {/* Dislike */}
            <motion.button
              onClick={onDislike}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full flex items-center gap-2 p-2 bg-red-500 hover:bg-red-600 text-black rounded"
            >
              <img src={dthumb} alt="Dislike" className="w-6 h-6" />
              Dislike
            </motion.button>

            {/* Skip */}
            <motion.button
              onClick={onSkip}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full flex items-center gap-2 p-2 bg-blue-500 hover:bg-blue-600 text-black rounded"
            >
              <span className="text-2xl leading-none">⏭</span>
              Skip
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function App() {
  const [slideOut, setSlideOut] = useState(false);
  const [trailers, setTrailers] = useState<Trailer[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setSlideOut(true), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(trendingURL)
        const data = await response.json()

        const trailerList: Trailer[] = []
        for (const media of data.results) {
          
          const videoKey = await fetchVideoKey(media.id, media.media_type)
          if (videoKey) {
            trailerList.push({
              title: media.title || media.name || 'Untitled',
              key: videoKey,
              id: media.id,
              media_type: media.media_type,
            })
          }
        }
        setTrailers(trailerList)
      } catch (err) {
        console.error('Failed to fetch trailers:', err)
      }
    }

    async function fetchVideoKey(id: number, mediaType: string) {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=${apiKey}`
        )
        const data = await res.json()
        const trailer = data.results.find(
          (vid: any) => vid.type === 'Trailer' && vid.site === 'YouTube'
        )
        return trailer ? trailer.key : null
      } catch (err) {
        console.error('Failed to fetch video key:', err)
        return null
      }
    }

    fetchMovies()
  }, [])

  async function fetchMovieGenres(id: number, mediaType: string) {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/${mediaType}/${id}?language=en-US`
      )
      const data = await res.json()
      if (Array.isArray(data.genres)) {
        return data.genres.map((g: { id: number; name: string }) => g.name);
      } else {
        console.warn('No genres field in response:', data);
        return null;
      }
    } catch (err) {
      console.error('Failed to fetch video key:', err)
      return null
    }
  }


  useEffect(() => {
    fetch("http://localhost:4999/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then(res => res.json())
      .then(data => setMessage(data.response))
      .catch(console.error);
  }, []);
  
  async function fetchVideoKey(id: number, mediaType: string) {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=${apiKey}`
      )
      const data = await res.json()
      const trailer = data.results.find(
        (vid: any) => vid.type === 'Trailer' && vid.site === 'YouTube'
      )
      return trailer ? trailer.key : null
    } catch (err) {
      console.error('Failed to fetch video key:', err)
      return null
    }
  }

  const handleSkip = () => {
    setCurrentIndex((prev) => (prev + 1) % trailers.length);
    axios.post("http://localhost:4999/api/title", {
      title: trailers[currentIndex+1].title,
    })
    .then(function (response) {
      setMessage(response.data.response);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };

  const handleLike = async () => {
    setCurrentIndex((prev) => (prev + 1) % trailers.length);
    const genreList: Genre[] = [];
    const media = trailers[currentIndex];
    const videoGenres = await fetchMovieGenres(media.id, media.media_type)


    axios.post("http://localhost:4999/api/title", {
      title: trailers[currentIndex+1].title,
    })
    .then(function (response) {
      setMessage(response.data.response);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

    for (const genre of videoGenres) {
      genreList.push({
        id: genre.id,
        name: genre.name,
        media_type: media.media_type,
      })
    }
    const genreParam = genreList.map(g => g.id).join(',');
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreParam}&api_key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    const trailerList: Trailer[] = []
    for (const media of data.results) {
      const videoKey = await fetchVideoKey(media.id, media.media_type)
      if (videoKey) {
        trailerList.push({
          title: media.title || media.name || 'Untitled',
          key: videoKey,
          id: media.id,
          media_type: media.media_type,
        })
      }
    }
    setTrailers(trailerList)

  };

  const handleDislike = () => {
    setCurrentIndex((prev) => (prev + 1) % trailers.length);
    axios.post("http://localhost:4999/api/title", {
      title: trailers[currentIndex+1].title,
    })
    .then(function (response) {
      setMessage(response.data.response);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }

  const currentTrailer = trailers[currentIndex]

  return (
    <div className="text-white text-center relative">
      <div className="text-4xl font-serif font-bold">
        <Typewriter
          words={['Welcome to Cinemaker']}
          loop={1}
          typeSpeed={100}
          deleteSpeed={50}
          delaySpeed={10000}
        />
      </div>

      {/* Curtain animation with shaking */}
      <div className="bg-conic from-red-600 to-black">
        <motion.div
          animate={{ x: [0, -5, 5, 0] }}
          transition={{ repeat: Infinity, duration: 0.6 }}
          className={`absolute inset-0 z-1 transition-transform duration-[2000ms] ease-in-out ${
            slideOut ? 'translate-x-full' : 'translate-x-0'
          }`}
        >
          <img src={curtain} className="top-0 left-1/2 w-full object-cover" />
        </motion.div>
        <motion.div
          animate={{ x: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 0.6 }}
          className={`absolute inset-0 z-1 transition-transform duration-[2000ms] ease-in-out ${
            slideOut ? '-translate-x-full' : 'translate-x-0'
          }`}
        >
          <img src={curtain} className="top-0 right-1/2 w-full object-cover" />
        </motion.div>
      </div>

      {/* Trailer + Buttons with slide animation */}
      <div className="overflow-hidden">
        <AnimatePresence mode="wait">
          {currentTrailer ? (
            <motion.div
              key={currentTrailer.key}
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '-100%' }}
              transition={{ duration: 0.5 }}
              className="flex justify-center items-start mt-5 gap-6"
            >
              {/* Video with hover scale */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <h2 className="bg-radial to-black text-amber-200 text-2xl font-serif font-semibold mb-2">
                  {currentTrailer.title}
                </h2>
                <iframe
                  width="1120"
                  height="630"
                  src={`https://www.youtube.com/embed/${currentTrailer.key}`}
                  title={currentTrailer.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="rounded-lg shadow-lg"
                />
              </motion.div>

              {/* Dropdown menu button */}
              <div className="absolute top-14 right-4">
                <DropdownActions
                  onLike={handleLike}
                  onDislike={handleDislike}
                  onSkip={handleSkip}
                />
              </div>
            </motion.div>
          ) : (
            <motion.p
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-xl mt-10"
            >
              Loading trailers...
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      

      <div className="p-8 text-xl font-bold">{message || "Loading..."}</div>
    
    </div>
  )
}

export default App
