<template>
  <div class="admin-page">
    <h1 class="title">Manage Users</h1>

    <div class="admin-content">
      <table class="user-table" v-if="users.length">
        <thead>
          <tr>
            <th>ID</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.firstname }}</td>
            <td>{{ user.lastname }}</td>
            <td>{{ user.email }}</td>
          </tr>
        </tbody>
      </table>

      <p v-else class="loading-text">Loading users...</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AdminUsers",

  data() {
    return {
      users: [],
    };
  },

  mounted() {
    this.fetchUsers();
  },

  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get("/admin/users");
        this.users = response.data.data;
      } catch (error) {
        console.error(error);
        alert("Error fetching users");
      }
    },
  },
};
</script>

<style scoped>
.admin-page {
  font-family: "Inter", sans-serif;
  min-height: 100vh;
  background: #f4f9f8;
}

/* Page Title */
.title {
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #1cc88a, #17a2b8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 30px;
}

/* Table */
.user-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.user-table thead {
  background: #2c3e50;
  color: white;
}

.user-table th {
  padding: 12px 15px;
  text-align: left;
  font-weight: 600;
  font-size: 14px;
}

.user-table td {
  padding: 10px 15px;
  font-size: 14px;
  border-bottom: 1px solid #e6e6e6;
}

.user-table tbody tr:hover {
  background: #f5f7fa;
}

.user-table td:first-child,
.user-table th:first-child {
  width: 60px;
  text-align: center;
}

/* Layout padding handled by AdminLayout */
.admin-content {
  padding-top: 20px;
  padding-left: 20px; /* AdminLayout already offsets for sidebar */
  padding-right: 20px;
}

/* Loading text */
.loading-text {
  color: #666;
  font-size: 1rem;
  margin-top: 20px;
}
</style>
