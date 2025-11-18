<template>
  <nav class="navbar-admin">
    <ul>
      <li><router-link to="/admin">Dashboard</router-link></li>
      <li><router-link to="/admin/users">Users</router-link></li>
      <li><router-link to="/admin/items">Items</router-link></li>
      <li><router-link to="/admin/request">Item Requests</router-link></li>

      <!-- <li><router-link to="/admin/reports">Reports</router-link></li> -->
      <li>
        <!-- Removed .native -->
        <router-link to="/login" @click="logout">Logout</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'navbarAdmin',
  methods: {
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }
}
</script>

<style scoped>


.navbar-admin {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh; /* Full height */
  width: 250px; /* Sidebar width */
  background-color: #f8f9fa; /* Light background for modern look */
  box-shadow: 2px 0 4px rgba(0,0,0,0.1); /* Subtle shadow */
  padding: 20px 0; /* Vertical padding */
  display: flex;
  flex-direction: column;
  z-index: 1000;
}

.navbar-admin ul {
  display: flex;
  flex-direction: column; /* Vertical list */
  gap: 15px; /* Spacing between items */
  list-style: none;
  margin: 0;
  padding: 0 20px; /* Horizontal padding */
}

.navbar-admin a {
  text-decoration: none;
  color: #333;
  font-weight: 600;
  padding: 12px 16px; /* Larger padding for touch-friendly */
  border-radius: 8px; /* Rounded corners for modern look */
  transition: 0.3s ease; /* Smooth transition */
  display: block; /* Full width */
}

.navbar-admin a:hover,
.navbar-admin a.router-link-active {
  background-color: #1cc88a;
  color: white;
  transform: translateX(5px); /* Slight slide effect on hover */
}

/* Optional: Add a header or logo space at the top */
.navbar-admin::before {
  content: "Admin Panel";
  font-size: 1.2rem;
  font-weight: bold;
  color: #555;
  margin-bottom: 20px;
  padding: 0 20px;
  display: block;
}

/* Responsive: On smaller screens, make it a top bar or hide, but for now, keep as is */
@media (max-width: 768px) {
  .navbar-admin {
    width: 200px; /* Smaller sidebar for mobile */
  }

  .admin-content {
    padding-left: 200px !important;
  }

  /* KEEP the menu visible */
  .navbar-admin ul,
  .navbar-admin::before {
    display: block;
  }
}


</style>