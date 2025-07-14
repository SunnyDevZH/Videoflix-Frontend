// src/components/VideoPlayer.jsx

import React, { useState } from 'react';
import styles from '../styles/pages/VideoPlayer.module.css';
import arrowBackIcon from '../assets/icons/arrow_back.svg';
import symbolIcon from '../assets/icons/Symbol.svg';

function VideoPlayer({ title, thumbnail, onBack, resolutions = {}, videoFile }) {
    // resolutions: { '1080p': url1, '720p': url2, ... }
    const sources = Object.entries(resolutions).length > 0
        ? Object.entries(resolutions).map(([label, url]) => ({ label, url }))
        : [{ label: 'Original', url: videoFile }];

    const [currentSource, setCurrentSource] = useState(sources[0].url);

    return (
        <div className={styles.videoPlayerPage}>
            <div className={styles.header}>
                <img
                    src={arrowBackIcon}
                    alt="Back"
                    className={styles.backButton}
                    onClick={onBack}
                />
                <p className={styles.videoTitle}>{title}</p>
                <select
                    value={currentSource}
                    onChange={e => setCurrentSource(e.target.value)}
                    style={{ marginRight: 16 }}
                >
                    {sources.map(source => (
                        <option key={source.label} value={source.url}>
                            {source.label}
                        </option>
                    ))}
                </select>
                <img src={symbolIcon} alt="Symbol" className={styles.symbolIcon} />
            </div>
            <div className={styles.videoWrapper}>
                <video
                    src={currentSource}
                    poster={thumbnail}
                    controls
                    autoPlay
                    playsInline
                    style={{ width: '100%', height: '100%' }}
                />
            </div>
        </div>
    );
}

export default VideoPlayer;
