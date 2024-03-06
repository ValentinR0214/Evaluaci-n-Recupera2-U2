import axios from 'axios';

const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;

const axiosClient = axios.create({
  baseURL: SERVER_URL,
  withCredentials: false
});

const requestHandler = (request) => {
  request.headers['Accept'] = 'application/json';
  request.headers['Content-Type'] = 'application/json';
  const session = JSON.parse(localStorage.getItem('user')) || null;
  if ( session?.token) {
    request.headers['Authorization'] = `Bearer ${session.token}`;
  }
  return request;
};

axiosClient.interceptors.request.use(
  (req) => requestHandler(req),
  (err) => Promise.reject(err)
);

axiosClient.interceptors.response.use(
  (res) => Promise.resolve(res.data),
  (err) => Promise.reject(err)
);

export default axiosClient;
