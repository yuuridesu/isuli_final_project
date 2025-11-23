<template>
  <div class="item-card" @click="$emit('click')">
    <!-- <img
      :src="
        item.image_path
          ? `http://127.0.0.1:8000/storage/${item.image_path}`
          : 'https://via.placeholder.com/400x250/cccccc/666666?text=No+Image+Available'
      "
      alt="Item Image"
    /> -->

    <img
      :src="
        item.image_path ||
        'https://via.placeholder.com/400x250/cccccc/666666?text=No+Image+Available'
      "
      alt="Item Image"
    />

    <!-- <img
      :src="
        item.image_path
          ? `http://192.168.254.105:8000/storage/${item.image_path}`
          : 'https://via.placeholder.com/400x250/cccccc/666666?text=No+Image+Available'
      "
      alt="Item Image"
    /> -->

    <!-- <img
      :src="
        item.image_path
          ? `${axios.defaults.baseURL.replace('/api', '')}/storage/${
              item.image_path
            }`
          : 'https://via.placeholder.com/400x250/cccccc/666666?text=No+Image+Available'
      "
      alt="Item Image"
    /> -->

    <h3>{{ item.item_name }}</h3>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
  },
};
</script>

<style>
/* Updated ItemCard styles with clearer, fuller images */
.item-card {
  border: none; /* Clean look */
  padding: 1.5rem;
  border-radius: 16px; /* Softer corners */
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  max-width: 320px; /* Constrain card width for grid */
}

.item-card:hover {
  transform: translateY(-6px); /* Lift effect */
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
}

.item-card img {
  width: 100%;
  height: 250px; /* Larger height for fuller, clearer view */
  object-fit: cover; /* Maintains aspect ratio, fills space */
  border-radius: 12px; /* Rounded for modern feel */
  border: 2px solid #f0f0f0; /* Subtle border */
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.item-card:hover img {
  transform: scale(1.05); /* Slight zoom for clarity on hover */
  border-color: #28a745; /* Green accent */
}

.item-card h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin: 0;
  text-align: center;
  font-family: Arial, sans-serif; /* Clean font */
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .item-card {
    padding: 1rem;
    gap: 0.75rem;
    max-width: 280px;
  }

  .item-card img {
    height: 200px; /* Slightly smaller on tablets */
  }

  .item-card h3 {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .item-card img {
    height: 180px; /* Even smaller on phones */
  }
}
</style>