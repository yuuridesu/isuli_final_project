<template>
  <div class="user-notifications">
    <h1>Your Notifications</h1>

    <div v-if="notifications.length === 0" class="no-notifs">
      No notifications yet.
    </div>

    <ul v-else class="notif-list">
      <li
        v-for="notif in notifications"
        :key="notif.id"
        :class="{ unread: !notif.is_read }"
        @click="markAsRead(notif)"
      >
        <strong>{{ notif.title }}</strong>
        <p>{{ notif.message }}</p>
        <small>{{ formatDate(notif.created_at) }}</small>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "UserNotification",
  data() {
    return {
      notifications: [],
    };
  },
  mounted() {
    this.fetchNotifications();
  },
  methods: {
    async fetchNotifications() {
      try {
        const response = await axios.get("/notification");
        this.notifications = response.data.data;
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    },
    async markAsRead(notif) {
      if (notif.is_read) return;

      try {
        await axios.patch(`/notification/${notif.id}/read`); // Make sure you have this route in backend
        notif.is_read = true;
      } catch (err) {
        console.error("Failed to mark as read:", err);
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleString();
    },
  },
};
</script>

<style scoped>
.user-notifications {
  max-width: 700px;
  margin: 2rem auto;
  padding: 0 1rem;
  font-family: "Inter", sans-serif;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
  color: #1cc88a;
}

.no-notifs {
  text-align: center;
  color: #6c757d;
}

.notif-list {
  list-style: none;
  padding: 0;
}

.notif-list li {
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.notif-list li:hover {
  background-color: #f1fdf8;
}

.notif-list li.unread {
  background-color: #e9f9f1;
  border-left: 4px solid #1cc88a;
}
</style>
