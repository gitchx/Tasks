import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetch("http://localhost:8000/tasks.php")
      .then(res => res.text())
      .then(data => setMessage(data))
  }, [])

  return (
    <>
      <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <h1>PHP Test</h1>
        <p>{message}</p>
      </div>
    </>
  )
}

export default App
