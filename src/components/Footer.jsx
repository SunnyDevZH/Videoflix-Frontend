import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../styles/components/Footer.module.css';
import { Link } from 'react-router-dom';

function Footer() {
  const location = useLocation();
  const isHiddenPage = location.pathname.startsWith('/video/') || location.pathname === '/video-offer' || location.pathname === '/text-page'; // Footer ausblenden auf /video-player und /video-offer

  if (isHiddenPage) {
    return null; 
  }

  return (
    <footer className={styles.footer}>
      <Link to="/text-page" className={styles.link}>
        Datenschutz
      </Link>
      <Link to="/text-page" className={styles.link}>
        Impressum
      </Link>
    </footer>
  );
}

export default Footer;