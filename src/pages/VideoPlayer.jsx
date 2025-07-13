// src/pages/VideoPlayerPage.jsx

import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../styles/pages/VideoPlayer.module.css';
import arrowBackIcon from '../assets/icons/arrow_back.svg';
import symbolIcon from '../assets/icons/Symbol.svg';
import { CURRENT_URL } from '../api/api';

function VideoPlayer({ title, thumbnail, onBack, resolutions }) {
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [currentResolution, setCurrentResolution] = useState(null);
    const hideTimer = useRef(null);

    // Setze initial die erste verfügbare Auflösung als Standard
    useEffect(() => {
        const availableResolutions = Object.entries(resolutions).filter(([_, url]) => url);
        if (availableResolutions.length > 0) {
            setCurrentResolution(availableResolutions[0][0]);
        }
    }, [resolutions]);

    const videoUrl = currentResolution ? resolutions[currentResolution] : null;

    useEffect(() => {
        const handleActivity = () => {
            setIsHeaderVisible(true);
            if (hideTimer.current) clearTimeout(hideTimer.current);

            hideTimer.current = setTimeout(() => {
                setIsHeaderVisible(false);
            }, 3000);
        };

        window.addEventListener('mousemove', handleActivity);
        window.addEventListener('touchstart', handleActivity);
        handleActivity();

        return () => {
            window.removeEventListener('mousemove', handleActivity);
            window.removeEventListener('touchstart', handleActivity);
            if (hideTimer.current) clearTimeout(hideTimer.current);
        };
    }, []);

    return (
        <div className={styles.videoPlayerPage}>
            {/* Header */}
            <div
                className={`${styles.header} ${isHeaderVisible ? styles.visible : styles.hidden}`}
            >
                <img
                    src={arrowBackIcon}
                    alt="Back"
                    className={styles.backButton}
                    onClick={onBack}
                />
                <p className={styles.videoTitle}>{title}</p>
                <img src={symbolIcon} alt="Symbol" className={styles.symbolIcon} />
            </div>

            {/* Auflösungs-Dropdown */}
            <div className={styles.resolutionSelector}>
                <label>Auflösung:</label>
                <select
                    value={currentResolution || ''}
                    onChange={(e) => setCurrentResolution(e.target.value)}
                >
                    {Object.entries(resolutions)
                        .filter(([_, url]) => url) // Nur verfügbare URLs zeigen
                        .map(([res, _]) => (
                            <option key={res} value={res}>
                                {res}
                            </option>
                        ))}
                </select>
            </div>

            {/* Video Element oder Hinweis wenn kein Video verfügbar */}
            {videoUrl ? (
                <video
                    className={styles.videoElement}
                    controls
                    autoPlay
                    src={videoUrl}
                    poster={thumbnail}
                >
                    Your browser does not support the video tag.
                </video>
            ) : (
                <p>Video ist nicht verfügbar.</p>
            )}
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
                title={video.title}
                thumbnail={video.thumbnail_url}
                onBack={() => navigate('/video-offer')}
            />
        </div>
    );
}

export default VideoPlayerPage;
