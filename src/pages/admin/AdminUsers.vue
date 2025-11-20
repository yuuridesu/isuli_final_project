<template>
  <div class="admin-page">
    <navbar-admin />

    <div class="admin-content">
      <table class="user-table">
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
    </div>
  </div>
</template>


<script>
import navbarAdmin from "@/components/navbarAdmin.vue";

import axios from "axios";

export default {
  name: "AdminUsers",
  components: { navbarAdmin },

  data() {
    return {
      users: [],
      loading: false,
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
        alert("error fetching items");
      } finally {
        this.loading = true;
      }
    },
  },
};
</script>

<style scoped>
.user-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

/* Table Head */
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

/* Table Body */
.user-table td {
  padding: 10px 15px;
  font-size: 14px;
  border-bottom: 1px solid #e6e6e6;
}

/* Row Hover */
.user-table tbody tr:hover {
  background: #f5f7fa;
}

/* ID Column: slightly smaller */
.user-table td:first-child,
.user-table th:first-child {
  width: 60px;
  text-align: center;
}

/* Page Layout */
.admin-content {
  padding-top: 20px;
  padding-left: 270px;
  padding-right: 20px;
}
</style>