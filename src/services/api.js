import axios from 'axios';

const BASE_URL = 'https://previta-backend.onrender.com';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const checkSymptoms = async (payload) => {
  const response = await api.post('/api/v1/symptom-check', payload);
  return response.data;
};

export default api;