<template>
  <div class="report-item">
    <navbar />
    <h1>Report Lost/Found Item</h1>

    <form @submit.prevent="submitItem" enctype="multipart/form-data">
      <div class="form-grid">
        <!-- Item Type -->
        <div class="form-group">
          <label>Item Type</label>
          <select v-model="form.item_type" required>
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>
        </div>

        <!-- Category -->
        <div class="form-group">
          <label>Category</label>
          <select v-model="form.category_id" required>
            <option value="" disabled>Select category</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.category_name }}
            </option>
          </select>
        </div>

        <!-- Item Name -->
        <div class="form-group">
          <label>Item Name</label>
          <input
            type="text"
            v-model="form.item_name"
            placeholder="Enter item name"
            required
          />
        </div>

        <!-- Description -->
        <div class="form-group">
          <label>Description</label>
          <textarea
            v-model="form.description"
            placeholder="Enter description"
            required
          ></textarea>
        </div>

        <!-- Location -->
        <div class="form-group">
          <label>Location</label>
          <input
            type="text"
            v-model="form.location"
            placeholder="Where did you lose/find it?"
          />
        </div>

        <!-- Date Reported -->
        <div class="form-group">
          <label>Date Reported</label>
          <input type="date" v-model="form.date_reported_item" required />
        </div>
      </div>

      <!-- Map (full width) -->
      <div class="form-group full-width">
        <label>Pick Location on Map</label>
        <div id="map" style="height: 400px; margin-bottom: 1rem"></div>
        <p v-if="form.latitude">Latitude: {{ form.latitude }}</p>
        <p v-if="form.longitude">Longitude: {{ form.longitude }}</p>
      </div>

      <!-- Image Upload (full width) -->
      <div class="form-group full-width">
        <label>Image (optional)</label>
        <input type="file" @change="handleFileUpload" />
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? "Submitting..." : "Submit Report" }}
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import L from "leaflet";
import "@/assets/css/user_css/reportItem.css";
import navbar from "@/components/navbar.vue";
import "leaflet/dist/leaflet.css";

export default {
  name: "ReportItem",
  components: { navbar },
  data() {
    return {
      categories: [],
      loading: false,
      form: {
        item_type: "lost",
        category_id: "",
        item_name: "",
        description: "",
        location: "",
        date_reported_item: "",
        latitude: null,
        longitude: null,
        image: null,
      },
      map: null,
      marker: null,
    };
  },
  async created() {
    await this.fetchCategories();
  },
  mounted() {
    this.initMap();
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await axios.get("/categories");
        this.categories = response.data.data;
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
    handleFileUpload(event) {
      this.form.image = event.target.files[0];
    },
    async submitItem() {
      this.loading = true;

      // Require marker coordinates
      if (this.form.latitude === null || this.form.longitude === null) {
        alert("Please pick a location on the map.");
        this.loading = false;
        return;
      }

      // Confirmation dialog
      const confirmed = confirm(
        "Are you sure? All info will be saved atomically."
      );
      if (!confirmed) {
        this.loading = false;
        return;
      }

      try {
        const formData = new FormData();
        formData.append("item_type", this.form.item_type);
        formData.append("category_id", this.form.category_id);
        formData.append("item_name", this.form.item_name);
        formData.append("description", this.form.description);
        formData.append("location", this.form.location);
        formData.append("date_reported_item", this.form.date_reported_item);

        formData.append("latitude", this.form.latitude);
        formData.append("longitude", this.form.longitude);

        if (this.form.image) formData.append("image", this.form.image);

        await axios.post("/items", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        alert("Item reported successfully");
        this.$router.push("/user");
      } catch (error) {
        console.error("Error submitting item:", error);
        alert("Failed to report item. Please try again.");
      } finally {
        this.loading = false;
      }
    },

    initMap() {
      // Initialize Leaflet map centered on ISU Echague or previously picked coords
      const initialLat = this.form.latitude || 16.72012;
      const initialLng = this.form.longitude || 121.69347;

      this.map = L.map("map", {
        zoomControl: false, // remove + / - zoom buttons
        attributionControl: false, // remove bottom-right attribution
      }).setView([initialLat, initialLng], 17);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
      }).addTo(this.map);

      // Add draggable marker
      this.marker = L.marker([initialLat, initialLng], {
        draggable: true,
      }).addTo(this.map);

      // Update form coordinates when marker is dragged
      this.marker.on("dragend", (e) => {
        const pos = e.target.getLatLng();
        this.form.latitude = pos.lat;
        this.form.longitude = pos.lng;
      });

      // Update coordinates if user clicks on the map
      this.map.on("click", (e) => {
        const { lat, lng } = e.latlng;
        this.marker.setLatLng([lat, lng]);
        this.form.latitude = lat;
        this.form.longitude = lng;
      });
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