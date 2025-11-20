<template>
  <navbar />

  <div class="item-details" v-if="item">
    <div>
      <!-- <img :src="`http://192.168.254.105:8000/storage/${item.image_path}`" alt="Item Image" /> -->

      <!-- <img :src="`http://188.1.0.163:8000/storage/${item.image_path}`" alt="Item Image" /> -->

      <img
        :src="`http://127.0.0.1:8000/storage/${item.image_path}`"
        alt="Item Image"
      />

      <div class="details">
        <h1 class="item-name">{{ item.item_name }}</h1>

        <div class="detail-row">
          <p class="detail-label">Category:</p>
          <p class="detail-value">{{ item.category.category_name }}</p>
        </div>

        <div class="detail-row">
          <p class="detail-label">Location Lost:</p>
          <p class="detail-value">{{ item.location }}</p>
        </div>

        <div class="detail-row">
          <p class="detail-label">Additional Info:</p>
          <p class="detail-value">{{ item.description }}</p>
        </div>

        <div class="detail-row">
          <p class="detail-label">Reported By:</p>
          <p class="detail-value">
            {{ item.user.firstname }} {{ item.user.lastname }}
          </p>
        </div>
      </div>

      <div class="button-section">
        <button class="go-back-btn" @click="$router.go(-1)">Go Back</button>

        <!-- Disable button if already requested -->
        <button
          class="request-btn"
          @click="showRequestModal = true"
          :disabled="alreadyRequested"
        >
          {{ alreadyRequested ? "Already Requested" : "Request Item" }}
        </button>
      </div>
    </div>

    <!-- Request Modal -->
    <div v-if="showRequestModal" class="modal-overlay">
      <div class="modal">
        <h2>Request Item</h2>
        <form @submit.prevent="submitRequest">
          <!-- Display user info as readonly -->
          <div class="form-group">
            <label>Firstname</label>
            <input type="text" :value="user.firstname" readonly />
          </div>

          <div class="form-group">
            <label>Lastname</label>
            <input type="text" :value="user.lastname" readonly />
          </div>

          <div class="form-group">
            <label>Student ID</label>
            <input type="text" :value="user.student_id" readonly />
          </div>

          <!-- Input for contact and message -->
          <div class="form-group">
            <label>Contact Number</label>
            <input type="text" v-model="requestForm.contact" required />
          </div>

          <div class="form-group">
            <label>Message (optional)</label>
            <textarea v-model="requestForm.message"></textarea>
          </div>

          <button type="submit">Submit Request</button>
          <button type="button" @click="showRequestModal = false">
            Cancel
          </button>
        </form>
      </div>
    </div>
  </div>

  <div v-else>Loading item details...</div>
</template>

<script>
import axios from "axios";
import navbar from "@/components/navbar.vue";

export default {
  name: "ItemDetails",
  components: { navbar },
  data() {
    return {
      item: null,
      showRequestModal: false,
      user: {},
      requestForm: { contact: "", message: "" },
      myRequests: [], // track all user's requests
    };
  },
  computed: {
    alreadyRequested() {
      // compare using item_id to avoid undefined errors
      return this.myRequests.some((req) => req.item_id === this.item?.id);
    },
  },
  async created() {
    const id = this.$route.params.id;
    try {
      // Fetch item details
      const itemResponse = await axios.get(`/items/${id}`);
      this.item = itemResponse.data.data;

      // Fetch authenticated user info
      const userResponse = await axios.get("/user");
      this.user = userResponse.data.data;

      // Fetch user's previous requests
      const requestsResponse = await axios.get("/items/myrequest");
      this.myRequests = requestsResponse.data.data || [];
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  methods: {
    async submitRequest() {
      if (this.alreadyRequested) {
        alert("You have already requested this item!");
        return;
      }

      try {
        const token = localStorage.getItem("token");
        const res = await axios.post(
          `/items/${this.item.id}/request`,
          {
            phone_number: this.requestForm.contact,
            message: this.requestForm.message,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        alert("Request submitted successfully!");
        this.showRequestModal = false;
        this.requestForm = { contact: "", message: "" };

        // Push new request with item_id only (Option A)
        this.myRequests.unshift({
          ...res.data.data,
          item_id: this.item.id,
        });
      } catch (error) {
        console.error("Error submitting request:", error);
        alert("Failed to submit request.");
      }
    },
  },
};
</script>

<style scoped>
/* Modal overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 77, 64, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

/* Modal box */
.modal {
  background: var(--neutral-white);
  padding: 2rem;
  border-radius: var(--border-radius);
  max-width: 500px;
  width: 90%;
  box-shadow: 0 10px 20px var(--shadow-color);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  0% {
    transform: translateY(-20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal form .form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.modal form input,
.modal form textarea {
  padding: 0.75rem 1rem;
  border: 1px solid var(--primary-dark-green);
  border-radius: var(--border-radius);
  font-size: 1rem;
  resize: none;
}

.modal form button {
  padding: 0.75rem 1rem;
  border: none;
  border-radius: var(--border-radius);
  background-color: var(--primary-dark-green);
  color: var(--neutral-white);
  cursor: pointer;
  transition: background 0.3s ease;
}

.modal form button:hover {
  background-color: var(--secondary-yellow);
  color: var(--primary-dark-green);
}
</style>
