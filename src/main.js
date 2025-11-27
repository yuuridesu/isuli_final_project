import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios'

import '@/assets/css/user_css/UserDashboard.css';
import '@/assets/css/user_css/ItemDetails.css';
import 'leaflet/dist/leaflet.css';


// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// // axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://192.168.254.105:8000/api'
// axios.defaults.baseURL = 'http://188.1.0.163:8000/api'
// axios.defaults.baseURL = 'http://127.0.0.1:8000/api'
// axios.defaults.baseURL = 'http://188.1.6.173:8000/api'


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

// import { createApp } from "vue";
// import App from "./App.vue";
// import router from "./router";
// import axios from "axios";

// // CSS imports
// import "@/assets/css/user_css/UserDashboard.css";
// import "@/assets/css/user_css/ItemDetails.css";

// // Axios base URL
// axios.defaults.baseURL = "http://192.168.254.105:8000/api";
// axios.defaults.headers["Content-Type"] = "application/json";

// // Determine app type (Admin/User) from URL path
// const TOKEN_KEY = window.location.pathname.startsWith("/admin") ? "admin_token" : "user_token";
// const USER_KEY = TOKEN_KEY === "admin_token" ? "admin" : "user";

// // Restore token on app load
// const token = localStorage.getItem(TOKEN_KEY);
// if (token) {
//   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// }

// // Axios interceptors
// axios.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem(TOKEN_KEY);
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// axios.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem(TOKEN_KEY);
//       localStorage.removeItem(USER_KEY);
//       router.push("/login");
//     }
//     return Promise.reject(error);
//   }
// );

// createApp(App)
//   .use(router)
//   .provide("currentUser", JSON.parse(localStorage.getItem(USER_KEY)))
//   .mount("#app");
