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
          v-if="$vuetify.breakpoint.mdAndUp"
          v-model="tab"
          background-color="transparent"
        >
          <v-tab href="#tab-1">
            Modules
          </v-tab>

          <v-tab href="#tab-2">
            Breakdown
          </v-tab>
        </v-tabs>
        <v-tabs-items v-if="!isLoading" v-model="tab">
          <v-tab-item value="tab-1">
            <v-card :class="accentedBorder" flat>
              <v-card-text>
                <p class="mb-4">
                  Per Day
                </p>
                <Sparkline
                  :values="moduleTotalsPerDay"
                  :labels="['Mon', 'Tues', 'Wed', 'Thurs', 'Fri']"
                />
                <p class="mt-8">
                  Total
                </p>

                <PieChart
                  v-if="moduleCounts"
                  :chart-data="moduleCounts"
                  :chart-labels="moduleNames"
                  :width="300"
                  :height="300"
                />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item value="tab-2">
            <ModuleTable :module-data="moduleTotals" />
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';

import AppBar from '@/components/shared/AppBar';
import ModuleTable from '@/components/shared/ModuleTable';
import PieChart from '@/components/shared/PieChart';
import Sparkline from '@/components/shared/Sparkline';
import genericMetaInfo from '@/mixins/genericMetaInfo';
import accentedBorder from '@/mixins/accentedBorder';

export default {
  components: {
    AppBar,
    Sparkline,
    ModuleTable,
    PieChart
  },
  mixins: [genericMetaInfo, accentedBorder],
  data: () => ({
    modules: [],
    tab: null,
    isLoading: false
  }),
  computed: {
    moduleTotalsPerDay() {
      return this.modules.map(el => el.length);
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
    }
  },
  created() {
    this.isLoading = true;

    const { code, college, sem } = this.$route.query;

    this.fetchTimetable({ code, college, sem })
      .then(res => {
        this.modules = res.data.slice(0, 5);
      })
      .finally(() => {
        this.isLoading = false;
      });
  },
  methods: {
    ...mapActions(['fetchTimetable'])
  }
};
</script>
