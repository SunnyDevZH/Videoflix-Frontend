import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/pages/Homepage.module.css';
import arrowIcon from '../assets/icons/chevron_right.svg'; 


function Homepage() {
    const [email, setEmail] = useState(''); 
    const navigate = useNavigate();

    const handleSignUp = (e) => {
        e.preventDefault(); 
        navigate('/signup', { state: { email } }); 
    };

    return (
        <div className={styles.homepage}>
            <div className={styles.overlay}>
                <div className={styles.content}>
                    <h1>Movies, Shows und mehr!</h1>
                    <p>Gib deine E-Mail-Adresse ein, um gratis ein Konto zu erstellen.</p>
                    <form className={styles.form} onSubmit={handleSignUp}>
                        <div className={styles.input}>
                            <input
                                type="email"
                                id="email"
                                placeholder="Email Address"
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required
                            />
                        </div>
                        <button type="submit" className={styles.signupButton}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                Sign Up
                                <img
                                    src={arrowIcon}
                                    alt="arrow"
                                    style={{ marginLeft: '10px', width: '8px' }}
                                />
                            </div>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Homepage;