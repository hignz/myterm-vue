<template>
  <div>
    <AppBar title="Stats" class="d-md-none">
      <v-tabs v-model="tab" centered icons-and-text>
        <v-tab href="#tab-1">
          Data
          <v-icon>mdi-chart-line-variant</v-icon>
        </v-tab>

        <v-tab href="#tab-2">
          Breakdown
          <v-icon>mdi-table</v-icon>
        </v-tab>
      </v-tabs>
    </AppBar>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" sm="12" md="6">
          <v-tabs-items v-model="tab" v-if="loaded">
            <v-tab-item value="tab-1">
              <v-card
                flat
                v-bind:class="{
                  'accented-border': accentedBorders
                }"
              >
                <v-card-subtitle>Modules per day</v-card-subtitle>
                <v-card-text>
                  <Sparkline
                    :values="moduleTotalsPerDay"
                    :labels="['Mon', 'Tues', 'Wed', 'Thurs', 'Fri']"
                  />
                  <p class="mt-8">Total modules</p>

                  <PieChart
                    v-if="moduleCounts"
                    :chartData="moduleCounts"
                    :chartLabels="moduleNames"
                  ></PieChart>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item value="tab-2">
              <ModuleTable
                v-bind:class="{
                  'accented-border': accentedBorders
                }"
                :moduleData="moduleTotals"
              />
            </v-tab-item>
          </v-tabs-items>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import AppBar from '../components/AppBar';
import Sparkline from '../components/Sparkline';
import ModuleTable from '../components/ModuleTable';
import PieChart from '../components/PieChart';

export default {
  components: { AppBar, Sparkline, ModuleTable, PieChart },

  data() {
    return {
      timetable: null,
      modules: [],
      tab: null,
      loaded: false
    };
  },
  created() {
    const { code, college, sem } = this.$route.query;

    this.fetchTimetable({ code, collegeIndex: college, semester: sem })
      .then(res => {
        this.timetable = res;
        this.modules = res.data.slice(0, 5);
        this.loaded = true;
      })
      .catch(() => {})
      .finally(() => (this.isLoading = false));
  },
  methods: {
    ...mapActions(['fetchTimetable'])
  },
  computed: {
    ...mapState(['accentedBorders']),
    moduleTotalsPerDay() {
      return this.modules.map(el => el.length);
    },
    moduleDays() {
      return this.modules
        .map(el => {
          return [...new Set(el.map(e => e.day.substring(0, 3)))];
        })
        .flat();
    },
    moduleTotals() {
      const arr = [
        ...new Set(
          this.modules
            .flat()
            .filter(e => !e.break)
            .map(el => el.name)
        )
      ];

      return arr
        .map(el => ({
          name: el,
          count: this.modules.flat().filter(elm => elm.name === el).length
        }))
        .sort((a, b) => b.count - a.count);
    },
    moduleCounts() {
      return this.moduleTotals.map(el => el.count);
    },
    moduleNames() {
      return this.moduleTotals.map(el => el.name);
    },
    nineOClockStarts() {
      return this.modules.flat().filter(el => el.startTime === '9:00').length;
    }
  }
};
</script>

<style scoped>
.accented-border {
  border: 0.5px solid var(--v-primary-base);
}
</style>
