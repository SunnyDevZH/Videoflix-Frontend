// src/pages/VideoPlayerPage.jsx

import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import styles from '../styles/pages/VideoPlayer.module.css';
import arrowBackIcon from '../assets/icons/arrow_back.svg';
import symbolIcon from '../assets/icons/Symbol.svg';
import { CURRENT_URL } from '../api/api';

function VideoPlayer({ title, thumbnail, onBack, resolutions, videoFile }) {
    const videoRef = useRef(null);
    const playerRef = useRef(null);

    // Quellen für verschiedene Auflösungen zusammenstellen
    const sources = Object.entries(resolutions)
        .filter(([_, url]) => url)
        .map(([label, url]) => ({
            src: url,
            type: 'video/mp4',
            label: label
        }));

    // Fallback auf Originaldatei
    if (sources.length === 0 && videoFile) {
        sources.push({
            src: videoFile,
            type: 'video/mp4',
            label: 'Original'
        });
    }

    useEffect(() => {
        if (!playerRef.current) {
            playerRef.current = videojs(videoRef.current, {
                controls: true,
                autoplay: true,
                preload: 'auto',
                poster: thumbnail,
                sources: sources
            });
        } else {
            playerRef.current.src(sources);
        }
        return () => {
            if (playerRef.current) {
                playerRef.current.dispose();
                playerRef.current = null;
            }
        };
    }, [sources, thumbnail]);

    return (
        <div className={styles.videoPlayerPage}>
            {/* Header */}
            <div className={styles.header}>
                <img
                    src={arrowBackIcon}
                    alt="Back"
                    className={styles.backButton}
                    onClick={onBack}
                />
                <p className={styles.videoTitle}>{title}</p>
                <img src={symbolIcon} alt="Symbol" className={styles.symbolIcon} />
            </div>

            {/* Video Element */}
            <div className={styles.videoWrapper}>
                <video
                    ref={videoRef}
                    className="video-js vjs-big-play-centered"
                    playsInline
                />
            </div>
        </div>
    );
}

function VideoPlayerPage() {
    const { videoId } = useParams();
    const [video, setVideo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${CURRENT_URL}api/videos/${videoId}/`)
            .then((res) => {
                if (!res.ok) throw new Error('Video nicht gefunden');
                return res.json();
            })
            .then((data) => setVideo(data))
            .catch(() => navigate('/')); // Bei Fehler zurück zur Startseite
    }, [videoId, navigate]);

    if (!video) return <p>Lädt...</p>;

    return (
        <div>
            <VideoPlayer
                resolutions={video.resolutions}
                videoFile={video.video_file}
                title={video.title}
                thumbnail={video.thumbnail_url}
                onBack={() => navigate('/video-offer')}
            />
        </div>
    );
}

export default VideoPlayerPage;
