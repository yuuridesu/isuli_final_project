<template>
  <nav class="navbar-admin">
    <div class="logo" @click="$router.push('/admin')">
      <i class="fas fa-shield-alt"></i>
      <span class="brand">Admin Panel</span>
    </div>

    <ul>
      <li><router-link to="/admin">Dashboard</router-link></li>
      <li><router-link to="/admin/users">Manage Users</router-link></li>
      <li><router-link to="/admin/items"> Items</router-link></li>
      <li>
        <router-link to="/admin/request">Item Requests</router-link>
      </li>
      <li><router-link to="/login" @click="logout">Logout</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "NavbarAdmin",
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
};
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css");

.navbar-admin {
  position: fixed;
  top: 0;
  left: 0;
  width: 220px;
  height: 100vh;
  background: #ffffff;
  border-right: 2px solid #e9f9f1;
  box-shadow: 2px 0 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 30px 15px;
  font-family: "Inter", sans-serif;
  z-index: 1000;
  transition: all 0.3s ease;
}

.navbar-admin .logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 40px;
  cursor: pointer;
  color: #1cc88a;
}

.navbar-admin .logo i {
  font-size: 1.5rem;
}

.navbar-admin ul {
  list-style: none;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.navbar-admin ul li a {
  text-decoration: none;
  color: #333;
  padding: 12px 16px;
  border-radius: 12px;
  font-weight: 500;
  width: 100%;
  display: block;
  transition: all 0.3s ease;
}

.navbar-admin ul li a.router-link-active,
.navbar-admin ul li a:hover {
  background: linear-gradient(135deg, #1cc88a, #17a2b8);
  color: white;
  box-shadow: 0 4px 12px rgba(28, 200, 138, 0.2);
  transform: translateX(5px);
}

@media (max-width: 768px) {
  .navbar-admin {
    width: 180px;
    padding: 20px 10px;
  }

  .navbar-admin .logo {
    font-size: 1rem;
  }

  .navbar-admin ul li a {
    padding: 10px 14px;
  }
}
</style>
