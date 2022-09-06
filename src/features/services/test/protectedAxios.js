import axios from 'axios';
import { store } from '../../../app/store';
import { refresh } from '../../auth/authSlice';
const axiosInstance = axios.create({
    timeout:5000
})
axiosInstance.defaults.baseURL = process.env.REACT_APP_BASE_TEST_URL
axiosInstance.defaults.withCredentials = true;

axiosInstance.interceptors.request.use(function(config){    
    const state = store.getState();
    const token = state.auth.accessToken
    config.headers.Authorization = `Bearer ${token}`
    return config
})

axiosInstance.interceptors.response.use(resp => resp,error =>{
    const orginalRequest = error.config
    console.log(error.response);
    
    if(error.response.data === "Invalid Access Token"){
        store.dispatch(refresh({}))
    }
    return axios.request(orginalRequest)
})
export default axiosInstance