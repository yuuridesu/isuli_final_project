<template>
  <div class="profile-page">
    <navbar />

    <div class="profile-container">
      <div class="profile-card">
        <div class="avatar-wrapper">
          <div class="avatar">
            <img :src="user.avatar || defaultAvatar" alt="User Avatar" />
          </div>
        </div>

        <h2>{{ user.firstname }} {{ user.lastname }}</h2>

        <div class="info-group">
          <div class="info-item">
            <span class="info-label">Student ID</span>
            <span class="info-value">{{ user.student_id }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Email</span>
            <span class="info-value">{{ user.email }}</span>
          </div>
        </div>

        <button class="logout-btn" @click="logout">
          <span>Logout</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "@/components/navbar.vue";
import axios from "axios";

import defaultAvatar from "@/assets/images/pao.jpg";
export default {
  name: "UserProfile",
  components: { navbar },

  data() {
    return {
      user: {},
      defaultAvatar,
    };
  },

  created() {
    this.fetchUsers();
  },

  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get("user");

        this.user = response.data.data;
      } catch (error) {
        console.error(error);

        alert("error fetch user");
      }
    },

    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
};
</script>
<style scoped src="@/assets/css/user_css/profile.css"></style>