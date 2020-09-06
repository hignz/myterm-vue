<template>
  <v-container>
    <AppBar v-if="$vuetify.breakpoint.smAndDown" title="Timetable">
      <template v-slot:icon>
        <ShareBtn />
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon size="28">
                {{ mdiDotsVertical }}
              </v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item
              :to="{
                path: '/timetable/stats',
                query: {
                  code: courseOptions.code,
                  college: courseOptions.college,
                  sem: courseOptions.sem
                }
              }"
              >More</v-list-item
            >
          </v-list>
        </v-menu>
      </template>
    </AppBar>
    <v-row justify-md="center">
      <v-col sm="12" md="6" lg="6" class="pt-0 pt-md-3">
        <template v-if="timetable">
          <v-alert v-if="timetable.timedout" outlined
            >The IT's website seems to be
            <span class="warning--text">having issues.</span> But don't worry,
            we scalvaged
            <span class="warning--text">the last known timetable</span> for your
            course, accurate as of
            <span class="warning--text">
              {{ formatToNow(timetable.updatedAt, true) }}.</span
            >
          </v-alert>
          <TimetableHeader class="mb-4" />
        </template>
        <template v-if="timetable && !timetable.empty">
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
import { mdiTimetable, mdiDotsVertical } from '@mdi/js';
import ShareBtn from '../shared/ShareBtn';
import { formatToNow } from '@/utils/dateFormatter';
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
    ShareBtn,
    Timetable,
    TimetableHeader
  },
  mixins: [timetableMetaInfo],
  data() {
    return {
      isLoaded: false,
      timetable: null,
      mdiTimetable,
      mdiDotsVertical,
      formatToNow
    };
  },
  computed: {
    ...mapState(['recentQuery', 'currentClass']),
    courseOptions() {
      return Object.keys(this.$route.query).length > 0
        ? this.$route.query
        : this.recentQuery;
    }
  },
  created() {
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
