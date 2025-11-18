<template>
  <div class="my-items">
    <navbar /> <!-- Top right navigation -->
    <h1>My Posted Items</h1>

    <!-- <button @click="$router.push('/user/reportItem')" class="report-btn">
      + Report New Item
    </button> -->

    <div v-if="loading" class="loading">Loading your items...</div>

    <div v-else>
      <div v-if="items.length === 0" class="no-items">
        <p>You haven’t posted any items yet.</p>
      </div>

      <div class="item-grid">
        <div
          v-for="item in items"
          :key="item.id"
          class="item-card"
        >
      <img :src="`http://188.1.0.163:8000/storage/${item.image_path}`" alt="Item Image" />
      <!-- <img :src="`http://127.0.0.1:8000/storage/${item.image_path}`" alt="Item Image" /> -->
            <!-- <img :src="`http://192.168.254.105:8000/storage/${item.image_path}`" alt="Item Image" /> -->
      
          <h3>{{ item.item_name }}</h3>
          <p>{{ item.description }}</p>
          <p><strong>Status:</strong> {{ item.status }}</p>

          <div class="actions">
            <button class="edit-btn" @click="editItem(item.id)">Edit</button>
            <button class="delete-btn" @click="deleteItem(item.id)">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import '@/assets/css/user_css/MyItem.css'
import navbar from '@/components/navbar.vue'

axios.defaults.baseURL = 'http://188.1.0.163:8000/api'


export default {
  name: "MyItem",
  components:{
    navbar

  },
  data() {
    return {
      items: [],
      loading: true
    };
  },
  async created() {
    await this.fetchMyItems();
  },
  methods: {
    async fetchMyItems() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get('/myItems', {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.items = response.data.data || [];

        //  const token = localStorage.getItem("token");
        // const response = await axios.get("http://127.0.0.1:8000/api/myItems", {
        //   headers: { Authorization: `Bearer ${token}` }
        // });
        // this.items = response.data.data || [];

        //  const token = localStorage.getItem("token");
        // const response = await axios.get("http://192.168.254.105:8000/api/myItems", {
        //   headers: { Authorization: `Bearer ${token}` }
        // });
        // this.items = response.data.data || [];
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        this.loading = false;
      }
    },

    editItem(id) {
      this.$router.push(`/user/items/edit/${id}`);
    },

    async deleteItem(id) {
      if (!confirm("Are you sure you want to delete this item?")) return;

      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://127.0.0.1:8000/api/items/${id}`, {
          headers: { Authorization: `Bearer ${token}` }

        //  const token = localStorage.getItem("token");
        // await axios.delete(`http://192.168.254.105:8000/api/items/${id}`, {
        //   headers: { Authorization: `Bearer ${token}` }
        });
        this.items = this.items.filter(item => item.id !== id);
        alert("Item deleted successfully!");
      } catch (error) {
        console.error("Error deleting item:", error);
        alert("Failed to delete item.");
      }
    }
  }
};
</script>
