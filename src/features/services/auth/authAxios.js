import axios from 'axios';
const axiosInstance = axios.create({
    timeout:5000
})
axiosInstance.defaults.baseURL = process.env.REACT_APP_BASE_AUTH_URL
axiosInstance.defaults.withCredentials = true;


export default axiosInstance