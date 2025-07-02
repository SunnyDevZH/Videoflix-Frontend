import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/components/HeroVideo.module.css';

function HeroVideo({ videoId, videoUrl, title, description }) {
  const navigate = useNavigate();

  return (
    <div className={styles.heroContainer}>
      <video
        className={styles.heroVideo}
        src={videoUrl}
        autoPlay
        muted
        loop
        playsInline
        controls={false}
      />
      <div className={styles.overlay}>
        <h1>{title}</h1>
        <p>{description}</p>
        <button
          className={styles.playButton}
          onClick={() => navigate(`/video/${videoId}`)}
        >
          ▶ Play
        </button>
      </div>
    </div>
  );
}

export default HeroVideo;
