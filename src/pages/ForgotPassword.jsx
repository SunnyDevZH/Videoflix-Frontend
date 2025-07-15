import { useState } from 'react';
import styles from '../styles/pages/ForgotPassword.module.css';
import { CURRENT_URL } from '../api/api';
import SuccessToast from '../components/SuccessToast'; 

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [showToast, setShowToast] = useState(false); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch(`${CURRENT_URL}password-reset-request/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setEmail('');
                setShowToast(true); 
            } else {
                const data = await response.json();
                setError(data.error || 'Something went wrong');
            }
        } catch {
            setError('Network error, try again later');
        }
    };

    return (
        <div className={styles.forgotPasswordPage}>
            <div className="overlay">
                <div className="container">
                    <h1>Forgot your password?</h1>
                    <p>Wir senden dir eine E-Mail mit Anweisungen zum Zurücksetzen deines Passworts.</p>
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="input">
                            <span className="inputIcon" />
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Send Email</button>
                    </form>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
            </div>
            {showToast && (
                <SuccessToast
                    message="Email wurde gesendet!"
                    onClose={() => setShowToast(false)} 
                />
            )}
        </div>
    );
}

export default ForgotPassword;
