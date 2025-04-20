import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import TrailerPlayer from './Buttons.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className='absolute top-0 left-0 -z-20 bg-radial-[at_50%_75%] from-black to-rose-950 min-h-screen w-full'/>

    <App/>
     
    {/*<TrailerPlayer />*/}

  </StrictMode>,
)
