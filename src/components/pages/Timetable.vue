<template>
  <div>
    <v-container>
      <AppBar title="Timetable" class="d-md-none">
        <template v-slot:icon>
          <SaveBtn :is-fab="false" />
        </template>
      </AppBar>
      <v-row v-if="!isLoading" justify="center">
        <v-col sm="12" md="6" lg="5">
          <TimetableHeader />
          <CurrentClass
            v-if="currentClass"
            :period="currentClass"
            class="mb-2"
          />
          <Timetable
            v-if="timetable && !timetable.empty"
            :timetable="timetable.data"
          />

          <div v-else class="text-center">
            <v-icon class="my-4 grey--text" x-large>
              mdi-timetable
            </v-icon>
            <p class="grey--text">
              This timetable doesn't seem to have any classes.
            </p>
            <p class="grey--text">
              Are you sure you chose the correct course?
            </p>
            <v-btn x-large color="primary" text :to="{ path: '/' }">
              Try again
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <SpeedDial @onBottomSheetClick="sheet = true" />
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import AppBar from '@/components/shared/AppBar';
import CurrentClass from '@/components/shared/CurrentClass';
import SaveBtn from '@/components/shared/SaveBtn';
import SpeedDial from '@/components/shared/SpeedDial';
import Timetable from '@/components/shared/Timetable';
import TimetableHeader from '@/components/shared/TimetableHeader';
import timetableMetaInfo from '@/mixins/timetableMetaInfo';

export default {
  components: {
    AppBar,
    CurrentClass,
    SaveBtn,
    SpeedDial,
    Timetable,
    TimetableHeader
  },
  mixins: [timetableMetaInfo],
  data: () => ({
    isLoading: false,
    timetable: null
  }),
  computed: {
    ...mapState(['recentQuery', 'currentClass']),
    courseOptions() {
      return Object.keys(this.$route.query).length > 0
        ? this.$route.query
        : this.recentQuery;
    }
  },
  created() {
    this.isLoading = true;

    this.fetchTimetable(this.courseOptions)
      .then(res => {
        this.timetable = res;
      })
      .finally(() => {
        this.isLoading = false;
      });
  },
  methods: {
    ...mapActions(['fetchTimetable', 'setFetching', 'setCurrentClass'])
  },
  beforeRouteLeave(to, from, next) {
    this.setFetching(false);
    this.setCurrentClass(null);
    next();
  }
};
</script>

<style>
.v-btn:not(.v-btn--text):not(.v-btn--outlined):hover:before {
  opacity: 0 !important;
}
</style>
