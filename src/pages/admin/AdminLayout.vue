<template>
  <div class="admin-layout">
    <navbar-admin />
    <div class="admin-content">
      <router-view />
    </div>
  </div>
</template>

<script>
import NavbarAdmin from "@/components/navbarAdmin.vue";

export default {
  name: "AdminLayout",
  components: { NavbarAdmin },
};
</script>

<style scoped>
.admin-layout {
  display: flex;
}

.admin-content {
  flex: 1; /* takes remaining width */
  min-height: 100vh;
  padding: 40px;
  padding-left: 280px; /* sidebar width + gap */
  background: #f4f9f8;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .admin-content {
    padding-left: 20px; /* collapse sidebar */
    padding-top: 20px;
  }
}
</style>
