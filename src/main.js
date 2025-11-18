import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import '@/assets/css/user_css/UserDashboard.css';
import '@/assets/css/user_css/ItemDetails.css';

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'

// Optional: Bootstrap JS (for dropdowns, modals, etc.)
import 'bootstrap/dist/js/bootstrap.bundle.min.js'


createApp(App).use(router).mount('#app');