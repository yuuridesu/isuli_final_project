<template>
  <div :style="{ paddingTop: showNavbar ? '80px' : '0' }">
    <navbar v-if="showNavbar" />
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/navbar.vue'

export default {
  name: 'App',
  components: { Navbar },
  computed: {
    showNavbar() {
      // Show navbar only on user pages
      return this.$route.path.startsWith('/user')
    }
  }
}
</script>

<style>
/* You no longer need global padding here */
</style>
