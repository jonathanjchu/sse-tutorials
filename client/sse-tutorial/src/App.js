import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    let eventSource = new EventSource("http://localhost:8000/stream")
    eventSource.onmessage = e => getServerDateTime(JSON.parse(e.data))
  });

  const getServerDateTime = (currentTime) => {
    setData(currentTime);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h3>Server Time</h3>
        {
          data
        }
      </header>
    </div>
  );
}

export default App;
