import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/pages/Homepage.module.css';
import arrowIcon from '../assets/icons/chevron_right.svg'; 


function Homepage() {
    const [email, setEmail] = useState(''); // State für die E-Mail
    const navigate = useNavigate();

    const handleSignUp = (e) => {
        e.preventDefault(); // Verhindert das Neuladen der Seite
        navigate('/signup', { state: { email } }); // E-Mail an Signup-Seite übergeben
    };

    return (
        <div className={styles.homepage}>
            <div className={styles.overlay}>
                <div className={styles.content}>
                    <h1>Movies, TV shows, and more</h1>
                    <p>Enter your email to create or restart your subscription.</p>
                    <form className={styles.form} onSubmit={handleSignUp}>
                        <div className={styles.input}>
                            <input
                                type="email"
                                id="email"
                                placeholder="Email Address"
                                value={email} // Verknüpfe den State mit dem Inputfeld
                                onChange={(e) => setEmail(e.target.value)} // Aktualisiere den State bei Eingabe
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