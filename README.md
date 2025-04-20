# Cinemaker – UCR CitrusHack 2025

**Discover your next favorite movie with AI-powered summaries and seamless trailers.**

---

## Inspiration

We wanted to revolutionize how people decide *what to watch next*. Instead of endlessly scrolling through pages and vague descriptions, **Cinemaker** delivers an immersive, instant-viewing taste testing experience by combining **YouTube trailers** with **AI-generated summaries**.

---

## What It Does

Cinemaker brings you a **continuous stream of curated movie and TV trailers**, all within your browser. Features include:

- Instant trailers with no reloads
- 👍 Like / 👎 Dislike system to refine personal taste
- ⏭ Skip to the next title at any time
- AI-generated summaries of plot, characters, and genre

All in real time—so you spend less time searching, and more time watching.

---

## How We Built It

**Frontend:**  
- Built with **React** (functional components, hooks like `useEffect` and `useState`)  
- Styled using **Tailwind CSS** for a modern, responsive UI

**Backend:**  
- Trailers were integrated with **TMDB's API**
- **Flask** server with endpoints:  
  - `/api/skip` for skipping to the next trailer  
  - `/api/describe` for AI-generated summaries  
- Integrated with **Google GenAI's Gemini API**

**Data Flow:**  
1. User skips or selects a trailer
2. A request gets sent to TMDB for the next movie
3. React sends a request to Flask  
4. Flask queries Gemini for a summary  
5. React receives and updates UI in real-time

**Deployment Tools:**  
- `Flask-CORS` for smooth client-server communication  
- `dotenv` for secure key management  
- Local dev on `localhost:3000` (React) + `localhost:5000` (Flask)

---

## Built With

- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [Flask](https://flask.palletsprojects.com/)
- [Python](https://www.python.org/)
- [Google GenAI – Gemini](https://deepmind.google/technologies/gemini/)
- [TMDB API](https://developer.themoviedb.org/docs/getting-started)
- HTML / CSS

---

## Challenges We Faced

- **CORS Configuration:** Tuning headers for clean React-Flask communication  
- **Async State Management:** Handling rapid user input and API latency  
- **Prompt Engineering:** Iterating on instructions for meaningful summaries from Gemini

---

## Accomplishments

- Seamless UX with no reloads or interruptions
- First-time integration of APIs
- Implemented Like/Dislike logic to adapt trailer suggestions

---

## What We Learned

- Mastered **React hooks** and dependency arrays  
- Gained experience in **Flask REST API** design  
- Navigated real-world **CORS** and async fetch patterns  
- Practiced **prompt engineering** for better AI output

---

## What's Next

- **User Accounts:** Save history, preferences, and resume where you left off  
- **Recommendation Engine:** Smarter AI-backed trailer suggestions  
- **Mobile Version:** React Native app for on-the-go discovery  
- **Advanced Filtering:** Search, tags, and custom playlists

---

