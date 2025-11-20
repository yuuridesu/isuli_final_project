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

    <div class="item-grid">
      <ItemCard
        v-for="item in filteredItems"
        :key="item.id"
        :item="item"
        @click="$router.push(`user/items/${item.id}`)"
      >
      </ItemCard>
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
        this.items = (response.data.data || []).filter(
          (item) => item.status === "Approved"
        );
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
