import React, { useEffect } from 'react';
import styles from '../styles/components/SuccessToast.module.css';

function SuccessToast({ message, onClose, duration = 2000 }) {
    useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [onClose, duration]);

    return (
        <div className={styles.toast}>
            {message}
        </div>
    );
}

export default SuccessToast;