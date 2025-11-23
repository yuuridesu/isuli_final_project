<template>
  <div class="admin-page">
    <h1 class="title">Manage Users</h1>

    <div class="admin-content">
      <!-- Search bar -->
      <div class="search-bar">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search users..."
        />
        <!-- <i class="fas fa-search"></i> -->
      </div>

      <!-- Table card wrapper -->
      <div class="table-card" v-if="filteredUsers.length">
        <table class="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Student Id</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredUsers" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.firstname }}</td>
              <td>{{ user.lastname }}</td>
              <td>{{ user.student_id }}</td>
              <td>{{ user.email }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p v-else class="loading-text">No users found.</p>
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
      searchQuery: "", // for search functionality
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
  computed: {
    // Filters users based on searchQuery
    filteredUsers() {
      return this.users.filter(
        (u) =>
          u.firstname.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          u.lastname.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          u.email.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
};
</script>

<style scoped>
.admin-page {
  font-family: "Inter", sans-serif;
  min-height: 100vh;
  background: #f4f9f8;
  padding: 20px;
}

.title {
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #1cc88a, #17a2b8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 30px;
}

/* Search bar */
.search-bar {
  position: relative;
  margin-bottom: 20px;
  max-width: 400px;
}

.search-bar input {
  width: 100%;
  padding: 10px 35px 10px 12px;
  border-radius: 12px;
  border: 1px solid #ccc;
  font-size: 14px;
  outline: none;
  transition: border 0.3s ease;
}

.search-bar input:focus {
  border-color: #1cc88a;
}

.search-bar i {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
}

/* Table card wrapper */
.table-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 6px 18px rgba(28, 200, 138, 0.08);
  overflow-x: auto;
}

/* Table */
.user-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.user-table thead {
  background: #1cc88a;
  color: white;
  text-transform: uppercase;
}

.user-table th,
.user-table td {
  padding: 12px 15px;
  text-align: left;
}

/* Zebra striping for rows */
.user-table tbody tr:nth-child(even) {
  background: #f9f9f9;
}

/* Hover effect */
.user-table tbody tr:hover {
  background: #d1f2e0;
  transition: background 0.3s ease;
}

/* First column alignment */
.user-table td:first-child,
.user-table th:first-child {
  width: 60px;
  text-align: center;
}

/* Admin content padding */
.admin-content {
  padding-top: 10px;
}

/* Loading text */
.loading-text {
  color: #666;
  font-size: 1rem;
  margin-top: 20px;
  text-align: center;
}
</style>
