<template>
  <navbar-admin />

  <div>
    <h2>Item Requests</h2>
    <table>
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
              @click="approve(req.id)"
            >
              Approve
            </button>
            <button
              v-if="req.status && req.status.toLowerCase() === 'pending'"
              @click="reject(req.id)"
            >
              Reject
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import navbarAdmin from "@/components/navbarAdmin.vue";

export default {
  name: "AdminRequest",
  components: { navbarAdmin },
  data() {
    return { requests: [] };
  },
  async created() {
    const response = await axios.get("/admin/request");
    this.requests = response.data.data;
  },
  methods: {
    async approve(id) {
      await axios.patch(`/admin/request/${id}/approve`, {});
      alert("Request approved");
      this.requests = this.requests.map((r) =>
        r.id === id ? { ...r, status: "Approved" } : r
      );
    },
    async reject(id) {
      await axios.patch(`/admin/request/${id}/reject`, {});
      alert("Request rejected");
      this.requests = this.requests.map((r) =>
        r.id === id ? { ...r, status: "Rejected" } : r
      );
    },
  },
};
</script>
<style scoped>
/* Table Wrapper */
div {
  padding-left: 270px; /* space for sidebar */
  padding-right: 20px;
  padding-top: 20px;
}

/* Title */
h2 {
  margin-bottom: 15px;
  font-weight: 600;
}

/* Main Table */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

/* Table Header */
thead {
  background: #2c3e50;
  color: white;
}

th {
  padding: 12px 15px;
  text-align: left;
  font-size: 14px;
  font-weight: 600;
}

/* Table Body */
td {
  padding: 10px 15px;
  font-size: 14px;
  border-bottom: 1px;
}
</style>