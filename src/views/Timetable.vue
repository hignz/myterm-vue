<template>
  <v-container>
    <AppBar title="Timetable" class="d-md-none">
      <template v-slot:icon>
        <v-btn
          icon
          @click="saveTimetable"
          v-bind:class="{ 'animated heartBeat': isSaved }"
        >
          <v-icon :color="heartIconColor">{{
            isSaved ? 'mdi-heart' : 'mdi-heart-outline'
          }}</v-icon>
        </v-btn>
      </template>
    </AppBar>
    <v-row justify="center" v-if="!isLoading">
      <v-col sm="12" md="6" lg="5">
        <v-card
          v-if="timetable"
          class="mb-4"
          v-bind:class="{
            'accented-border': accentedBorders,
            'dark-border': !accentedBorders && darkMode,
            'light-border': !accentedBorders && !darkMode
          }"
          flat
        >
          <v-card-title
            style="word-break: keep-all;"
            class="subtitle-1 justify-center text-center"
            >{{ timetable.title }}</v-card-title
          >
          <v-card-text class="text-center pb-2">
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-chip class="mr-2" outlined v-on="on">
                  <v-icon left color="primary">mdi-school</v-icon>
                  {{ timetable.college }}</v-chip
                >
              </template>
              <v-list dense>
                <v-list-item
                  v-for="(link, index) in links[courseOptions.college]"
                  :key="index"
                  @click="openLink(link.url)"
                >
                  <v-list-item-title>{{ link.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <v-chip @click="switchSemester" outlined class="py-1 my-1">
              <span>Semester</span>
              <v-avatar right light>
                <span class="primary--text">{{
                  parseInt(timetable.semester) + 1
                }}</span>
              </v-avatar>
            </v-chip>
          </v-card-text>
          <v-card-actions class="mt-4">
            <v-btn
              color="primary"
              text
              @click="openShareMenu()"
              v-if="canUseNavigator"
            >
              <v-icon left>mdi-share-variant</v-icon>
              Share
            </v-btn>

            <v-btn color="primary" text @click="copyUrlToClipboard()" v-else>
              <v-icon left>mdi-share-variant</v-icon>
              Share
            </v-btn>
            <v-spacer />

            <v-btn
              icon
              @click="saveTimetable"
              class="d-none d-md-flex"
              v-bind:class="{ 'animated heartBeat': isSaved }"
            >
              <v-icon :color="heartIconColor">{{
                isSaved ? 'mdi-heart' : 'mdi-heart-outline'
              }}</v-icon>
            </v-btn>

            <v-spacer />
            <v-btn color="primary" text @click="openStats">
              <v-icon left>mdi-chart-pie</v-icon>
              Stats
            </v-btn>
          </v-card-actions>
        </v-card>
        <Timetable
          v-if="timetable && !timetable.empty"
          :timetable="timetable.data"
        ></Timetable>

        <div class="text-center" v-else>
          <v-icon class="my-4 grey--text" x-large>mdi-timetable</v-icon>
          <p class="grey--text">
            This timetable doesn't seem to have any classes.
          </p>
          <p class="grey--text">Are you sure you chose the correct course?</p>
          <v-btn x-large color="primary" text :to="{ path: '/' }"
            >Try again</v-btn
          >
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import AppBar from '../components/AppBar';
import Timetable from '../components/Timetable';

export default {
  components: { AppBar, Timetable },
  data: () => ({
    isLoading: false,
    timetable: null,
    courseData: null,
    savedCourses: null,
    links: [
      [
        {
          title: 'Email',
          url: 'http://outlook.com/mail.itsligo.ie'
        },
        {
          title: 'Moodle',
          url: 'https://vle.itsligo.ie/my/index.php'
        },
        {
          title: 'Room booking',
          url: 'https://libreserve.itsligo.ie/'
        },
        {
          title: 'Virtual desktop',
          url: 'https://vdesktop.itsligo.ie/Citrix/SligoWeb/'
        },
        {
          title: 'Library',
          url: 'https://library.itsligo.ie/'
        }
      ],
      [],
      [
        {
          title: 'Moodle',
          url: 'https://moodle.lit.ie/'
        }
      ]
    ]
  }),
  created() {
    this.isLoading = true;

    const { code, college, sem } = this.courseOptions;

    this.setLastTimetableVisited(JSON.stringify({ code, college, sem }));

    this.fetchTimetable({ code, collegeIndex: college, semester: sem })
      .then(res => {
        this.courseData = {
          title: res.title,
          code,
          collegeIndex: college,
          sem: res.semester,
          college: res.college
        };
        this.timetable = res;

        this.savedCourses = JSON.parse(localStorage.getItem('savedCourses'));
      })
      .catch(() => {})
      .finally(() => (this.isLoading = false));
  },
  methods: {
    ...mapActions(['fetchTimetable', 'setLastTimetableVisited', 'isDark']),
    openStats() {
      this.$router.push({
        path: '/stats',
        query: this.courseOptions
      });
    },
    saveTimetable() {
      if (this.savedCourses === null) {
        this.savedCourses = [];
      }

      if (this.isSaved) {
        this.savedCourses = this.savedCourses.filter(
          el =>
            !(
              el.title === this.courseData.title &&
              el.sem === this.courseData.sem
            )
        );
      } else {
        this.savedCourses.push(this.courseData);
      }

      localStorage.setItem('savedCourses', JSON.stringify(this.savedCourses));
    },
    switchSemester() {
      const newSemester = this.courseData.sem === '0' ? '1' : '0';

      this.$router.push({
        path: '/timetable',
        query: {
          code: this.courseData.code,
          college: this.courseData.collegeIndex,
          sem: newSemester
        }
      });
    },
    openShareMenu() {
      if (navigator.share) {
        navigator.share({
          title: 'MyTerm',
          text: 'Your timetable at a glance.',
          url: this.timetableUrl
        });
      }
    },
    openLink(link) {
      window.open(link);
    },
    copyUrlToClipboard() {
      navigator.clipboard.writeText(this.timetableUrl).then(() => {
        this.$toast.success('URL copied to clipbaord!', {
          timeout: 2000,
          position: 'bottom-center'
        });
      });
    }
  },
  computed: {
    ...mapState(['lastTimetableVisited', 'accentedBorders', 'darkMode']),
    canUseNavigator() {
      return navigator.share;
    },
    filteredTimetable() {
      return this.timetable.data.filter(el => el.length);
    },
    isSaved() {
      if (this.savedCourses === null) return false;

      return (
        this.savedCourses.filter(
          el =>
            el.title === this.courseData.title && el.sem === this.courseData.sem
        ).length > 0
      );
    },
    heartIconColor() {
      if (!this.darkMode) {
        return this.isSaved ? 'primary' : '#666666';
      }
      return this.isSaved ? 'primary' : 'white';
    },
    courseOptions() {
      return Object.keys(this.$route.query).length > 0
        ? this.$route.query
        : JSON.parse(this.lastTimetableVisited);
    },
    timetableUrl() {
      return `https://myterm.me/timetable?code=${decodeURIComponent(
        this.courseOptions.code
      )}&college=${this.courseOptions.college}`;
    }
  }
};
</script>
