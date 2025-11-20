<template>
  <div class="admin-page">
    <h1 class="title">Item Requests</h1>

    <div class="admin-content">
      <table class="request-table" v-if="requests.length">
        <thead>
          <tr>
            <th>ID</th>
            <th>Item</th>
            <th>Requested By</th>
            <th>Contact</th>
            <th>Message</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="req in requests" :key="req.id">
            <td>{{ req.id }}</td>
            <td>{{ req.item.item_name }}</td>
            <td>{{ req.user.firstname }} {{ req.user.lastname }}</td>
            <td>{{ req.phone_number }}</td>
            <td>{{ req.message }}</td>
            <td>{{ req.status }}</td>
            <td>
              <button
                v-if="req.status && req.status.toLowerCase() === 'pending'"
                class="btn-approve"
                @click="approve(req.id)"
              >
                Approve
              </button>
              <button
                v-if="req.status && req.status.toLowerCase() === 'pending'"
                class="btn-reject"
                @click="reject(req.id)"
              >
                Reject
              </button>
              <span v-else>—</span>
            </td>
          </tr>
        </tbody>
      </table>

      <p v-else class="loading-text">Loading requests...</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AdminRequest",
  data() {
    return {
      requests: [],
    };
  },
  async mounted() {
    try {
      const response = await axios.get("/admin/request");
      this.requests = response.data.data;
    } catch (error) {
      console.error(error);
      alert("Error fetching requests");
    }
  },
  methods: {
    async approve(id) {
      try {
        await axios.patch(`/admin/request/${id}/approve`);
        this.requests = this.requests.map((r) =>
          r.id === id ? { ...r, status: "Approved" } : r
        );
        alert("Request approved");
      } catch (error) {
        console.error(error);
        alert("Error approving request");
      }
    },
    async reject(id) {
      try {
        await axios.patch(`/admin/request/${id}/reject`);
        this.requests = this.requests.map((r) =>
          r.id === id ? { ...r, status: "Rejected" } : r
        );
        alert("Request rejected");
      } catch (error) {
        console.error(error);
        alert("Error rejecting request");
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
  margin-bottom: 20px;
}

/* Table */
.request-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.request-table thead {
  background: #2c3e50;
  color: white;
}

.request-table th {
  padding: 12px 15px;
  text-align: left;
  font-size: 14px;
  font-weight: 600;
}

.request-table td {
  padding: 10px 15px;
  font-size: 14px;
  border-bottom: 1px solid #e6e6e6;
}

.request-table tbody tr:hover {
  background: #f5f7fa;
}

/* Buttons */
.btn-approve,
.btn-reject {
  padding: 6px 12px;
  font-size: 13px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 5px;
  color: white;
}

.btn-approve {
  background-color: #27ae60;
}

.btn-reject {
  background-color: #e74c3c;
}

.btn-approve:hover,
.btn-reject:hover {
  opacity: 0.9;
}

/* Center ID column */
.request-table td:first-child,
.request-table th:first-child {
  width: 60px;
  text-align: center;
}

/* Layout padding handled by AdminLayout */
.admin-content {
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
}

/* Loading text */
.loading-text {
  color: #666;
  font-size: 1rem;
  margin-top: 20px;
}
</style>
