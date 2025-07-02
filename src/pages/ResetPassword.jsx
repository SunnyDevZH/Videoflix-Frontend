import React, { useState } from 'react';
import styles from '../styles/pages/ResetPassword.module.css';
import SuccessToast from '../components/SuccessToast'; // Importiere die SuccessToast-Komponente

function ResetPassword() {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showToast, setShowToast] = useState(false); // Zustand für die Toast-Benachrichtigung

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
                setError(data.error || 'Invalid code or user.'); // Fehlermeldung auf Deutsch
                return;
            }

            setShowToast(true); // Zeige die Toast-Benachrichtigung an
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
                    <p>Create a new password for your Videoflix account.</p>
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="input">
                            <input
                                type="email"
                                placeholder="Your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={styles.inputField}
                                required
                            />
                        </div>
                        <div className="input">
                            <input
                                type="password"
                                placeholder="Enter the 6-digit code"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className={styles.inputField}
                                required
                            />
                        </div>
                        <div className="input">
                            <input
                                type="password"
                                placeholder="Enter a new password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={styles.inputField}
                                required
                            />
                        </div>
                        <div className="input">
                            <input
                                type="password"
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className={styles.inputField}
                                required
                            />
                        </div>
                        {error && <p className="errorMessage">{error}</p>} 
                        <button type="submit">Reset my password</button>
                    </form>
                </div>
            </div>
            {showToast && (
                <SuccessToast
                    message="Password reset successfully!"
                    onClose={() => setShowToast(false)} // Schließe die Toast-Benachrichtigung
                />
            )}
        </div>
    );
}

export default ResetPassword;
