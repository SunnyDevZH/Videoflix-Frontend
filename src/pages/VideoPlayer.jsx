import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../styles/pages/VideoPlayer.module.css';
import arrowBackIcon from '../assets/icons/arrow_back.svg';
import symbolIcon from '../assets/icons/Symbol.svg';
import { CURRENT_URL } from '../api/api';

function VideoPlayer({ videoUrl, title, thumbnail, onBack }) {
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const hideTimer = useRef(null);

    useEffect(() => {
        const handleActivity = () => {
            setIsHeaderVisible(true);
            if (hideTimer.current) clearTimeout(hideTimer.current);

            hideTimer.current = setTimeout(() => {
                setIsHeaderVisible(false);
            }, 3000);
        };

        window.addEventListener('mousemove', handleActivity);
        window.addEventListener('touchstart', handleActivity); // <- Neu hinzugefügt
        handleActivity();

        return () => {
            window.removeEventListener('mousemove', handleActivity);
            window.removeEventListener('touchstart', handleActivity); // <- Neu hinzugefügt
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

            {/* Video Player */}
            <video
                className={styles.videoElement}
                controls
                autoPlay={true}
                src={videoUrl}
                poster={thumbnail}
            >
                Your browser does not support the video tag.
            </video>
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
                videoUrl={video.video_url}
                title={video.title}
                thumbnail={video.thumbnail}
                onBack={() => navigate('/video-offer')}
            />
        </div>
    );
}

export default VideoPlayerPage;
