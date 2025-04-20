import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
    <App/>
    <div className='absolute top-0 left-0 -z-20 bg-radial-[at_50%_75%] from-black to-rose-950 h-[135vh] w-full'/>
  
  </StrictMode>,
)
