<template>
  <div class="login-container">
    <h2>Login</h2>

    <form class="login-form" @submit.prevent="login">
      <div class="form-group">
        <label>Email</label>
        <input
          v-model="user.email"
          type="email"
          placeholder="Enter your email"
          required
        />
      </div>

      <div class="form-group">
        <label>Password</label>
        <input
          v-model="user.password"
          type="password"
          placeholder="Enter your password"
          required
        />
      </div>

      <button type="submit" class="btn btn-login">Login</button>
    </form>

    <div class="register-section">
      <p>Dont have an account yet?</p>
      <button @click="goToRegister" class="btn btn-register">Register</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "@/assets/css/login.css";

// // axios.defaults.baseURL = 'http://192.168.254.105:8000/api'
// axios.defaults.baseURL = 'http://127.0.0.1:8000/api'
// axios.defaults.baseURL = 'http://188.1.0.163:8000/api'

export default {
  name: "LoginPage",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },

  methods: {
    async login() {
      try {
        const response = await axios.post("/login", this.user);

        // ✅ Check if login was successful
        if (response.status === 200) {
          const token = response.data.token;
          const user = response.data.user; // Make sure your backend returns this!

          // Store in localStorage
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));

          // ✅ Redirect based on role
          if (user.role === "admin") {
            this.$router.push("/admin");
          } else if (user.role === "user") {
            this.$router.push("/user");
          } else {
            console.warn("Unknown role:", user.role);
          }

          console.log("Login successful:", user);
        } else {
          alert("Invalid credentials");
        }
      } catch (error) {
        console.error("Login failed:", error.response?.data || error);
        alert("Login failed. Please check your credentials.");
      }
    },

    goToRegister() {
      this.$router.push("/register");
    },
  },
};
</script>

