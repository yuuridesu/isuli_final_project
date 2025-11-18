<template>

  <div class="report-item">
    <navbar /> <!-- Top right navigation -->
    <h1> Report Lost/Found Item</h1>

    <form @submit.prevent="submitItem" enctype="multipart/form-data">
      <!-- Item Type-->

      <div class="form-group">
        <label> Item Type </label>

        <select v-model="form.item_type" required>
          <option value="lost"> Lost </option>
          <option value="found"> Found </option>
        </select>

      </div>

     <!-- Category -->
      <div class="form-group">
        <label>Category:</label>
        <select v-model="form.category_id" required>
          <option value="" disabled>Select category</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.category_name }}
          </option>
        </select>
      </div>

      <!-- Item Name -->
      <div class="form-group">
        <label>Item Name:</label>
        <input type="text" v-model="form.item_name" placeholder="Enter item name" required />
      </div>

      <!-- Description -->
      <div class="form-group">
        <label>Description:</label>
        <textarea v-model="form.description" placeholder="Enter description" required></textarea>
      </div>

      <!-- Location -->
      <div class="form-group">
        <label>Location:</label>
        <input type="text" v-model="form.location" placeholder="Where did you lose/find it?" />
      </div>

      <!-- Date Reported -->
      <div class="form-group">
        <label>Date Reported:</label>
        <input type="date" v-model="form.date_reported_item" required />
      </div>

      <!-- Image Upload -->
      <div class="form-group">
        <label>Image (optional):</label>
        <input type="file" @change="handleFileUpload" />
      </div>

     <button type="submit" :disabled="loading">
  {{ loading ? 'Submitting...' : 'Submit Report' }}
</button>

    </form>
  </div>
  

</template>

<script>
import axios from 'axios';
import '@/assets/css/user_css/reportItem.css'
import navbar from '@/components/navbar.vue'
axios.defaults.baseURL = 'http://188.1.0.163:8000/api'



export default {

  name: "ReportItem",

    components:{
    navbar

  },

  data(){
    return{
      categories: [], 
      loading: false,

      form: {
        item_type: 'lost', //default
        category_id: '',
        item_name: '',
        description: '',
        location: '',
        date_reported_item: '',
        image: null

       }
    }
  },

  async created(){
    await this.fetchCategories()
  },

methods: {
  async fetchCategories() {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get('/categories', {
        headers: { Authorization: `Bearer ${token}` }

      //     const token = localStorage.getItem('token')
      // const res = await axios.get("http://127.0.0.1:8000/api/categories", {
      //   headers: { Authorization: `Bearer ${token}` }


      //   const token = localStorage.getItem('token')
      // const res = await axios.get("http://192.168.254.105:8000/api/categories", {
      //   headers: { Authorization: `Bearer ${token}` }
      })
      this.categories = res.data.data
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  },

  handleFileUpload(event) {
    this.form.image = event.target.files[0]
  },

  async submitItem() {
    if(this.loading) return

    this.loading = true
    try {
      const token = localStorage.getItem('token')
      const formData = new FormData()
      formData.append('item_type', this.form.item_type)
      formData.append('category_id', this.form.category_id)
      formData.append('item_name', this.form.item_name)
      formData.append('description', this.form.description)
      formData.append('location', this.form.location)
      formData.append('date_reported_item', this.form.date_reported_item)
      if (this.form.image) formData.append('image', this.form.image)

      // await axios.post('http://127.0.0.1:8000/api/items', formData, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //     'Content-Type': 'multipart/form-data'
      //   }


      
      // await axios.post('http://192.168.254.105:8000/api/items', formData, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //     'Content-Type': 'multipart/form-data'
      //   }

           await axios.post('/items', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }


      })

      alert('Item reported successfully')
      this.$router.push('/user')
    } catch (error) {
      console.error('Error submitting item:', error)
    }
  }
}



  
}
</script>