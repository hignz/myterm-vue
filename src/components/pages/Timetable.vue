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
                  sem: courseOptions.sem,
                },
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
          <v-alert v-if="timetable.timedout" outlined>
            <p>
              The IT's website seems to be
              <span class="error--text">having issues.</span>
            </p>
            <p class="mb-0">
              But don't worry, we salvaged
              <span class="error--text">the last known timetable</span> for your
              course, accurate as of
              <span class="error--text">
                {{ formatToNow(timetable.updatedAt, true) }}.</span
              >
            </p>
          </v-alert>
          <TimetableHeader />
        </template>
        <template v-if="timetable && !timetable.empty">
          <v-row>
            <v-col cols="12" class="text-end">
              <v-btn-toggle
                v-model="view"
                mandatory
                borderless
                dense
                active-class="active-view"
              >
                <v-btn>
                  <v-icon color="#848484">{{ mdiFormatListBulleted }}</v-icon>
                </v-btn>
                <v-btn>
                  <v-icon color="#848484">{{ mdiGrid }}</v-icon>
                </v-btn>
              </v-btn-toggle>
            </v-col>
          </v-row>
          <CurrentClass
            v-if="currentClass"
            :period="currentClass"
            class="mb-2"
          />
          <ListTimetable v-if="view === 0" :timetable="timetable.data" />
          <GridTimetable v-else :timetable="timetable.data" />
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
          <p class="grey--text">Are you sure you chose the correct course?</p>
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
import {
  mdiTimetable,
  mdiDotsVertical,
  mdiFormatListBulleted,
  mdiGrid,
} from '@mdi/js';
import { mapActions, mapState } from 'vuex';
import ListTimetable from '@/components/shared/ListTimetable';
import GridTimetable from '@/components/shared/GridTimetable';
import TimetableHeader from '@/components/shared/TimetableHeader';
import timetableMetaInfo from '@/mixins/timetableMetaInfo';
import ShareBtn from '@/components/shared/ShareBtn';
import { formatToNow } from '@/utils/date';
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
      formatToNow,
      mdiFormatListBulleted,
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

<style>
.active-view.theme--dark > span > span {
  color: white !important;
}
.active-view.theme--light > span > span {
  color: #505050 !important;
}

/* #app > div > main > div > div > div > div > div.row > div > div > button.v-btn.t.v-btn--active.v-btn--contained.theme--dark.v-size--default > span > span */
</style>
