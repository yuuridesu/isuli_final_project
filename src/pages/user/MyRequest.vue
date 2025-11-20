<template>
  <navbar />

  <div class="requests-page">
    <h1>My Item Requests</h1>

    <div v-if="loading" class="loading">Loading your requests...</div>

    <div v-else>
      <div v-if="requests.length === 0" class="no-requests">
        <p>You haven’t requested any items yet.</p>
      </div>

      <div class="request-grid" v-else>
        <div v-for="req in requests" :key="req.id" class="request-card">
          <img
            :src="`http://192.168.254.105:8000/storage/${req.item.image_path}`"
            alt="Item Image"
          />

          <h3>{{ req.item.item_name }}</h3>
          <p>{{ req.message || "—" }}</p>
          <p>
            <strong>Status:</strong>
            <span :class="req.status.toLowerCase()">{{ req.status }}</span>
          </p>
          <p><strong>Location:</strong> {{ req.item.location }}</p>
          <p>
            <strong>Date Reported:</strong> {{ req.item.date_reported_item }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import navbar from "@/components/navbar.vue";
import "@/assets/css/user_css/MyRequest.css";

export default {
  name: "MyRequest",
  components: { navbar },

  data() {
    return {
      requests: [],
      loading: true,
    };
  },

  async created() {
    await this.fetchMyRequests();
  },

  methods: {
    async fetchMyRequests() {
      try {
        const response = await axios.get("/items/myrequest");
        this.requests = response.data.data || [];
      } catch (error) {
        console.error("Error fetching my requests:", error.response || error);
        alert("Failed to load your requests.");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>


