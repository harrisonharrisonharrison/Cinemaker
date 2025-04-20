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
      
      <div className="text-center -mt-10 text-3xl font-extrabold font-serif tracking-wide drop-shadow-[0_5px_15px_rgba(255,255,255,0.25)] bg-gradient-to-br to-slate-50 bg-clip-text text-transparent">
        Welcome to <span className='italic'>Cinemaker</span>
      </div>

      <div className='bg-conic from-red-600 to-black'>
      <div className={`absolute inset-0 z-1 transition-transform duration-[2000ms] ease-in-out ${
            slideOut ? 'translate-x-97/100' : 'translate-x-0'
          }`}
        >
        <img src={curtain}
        className=" top-0 left-1/2 w-full object-cover"/>
      </div>
      
      <div className={`absolute inset-0 z-1 transition-transform duration-[2000ms] ease-in-out ${
            slideOut ? '-translate-x-97/100' : 'translate-x-0'
          }`}
        >
        <img src={curtain}
        className=" top-0 right-1/2 w-full object-cover"/>
      </div>
      </div>
      
      
    </div>
    
  )
}

export default App
