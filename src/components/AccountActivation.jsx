import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { activateAccount } from '../api/auth';

function AccountActivation() {
    const { activationCode } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const activate = async () => {
            try {
                await activateAccount(activationCode); 
                alert('Account erfolgreich aktiviert!');
                navigate('/login');
            } catch (error) {
                alert('Aktivierung fehlgeschlagen.');
                navigate('/login');
            }
        };
        activate();
    }, [activationCode, navigate]);

    return <p>Account wird aktiviert...</p>;
}

export default AccountActivation;
