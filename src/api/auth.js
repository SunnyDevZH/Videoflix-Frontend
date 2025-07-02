import API from './api';

// Benutzer registrieren
export const registerUser = async (email, password) => {
  const response = await API.post('api/accounts/register/', { email, password });
  return response.data;
};

// Benutzer einloggen
export const loginUser = async (email, password) => {
  const response = await API.post('api/accounts/token/', { username: email, password }); // Username ist die E-Mail
  return response.data;
};

// Token erneuern
export const refreshToken = async (refresh) => {
  const response = await API.post('api/accounts/token/refresh/', { refresh });
  return response.data;
};

export const activateAccount = async (activationCode) => {
  try {
    const response = await API.get(`api/accounts/activate/${activationCode}/`);
    console.log('Activation response:', response);
    return response.data;
  } catch (error) {
    console.error('Activation error:', error.response ? error.response.data : error.message);
    throw error;
  }
};