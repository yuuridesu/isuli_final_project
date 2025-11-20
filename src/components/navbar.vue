<!-- <template>
  <nav class="navbar">
    <div class="nav-left">
      <div class="logo" @click="$router.push('/user')">
        <i class="fas fa-search"></i>
        <div class="logo-text">
          <span class="brand">Isuli</span>
          <span class="tagline">Lost & Found</span>
        </div>
      </div>
    </div>

    <div class="hamburger" @click="toggleMenu">
      <span :class="{ open: isOpen }"></span>
      <span :class="{ open: isOpen }"></span>
      <span :class="{ open: isOpen }"></span>
    </div>

    <ul :class="{ open: isOpen }">
      <li><router-link to="/user">Home</router-link></li>
      <li><router-link to="/user/reportItem">Report Item</router-link></li>
      <li><router-link to="/user/myItem">My Items</router-link></li> 
      <li><router-link to="/user/myrequest">My Request</router-link></li>
      <li><router-link to="user/notification"> Notifications </router-link></li>
      <li><router-link to="/user/profile">Profile</router-link></li>
  
    </ul>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

.navbar {
  width: 100%;
  height: 70px;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  position: fixed;
  top: 0;
  z-index: 1000;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: 0.3s;
}

.logo:hover { transform: scale(1.05); }

.logo i {
  font-size: 1.5rem;
  color: #1cc88a;
}

.logo-text { display: flex; flex-direction: column; }

.brand {
  font-size: 1.4rem;
  font-weight: 800;
  background: linear-gradient(45deg, #1cc88a, #17a2b8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.tagline {
  font-size: 0.9rem;
  color: #666;
  font-style: italic;
}

ul {
  display: flex;
  gap: 25px;
  list-style: none;
}

ul li a {
  text-decoration: none;
  color: #333;
  padding: 10px 14px;
  border-radius: 6px;
  font-weight: 500;
  transition: 0.3s;
}

@media (min-width: 769px) {
  ul li a:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }


  ul li a.router-link-active {
    background-color: #1cc88a;
    color: white;
  }
}


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
  border-radius: 5px;
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

@media (max-width: 768px) {

  .hamburger {
    display: flex;
  }

  ul {
    position: absolute;
    top: 78px;
    right: 15px;
    width: 200px;
    background: white;
    flex-direction: column;
    border-radius: 12px;
    padding: 10px 0;
    box-shadow: 0 8px 24px rgba(0,0,0,0.1);
    display: none;
    animation: menuFade 0.25s ease forwards;
  }

  @keyframes menuFade {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  ul.open {
    display: flex;
  }

  ul li a {
    padding: 14px 20px;
    width: 100%;
    border-bottom: 1px solid #f2f2f2;
  }

  ul li:last-child a {
    border-bottom: none;
  }

  ul li a:hover {
    background: #f7f7f7;
  }

  ul li a.router-link-active {
    background: none !important;
    color: #333 !important;
  }
}
</style> -->

<template>
  <nav class="navbar">
    <div class="nav-left">
      <div class="logo" @click="$router.push('/user')">
        <i class="fas fa-search"></i>
        <div class="logo-text">
          <span class="brand">Isuli</span>
          <span class="tagline">Lost & Found</span>
        </div>
      </div>
    </div>

    <!-- Modern Hamburger -->
    <div class="hamburger" @click="toggleMenu">
      <span :class="{ open: isOpen }"></span>
      <span :class="{ open: isOpen }"></span>
      <span :class="{ open: isOpen }"></span>
    </div>

    <!-- Menu -->
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
export default {
  name: "NavBar",
  data() {
    return {
      isOpen: false,
      unreadCount: 3, // Example: replace with real data from API
    };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
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
  border-bottom: 2px solid #e9f9f1; /* Matches dashboard softly */
}

/* Left Logo */
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

/* Desktop Menu */
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

/* Right Side Bell */
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
}
</style>

