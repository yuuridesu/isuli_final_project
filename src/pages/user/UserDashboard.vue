<template>
  <div class="user-dashboard">
    <navbar />
    <!-- Top right navigation -->
    <h1 class="page-title">Lost & Found</h1>

    <!-- 
           <button @click="$router.push('/user/reportItem')" class="report-btn">
      + Report Lost/Found Item
    </button> -->
    <!-- 
    <button @click="$router.push('/user/myItem')" class="myItem-btn">
      My Items
    </button> -->

    <SearchBar @search="handleSearch"> </SearchBar>

    <div v-if="loading" class="loading">Loading your items...</div>

    <div v-else>
      <div v-if="items.length === 0" class="no-items-wrapper">
        <div class="no-items">
          <h2>No Items Posted Yet</h2>
          <p>Items you report will appear here once approved.</p>
        </div>
      </div>

      <div class="item-grid" v-else>
        <ItemCard
          v-for="item in filteredItems"
          :key="item.id"
          :item="item"
          @click="$router.push(`user/items/${item.id}`)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ItemCard from "@/components/ItemCard.vue";
import navbar from "@/components/navbar.vue";
import SearchBar from "@/components/SearchBar.vue";

export default {
  name: "UserDashboard",

  components: {
    ItemCard,
    SearchBar,
    navbar,
  },

  data() {
    return {
      items: [],
      searchQuery: "",
    };
  },

  computed: {
    filteredItems() {
      if (!this.searchQuery) return this.items;
      return this.items.filter((item) =>
        item.item_name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },

  created() {
    this.fetchItems();
  },

  methods: {
    async fetchItems() {
      try {
        const response = await axios.get("/items");
        console.log("Fetched items:", response.data.data);
        this.items = response.data.data.data || [];

        // this.items = (response.data.data.data || []).filter(
        //   (item) => item.status === "Approved"
        // );
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    },

    handleSearch(query) {
      this.searchQuery = query;
    },
  },
};
</script>


<style scoped src="@/assets/css/user_css/UserDashboard.css"></style>
