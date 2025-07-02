import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from '../styles/pages/Login.module.css';
import { activateAccount } from '../api/auth';

function AccountActivation() {
  const { activationCode } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const activate = async () => {
      try {
        await activateAccount(activationCode);
        setStatus('success');
        setTimeout(() => navigate('/login'), 3000); 
      } catch (error) {
        if (error.response?.data?.error === 'Ungültiger oder bereits verwendeter Aktivierungslink.') {
          setStatus('success');
        } else {
          setStatus('error');
        }
        setTimeout(() => navigate('/login'), 3000);
      }
    };
    activate();
  }, [activationCode, navigate]);

  let message;
  if (status === 'loading') {
    message = 'Account wird aktiviert...';
  } else if (status === 'success') {
    message = 'Geschafft! Du kannst nun loslegen.';
  } else {
    message = 'Ups, da ist etwas schiefgelaufen.';
  }

  return (
    <div className={styles.loginpage}>
      <div className={styles.overlay}>
        <div className={styles.container}>
          <h2 className={styles.centerText}>{message}</h2>
        </div>
      </div>
    </div>
  );
}

export default AccountActivation;
