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
              <td :class="statusClass(req.status)">{{ req.status }}</td>
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
      loaded: false, // Track if API finished loading
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

        // Merge new requests
        this.requests = [...this.requests, ...res.data.data.data];
        this.nextPageUrl = res.data.data.next_page_url;
      } catch (error) {
        console.error("Error loading requests:", error);
      } finally {
        this.loaded = true; // API finished
      }
    },

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

    statusClass(status) {
      switch ((status || "").toLowerCase()) {
        case "pending":
          return "status-pending";
        case "approved":
          return "status-approved";
        case "rejected":
          return "status-rejected";
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
  background: #ffffff;
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
  transition: background 0.3s ease;
}

.btn-approve,
.btn-reject {
  padding: 6px 12px;
  font-size: 13px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 5px;
  color: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.btn-approve:hover,
.btn-reject:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.btn-approve {
  background-color: #27ae60;
}
.btn-reject {
  background-color: #e74c3c;
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
</style>
