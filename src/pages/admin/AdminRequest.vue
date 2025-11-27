<template>
  <div class="admin-page">
    <h1 class="title">Item Requests</h1>

    <div class="admin-content">
      <!-- Table -->
      <div class="table-card" v-if="requests.length">
        <table class="request-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Item</th>
              <th>Requested By</th>
              <th>Contact</th>
              <th>Message</th>
              <th>Attachment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="req in requests" :key="req.id">
              <td>{{ req.id }}</td>
              <td>{{ req.item.item_name }}</td>
              <td>{{ req.user.firstname }} {{ req.user.lastname }}</td>
              <td>{{ req.phone_number || "-" }}</td>
              <td>{{ req.message || "-" }}</td>
              <td>
                <a
                  v-if="req.attachment_path"
                  :href="`http://127.0.0.1:8000/storage/${req.attachment_path}`"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View
                </a>
                <span v-else>-</span>
              </td>
              <td :class="statusClass(req.status)">{{ req.status }}</td>
              <td>
                <select
                  v-model="req.status"
                  @change="updateStatus(req.id, req.status)"
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Claimed">Claimed</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Load More Button -->
        <div class="load-more" v-if="nextPageUrl">
          <button @click="loadRequests">Load More</button>
        </div>
      </div>

      <!-- Empty State -->
      <p v-else-if="requests.length === 0 && loaded" class="loading-text">
        No requests found.
      </p>

      <!-- Initial Loading -->
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
      nextPageUrl: null,
      loaded: false,
    };
  },
  mounted() {
    this.loadRequests();
  },
  methods: {
    async loadRequests() {
      try {
        const url = this.nextPageUrl || "/admin/request";
        const res = await axios.get(url);
        this.requests = [...this.requests, ...res.data.data.data];
        this.nextPageUrl = res.data.data.next_page_url;
      } catch (error) {
        console.error("Error loading requests:", error);
      } finally {
        this.loaded = true;
      }
    },

    async updateStatus(id, status) {
      try {
        await axios.patch(`/admin/request/${id}/status`, { status });
        alert(`Request status updated to ${status}`);
      } catch (error) {
        console.error(error);
        alert("Error updating status");
      }
    },

    statusClass(status) {
      switch ((status || "").toLowerCase()) {
        case "pending":
          return "status-pending";
        case "approved":
          return "status-approved";
        case "rejected":
          return "status-rejected";
        case "claimed":
          return "status-claimed";
        default:
          return "";
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
  padding: 20px;
}
.title {
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #1cc88a, #17a2b8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20px;
}
.table-card {
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 6px 18px rgba(28, 200, 138, 0.08);
  overflow-x: auto;
}
.request-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}
.request-table thead {
  background: #1cc88a;
  color: white;
  text-transform: uppercase;
}
.request-table th,
.request-table td {
  padding: 12px 15px;
  text-align: left;
}
.request-table tbody tr:nth-child(even) {
  background: #f9f9f9;
}
.request-table tbody tr:hover {
  background: #d1f2e0;
  transition: 0.3s;
}
.status-pending {
  color: #f6c23e;
  font-weight: 600;
}
.status-approved {
  color: #1cc88a;
  font-weight: 600;
}
.status-rejected {
  color: #e74a3b;
  font-weight: 600;
}
.status-claimed {
  color: #6c5ce7;
  font-weight: 600;
}
.request-table td:first-child,
.request-table th:first-child {
  width: 60px;
  text-align: center;
}
.admin-content {
  padding-top: 10px;
}
.loading-text {
  color: #666;
  font-size: 1rem;
  margin-top: 20px;
  text-align: center;
}
.load-more {
  margin-top: 15px;
  text-align: center;
}
.load-more button {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background-color: #1cc88a;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: 0.2s;
}
.load-more button:hover {
  background-color: #17a2b8;
}
select {
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
</style>
