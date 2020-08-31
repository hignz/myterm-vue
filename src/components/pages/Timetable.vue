<template>
  <v-container>
    <AppBar v-if="$vuetify.breakpoint.smAndDown" title="Timetable">
      <template v-slot:icon>
        <SaveBtn :is-fab="false" />
      </template>
    </AppBar>
    <v-row justify-md="center">
      <v-col sm="12" md="6" lg="6" class="pt-0 pt-md-3">
        <template v-if="timetable && !timetable.empty">
          <TimetableHeader class="mb-4" />
          <CurrentClass
            v-if="currentClass"
            :period="currentClass"
            class="mb-2"
          />
          <Timetable :timetable="timetable.data" />
        </template>

        <div
          v-if="(isLoaded && !timetable) || (timetable && timetable.empty)"
          class="text-center"
        >
          <v-icon class="my-4 grey--text" x-large>
            {{ mdiTimetable }}
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
    <SpeedDial v-if="$vuetify.breakpoint.smAndDown" />
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Timetable from '@/components/shared/Timetable';
import TimetableHeader from '@/components/shared/TimetableHeader';
import timetableMetaInfo from '@/mixins/timetableMetaInfo';
import { mdiTimetable } from '@mdi/js';

export default {
  components: {
    AppBar: () =>
      import(/* webpackChunkName: "appbar" */ '@/components/shared/AppBar'),
    CurrentClass: () =>
      import(
        /* webpackChunkName: "currentClass" */ '@/components/shared/CurrentClass'
      ),
    SaveBtn: () =>
      import(/* webpackChunkName: "saveBtn" */ '@/components/shared/SaveBtn'),
    SpeedDial: () =>
      import(
        /* webpackChunkName: "speeddial" */ '@/components/shared/SpeedDial'
      ),
    Timetable,
    TimetableHeader
  },
  mixins: [timetableMetaInfo],
  data: () => ({
    isLoaded: false,
    timetable: null,
    mdiTimetable
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
    this.setCurrentClass(null);

    this.fetchTimetable(this.courseOptions)
      .then(res => {
        this.timetable = res;
      })
      .finally(() => {
        this.isLoaded = true;
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
