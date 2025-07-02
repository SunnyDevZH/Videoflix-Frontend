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
  const response = await API.get(`api/accounts/activate/${activationCode}/`);
  return response.data;
};