<template>
  <input
    type="text"
    placeholder="Search items..."
    v-model="searchText"
    @input="onInput"
    class="search-bar"
  />
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      searchText: ""
    }
  },
  methods: {
    onInput() {
      this.$emit('search', this.searchText)
    }
  }
}
</script>

<style scoped>
.search-bar {
  width: 100%;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  margin: 1rem 0;
  border-radius: 8px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
</style>
