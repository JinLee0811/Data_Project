import axios from 'axios'


const serverUrl = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: serverUrl,
});

export default api;