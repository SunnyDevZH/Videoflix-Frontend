import API from './api';

// Liste aller Videos abrufen
export const getVideos = async () => {
  const response = await API.get('videos/');
  return response.data;
};

// Einzelnes Video abrufen
export const getVideoById = async (id) => {
  const response = await API.get(`videos/${id}/`);
  return response.data;
};

// Kategorien abrufen
export const getCategories = async () => {
  const response = await API.get('videos/categories/');
  return response.data;
};