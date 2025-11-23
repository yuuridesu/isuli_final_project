<template>
  <div class="admin-dashboard">
    <h1 class="title">Admin Panel</h1>

    <!-- Overview Cards -->
    <div class="stats-grid">
      <div class="card users">
        <div class="card-header">
          <i class="fas fa-users"></i>
          <h3>Total Users</h3>
        </div>
        <p>{{ stats.users }}</p>
      </div>
      <div class="card items">
        <div class="card-header">
          <i class="fas fa-boxes"></i>
          <h3>Total Items</h3>
        </div>
        <p>{{ stats.items }}</p>
      </div>
      <div class="card lost">
        <div class="card-header">
          <i class="fas fa-search"></i>
          <h3>Total Lost Items</h3>
        </div>
        <p>{{ stats.total_lost }}</p>
      </div>
      <div class="card found">
        <div class="card-header">
          <i class="fas fa-check-circle"></i>
          <h3>Total Found Items</h3>
        </div>
        <p>{{ stats.total_found }}</p>
      </div>
      <div class="card pending">
        <div class="card-header">
          <i class="fas fa-clock"></i>
          <h3>Pending Items</h3>
        </div>
        <p>{{ stats.pending_items }}</p>
      </div>
      <div class="card approved">
        <div class="card-header">
          <i class="fas fa-thumbs-up"></i>
          <h3>Approved Items</h3>
        </div>
        <p>{{ stats.approved_items }}</p>
      </div>
      <div class="card claimed">
        <div class="card-header">
          <i class="fas fa-handshake"></i>
          <h3>Claimed Items</h3>
        </div>
        <p>{{ stats.claimed_items }}</p>
      </div>
      <div class="card archived">
        <div class="card-header">
          <i class="fas fa-archive"></i>
          <h3>Archived Items</h3>
        </div>
        <p>{{ stats.archived_items }}</p>
      </div>
    </div>

    <!-- Descriptive Bar Chart -->
    <div class="stats-chart">
      <h3>Items Overview</h3>
      <ApexCharts
        type="bar"
        :options="chartOptions"
        :series="chartSeries"
        height="350"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VueApexCharts from "vue3-apexcharts";

export default {
  name: "AdminDashboard",
  components: { ApexCharts: VueApexCharts },
  data() {
    return {
      stats: {
        total_lost: 0,
        total_found: 0,
        users: 0,
        items: 0,
        pending_items: 0,
        approved_items: 0,
        claimed_items: 0,
        archived_items: 0,
      },
      chartOptions: {
        chart: { type: "bar", toolbar: { show: false } },
        plotOptions: { bar: { borderRadius: 8 } },
        dataLabels: { enabled: true },
        xaxis: {
          categories: [
            "Lost Items",
            "Found Items",
            "Pending",
            "Approved",
            "Claimed",
            "Archived",
          ],
        },
        colors: [
          "#1cc88a",
          "#17a2b8",
          "#f6c23e",
          "#36b9cc",
          "#e74a3b",
          "#858796",
        ],
        grid: { borderColor: "#e0e0e0" },
        responsive: [{ breakpoint: 768, options: { chart: { height: 300 } } }],
      },
      chartSeries: [{ name: "Items Count", data: [] }],
    };
  },
  mounted() {
    this.loadStats();
  },
  methods: {
    async loadStats() {
      try {
        const response = await axios.get("/admin/dashboard");
        this.stats = response.data.stats;

        this.chartSeries = [
          {
            name: "Items Count",
            data: [
              this.stats.total_lost,
              this.stats.total_found,
              this.stats.pending_items,
              this.stats.approved_items,
              this.stats.claimed_items,
              this.stats.archived_items,
            ],
          },
        ];
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.admin-dashboard {
  padding: 20px;
  font-family: "Inter", sans-serif;
  background: #f4f9f8;
  min-height: 100vh;
}
.title {
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #1cc88a, #17a2b8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 30px;
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}
.card {
  padding: 20px 25px;
  border-radius: 16px;
  color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.card-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 15px;
}
.card-header i {
  font-size: 1.5rem;
}
.card p {
  font-size: 1.7rem;
  font-weight: 700;
}
.card.users {
  background: linear-gradient(135deg, #1cc88a, #17a2b8);
}
.card.items {
  background: linear-gradient(135deg, #36b9cc, #4e73df);
}
.card.lost {
  background: linear-gradient(135deg, #f6c23e, #f8b739);
}
.card.found {
  background: linear-gradient(135deg, #e74a3b, #ff6b5c);
}
.card.pending {
  background: linear-gradient(135deg, #f8f9fc, #d1d3e2);
  color: #333;
}
.card.approved {
  background: linear-gradient(135deg, #1cc88a, #38d9a9);
}
.card.claimed {
  background: linear-gradient(135deg, #36b9cc, #4ea1df);
}
.card.archived {
  background: linear-gradient(135deg, #858796, #a0a0b0);
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
}
.stats-chart {
  margin: 50px 0;
  background: #fff;
  padding: 25px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(28, 200, 138, 0.05);
  width: 100%;
  max-width: 1000px;
}
.stats-chart h3 {
  margin-bottom: 15px;
  font-weight: 600;
}
</style>
