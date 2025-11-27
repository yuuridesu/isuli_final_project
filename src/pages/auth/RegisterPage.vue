<!-- <template>
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
      this.error = ""; 

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
</script> -->

<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h2>Create Account</h2>
        <p>Register to continue</p>
      </div>

      <form class="login-form" @submit.prevent="register">
        <!-- Student ID -->
        <div class="form-group">
          <div class="input-wrapper">
            <input
              v-model="form.student_id"
              type="text"
              placeholder="Student ID"
              required
            />
          </div>
          <p v-if="errors.student_id" class="error-text">
            {{ errors.student_id[0] }}
          </p>
          <!-- <-- added -->
        </div>

        <!-- First Name -->
        <div class="form-group">
          <div class="input-wrapper">
            <input
              v-model="form.firstname"
              type="text"
              placeholder="First Name"
              required
            />
          </div>
          <p v-if="errors.firstname" class="error-text">
            {{ errors.firstname[0] }}
          </p>
          <!-- <-- added -->
        </div>

        <!-- Last Name -->
        <div class="form-group">
          <div class="input-wrapper">
            <input
              v-model="form.lastname"
              type="text"
              placeholder="Last Name"
              required
            />
          </div>
          <p v-if="errors.lastname" class="error-text">
            {{ errors.lastname[0] }}
          </p>
          <!-- <-- added -->
        </div>

        <!-- Email -->
        <div class="form-group">
          <div class="input-wrapper">
            <input
              v-model="form.email"
              type="email"
              placeholder="Email Address"
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
              v-model="form.password"
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

        <!-- Password Confirmation -->
        <div class="form-group">
          <div class="input-wrapper">
            <input
              v-model="form.password_confirmation"
              type="password"
              placeholder="Confirm Password"
              required
            />
          </div>
          <p v-if="errors.password_confirmation" class="error-text">
            {{ errors.password_confirmation[0] }}
          </p>
          <!-- <-- added -->
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

      <!-- Generic error message -->
      <p v-if="genericError" class="error-box">{{ genericError }}</p>
      <!-- <-- added -->
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
      errors: {}, // <-- added for field-specific errors
      genericError: "", // <-- added for generic backend/network errors
    };
  },

  methods: {
    async register() {
      this.errors = {}; // <-- added: clear previous field errors
      this.genericError = ""; // <-- added: clear previous generic error

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
          this.genericError = "An error occurred during registration."; // <-- added
        }
      }
    },

    goToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>
