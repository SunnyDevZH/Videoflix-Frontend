import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/pages/Login.module.css';
import { loginUser } from '../api/auth';
import SuccessToast from '../components/SuccessToast'; 
import { Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showToast, setShowToast] = useState(false); // 2. Toast-State
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(email, password);
            localStorage.setItem('access_token', response.access);
            localStorage.setItem('refresh_token', response.refresh);
            setError('');
            setShowToast(true); // 3. Toast anzeigen
            setTimeout(() => navigate('/video-offer'), 2000); // 4. Nach 2s weiterleiten
        } catch (err) {
            setError('Invalid email or password.');
        }
    };

    return (
        <div className={styles.loginpage}>
            <div className="overlay">
                <div className="container">
                    <h1>Log in</h1>
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
                        {error && <p className="errorMessage">{error}</p>}
                        <button type="submit">Log in</button>
                    </form>
                    <div className={styles.loginLinks}>
                        <Link to="/forgot-password" className={styles.link}>Forgot password?</Link>
                        <p>
                            New to Videoflix? <Link to="/signup" className={styles.link}>Sign Up now</Link>
                        </p>
                    </div>
                </div>
            </div>
            {showToast && (
                <SuccessToast
                    message="Login Successful"
                    onClose={() => setShowToast(false)}
                />
            )}
        </div>
    );
}

export default Login;