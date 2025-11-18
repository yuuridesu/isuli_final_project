<template>

    <div class="profile-page">

            <navbar />

        <div class="profile-container">
        <div class="profile-card">
        <div class="avatar">
          <img :src="user.avatar || defaultAvatar" alt="User Avatar" />
        </div>

        <h2> {{ user.firstname }} {{ user.lastname }} </h2>
        <p> {{ user.student_id }} </p>
        <p> {{ user.email }}</p>


          <!-- Logout button -->
        <button class="logout-btn" @click="logout">Logout</button>


    </div>

    </div>

    </div>
    
</template>

<script>

import navbar from '@/components/navbar.vue'
import axios from 'axios'
// axios.defaults.baseURL = 'http://192.168.254.105:8000/api'
// axios.defaults.baseURL = 'http://127.0.0.1:8000/api'
axios.defaults.baseURL = 'http://188.1.0.163:8000/api'

import defaultAvatar from '@/assets/images/avatar.jpeg'
export default {
    name: 'UserProfile',
    components: {navbar},

    data(){
        return { 
        user: {},
         defaultAvatar

        }
    },

    created(){
        this.fetchUsers()
    },


    methods:{
        async fetchUsers(){
            try{
                const token = localStorage.getItem('token')
                const response = await axios.get('user', {
                    headers: {Authorization: `Bearer ${token}`}
                })

                this.user = response.data.data
            } catch(error){
                console.error(error)

                alert("error fetch user")
            }
        },

        logout() {
      // Clear token and redirect to login page
      localStorage.removeItem('token')
      this.$router.push('/login') // or whatever your login route is
    }
    }

}
</script>


<style scoped>
.profile-page {
  padding-top: 90px; /* space for navbar */
  display: flex;
  justify-content: center;
}

.profile-container {
  max-width: 500px;
  width: 100%;
  margin: 20px;
}

.profile-card {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  text-align: center;
}

.avatar img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 15px;
}

.profile-card h2 {
  margin-bottom: 10px;
  font-size: 1.8rem;
  color: #333;
}

.profile-card p {
  margin: 5px 0;
  font-size: 1rem;
  color: #555;
}

.profile-card .status.active {
  color: green;
  font-weight: 600;
}

.profile-card .status.inactive {
  color: red;
  font-weight: 600;
}

.logout-btn {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
}

.logout-btn:hover {
  background-color: #d32f2f;
}

</style>