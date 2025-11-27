<!-- <template>
  <div class="item-details">
    <navbar />

    <div v-if="item">
      <img
        :src="`http://192.168.254.105:8000/storage/${item.image_path}`"
        alt="Item Image"
      />

      <div class="details">
        <h1 class="item-name">{{ item.item_name }}</h1>

        <div class="detail-row">
          <p class="detail-label">Category:</p>
          <p class="detail-value">{{ item.category.category_name }}</p>
        </div>

        <div class="detail-row">
          <p class="detail-label">Location Lost:</p>
          <p class="detail-value">{{ item.location }}</p>
        </div>

        <div class="detail-row">
          <p class="detail-label">Additional Info:</p>
          <p class="detail-value">{{ item.description }}</p>
        </div>

        <div class="detail-row">
          <p class="detail-label">Reported By:</p>
          <p class="detail-value">
            {{ item.user.firstname }} {{ item.user.lastname }}
          </p>
        </div>
      </div>

      <div id="map" style="height: 400px; margin: 1rem 0"></div>

      <div class="button-section">
        <button class="go-back-btn" @click="$router.go(-1)">Go Back</button>

        <button
          class="request-btn"
          @click="showRequestModal = true"
          :disabled="alreadyRequested || item.item_type === 'lost'"
        >
          {{
            item.item_type === "lost"
              ? "Cannot Request Lost Item"
              : alreadyRequested
              ? "Already Requested"
              : "Request Item"
          }}
        </button>
      </div>
    </div>

    <div v-else class="loading">Loading item details...</div>

    <div v-if="showRequestModal" class="modal-overlay">
      <div class="modal">
        <h2>Request Item</h2>
        <form @submit.prevent="submitRequest">
          <div class="form-group">
            <label>Contact Number</label>
            <input type="text" v-model="requestForm.contact" required />
          </div>

          <div class="form-group">
            <label>Attachment (optional)</label>
            <input
              type="file"
              @change="handleFileUpload"
              accept=".jpg,.jpeg,.png,.pdf"
            />
          </div>

          <div class="form-group">
            <label>Message (optional)</label>
            <textarea v-model="requestForm.message"></textarea>
          </div>

          <button type="submit">Submit Request</button>
          <button type="button" @click="showRequestModal = false">
            Cancel
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import L from "leaflet";
import navbar from "@/components/navbar.vue";
import "leaflet/dist/leaflet.css";

export default {
  name: "ItemDetails",
  components: { navbar },
  data() {
    return {
      item: null,
      showRequestModal: false,
      requestForm: { contact: "", message: "", attachment: null },
      myRequests: [],
      map: null,
      marker: null,
    };
  },
  async created() {
    const id = this.$route.params.id;
    try {
      const [itemRes, requestsRes] = await Promise.all([
        axios.get(`/items/${id}`),
        axios.get("/items/myrequest"),
      ]);
      this.item = itemRes.data.data;
      this.myRequests = requestsRes.data.data || [];
    } catch (error) {
      console.error("Error fetching item details:", error);
    }
  },
  mounted() {
    this.$watch(
      "item",
      async (val) => {
        if (val) {
          await this.$nextTick();
          this.initMap();
        }
      },
      { immediate: true }
    );
  },
  methods: {
    initMap() {
      const lat = this.item.latitude ?? 16.72012;
      const lng = this.item.longitude ?? 121.69347;

      this.map = L.map("map", {
        zoomControl: false,
        attributionControl: false,
      }).setView([lat, lng], 17);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
      }).addTo(this.map);

      this.marker = L.marker([lat, lng]).addTo(this.map);
    },

    handleFileUpload(event) {
      this.requestForm.attachment = event.target.files[0];
    },

    async submitRequest() {
      if (this.alreadyRequested) {
        alert("You have already requested this item!");
        return;
      }
      try {
        const formData = new FormData();
        formData.append("phone_number", this.requestForm.contact);
        formData.append("message", this.requestForm.message);
        if (this.requestForm.attachment)
          formData.append("attachment", this.requestForm.attachment);

        const res = await axios.post(
          `/items/${this.item.id}/request`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        alert("Request submitted successfully!");
        this.showRequestModal = false;
        this.requestForm = { contact: "", message: "", attachment: null };
        this.myRequests.unshift({ ...res.data.data, item_id: this.item.id });
      } catch (error) {
        console.error("Error submitting request:", error);
        alert("Failed to submit request.");
      }
    },
  },
};
</script> -->

<template>
  <div class="item-details">
    <navbar />

    <div v-if="item">
      <img
        :src="`http://192.168.254.105:8000/storage/${item.image_path}`"
        alt="Item Image"
      />

      <div class="details">
        <h1 class="item-name">{{ item.item_name }}</h1>

        <div class="detail-row">
          <p class="detail-label">Category:</p>
          <p class="detail-value">{{ item.category.category_name }}</p>
        </div>

        <div class="detail-row">
          <p class="detail-label">Location Lost:</p>
          <p class="detail-value">{{ item.location }}</p>
        </div>

        <div class="detail-row">
          <p class="detail-label">Additional Info:</p>
          <p class="detail-value">{{ item.description }}</p>
        </div>

        <div class="detail-row">
          <p class="detail-label">Reported By:</p>
          <p class="detail-value">
            {{ item.user.firstname }} {{ item.user.lastname }}
          </p>
        </div>
      </div>

      <!-- Leaflet Map -->
      <div id="map" style="height: 400px; margin: 1rem 0"></div>

      <div class="button-section">
        <button class="go-back-btn" @click="$router.go(-1)">Go Back</button>

        <button
          class="request-btn"
          @click="showRequestModal = true"
          :disabled="alreadyRequested || item.item_type === 'lost'"
        >
          {{
            item.item_type === "lost"
              ? "Cannot Request Lost Item"
              : alreadyRequested
              ? "Already Requested"
              : "Request Item"
          }}
        </button>
      </div>
    </div>

    <div v-else class="loading">Loading item details...</div>

    <!-- Request Modal -->
    <div v-if="showRequestModal" class="modal-overlay">
      <div class="modal">
        <h2>Request Item</h2>
        <form @submit.prevent="submitRequest">
          <div class="form-group">
            <label>Contact Number</label>
            <input type="text" v-model="requestForm.contact" required />
          </div>

          <div class="form-group">
            <label>Attachment (optional)</label>
            <input
              type="file"
              @change="handleFileUpload"
              accept=".jpg,.jpeg,.png,.pdf"
            />
          </div>

          <div class="form-group">
            <label>Message (optional)</label>
            <textarea v-model="requestForm.message"></textarea>
          </div>

          <button type="submit">Submit Request</button>
          <button type="button" @click="showRequestModal = false">
            Cancel
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import L from "leaflet";
import navbar from "@/components/navbar.vue";
import "leaflet/dist/leaflet.css";

export default {
  name: "ItemDetails",
  components: { navbar },
  data() {
    return {
      item: null,
      showRequestModal: false,
      requestForm: { contact: "", message: "", attachment: null },
      myRequests: [],
      map: null,
      marker: null,
    };
  },
  computed: {
    alreadyRequested() {
      if (!this.item) return false;
      return this.myRequests.some((req) => req.item_id === this.item.id);
    },
  },
  async created() {
    const id = this.$route.params.id;
    try {
      const [itemRes, requestsRes] = await Promise.all([
        axios.get(`/items/${id}`),
        axios.get("/items/myrequest"),
      ]);
      this.item = itemRes.data.data;
      this.myRequests = requestsRes.data.data || [];
    } catch (error) {
      console.error("Error fetching item details:", error);
    }
  },
  mounted() {
    this.$watch(
      "item",
      async (val) => {
        if (val) {
          await this.$nextTick();
          this.initMap();
        }
      },
      { immediate: true }
    );
  },
  methods: {
    initMap() {
      const lat = this.item.latitude ?? 16.72012;
      const lng = this.item.longitude ?? 121.69347;

      this.map = L.map("map", {
        zoomControl: false,
        attributionControl: false,
      }).setView([lat, lng], 17);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
      }).addTo(this.map);

      this.marker = L.marker([lat, lng]).addTo(this.map);
    },
    handleFileUpload(event) {
      this.requestForm.attachment = event.target.files[0];
    },
    async submitRequest() {
      if (this.alreadyRequested) {
        alert("You have already requested this item!");
        return;
      }
      try {
        const formData = new FormData();
        formData.append("phone_number", this.requestForm.contact);
        formData.append("message", this.requestForm.message);
        if (this.requestForm.attachment)
          formData.append("attachment", this.requestForm.attachment);

        const res = await axios.post(
          `/items/${this.item.id}/request`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        // Add request locally to prevent duplicates immediately
        this.myRequests.unshift({ ...res.data.data, item_id: this.item.id });

        alert("Request submitted successfully!");
        this.showRequestModal = false;
        this.requestForm = { contact: "", message: "", attachment: null };
      } catch (error) {
        console.error("Error submitting request:", error);
        alert("Failed to submit request.");
      }
    },
  },
};
</script>

<style>
@import "~leaflet/dist/leaflet.css";

#map {
  width: 100%;
  height: 400px;
  border: 1px solid #ccc;
  margin-bottom: 1rem;
}
</style>
