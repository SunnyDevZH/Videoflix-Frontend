import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../styles/pages/VideoPlayer.module.css';
import logo from '../assets/icons/symbol.svg';
import arrowBack from '../assets/icons/arrow_back.svg';
import { CURRENT_URL } from '../api/api';

function VideoPlayer() {
  const { videoId } = useParams();
  const navigate = useNavigate();

  const [video, setVideo] = useState(null);
  const [selectedResolution, setSelectedResolution] = useState('720p'); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${CURRENT_URL}api/videos/${videoId}/`)
      .then(res => res.json())
      .then(data => {
    
        const videoData = Array.isArray(data) ? data[0] : data;

        setVideo(videoData);

        if (!videoData.resolutions['720p']) {
          if (videoData.resolutions['480p']) setSelectedResolution('480p');
          else if (videoData.resolutions['360p']) setSelectedResolution('360p');
          else setSelectedResolution(null);
        } else {
          setSelectedResolution('720p');
        }

        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [videoId]);

  const handleBack = () => navigate(-1);

  const handleResolutionChange = (e) => setSelectedResolution(e.target.value);

  return (
    <div className={styles.videoPlayerPage}>
      <header className={styles.header}>
        <button onClick={handleBack} className={styles.backButton} aria-label="Zurück">
          <img src={arrowBack} alt="Zurück" className={styles.backIcon} />
        </button>

        <h1 className={styles.title}>{video?.title || '...'}</h1>

        <img src={logo} alt="Logo" className={styles.logo} />
      </header>

      {isLoading ? (
        <div className={styles.loader}>Lade Video...</div>
      ) : video ? (
        <>
          <video
            controls
            autoPlay
            className={styles.videoPlayer}
            src={selectedResolution ? video.resolutions[selectedResolution] : video.video_file}
            poster={video.thumbnail_url}
          />

          <div className={styles.descriptionAndResolution}>
            <p className={styles.description}>Beschreibung: {video.description}</p>

            <div className={styles.resolutionSelector}>
              <label htmlFor="resolution" className={styles.resolutionLabel}>Auflösung:</label>
              <select
                id="resolution"
                value={selectedResolution || ''}
                onChange={handleResolutionChange}
                className={styles.resolutionSelect}
              >
                {video.resolutions && Object.keys(video.resolutions).map((res) => (
                  <option key={res} value={res}>
                    {res}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </>
      ) : (
        <div>Video nicht gefunden.</div>
      )}
    </div>
  );
}

export default VideoPlayer;

