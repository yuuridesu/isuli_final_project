<template>
  <div class="admin-page">
    <h1 class="title">Manage Users</h1>

    <div class="admin-content">
      <!-- Search bar -->
      <!-- Search bar -->
      <div class="search-wrapper">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search users..."
          class="search-bar"
        />
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
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredUsers" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.firstname }}</td>
              <td>{{ user.lastname }}</td>
              <td>{{ user.student_id }}</td>
              <td>{{ user.email }}</td>
              <td>
                <button @click="openEditModal(user)" class="edit-btn">
                  Edit
                </button>
              </td>
              <td>
                <button @click="deleteUser(user.id)" class="delete-btn">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Edit User Modal -->
        <div v-if="editingUser" class="modal-overlay">
          <div class="modal">
            <h2>Edit User</h2>

            <label>First Name</label>
            <input v-model="editingUser.firstname" />

            <label>Last Name</label>
            <input v-model="editingUser.lastname" />

            <label>Student ID</label>
            <input v-model="editingUser.student_id" />

            <label>Email</label>
            <input v-model="editingUser.email" />

            <div class="modal-actions">
              <button @click="saveEdit">Save</button>
              <button @click="editingUser = null" class="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
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
      editingUser: null,
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

    // Open modal with selected user
    openEditModal(user) {
      this.editingUser = { ...user }; // clone so original data stays
    },

    // Save edited user
    async saveEdit() {
      try {
        await axios.put(`/admin/users/${this.editingUser.id}`, {
          firstname: this.editingUser.firstname,
          lastname: this.editingUser.lastname,
          student_id: this.editingUser.student_id,
          email: this.editingUser.email,
          // don't send 'age'
        });

        const index = this.users.findIndex((u) => u.id === this.editingUser.id);
        this.users[index] = { ...this.editingUser };
        this.editingUser = null;
        alert("User updated successfully!");
      } catch (error) {
        console.error(error);
        alert("Failed to update user.");
      }
    },

    async deleteUser(id) {
      if (!confirm("Are you sure you want to delete this user?")) return;
      try {
        await axios.delete(`/admin/users/${id}`);
        this.users = this.users.filter((u) => u.id !== id);
        alert("User deleted successfully!");
      } catch (error) {
        console.error(error);
        alert("Failed to delete user ");
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
/* Search bar (matches User Dashboard) */
.search-wrapper {
  width: 100%;
  max-width: 400px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.search-bar {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 16px;
  border: 1px solid rgba(28, 200, 138, 0.2);
  font-size: 1rem;
  font-family: "Inter", sans-serif;
  box-shadow: 0 2px 8px rgba(28, 200, 138, 0.08), 0 4px 16px rgba(0, 0, 0, 0.04);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.search-bar:focus {
  outline: none;
  border-color: #1cc88a;
  box-shadow: 0 0 8px rgba(28, 200, 138, 0.2),
    0 8px 24px rgba(28, 200, 138, 0.15);
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

.edit-btn {
  background: #ffe96a;
  border: none;
  padding: 5px 10px;
  border-radius: 8px;
  cursor: pointer;
}

.delete-btn {
  background: #e84a5f;
  border: none;
  padding: 5px 10px;
  border-radius: 8px;
  color: white;
  cursor: pointer;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  width: 400px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 1rem;
}

.modal-actions button {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
}

.modal-actions .cancel-btn {
  background: #e84a5f;
  color: white;
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
