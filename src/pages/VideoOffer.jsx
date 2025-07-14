import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroVideo from '../components/HeroVideo';
import VideoThumbnail from '../components/VideoThumbnail';
import styles from '../styles/pages/VideoOffer.module.css';
import logo from '../assets/icons/symbol.svg';
import logoutIcon from '../assets/icons/logout.svg';
import { CURRENT_URL } from '../api/api'; // Importiere die Basis-URL

function VideoOfferPage() {
    const navigate = useNavigate();
    const [videos, setVideos] = useState([]);
    const [categories, setCategories] = useState([]);
    const [videosByCategory, setVideosByCategory] = useState({});
    const [heroVideo, setHeroVideo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Promise für Daten laden
        const fetchData = Promise.all([
            fetch(`${CURRENT_URL}api/videos/`).then(res => res.json()),
            fetch(`${CURRENT_URL}api/videos/categories/`).then(res => res.json())
        ]);

        // Promise für künstliches Delay (z.B. 2 Sekunden)
        const delay = new Promise(resolve => setTimeout(resolve, 2000));

        // Beide Promises abwarten
        Promise.all([fetchData, delay])
            .then(([[videosData, categoriesData]]) => {
                setVideos(videosData);
                setCategories(categoriesData);

                if (videosData.length > 0) {
                    const randomIndex = Math.floor(Math.random() * videosData.length);
                    setHeroVideo(videosData[randomIndex]);
                }
                setIsLoading(false); // Loader ausblenden
            })
            .catch((err) => {
                console.error("Fehler beim Laden der Daten:", err);
                setIsLoading(false); // Auch bei Fehler Loader ausblenden
            });
    }, []);

    useEffect(() => {
        if (categories.length === 0 || videos.length === 0) return;

        const grouped = categories.reduce((acc, category) => {
            acc[category.name] = [];
            return acc;
        }, {});

        videos.forEach(video => {
            (video.categories || []).forEach(catObj => {
                const category = categories.find(c => c.id === catObj.id);
                if (category) {
                    grouped[category.name].push(video);
                }
            });
        });

        setVideosByCategory(grouped);
    }, [categories, videos]);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/login');
    };

    const onVideoClick = (videoId) => {
        navigate(`/video/${videoId}`);
    };

    return (
        <>
            {/* Hauptcontent wird immer gerendert */}
            <div className={styles.videoOfferPage}>
                <header className={styles.header}>
                    <img src={logo} alt="Logo" className={styles.logo} />
                    <button className={styles.logoutButton} onClick={handleLogout}>
                        <img src={logoutIcon} alt="Logout" className={styles.logoutIcon} />
                        Log Out
                    </button>
                </header>

                <HeroVideo
                    videoId={heroVideo?.id}
                    videoUrl={heroVideo?.video_file} // <--- Ändere das Feld hier!
                    title={heroVideo?.title}
                    description={heroVideo?.description}
                />

                {/* Zeige Hinweis, wenn keine Videos vorhanden sind */}
                {!isLoading && videos.length === 0 && (
                    <div className={styles.noVideos}>
                        <h2>Keine Videos vorhanden</h2>
                        <p>Es wurden noch keine Videos hochgeladen.</p>
                    </div>
                )}

                {Object.entries(videosByCategory).map(([category, vids]) => (
                    <section key={category} className={styles.categorySection}>
                        <h3 className={styles.categoryTitle}>{category}</h3>
                        <div className={styles.horizontalScroll}>
                            {vids.length === 0 && <p>Keine Videos in dieser Kategorie</p>}
                            {vids.map(video => (
                                <div
                                    key={video.id}
                                    className={styles.videoCard}
                                    onClick={() => onVideoClick(video.id)}
                                >
                                    {/* Video-Preview oder Thumbnail */}
                                    <video
                                        src={video.video_file}
                                        className={styles.videoPreview}
                                        controls={false}
                                        muted
                                        width={220}
                                        height={140}
                                        poster={video.thumbnail}
                                    />
                                    <p className={styles.cardVideoTitle}>{video.title}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>

            {/* Loader-Overlay nur sichtbar, wenn isLoading true */}
            {isLoading && (
                <div className={styles.loaderOverlay}>
                    <div className={styles.loader}>
                        <img src={logo} alt="Videoflix Logo" className={styles.loaderLogo} />
                        <p>Lade Inhalte...</p>
                    </div>
                </div>
            )}
        </>
    );
}

export default VideoOfferPage;
