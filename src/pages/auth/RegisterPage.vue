<template>
  <div class="register-container">
    <h2>Register</h2>

    <form class="register-form" @submit.prevent="register">
      <div class="form-group">
        <label>Student ID</label>
        <input v-model="form.student_id" type="text" placeholder="Enter student ID" required />
      </div>

      <div class="form-group">
        <label>First Name</label>
        <input v-model="form.firstname" type="text" placeholder="Enter first name" required />
      </div>

      <div class="form-group">
        <label>Last Name</label>
        <input v-model="form.lastname" type="text" placeholder="Enter last name" required />
      </div>

      <div class="form-group">
        <label>Email</label>
        <input v-model="form.email" type="email" placeholder="Enter email" required />
      </div>

      <div class="form-group">
        <label>Password</label>
        <input v-model="form.password" type="password" placeholder="Enter password" required />
      </div>

      <div class="form-group">
        <label>Confirm Password</label>
        <input v-model="form.password_confirmation" type="password" placeholder="Confirm password" required />
      </div>

      <button type="submit" class="btn btn-register">Register</button>
    </form>

    <div class="login-section">
      <p>Already have an account?</p>
      <button @click="goToLogin" class="btn btn-login">Back to Login</button>
    </div>

    <p v-if="error" style="color: red; margin-top: 1rem;">{{ error }}</p>
  </div>
</template>

<script>

import axios from 'axios'
import '@/assets/css/register.css'
// axios.defaults.baseURL = 'http://192.168.254.105:8000/api'
// axios.defaults.baseURL = 'http://127.0.0.1:8000/api'
axios.defaults.baseURL = 'http://188.1.0.163:8000/api'

export default {

    name:'RegisterPage',

    data(){
        return{
            form:{
                student_id:'',
                firstname:'',
                lastname:'',
                email:'',
                password:'',
                password_confirmation:''
            },
            error: ''
        }
    },

    methods:{
        async register(){

            this.error = ''  // Clear previous error

            try{
                const response = await axios.post('/register', this.form,{
                    headers:{
                        'Content-Type':'application/json'
                    }
                })

                //   const response = await axios.post("http://127.0.0.1:8000/api/register", this.form,{
                //     headers:{
                //         'Content-Type':'application/json'
                //     }
                // })

                //   const response = await axios.post("http://192.168.254.105:8000/api/register", this.form,{
                //     headers:{
                //         'Content-Type':'application/json'
                //     }
                // })

                if(response.status === 201 || response.status === 200){
                    alert('Registration successful! Please Log in.');
                    this.$router.push('/login');
                }
            } catch (error){
                if (error.response && error.response.data && error.response.data.message) {
                    this.error = error.response.data.message;
                } else {
                    this.error = 'An error occurred during registration.';
                }
            }

        },

        goToLogin(){
            this.$router.push('/login')

        }
    }
    
}
</script>