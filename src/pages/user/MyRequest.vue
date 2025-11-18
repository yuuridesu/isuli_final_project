<template>
  <navbar />

  <div class="requests-page">
    <h2>My Item Requests</h2>

    <div v-if="loading" class="loading">Loading your requests...</div>

    <div v-else>
      <div v-if="requests.length === 0" class="no-requests">
        <p>You have not requested any items yet.</p>
      </div>

      <table v-else>
        <thead>
          <tr>
            <th>Item</th>
            <th>Message</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="req in requests" :key="req.id">
            <td>{{ req.item.item_name }}</td>
            <td>{{ req.message || '—' }}</td>
            <td>
              <span :class="req.status.toLowerCase()">{{ req.status }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import navbar from "@/components/navbar.vue"

// axios.defaults.baseURL = "http://192.168.254.105:8000/api"
// axios.defaults.baseURL = "http://127.0.0.1:8000/api"
axios.defaults.baseURL = 'http://188.1.0.163:8000/api'



export default {
  name: "MyRequest",
  components: { navbar },

  data() {
    return {
      requests: [],   // FIXED variable
      loading: true   // Added loading animation
    }
  },

  async created() {
    await this.fetchMyRequests()
  },

  methods: {
    async fetchMyRequests() {
      try {
        const token = localStorage.getItem("token")

        const res = await axios.get('/items/myrequest', {
          headers: { Authorization: `Bearer ${token}` }
        })

        this.requests = res.data.data || []

      } catch (error) {
        console.error("Error fetching my requests:", error)

        alert("Failed to load your requests.")

      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.approved {
  color: green;
  font-weight: bold;
}
.rejected {
  color: red;
  font-weight: bold;
}
.pending {
  color: orange;
  font-weight: bold;
}
.loading {
  font-size: 18px;
  margin-top: 20px;
}
</style>
