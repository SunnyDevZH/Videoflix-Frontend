import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import logo from '../assets/icons/logo.svg';
import styles from '../styles/components/Header.module.css';

function Header() {
  const location = useLocation();
  const navigate = useNavigate(); 
  const isHiddenButton = location.pathname === '/login' || location.pathname === '/text-page';
  const isHiddenPage = location.pathname.startsWith('/video/') || location.pathname === '/video-offer';

  if (isHiddenPage) {
    return null; 
  }

  const handleLoginClick = () => {
    navigate('/login'); 
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="Videoflix Logo" className={styles.logoImage} />
      </div>
      <nav className={styles.nav}>
        {!isHiddenButton && (
          <button className={styles.loginButton} onClick={handleLoginClick}>
            Log in
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;
