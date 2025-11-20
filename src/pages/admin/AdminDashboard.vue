<template>
  <div class="admin-dashboard">
    <navbarAdmin />

    <h1 class="title">Admin Panel</h1>

    <!-- Overview Cards -->
    <div class="stats-grid">
      <div class="card">
        <h3>Total Users</h3>
        <p>{{ stats.users }}</p>
      </div>

      <div class="card">
        <h3>Total Items</h3>
        <p>{{ stats.items }}</p>
      </div>

      <div class="card">
        <h3>Total Lost Items</h3>
        <p>{{ stats.total_lost }}</p>
      </div>

      <div class="card">
        <h3>Total Found Items</h3>
        <p>{{ stats.total_found }}</p>
      </div>

      <div class="card">
        <h3>Pending Items</h3>
        <p>{{ stats.pending_items }}</p>
      </div>

      <div class="card">
        <h3>Approved Items</h3>
        <p>{{ stats.approved_items }}</p>
      </div>

      <div class="card">
        <h3>Claimed Items</h3>
        <p>{{ stats.claimed_items }}</p>
      </div>

      <div class="card">
        <h3>Archived Items</h3>
        <p>{{ stats.archived_items }}</p>
      </div>

      <!-- <div class="card">
        <h3>Total Categories</h3>
        <p>{{ stats.categories }}</p>
      </div>

      <div class="card">
        <h3>Total Logs</h3>
        <p>{{ stats.logs }}</p>
      </div> -->
    </div>

    <!-- Recent Logs -->
    <!-- <h2>Latest Activity</h2> -->
    <!-- <ul class="log-list">
      <li v-for="log in recentLogs" :key="log.id">
        {{ log.action }} — {{ log.created_at }}
      </li>
    </ul> -->

    <div class="stats-chart">
      <ApexCharts
        type="line"
        :options="chartOptions"
        :series="chartSeries"
        width="400"
      >
      </ApexCharts>
    </div>
  </div>
</template>

<script>
import navbarAdmin from "@/components/navbarAdmin.vue";
import axios from "axios";
import VueApexCharts from "vue3-apexcharts";

export default {
  name: "AdminDashboard",
  components: { navbarAdmin, ApexCharts: VueApexCharts },

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

      // chartOptions:{
      //   chart:{
      //     type:'pie',
      //   },

      //   labels: ['Lost Items', 'Found Items'],
      //    responsive: [{
      //     breakpoint: 480,
      //     options: {
      //       chart: {
      //         width: 300
      //       },
      //       legend: {
      //         position: 'bottom'
      //       }
      //     }
      //   }]
      // },

      chartOptions: {
        chart: { type: "line" },
        xaxis: {
          categories: ["Lost Items", "Found_Items"],
        },

        responsive: [
          {
            breakpoint: 480,
            options: { chart: { width: 300 }, legend: { position: "bottom" } },
          },
        ],
      },

      //  chartSeries: [], PIE

      chartSeries: [
        {
          name: "Items",
          data: [], // will be filled in mounted()
        },
      ],
    };
  },

  mounted() {
    this.loadStats();
    // this.loadRecentLogs()
  },

  methods: {
    async loadStats() {
      try {
        const response = await axios.get("/admin/dashboard");

        this.stats = response.data.stats;
        //  this.chartSeries = [this.stats.total_lost, this.stats.total_found]; PIE
        this.chartSeries = [
          {
            name: "Items",
            data: [this.stats.total_lost, this.stats.total_found],
          },
        ];
      } catch (error) {
        console.error(error);
        alert("Error fetching stats");
      }
    },

    // async loadRecentLogs() {
    //   const response = await axios.get('/api/admin/recent-logs')
    //   this.recentLogs = response.data
    // }
  },
};
</script>

<style scoped>
.stats-chart {
  margin: 40px 0;
  display: flex;
  justify-content: center;
}

.admin-dashboard {
  padding: 80px 40px;
}

.title {
  margin-bottom: 20px;
}

/* Cards */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.card {
  background: #f8f9fc;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* Buttons */
.admin-actions {
  display: flex;
  gap: 15px;
  margin-top: 10px;
  margin-bottom: 30px;
}

.btn {
  background-color: #1cc88a;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

.btn:hover {
  background-color: #17a673;
}

/* Logs */
.log-list {
  list-style: none;
  padding: 0;
}

.log-list li {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
</style>
