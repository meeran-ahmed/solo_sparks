// ✅ Api.js (only place axios is used)
import axios from 'axios';

const API = axios.create({
  baseURL:  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',

});

export default API;

