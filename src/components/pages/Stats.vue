<template>
  <v-container fluid>
    <AppBar v-if="$vuetify.breakpoint.smAndDown" title="More"></AppBar>
    <v-tabs v-model="tab" background-color="transparent" centered>
      <v-tab href="#tab-1">ADDITIONAL INFO</v-tab>
      <v-tab href="#tab-2">Breakdown</v-tab>
    </v-tabs>
    <v-tabs-items v-if="!isLoading" v-model="tab">
      <v-tab-item value="tab-1" :transition="false" :reverse-transition="false">
        <v-row justify="center">
          <v-col cols="12" sm="12" md="6">
            <v-card outlined>
              <v-card-text class="font-weight-black">
                <v-row>
                  <v-col cols="12" sm="12" md="6">
                    <p class="font-weight-black mb-2">
                      {{ timetable.title }}
                    </p>
                    <p class="caption font-weight-black mb-3">
                      {{ timetable.courseCode }}
                    </p>
                    <p class="caption font-weight-black">
                      Semester {{ parseInt(timetable.semester, 10) + 1 }}
                    </p>
                  </v-col>
                  <v-col sm="12" md="6">
                    <Sparkline
                      :values="moduleTotalsPerDay"
                      :labels="[
                        'Mon',
                        'Tues',
                        'Wed',
                        'Thurs',
                        'Fri',
                        'Sat',
                        'Sun',
                      ]"
                    />
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  outlined
                  color="primary"
                  small
                  @click="openOfficialTimetable()"
                  >Official link</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" sm="12" md="3">
            <v-card outlined flat>
              <v-card-text>
                <p class="caption font-weight-black">ALL CLASSES</p>
                <PieChart
                  v-if="moduleCounts"
                  :chart-data="moduleCounts"
                  :chart-labels="moduleNames"
                />
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="12" md="3">
            <v-card outlined height="100%">
              <v-card-text>
                <p class="caption font-weight-black">
                  TIMETABLE CHANGE HISTORY
                </p>
              </v-card-text>
              <v-img
                class="mx-auto"
                max-height="250"
                max-width="250"
                :src="require('@/assets/undraw_under_construction_46pa.svg')"
              ></v-img>
              <v-data-table :items="[]" no-data-text="No changes found" />
            </v-card>
          </v-col>
        </v-row>
      </v-tab-item>
      <v-row justify="center">
        <v-col cols="12" sm="12" md="6">
          <v-tab-item
            value="tab-2"
            :transition="false"
            :reverse-transition="false"
          >
            <ModuleTable :module-data="moduleTotals" />
          </v-tab-item>
        </v-col>
      </v-row>
    </v-tabs-items>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import AppBar from '@/components/shared/AppBar';
import ModuleTable from '@/components/shared/ModuleTable';
import PieChart from '@/components/shared/PieChart';
import Sparkline from '@/components/shared/Sparkline';
import genericMetaInfo from '@/mixins/genericMetaInfo';

export default {
  components: {
    AppBar,
    Sparkline,
    ModuleTable,
    PieChart,
  },
  mixins: [genericMetaInfo],
  data() {
    return {
      modules: [],
      timetable: {},
      tab: null,
      isLoading: false,
    };
  },
  computed: {
    ...mapState(['showWeekends']),
    moduleTotalsPerDay() {
      return this.modules.map((el) => el.length);
    },
    moduleTotals() {
      const arr = [
        ...new Set(
          this.modules
            .flat()
            .filter((e) => !e.break)
            .map((el) => el.name || el.activity)
        ),
      ];

      return arr
        .map((el) => ({
          name: el,
          count: this.modules
            .flat()
            .filter((elm) => elm.name === el || elm.activity === el).length,
        }))
        .sort((a, b) => b.count - a.count);
    },
    moduleCounts() {
      return this.moduleTotals.map((el) => el.count);
    },
    moduleNames() {
      return this.moduleTotals.map((el) => el.name);
    },
  },
  created() {
    this.isLoading = true;

    const { code, college, sem } = this.$route.query;

    this.fetchTimetable({ code, college, sem })
      .then((res) => {
        this.timetable = res;
        this.modules = this.showWeekends ? res.data : res.data.slice(0, 5);
      })
      .finally(() => {
        this.isLoading = false;
      });
  },
  methods: {
    ...mapActions(['fetchTimetable']),
    openOfficialTimetable() {
      window.open(this.timetable.url, '_blank', 'noopener,noreferrer');
    },
  },
};
</script>

<style>
.theme--dark.v-tabs .v-tab--active:hover::before,
.theme--dark.v-tabs .v-tab--active::before {
  opacity: 0 !important;
}

.theme--dark.v-tabs .v-tab:hover::before {
  opacity: 0 !important;
}

.theme--dark.v-tabs-items,
.theme--light.v-tabs-items {
  background-color: transparent !important;
}
</style>
