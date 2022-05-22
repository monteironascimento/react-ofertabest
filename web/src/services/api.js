import axios from 'axios';

const api = axios.create({
  baseURL: `${window.location.hostname === 'localhost' ? 'http://localhost:3333' : 'https://api.ofertabest.com'}`, 
  withCredentials: false,
  headers: {
    'Content-Type':  'application/json',
    },
  meta: {
    'http-equiv': "Content-Security-Policy",
    'content': "upgrade-insecure-requests" 
  }
});

export default api;
