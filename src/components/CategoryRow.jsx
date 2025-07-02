import React from 'react';
import styles from '../styles/components/CategoryRow.module.css';

function CategoryRow({ title, videos }) {
    return (
        <div className={styles.rowContainer}>
            <h2>{title}</h2>
            <div className={styles.videoRow}>
                {videos.map((video, index) => (
                    <img key={index} src={video.thumbnail} alt={video.title} className={styles.thumbnail} />
                ))}
            </div>
        </div>
    );
}

export default CategoryRow;
