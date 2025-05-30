// App.jsx - Main component
import React from 'react';
import './App.css';
import cinematicVideo from './videos/cinematic.mp4';
import logoImage from './img/Logo-4k-v3.png';

// And update the video and img src attributes to use these variables:


function App() {
  return (
      <div className="app">
        <VideoBackgroundSection />
      </div>
  );
}

// VideoBackgroundSection component 
function VideoBackgroundSection() {
  return (
      <section className="video-background-section">
        <div className="video-wrapper">
            <video autoPlay muted loop playsInline src={cinematicVideo}></video>
        </div>

          {/* Overlay container: title → iframe → logo */}
        <div className="overlay">
          {/* 1) Title above the iframe */}
          <h2 className="overlay-title">Imagining Post-Colonial Worlds</h2>

          {/* 3) Logo below the iframe */}
          <img
              style={{
                width: "400px",
                marginTop: "1rem",
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.7))"
              }}
              src={logoImage}
              alt="Logo"
          />

          {/* 2) Steam iframe */}
          <iframe
              src="https://store.steampowered.com/widget/3221630/"
              frameBorder="0"
              width="646"
              height="190"
              className="overlay-iframe"
              title="Steam"
          ></iframe>
        </div>
      </section>
  );
}

export default App;