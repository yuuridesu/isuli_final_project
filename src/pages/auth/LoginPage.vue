<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h2>Welcome Back</h2>
        <p>Sign in to continue</p>
      </div>

      <form class="login-form" @submit.prevent="login">
        <div class="form-group">
          <div class="input-wrapper">
            <input
              v-model="user.email"
              type="email"
              placeholder="Email address"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <div class="input-wrapper">
            <input
              v-model="user.password"
              type="password"
              placeholder="Password"
              required
            />
          </div>
        </div>

        <button type="submit" class="btn-login">
          <span>Sign In</span>
        </button>
      </form>

      <div class="divider">
        <span>or</span>
      </div>

      <div class="register-section">
        <p>Don't have an account?</p>
        <button @click="goToRegister" class="btn-register">
          Create Account
        </button>
      </div>
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

<!-- 
 <template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h2>Welcome Back</h2>
        <p>Sign in to continue</p>
      </div>

      <form class="login-form" @submit.prevent="login">
        <div class="form-group">
          <input
            v-model="user.email"
            type="email"
            placeholder="Email address"
            required
          />
        </div>

        <div class="form-group">
          <input
            v-model="user.password"
            type="password"
            placeholder="Password"
            required
          />
        </div>

        <button type="submit" class="btn-login">Sign In</button>
      </form>

      <div class="register-section">
        <p>Don't have an account?</p>
        <button @click="goToRegister" class="btn-register">
          Create Account
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginPage",
  data() {
    return {
      user: { email: "", password: "" },
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("/login", this.user);

        if (response.status === 200) {
          const token = response.data.token;
          const user = response.data.user;

          // Store token and user info by role
          if (user.role === "admin") {
            localStorage.setItem("admin_token", token);
            localStorage.setItem("admin", JSON.stringify(user));
            this.$router.push("/admin");
          } else if (user.role === "user") {
            localStorage.setItem("user_token", token);
            localStorage.setItem("user", JSON.stringify(user));
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
</script> -->

