<template>
  <div class="admin-page">
    <h1 class="title">Reported Items</h1>

    <div class="admin-content">
      <table class="item-table" v-if="items.length">
        <thead>
          <tr>
            <th>ID</th>
            <th>Item Name</th>
            <th>Type</th>
            <th>Category</th>
            <th>Location</th>
            <th>Reported By</th>
            <th>Date Reported</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.item_name }}</td>
            <td>{{ item.item_type }}</td>
            <td>{{ item.category_name }}</td>
            <td>{{ item.location }}</td>
            <td>{{ item.user.firstname }} {{ item.user.lastname }}</td>
            <td>{{ item.date_reported_item }}</td>
            <td>{{ item.status }}</td>
            <td>
              <button
                v-if="item.status === 'Pending'"
                class="btn-approve"
                @click="approveItem(item.id)"
              >
                Approve
              </button>
              <button
                v-if="item.status === 'Pending'"
                class="btn-reject"
                @click="rejectItem(item.id)"
              >
                Reject
              </button>
              <span v-else>—</span>
            </td>
          </tr>
        </tbody>
      </table>

      <p v-else class="loading-text">Loading items...</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AdminItems",

  data() {
    return {
      items: [],
    };
  },

  mounted() {
    this.fetchItems();
  },

  methods: {
    async fetchItems() {
      try {
        const response = await axios.get("/admin/items");
        this.items = response.data.data;
      } catch (error) {
        console.error(error);
        alert("Error fetching items");
      }
    },

    async approveItem(id) {
      try {
        await axios.patch(`/admin/items/${id}/approve`);
        const item = this.items.find((i) => i.id === id);
        if (item) item.status = "Approved";
        alert("Item approved successfully");
      } catch (error) {
        console.error(error);
        alert("Error approving item");
      }
    },

    async rejectItem(id) {
      try {
        await axios.patch(`/admin/items/${id}/reject`);
        const item = this.items.find((i) => i.id === id);
        if (item) item.status = "Rejected";
        alert("Item rejected successfully");
      } catch (error) {
        console.error(error);
        alert("Error rejecting item");
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
.item-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.item-table thead {
  background: #2c3e50;
  color: white;
}

.item-table th {
  padding: 12px 15px;
  text-align: left;
  font-weight: 600;
  font-size: 14px;
}

.item-table td {
  padding: 10px 15px;
  font-size: 14px;
  border-bottom: 1px solid #e6e6e6;
}

.item-table tbody tr:hover {
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
.item-table td:first-child,
.item-table th:first-child {
  width: 60px;
  text-align: center;
}

/* Status column highlighted */
.item-table td:nth-last-child(2) {
  font-weight: 600;
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
