<template>
  <v-container>
    <AppBar v-if="$vuetify.breakpoint.smAndDown" title="Timetable">
      <template v-slot:icon>
        <ShareBtn />
        <v-bottom-sheet>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon size="28">
                {{ mdiDotsVertical }}
              </v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-subheader>Options</v-subheader>

            <v-list-item
              :to="{
                path: '/timetable/stats',
                query: {
                  code: courseOptions.code,
                  college: courseOptions.college,
                  sem: courseOptions.sem,
                },
              }"
            >
              <v-icon class="ml-2 mr-6 my-4" color="primary">
                {{ mdiChartBoxOutline }}
              </v-icon>
              <v-list-item-title>Timetable stats</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-bottom-sheet>
      </template>
    </AppBar>
    <v-row>
      <v-col sm="12" md="12">
        <v-row justify="center">
          <v-col cols="12" sm="12" md="10" lg="4" xl="4">
            <template v-if="timetable">
              <TimetableHeader />
              <v-row class="mt-4 mt-md-0">
                <v-col cols="12" class="text-end">
                  <v-btn-toggle
                    v-model="view"
                    mandatory
                    borderless
                    dense
                    color="primary"
                    active-class="active-view"
                  >
                    <v-btn :ripple="false">
                      <v-icon color="grey">{{ mdiFormatListBulleted }}</v-icon>
                    </v-btn>
                    <v-btn :ripple="false">
                      <v-icon color="grey">{{ mdiGrid }}</v-icon>
                    </v-btn>
                  </v-btn-toggle>
                </v-col>
              </v-row>
              <v-alert v-if="timetable.timedout" outlined dense>
                <p>
                  The IT's website seems to be
                  <span class="error--text">having issues.</span>
                </p>
                <p class="mb-0">
                  But don't worry, we salvaged
                  <span class="error--text">the last known timetable</span> for
                  your course.
                </p>
              </v-alert>
            </template>
          </v-col>
          <v-col cols="12" sm="12" md="10" lg="4" class="pt-1" xl="5">
            <template v-if="timetable && !timetable.empty">
              <v-list
                v-if="$vuetify.breakpoint.mdAndUp"
                class="px-2 pb-0"
                dense
                height="92vh"
                style="overflow-y: auto"
                color="transparent"
              >
                <CurrentClass
                  v-if="currentClass && view === 0"
                  :period="currentClass"
                  class="mb-2"
                />
                <ListTimetable v-if="view === 0" :timetable="timetable.data" />
                <GridTimetable v-else :timetable="timetable.data" />
              </v-list>
              <template v-else>
                <CurrentClass
                  v-if="currentClass && view === 0"
                  :period="currentClass"
                  class="mb-2"
                />

                <ListTimetable v-if="view === 0" :timetable="timetable.data" />
                <GridTimetable v-else :timetable="timetable.data" />
              </template>
            </template>
            <div
              v-if="isLoaded && timetable && timetable.empty"
              class="text-center mt-md-16"
            >
              <v-img
                class="mx-auto mb-6"
                max-height="250"
                max-width="250"
                :src="require('@/assets/undraw_not_found_60pq.svg')"
              ></v-img>
              <p class="grey--text">
                This timetable doesn't seem to have any classes.
              </p>
              <p class="grey--text">
                Are you sure you chose the correct course?
              </p>
              <v-btn x-large plain color="primary" :to="{ path: '/' }">
                Try another
              </v-btn>
            </div>
            <div v-if="isLoaded && !timetable" class="text-center mt-md-16">
              <v-img
                class="mx-auto mb-6"
                max-height="250"
                max-width="250"
                :src="require('@/assets/undraw_page_not_found_su7k.svg')"
              ></v-img>

              <p class="grey--text">We could not find that timetable...</p>
              <p class="grey--text">
                Are you sure you chose the correct course?
              </p>
              <v-btn x-large plain color="primary" :to="{ path: '/' }">
                Try another
              </v-btn>
            </div>
          </v-col>
          <v-col
            v-if="timetable && $vuetify.breakpoint.lgAndUp"
            cols="12"
            sm="12"
            lg="3"
            xl="3"
          >
            <v-card outlined>
              <AssignmentTracker />
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <SpeedDial v-if="$vuetify.breakpoint.smAndDown" />
  </v-container>
</template>

<script>
import {
  mdiTimetable,
  mdiDotsVertical,
  mdiFormatListBulleted,
  mdiGrid,
  mdiChartBoxOutline,
} from '@mdi/js';
import { mapActions, mapState } from 'vuex';
import ListTimetable from '@/components/shared/ListTimetable';
import GridTimetable from '@/components/shared/GridTimetable';
import TimetableHeader from '@/components/shared/TimetableHeader';
import timetableMetaInfo from '@/mixins/timetableMetaInfo';
import ShareBtn from '@/components/shared/ShareBtn';
import AssignmentTracker from '@/components/shared/AssignmentTracker';

export default {
  components: {
    AppBar: () =>
      import(/* webpackChunkName: "appbar" */ '@/components/shared/AppBar'),
    CurrentClass: () =>
      import(
        /* webpackChunkName: "currentClass" */ '@/components/shared/CurrentClass'
      ),
    SpeedDial: () =>
      import(
        /* webpackChunkName: "speeddial" */ '@/components/shared/SpeedDial'
      ),
    AssignmentTracker,
    ShareBtn,
    ListTimetable,
    GridTimetable,
    TimetableHeader,
  },
  mixins: [timetableMetaInfo],
  data() {
    return {
      isLoaded: false,
      timetable: null,
      mdiTimetable,
      mdiDotsVertical,
      mdiFormatListBulleted,
      mdiChartBoxOutline,
      mdiGrid,
      view: 0,
    };
  },
  computed: {
    ...mapState(['recentQuery', 'currentClass']),
    courseOptions() {
      return Object.keys(this.$route.query).length > 0
        ? this.$route.query
        : this.recentQuery;
    },
  },
  created() {
    this.fetchTimetable(this.courseOptions)
      .then((res) => {
        this.timetable = res;
      })
      .finally(() => {
        this.isLoaded = true;
      });
  },
  methods: {
    ...mapActions(['fetchTimetable', 'setFetching', 'setCurrentClass']),
  },
  beforeRouteLeave(to, from, next) {
    this.setFetching(false);
    this.setCurrentClass(null);
    next();
  },
};
</script>

<style scoped>
::v-deep.theme--dark.active-view > span > span,
::v-deep.theme--light.active-view > span > span {
  color: var(--v-primary-base) !important;
}
</style>
