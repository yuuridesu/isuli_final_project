<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h2>Welcome Back</h2>
        <p>Sign in to continue</p>
      </div>

      <form class="login-form" @submit.prevent="login">
        <!-- Email -->
        <div class="form-group">
          <div class="input-wrapper">
            <input
              v-model="user.email"
              type="email"
              placeholder="Email address"
              required
            />
          </div>
          <p v-if="errors.email" class="error-text">{{ errors.email[0] }}</p>
          <!-- <-- added -->
        </div>

        <!-- Password -->
        <div class="form-group">
          <div class="input-wrapper">
            <input
              v-model="user.password"
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <p v-if="errors.password" class="error-text">
            {{ errors.password[0] }}
          </p>
          <!-- <-- added -->
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

      <!-- Generic error message -->
      <p v-if="genericError" class="error-box">{{ genericError }}</p>
      <!-- <-- added -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "@/assets/css/login.css";

export default {
  name: "LoginPage",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      errors: {}, // <-- added for field-specific errors
      genericError: "", // <-- added for generic backend/network errors
    };
  },

  methods: {
    async login() {
      this.errors = {}; // <-- added: clear previous field errors
      this.genericError = ""; // <-- added: clear previous generic error

      try {
        const response = await axios.post("/login", this.user);

        if (response.status === 200) {
          const token = response.data.token;
          const user = response.data.user;

          // Store token and user info
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));

          // Redirect based on role
          if (user.role === "admin") {
            this.$router.push("/admin");
          } else if (user.role === "user") {
            this.$router.push("/user");
          } else {
            console.warn("Unknown role:", user.role);
          }

          console.log("Login successful:", user);
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          this.errors = error.response.data.errors; // <-- added: store field-specific errors
        } else if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          this.genericError = error.response.data.message; // <-- added
        } else {
          this.genericError = "Login failed. Please check your credentials."; // <-- added
        }
      }
    },

    goToRegister() {
      this.$router.push("/register");
    },
  },
};
</script>
