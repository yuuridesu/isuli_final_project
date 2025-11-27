<template>
  <div class="my-items">
    <navbar />

    <h1>My Posted Items</h1>

    <!-- Loading state -->
    <div v-if="loading" class="loading">Loading your items...</div>

    <div v-else>
      <!-- No items -->
      <div v-if="items.length === 0" class="no-items">
        <p>You haven’t posted any items yet.</p>
      </div>

      <!-- Items grid -->
      <div class="item-grid">
        <div v-for="item in items" :key="item.id" class="item-card">
          <img
            :src="
              item.image_path
                ? `http://192.168.254.105:8000/storage/${item.image_path}`
                : 'https://via.placeholder.com/400x250/cccccc/666666?text=No+Image+Available'
            "
            alt="Item Image"
          />
          <h3>{{ item.item_name }}</h3>
          <p>{{ item.description }}</p>
          <p><strong>Status:</strong> {{ item.status }}</p>

          <div class="actions">
            <button class="edit-btn" @click="openEditModal(item)">Edit</button>
            <button class="delete-btn" @click="deleteItem(item.id)">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="editingItem" class="modal-overlay">
      <div class="modal">
        <h2>Edit Item</h2>
        <label>Name</label>
        <input v-model="editingItem.item_name" />

        <label>Description</label>
        <textarea v-model="editingItem.description"></textarea>

        <label>Status</label>
        <select v-model="editingItem.status">
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>

        <div class="modal-actions">
          <button @click="saveEdit">Save</button>
          <button @click="editingItem = null" class="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "@/assets/css/user_css/MyItem.css";
import navbar from "@/components/navbar.vue";

export default {
  name: "MyItem",
  components: { navbar },
  data() {
    return {
      items: [],
      loading: true,
      editingItem: null, // For modal
    };
  },
  async created() {
    await this.fetchMyItems();
  },
  methods: {
    async fetchMyItems() {
      try {
        const response = await axios.get("/myItems");
        this.items = response.data?.data?.data || [];
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        this.loading = false;
      }
    },

    openEditModal(item) {
      this.editingItem = { ...item }; // clone so original isn't changed yet
    },

    async saveEdit() {
      try {
        await axios.put(`/items/${this.editingItem.id}`, this.editingItem);

        // Update local list
        const index = this.items.findIndex((i) => i.id === this.editingItem.id);
        this.items[index] = { ...this.editingItem };

        this.editingItem = null;
        alert("Item updated successfully!");
      } catch (error) {
        console.error(error);
        alert("Failed to update item.");
      }
    },

    async deleteItem(id) {
      if (!confirm("Are you sure you want to delete this item?")) return;
      const itemIndex = this.items.findIndex((item) => item.id === id);

      try {
        await axios.delete(`/api/items/${id}`);
        this.items.splice(itemIndex, 1);
        alert("Item deleted successfully!");
      } catch (error) {
        console.error(error);
        alert("Failed to delete item.");
      }
    },
  },
};
</script>
