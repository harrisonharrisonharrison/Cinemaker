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
      
      <div className="text-4xl -mt-0 font-serif font-bold justify-center">
            Welcome to Cinemaker
      </div>

      <div className='bg-conic from-red-600 to-black'>
      <div className={`absolute inset-0 z-1 transition-transform duration-[2000ms] ease-in-out ${
            slideOut ? 'translate-x-full' : 'translate-x-0'
          }`}
        >
        <img src={curtain}
        className=" top-0 left-1/2 w-full object-cover"/>
      </div>
      
      <div className={`absolute inset-0 z-1 transition-transform duration-[2000ms] ease-in-out ${
            slideOut ? '-translate-x-full' : 'translate-x-0'
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
