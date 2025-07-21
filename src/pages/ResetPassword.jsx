import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/pages/ResetPassword.module.css';
import SuccessToast from '../components/SuccessToast'; 

function ResetPassword() {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showToast, setShowToast] = useState(false); 
    const navigate = useNavigate();

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => {
                navigate('/login');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [showToast, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords must match.');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/reset-password/confirm/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, code, new_password: password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'Invalid code or user.'); 
                return;
            }

            setShowToast(true); 
            setError('');
            setEmail('');
            setCode('');
            setPassword('');
            setConfirmPassword('');
        } catch (err) {
            setError('Failed to reset password.');
        }
    };

    return (
        <div className={styles.resetPasswordPage}>
            <div className="overlay">
                <div className="container">
                    <h1>Reset password</h1>
                    <p>Erstelle ein neues Passwort für dein Videoflix-Konto.</p>
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="input">
                            <span className="inputIcon" />
                            <input
                                type="email"
                                placeholder="E-Mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={styles.inputField}
                                required
                            />
                        </div>
                        <div className="input">
                            <input
                                type="password"
                                placeholder="Gib den 6-stelligen Code ein"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className={styles.inputField}
                                required
                            />
                        </div>
                        <div className="input">
                            <input
                                type="password"
                                placeholder="Gib ein neues Passwort ein"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={styles.inputField}
                                required
                            />
                        </div>
                        <div className="input">
                            <input
                                type="password"
                                placeholder="Neues Passwort bestätigen"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className={styles.inputField}
                                required
                            />
                        </div>
                        {error && <p className="errorMessage">{error}</p>} 
                        <button type="submit">Passwort zurücksetzen</button>
                    </form>
                </div>
            </div>
            {showToast && (
                <SuccessToast
                    message="Passwort wurde erfolgreich zurückgesetzt!"
                    onClose={() => setShowToast(false)} // Schließe die Toast-Benachrichtigung
                />
            )}
        </div>
    );
}

export default ResetPassword;
