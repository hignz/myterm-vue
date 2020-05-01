<template>
  <v-container fluid>
    <AppBar title="Stats" class="d-md-none">
      <v-tabs v-model="tab" centered>
        <v-tab href="#tab-1">
          Modules
        </v-tab>

        <v-tab href="#tab-2">
          Breakdown
        </v-tab>
      </v-tabs>
    </AppBar>
    <v-row justify="center" class="mt-12 mt-md-0">
      <v-col cols="12" sm="12" md="6">
        <v-tabs
          v-model="tab"
          v-if="$vuetify.breakpoint.mdAndUp"
          background-color="transparent"
        >
          <v-tab href="#tab-1">
            Modules
          </v-tab>

          <v-tab href="#tab-2">
            Breakdown
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab" v-if="loaded">
          <v-tab-item value="tab-1">
            <v-card
              v-bind:class="{
                'accented-border': accentedBorders,
                'dark-border': !accentedBorders && darkMode,
                'light-border': !accentedBorders && !darkMode
              }"
              flat
            >
              <v-card-text>
                <p class="mb-4">Per Day</p>
                <Sparkline
                  :values="moduleTotalsPerDay"
                  :labels="['Mon', 'Tues', 'Wed', 'Thurs', 'Fri']"
                />
                <p class="mt-8">Total</p>

                <PieChart
                  v-if="moduleCounts"
                  :chartData="moduleCounts"
                  :chartLabels="moduleNames"
                  :width="300"
                  :height="300"
                ></PieChart>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item value="tab-2">
            <ModuleTable
              v-bind:class="{
                'accented-border': accentedBorders,
                'dark-border': !accentedBorders && darkMode,
                'light-border': !accentedBorders && !darkMode
              }"
              :moduleData="moduleTotals"
            />
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import AppBar from '../components/AppBar';
import ModuleTable from '../components/ModuleTable';
import PieChart from '../components/PieChart';
import Sparkline from '../components/Sparkline';

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
    ...mapState(['accentedBorders', 'darkMode']),
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
/* .accented-border {
  border: 0.5px solid var(--v-primary-base);
} */
</style>
