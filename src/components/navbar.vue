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
      <li><router-link to="/user/myrequest">My Request</router-link></li>
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

/* NAVBAR */
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

/* LOGO */
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

/* DESKTOP MENU */
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

/* Desktop hover */
@media (min-width: 769px) {
  ul li a:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  /* Desktop ACTIVE green */
  ul li a.router-link-active {
    background-color: #1cc88a;
    color: white;
  }
}

/* MODERN HAMBURGER */
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

/* Open animation → "X" */
.hamburger span.open:nth-child(1) {
  transform: translateY(10px) rotate(45deg);
}

.hamburger span.open:nth-child(2) {
  opacity: 0;
}

.hamburger span.open:nth-child(3) {
  transform: translateY(-10px) rotate(-45deg);
}

/* MOBILE MENU - Modern floating panel */
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

  /* REMOVE green highlight on mobile */
  ul li a.router-link-active {
    background: none !important;
    color: #333 !important;
  }
}
</style>
