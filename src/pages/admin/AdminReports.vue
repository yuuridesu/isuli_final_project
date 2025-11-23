<template>
  <div class="admin-page">
    <navbar-admin />

    <div class="admin-content">
      <div class="search-bar">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search Reports..."
        />
      </div>
      <h2>Reported Items</h2>

      <table class="report-table">
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
          <tr v-for="report in reports" :key="report.id">
            <td>{{ report.id }}</td>

            <td>{{ report.item_name }}</td>

            <td>{{ report.item_type }}</td>

            <td>{{ report.category_name }}</td>

            <td>{{ report.location }}</td>

            <td>{{ report.user.firstname }} {{ report.user.lastname }}</td>

            <td>{{ report.created_at }}</td>

            <td>{{ report.status }}</td>

            <td>
              <button
                v-if="report.status === 'pending'"
                class="btn-approve"
                @click="approveReport(report.id)"
              >
                Approve
              </button>

              <button
                v-if="report.status === 'pending'"
                class="btn-reject"
                @click="rejectReport(report.id)"
              >
                Reject
              </button>

              <span v-else>—</span>
            </td>
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
  name: "AdminReports",
  components: { navbarAdmin },

  data() {
    return {
      reports: [],
      loading: false,
    };
  },

  mounted() {
    this.fetchReports();
  },

  methods: {
    async fetchReports() {
      try {
        const response = await axios.get("/admin/reports");

        this.reports = response.data.data;
      } catch (error) {
        console.error(error);
        alert("Error fetching reports");
      } finally {
        this.loading = true;
      }
    },

    async approveReport(id) {
      try {
        await axios.patch(`/admin/reports/${id}/approve`, {});

        alert("Report approved successfully");
      } catch (error) {
        console.error(error);
        alert("Error approving report");
      }
    },

    async rejectReport(id) {
      try {
        await axios.patch(`/admin/reports/${id}/reject`, {});

        alert("Report rejected successfully");
      } catch (error) {
        console.error(error);
        alert("Error rejecting report");
      }
    },
  },
};
</script>

<style scoped>
.admin-content {
  padding-top: 20px;
  padding-left: 270px;
  padding-right: 20px;
}

.report-table {
  width: 100%;
  border-collapse: collapse;
}

.report-table th,
.report-table td {
  padding: 12px;
  border-bottom: 1px solid #ddd;
}

.btn-approve {
  background-color: #28a745;
  color: white;
  padding: 6px 12px;
  border: none;
  margin-right: 5px;
  cursor: pointer;
}

.btn-reject {
  background-color: #dc3545;
  color: white;
  padding: 6px 12px;
  border: none;
  cursor: pointer;
}
</style>
