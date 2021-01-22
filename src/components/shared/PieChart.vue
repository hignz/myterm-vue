<script>
import { Pie } from 'vue-chartjs';
import { mapState } from 'vuex';

export default {
  extends: Pie,
  props: {
    chartData: {
      type: Array,
      default: null,
    },
    chartLabels: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      colors: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(250, 116, 79, 1)',
        'rgba(33, 191, 115, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(196, 214, 176, 1)',
        'rgba(246, 71, 64, 1)',
        'rgba(66, 217, 200, 1)',
        'rgba(130, 147, 153, 1)',
      ],
    };
  },
  computed: {
    ...mapState(['darkMode']),
  },
  mounted() {
    this.renderChart(
      {
        labels: this.chartLabels,
        datasets: [
          {
            borderWidth: 2,
            backgroundColor: this.colors,
            borderColor: '#fff',
            data: this.chartData,
          },
        ],
      },
      {
        responsive: true,
        height: 200,
        maintainAspectRatio: false,
        legend: {
          labels: {
            fontColor: this.darkMode ? '#b7b9bb' : '#8e8e8e',
          },
        },
      }
    );
  },
  beforeDestroy() {
    if (this.$data._chart) {
      this.$data._chart.destroy();
    }
  },
};
</script>
