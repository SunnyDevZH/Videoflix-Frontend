import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import styles from '../styles/pages/Signup.module.css';
import { registerUser } from '../api/auth';
import SuccessToast from '../components/SuccessToast';

function Signup() {
    const location = useLocation(); 
    const [email, setEmail] = useState(location.state?.email || ''); 
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false);
    const navigate = useNavigate(); 

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");
        try {
            if (password !== confirmPassword) {
                setError('Die Passwörter müssen übereinstimmen.');
            } else {
                setError('');
                await registerUser(email, password);
                setShowToast(true);
                setTimeout(() => navigate('/login'), 2000);
            }
        } catch (err) {
            if (err.response && err.response.status === 409) {
                setError("Dein Benutzer oder Passwort ist schon vorhanden");
            }
        }
    };

    return (
        <div className={styles.signupPage}>
            <div className="overlay">
                <div className="container">
                    <h1>Sign up</h1>
                    <form className="form" onSubmit={handleSignup}>
                        <div className="input">
                            <span className="inputIcon" />
                            <input
                                type="email"
                                id="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input">
                            <input
                                type="password"
                                id="password"
                                placeholder="Passwort"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input">
                            <input
                                type="password"
                                id="confirm-password"
                                placeholder="Passwort bestätigen"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <div className="errorMessage">{error}</div>}
                        <button type="submit" className={styles.signupButton}>Get Started</button>
                    </form>
                </div>
            </div>
            {showToast && (
                <SuccessToast
                    message="Registrierung erfolgreich! Bitte bestätige deine E-Mail."
                    onClose={() => setShowToast(false)}
                />
            )}
        </div>
    );
}

export default Signup;