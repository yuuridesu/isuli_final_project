import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios'

import '@/assets/css/user_css/UserDashboard.css';
import '@/assets/css/user_css/ItemDetails.css';

// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://192.168.254.105:8000/api'
// axios.defaults.baseURL = 'http://188.1.0.163:8000/api'
// axios.defaults.baseURL = 'http://127.0.0.1:8000/api'

axios.defaults.headers['Content-Type'] = 'application/json';


axios.interceptors.request.use(

    config => {
        const token = localStorage.getItem('token');
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config
    },

    error => Promise.reject(error)
);

axios.interceptors.response.use(
    response => response,
    error => {
        if(error.response?.status === 401){
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            router.push('/login')
        }

        return Promise.reject(error);
    }
);


createApp(App).use(router).mount('#app');