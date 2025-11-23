<template>
  <nav class="navbar">
    <!-- Left Logo -->
    <div class="nav-left">
      <div class="logo" @click="$router.push('/user')">
        <i class="fas fa-search"></i>
        <div class="logo-text">
          <span class="brand">Isuli</span>
          <span class="tagline">Lost & Found</span>
        </div>
      </div>
    </div>

    <!-- Hamburger Menu -->
    <div class="hamburger" @click="toggleMenu">
      <span :class="{ open: isOpen }"></span>
      <span :class="{ open: isOpen }"></span>
      <span :class="{ open: isOpen }"></span>
    </div>

    <!-- Menu Links -->
    <ul :class="{ open: isOpen }">
      <li><router-link to="/user">Home</router-link></li>
      <li><router-link to="/user/reportItem">Report Item</router-link></li>
      <li><router-link to="/user/myItem">My Items</router-link></li>
      <li><router-link to="/user/myrequest">My Requests</router-link></li>
      <li><router-link to="/user/profile">Profile</router-link></li>
    </ul>

    <!-- Notifications Bell -->
    <div class="nav-right">
      <i class="fas fa-bell" @click="$router.push('/user/notification')">
        <span class="badge" v-if="unreadCount > 0">{{ unreadCount }}</span>
      </i>
    </div>
  </nav>
</template>

<script>
import axios from "axios";

export default {
  name: "NavBar",
  data() {
    return {
      isOpen: false,
      unreadCount: 0,
      interval: null,
    };
  },
  mounted() {
    this.fetchUnreadNotifications();

    // Poll every 10 seconds for new notifications
    this.interval = setInterval(() => {
      this.fetchUnreadNotifications();
    }, 10000);
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    async fetchUnreadNotifications() {
      try {
        const res = await axios.get("/notification"); // API endpoint
        // Count unread notifications
        this.unreadCount = res.data.data.filter((n) => !n.is_read).length;
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      }
    },
  },
};
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css");

.navbar {
  width: 100%;
  height: 70px;
  background: #ffffff;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.07);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 18px;
  position: fixed;
  top: 0;
  z-index: 1000;
  border-bottom: 2px solid #e9f9f1;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: 0.25s ease;
}
.logo:hover {
  transform: scale(1.04);
}
.logo i {
  font-size: 1.55rem;
  color: #1cc88a;
}
.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}
.brand {
  font-size: 1.45rem;
  font-weight: 800;
  background: linear-gradient(45deg, #1cc88a, #17a2b8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.tagline {
  font-size: 0.85rem;
  color: #555;
  font-style: italic;
}

/* Menu */
ul {
  display: flex;
  gap: 25px;
  list-style: none;
  align-items: center;
}
ul li a {
  text-decoration: none;
  color: #333;
  padding: 8px 14px;
  border-radius: 10px;
  font-weight: 500;
  transition: 0.25s;
}
@media (min-width: 769px) {
  ul li a:hover {
    background-color: #e9f9f1;
    color: #1cc88a;
  }
  ul li a.router-link-active {
    background: #1cc88a;
    color: white;
    box-shadow: 0 4px 10px rgba(28, 200, 138, 0.3);
  }
}

/* Notifications Bell */
.nav-right {
  position: relative;
  cursor: pointer;
}
.nav-right .fa-bell {
  font-size: 1.45rem;
  color: #1cc88a;
  transition: 0.25s;
}
.nav-right .fa-bell:hover {
  transform: scale(1.08);
}
.nav-right .badge {
  position: absolute;
  top: -6px;
  right: -6px;
  background: #ff5252;
  color: white;
  border-radius: 50%;
  font-size: 0.7rem;
  padding: 2px 6px;
  box-shadow: 0 2px 6px rgba(255, 82, 82, 0.4);
}

/* Hamburger Menu */
.hamburger {
  display: none;
  width: 32px;
  height: 24px;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
}
.hamburger span {
  width: 100%;
  height: 3px;
  background: #333;
  border-radius: 6px;
  transition: 0.3s ease;
}
.hamburger span.open:nth-child(1) {
  transform: translateY(10px) rotate(45deg);
}
.hamburger span.open:nth-child(2) {
  opacity: 0;
}
.hamburger span.open:nth-child(3) {
  transform: translateY(-10px) rotate(-45deg);
}

/* Mobile Menu */
@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }
  ul {
    position: absolute;
    top: 80px;
    right: 15px;
    width: 230px;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(10px);
    flex-direction: column;
    border-radius: 16px;
    padding: 12px 0;
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
    display: none;
    animation: fadeInMenu 0.25s ease forwards;
  }
  ul.open {
    display: flex;
  }
  ul li a {
    padding: 14px 20px;
    width: 100%;
    border-bottom: 1px solid #eee;
  }
  ul li:last-child a {
    border-bottom: none;
  }
  ul li a:hover {
    background: #e9f9f1;
    color: #1cc88a;
  }
  ul li a.router-link-active {
    background: #1cc88a !important;
    color: white !important;
  }
  @keyframes fadeInMenu {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>
