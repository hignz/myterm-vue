<script>
import { Pie } from 'vue-chartjs';

export default {
  extends: Pie,
  props: {
    chartData: {
      type: Array,
      default: null
    },
    chartLabels: {
      type: Array,
      default: null
    }
  },
  mounted() {
    this.renderChart(
      {
        labels: this.chartLabels,
        datasets: [
          {
            label: 'Skills',
            borderWidth: 1,
            backgroundColor: [
              'rgba(255, 99, 132, 0.8)',
              'rgba(54, 162, 235, 0.8)',
              'rgba(255, 206, 86, 0.8)',
              'rgba(75, 192, 192, 0.8)',
              'rgba(153, 102, 255, 0.8)',
              'rgba(255, 159, 64, 0.8)',
              'rgba(50, 180, 64, 0.8)'
            ],
            data: this.chartData
          }
        ]
      },
      {
        responsive: true,
        maintainAspectRatio: false
      }
    );
  }
};
</script>

<style></style>
