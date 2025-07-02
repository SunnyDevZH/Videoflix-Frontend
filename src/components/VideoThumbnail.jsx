import React, { useRef } from 'react';
import styles from '../styles/pages/VideoOffer.module.css';

function VideoThumbnail({ video, onClick, onLoadedData }) {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className={styles.videoThumbnail}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <video
        ref={videoRef}
        src={video.video_url}
        muted
        loop
        preload="metadata"
        className={styles.thumbnailVideo}
        onLoadedData={onLoadedData}  
      />
      <p className={styles.videoTitle}>{video.title}</p>
    </div>
  );
}

export default VideoThumbnail;
