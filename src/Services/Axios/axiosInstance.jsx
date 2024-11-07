import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://tracker-backend-2j0k.onrender.com',
    timeout: 10000, 
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
