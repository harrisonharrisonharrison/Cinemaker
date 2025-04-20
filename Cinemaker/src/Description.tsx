import './App.css'
import { useEffect, useState } from 'react'

function Description() {
  const [message, setMessage] = useState("");

  useEffect(() => {
      fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt: "Hello from React!" })
    })
      .then((res) => res.json())
      .then((data) => setMessage(data.response))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div className="p-8 text-xl font-bold">
      Flask says: {message || "Loading..."}
    </div>
  );
}

export default Description;
