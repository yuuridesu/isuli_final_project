<template>
  <div class="admin-page">
    <navbar-admin />

    <div class="admin-content">
      <h2> Reported Items </h2>

      <table class="item-table">

        <thead>
          <tr>
            <th> ID </th>
            <th> Item Name</th>
            <th> Type </th>
 
            <th> Category </th>
            <th> Location </th>
            <th> Reported By</th>
            <th> Date Reported </th>
            <th> Status </th>
            <th> Action </th>
          </tr>
        </thead>

        <tbody>

          <tr v-for="item in items" :key="item">

            <td> {{ item.id }} </td>

            <td> {{ item.item_name }}</td>

            <td> {{ item.item_type }}</td>
            <td> {{ item.category_name }}</td>
            <td> {{  item.location  }}</td>
            <td> {{ item.user.firstname }} {{ item.user.lastname }}</td>

            <td> {{ item.date_reported_item }}</td>
            
            <td>{{ item.status }}</td>

            <td>
              <button v-if="item.status === 'Pending'" class="btn-approve" @click="approveItem(item.id)"> Approve </button>
              <button v-if="item.status === 'Pending'" class="btn-reject" @click="rejectItem(item.id)"> Reject </button>

              <span v-else>—</span>
            </td>

          </tr>


        </tbody>


      </table>
    </div>
  </div>
</template>

<script>
import navbarAdmin from '@/components/navbarAdmin.vue'
import axios from 'axios'

// axios.defaults.baseURL = 'http://192.168.254.105:8000/api'
// axios.defaults.baseURL = 'http://127.0.0.1:8000/api'
axios.defaults.baseURL = 'http://188.1.0.163:8000/api'


export default {
  name: 'AdminItems',
  components: { navbarAdmin },

  data() {
    return {
      items: [],
      loading: false
    }
  },

  mounted() {
    this.fetchItems()
  },

  methods: {
    async fetchItems() {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get('/admin/items', {
          headers: { Authorization: `Bearer ${token}` }
        })

        this.items = response.data.data

      } catch (error) {
        console.error(error)
        alert("Error fetching items")
      } finally {
        this.loading = true
      }
    },

    async approveItem(id) {
      try {
        const token = localStorage.getItem('token')

        await axios.patch(`/admin/items/${id}/approve`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        })

        alert("Item approved successfully")
      } catch (error) {
        console.error(error)
        alert("Error approving item")
      }
    },

    async rejectItem(id) {
      try {
        const token = localStorage.getItem('token')

        await axios.patch(`/admin/items/${id}/reject`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        })

        alert("Item rejected successfully")

      } catch (error) {
        console.error(error)
        alert("Error rejecting item")
      }
    }

  }
}
</script>


<style scoped>
/* Wrapper */
.admin-content h2 {
  margin-bottom: 15px;
  font-weight: 600;
}

/* Table Styling */
.item-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

/* Header */
.item-table thead {
  background: #2c3e50;
  color: white;
}

.item-table th {
  padding: 12px 15px;
  text-align: left;
  font-weight: 600;
  font-size: 14px;
}

/* Body */
.item-table td {
  padding: 10px 15px;
  font-size: 14px;
  border-bottom: 1px solid #e6e6e6;
}

.item-table tbody tr:hover {
  background: #f5f7fa;
}

/* Buttons */
.btn-approve,
.btn-reject {
  padding: 6px 12px;
  font-size: 13px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 5px;
  color: white;
}

.btn-approve {
  background-color: #27ae60;
}

.btn-reject {
  background-color: #e74c3c;
}

.btn-approve:hover,
.btn-reject:hover {
  opacity: 0.9;
}

/* Center short columns */
.item-table td:first-child,
.item-table th:first-child {
  width: 60px;
  text-align: center;
}

/* Status column highlighted */
.item-table td:nth-last-child(2) {
  font-weight: 600;
}

</style>

