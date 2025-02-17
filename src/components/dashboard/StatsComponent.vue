<template>
  <div class="container mt-5">
    <Loading v-model:active="isLoading" :can-cancel="false" :is-full-page="true" />

    <h3 class="text-center mb-5 text-muted">Clients</h3>
    <div class="device-health">
      <div class="row g-4">
        <!-- Card Component -->
        <div v-for="(item, index) in devices" :key="index" class="col-12 col-md-3">
          <div class="status-card shadow">
            <div class="status-card-body">
              <h6 class="status-title">{{ item.title }}</h6>
              <h2 class="status-value">
                <span class="text-primary">{{ item.current }}</span><span v-if="item.total">/{{ item.total }}</span>
              </h2>
              <!-- Uncomment if health/status is needed -->
              <p class="status-text" :class="item.trendClass" v-if="item.trend">
                {{ getTrendWord(item.trend) }}
              </p>
              <!--span :class="`badge ${item.badgeClass}`">{{ item.status }}</span-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Loading from 'vue-loading-overlay' // Import Loading component

@Options({
  components: {
    Loading
  }
})
export default class StatsComponent extends Vue {
  devices: Array<{ title: string; current: number; total: number; health?: string; trend?: string; trendClass?: string; badgeClass?: string }> = [];
  isLoading = false; // Loading state

  // Fetch data from the API when the component is mounted
  async mounted () {
    this.isLoading = true // Set loading state to true while fetching data
    try {
      const response = await fetch('https://tri-m.app/ecabinet/stats.php')
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const data = await response.json()

      // Populate the devices array using the fetched data
      this.devices = [
        {
          title: '24-Hour Client Total',
          current: data.totalStationsLast24, // Example: active APs treated as active clients
          total: 0 // Total stations/clients
        },
        {
          title: 'Active Access Points with Connected Clients (%)',
          current: data.activeMacPercentage,
          total: 100, // Represented as a percentage out of 100
          trend: data.activeMacTrend, // Include the trend
          trendClass: this.getTrendClass(data.activeMacTrend)
        },
        {
          title: 'Max Clients per Access Points',
          current: data.maxStations,
          total: 0 // Total max stations is itself
        },
        {
          title: 'Active Access Points',
          current: 255, // Example: active APs treated as active clients
          total: 307 // Total stations/clients
        }
      ]
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      this.isLoading = false // Set loading state to false when done
    }
  }

  getTrendClass (trend: string): string {
    switch (trend) {
      case 'down':
        return 'text-success' // Green for decreasing usage
      case 'up':
        return 'text-danger' // Red for increasing usage
      case 'unchanged':
      default:
        return 'text-secondary' // Grey for stable usage
    }
  }

  getTrendWord (trend: string): string {
    switch (trend) {
      case 'down':
        return 'Decreasing' // Favorable trend
      case 'up':
        return 'Increasing' // Unfavorable trend
      case 'unchanged':
      default:
        return 'Stable' // Neutral trend
    }
  }
}
</script>

<style scoped>
/* General Layout */
.container {
  max-width: 1200px;
  margin: auto;
}

.text-muted {
  font-weight: 300;
  color: #6c757d;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Modify your existing .status-card class */
.status-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%; /* Add this line */
}

.status-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

/* Modify your existing .status-card-body class */
.status-card-body {
  padding: 2rem 1.5rem;
  text-align: center;
  display: flex; /* Add this line */
  flex-direction: column; /* Add this line */
  height: 100%; /* Add this line */
  justify-content: center; /* Add this line */
}

.status-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-transform: capitalize;
}

.status-value {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.status-text {
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 0.75rem;
}

.badge {
  font-size: 0.75rem;
  padding: 0.4rem 0.6rem;
  border-radius: 12px;
}

/* Status-specific Styles */
.badge-danger {
  background: #ff4d4f;
  color: white;
}

.badge-success {
  background: #52c41a;
  color: white;
}

.badge-warning {
  background: #faad14;
  color: black;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .status-card-body {
    padding: 1.5rem;
  }

  .status-value {
    font-size: 1.75rem;
  }
}
</style>
