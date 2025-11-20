<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h2>Create Account</h2>
        <p>Register to continue</p>
      </div>

      <form class="login-form" @submit.prevent="register">
        <div class="form-group">
          <div class="input-wrapper">
            <input
              v-model="form.student_id"
              type="text"
              placeholder="Student ID"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <div class="input-wrapper">
            <input
              v-model="form.firstname"
              type="text"
              placeholder="First Name"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <div class="input-wrapper">
            <input
              v-model="form.lastname"
              type="text"
              placeholder="Last Name"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <div class="input-wrapper">
            <input
              v-model="form.email"
              type="email"
              placeholder="Email Address"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <div class="input-wrapper">
            <input
              v-model="form.password"
              type="password"
              placeholder="Password"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <div class="input-wrapper">
            <input
              v-model="form.password_confirmation"
              type="password"
              placeholder="Confirm Password"
              required
            />
          </div>
        </div>

        <button type="submit" class="btn-login">
          <span>Register</span>
        </button>
      </form>

      <div class="divider"><span>or</span></div>

      <div class="register-section">
        <p>Already have an account?</p>
        <button @click="goToLogin" class="btn-register">Back to Login</button>
      </div>

      <p v-if="error" class="error-box">{{ error }}</p>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import "@/assets/css/register.css";

export default {
  name: "RegisterPage",

  data() {
    return {
      form: {
        student_id: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
      error: "",
    };
  },

  methods: {
    async register() {
      this.error = ""; // Clear previous error

      try {
        const response = await axios.post("/register", this.form);

        if (response.status === 201 || response.status === 200) {
          alert("Registration successful! Please Log in.");
          this.$router.push("/login");
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          this.error = error.response.data.message;
        } else {
          this.error = "An error occurred during registration.";
        }
      }
    },

    goToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>