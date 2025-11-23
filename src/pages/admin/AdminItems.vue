<template>
  <div class="admin-page">
    <h1 class="title">Reported Items</h1>

    <div class="admin-content">
      <!-- Full-width search bar -->
      <div class="filters">
        <!-- Full-width search bar -->
        <div class="search-bar">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search items..."
          />
        </div>

        <!-- Filter buttons -->
        <div class="filter-buttons">
          <button
            :class="{ active: filterType === 'All' }"
            @click="filterType = 'All'"
          >
            All
          </button>
          <button
            :class="{ active: filterType === 'lost' }"
            @click="filterType = 'lost'"
          >
            Lost
          </button>
          <button
            :class="{ active: filterType === 'found' }"
            @click="filterType = 'found'"
          >
            Found
          </button>
        </div>
      </div>

      <div class="table-card" v-if="filteredItems.length">
        <table class="item-table">
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
            <tr v-for="item in filteredItems" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.item_name }}</td>
              <td>{{ item.item_type }}</td>
              <td>{{ item.category_name }}</td>
              <td>{{ item.location }}</td>
              <td>{{ item.user.firstname }} {{ item.user.lastname }}</td>
              <td>{{ item.date_reported_item }}</td>
              <td :class="statusClass(item.status)">{{ item.status }}</td>
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
      </div>

      <p v-else class="loading-text">No items found.</p>
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
      searchQuery: "",
      filterType: "All",
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

    statusClass(status) {
      switch (status) {
        case "Pending":
          return "status-pending";
        case "Approved":
          return "status-approved";
        case "Rejected":
          return "status-rejected";
        default:
          return "";
      }
    },
  },
  computed: {
    filteredItems() {
      const query = this.searchQuery.toLowerCase().trim();

      return this.items.filter((item) => {
        // Filter by type
        if (this.filterType !== "All" && item.item_type !== this.filterType) {
          return false;
        }

        // Filter by search query
        if (!query) return true;

        return (
          item.item_name.toLowerCase().includes(query) ||
          item.item_type.toLowerCase().includes(query) ||
          (item.category_name &&
            item.category_name.toLowerCase().includes(query)) ||
          (item.location && item.location.toLowerCase().includes(query)) ||
          (item.user.firstname &&
            item.user.firstname.toLowerCase().includes(query)) ||
          (item.user.lastname &&
            item.user.lastname.toLowerCase().includes(query))
        );
      });
    },
  },
};
</script>

<style scoped>
/* Admin page & title */
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

/* Full-width line-style search bar */
.search-bar {
  width: 100%;
  margin-bottom: 20px;
}

.search-bar input {
  width: 100%;
  border: none;
  border-bottom: 2px solid #1cc88a;
  padding: 10px 5px;
  font-size: 16px;
  background: transparent;
  outline: none;
  transition: border-color 0.3s ease;
}

.search-bar input::placeholder {
  color: #888;
  font-weight: 500;
}

.search-bar input:focus {
  border-bottom: 2px solid #17a2b8;
}

/* Table card */
.table-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 6px 18px rgba(28, 200, 138, 0.08);
  overflow-x: auto;
}

/* Table */
.item-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.item-table thead {
  background: #1cc88a;
  color: white;
  text-transform: uppercase;
}

.item-table th,
.item-table td {
  padding: 12px 15px;
  text-align: left;
}

.item-table tbody tr:nth-child(even) {
  background: #f9f9f9;
}

.item-table tbody tr:hover {
  background: #d1f2e0;
  transition: background 0.3s ease;
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

/* Status colors */
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

/* ID column */
.item-table td:first-child,
.item-table th:first-child {
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
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.search-bar {
  flex: 1; /* take remaining space */
}

.search-bar input {
  width: 100%;
  border: none;
  border-bottom: 2px solid #1cc88a;
  padding: 10px 5px;
  font-size: 16px;
  background: transparent;
  outline: none;
  transition: border-color 0.3s ease;
}

.search-bar input::placeholder {
  color: #888;
  font-weight: 500;
}

.search-bar input:focus {
  border-bottom: 2px solid #17a2b8;
}

.filter-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.filter-buttons button {
  padding: 6px 16px;
  border: none;
  border-radius: 6px;
  background-color: #eee;
  cursor: pointer;
  font-weight: 500;
  transition: 0.2s;
}

.filter-buttons button.active {
  background-color: #1cc88a;
  color: white;
}

@media (max-width: 768px) {
  .filters {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-buttons {
    justify-content: flex-start;
  }
}
</style>
