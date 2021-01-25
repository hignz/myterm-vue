<template>
  <v-container>
    <AppBar v-if="$vuetify.breakpoint.smAndDown" title="More"></AppBar>
    <v-tabs
      v-model="tab"
      background-color="transparent"
      centered
      :grow="$vuetify.breakpoint.smAndDown"
    >
      <v-tab href="#tab-1">Additional Info</v-tab>
      <v-tab href="#tab-2">Breakdown</v-tab>
    </v-tabs>
    <v-tabs-items v-if="!isLoading" v-model="tab">
      <v-tab-item value="tab-1" :transition="false" :reverse-transition="false">
        <v-row justify="center">
          <v-col cols="12" sm="12" md="8" lg="8" xl="6">
            <v-card
              class="mt-2"
              :class="{ 'box-shadow': !darkMode }"
              :outlined="darkMode"
            >
              <v-card-text>
                <v-row justify="center">
                  <v-col cols="12" sm="12" md="6">
                    <p class="mb-1 font-weight-bold">
                      {{ timetable.title }}
                    </p>
                    <p class="mb-1 font-weight-medium"></p>
                    <p class="caption mb-1 font-weight-medium">
                      {{ timetable.courseCode }}
                    </p>
                    <p class="caption mb-1 font-weight-medium">
                      Semester {{ parseInt(timetable.semester, 10) + 1 }}
                    </p>
                    <p class="caption font-weight-medium">
                      9AM Starts: {{ nineAmStarts }}
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
                  plain
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
          <v-col cols="12" sm="12" md="4" lg="4" xl="3">
            <v-card :class="{ 'box-shadow': !darkMode }" :outlined="darkMode">
              <v-card-text>
                <p class="caption font-weight-bold">ALL CLASSES</p>
                <PieChart
                  v-if="moduleCounts"
                  :chart-data="moduleCounts"
                  :chart-labels="moduleNames"
                />
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="12" md="4" lg="4" xl="3">
            <v-card
              :class="{ 'box-shadow': !darkMode }"
              :outlined="darkMode"
              height="100%"
            >
              <v-card-text>
                <p class="caption font-weight-medium">
                  TIMETABLE CHANGE HISTORY
                </p>
                <v-img
                  class="mx-auto"
                  max-height="250"
                  max-width="250"
                  :src="require('@/assets/undraw_under_construction_46pa.svg')"
                >
                </v-img>
              </v-card-text>
              <v-data-table :items="[]" no-data-text="No changes found" />
            </v-card>
          </v-col>
        </v-row>
      </v-tab-item>
      <v-row justify="center">
        <v-col cols="12" sm="12" md="8" lg="8" xl="6" class="my-2">
          <v-tab-item
            value="tab-2"
            :transition="false"
            :reverse-transition="false"
          >
            <ModuleTable :modules="moduleTotals" />
          </v-tab-item>
        </v-col>
      </v-row>
    </v-tabs-items>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import AppBar from '@/components/shared/AppBar';
import ModuleTable from '@/components/shared/ModuleTable';
import PieChart from '@/components/shared/PieChart';
import Sparkline from '@/components/shared/Sparkline';
import genericMetaInfo from '@/mixins/genericMetaInfo';
import { openBlank } from '@/utils/link';

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
      timetable: {},
      tab: null,
      isLoading: false,
      nineAmStarts: 0,
      openBlank,
    };
  },
  computed: {
    ...mapState(['showWeekends', 'darkMode']),
    ...mapGetters(['getTimetableByWeekdays']),
    moduleTotalsPerDay() {
      return this.getTimetableByWeekdays.map((el) => el.length);
    },
    moduleTotals() {
      const arr = [
        ...new Set(
          this.getTimetableByWeekdays
            .flat()
            .filter((e) => !e.break)
            .map((el) => el.name || el.activity)
        ),
      ];

      return arr
        .map((el) => ({
          name: el,
          count: this.getTimetableByWeekdays
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

        this.nineAmStarts = this.getNineAmStarts();
      })
      .finally(() => {
        this.isLoading = false;
      });
  },
  methods: {
    ...mapActions(['fetchTimetable']),
    openOfficialTimetable() {
      this.openBlank(this.timetable.url);
    },
    getNineAmStarts() {
      let nineAmStarts = 0;

      for (let index = 0; index < this.getTimetableByWeekdays.length; index++) {
        const day = this.getTimetableByWeekdays[index];
        if (day.length && day[0].startTime === '9:00') {
          nineAmStarts += 1;
        }
      }

      return nineAmStarts;
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
