import './App.css'
import { useEffect, useState } from 'react'
import curtain from './assets/curtain.png'


function App() {
  const [slideOut, setSlideOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setSlideOut(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className=''>
    
      <div className="">
          <span className="absolute top-10 left-100 mx-auto py-4 flex bg-gradient-to-r blur-xl from-slate-50 bg-clip-text text-6xl font-extrabold select-none">
            Welcome to Cinemaker
          </span>
          <h1
              className="absolute top-10 left-110 w-fit h-auto py-4 justify-center flex bg-gradient-to-r items-center  from-slate-50 bg-clip-text text-6xl font-extrabold text-center select-auto">
              Welcome to Cinemaker
          </h1>
      </div>

      <div className=''>
      <div className={`absolute inset-0 z-20 transition-transform duration-[2000ms] ease-in-out ${
            slideOut ? 'translate-x-full' : 'translate-x-0'
          }`}
        >
        <img src={curtain}
        className="absolute top-0 left-1/2 w-full object-cover"/>
      </div>
      
      <div className={`absolute inset-0 z-20 transition-transform duration-[2000ms] ease-in-out ${
            slideOut ? '-translate-x-full' : 'translate-x-0'
          }`}
        >
        <img src={curtain}
        className="absolute top-0 right-1/2 w-full object-cover"/>
      </div>
      </div>

      <iframe width="1120" height="630" src="https://www.youtube.com/embed/zdG0X-6bNU0?si=1_qr-0TFAcMSzAEe" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
    
    </div>
    
  )
}

export default App
