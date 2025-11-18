<template>
  <div>
    <navbar-admin /> <!-- always shows on admin pages -->
    <div class="admin-content">
      <router-view /> <!-- nested admin page content -->
    </div>
  </div>
</template>

<script>
import NavbarAdmin from '@/components/navbarAdmin.vue'

export default {
  name: 'AdminLayout',
  components: { NavbarAdmin }
}
</script>


<style scoped>
.admin-content {
  padding-top: 20px;      /* optional top spacing */
  padding-left: 270px;    /* offset for sidebar (250px width + 20px gap) */
  padding-right: 20px;
}
</style>