import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Importiere useNavigate
import styles from '../styles/pages/Signup.module.css';
import { registerUser } from '../api/auth';
import SuccessToast from '../components/SuccessToast';

function Signup() {
    const location = useLocation(); // E-Mail aus dem state auslesen
    const [email, setEmail] = useState(location.state?.email || ''); // E-Mail übernehmen
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showToast, setShowToast] = useState(false);
    const navigate = useNavigate(); // Initialisiere useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords must match.');
        } else {
            try {
                setError('');
                await registerUser(email, password);
                setShowToast(true);
                setTimeout(() => navigate('/login'), 2000);
            } catch (err) {
                setError(err?.message || 'An error occurred during registration.');
            }
        }
    };

    return (
        <div className={styles.signupPage}>
            <div className="overlay">
                <div className="container">
                    <h1>Sign up</h1>
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="input">
                            <span className="inputIcon" />
                            <input
                                type="email"
                                id="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input">
                            <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input">
                            <input
                                type="password"
                                id="confirm-password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p className="errorMessage">{error}</p>}
                        <button type="submit" className={styles.signupButton}>Get Started</button>
                    </form>
                </div>
            </div>
            {showToast && (
                <SuccessToast
                    message="Registrierung erfolgreich! Bitte bestätige deine E-Mail über den Link."
                    onClose={() => setShowToast(false)}
                />
            )}
        </div>
    );
}

export default Signup;