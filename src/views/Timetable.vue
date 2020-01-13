<template>
  <!-- TODO -->
  <!-- BREAKS -->
  <v-container v-if="timetable">
    <v-row no-gutters justify="center">
      <v-col sm="12" md="5">
        <AppBar title="Timetable" v-if="!isLoading">
          <template v-slot:icon>
            <v-btn icon @click="saveTimetable">
              <v-icon :color="heartIconColor">{{
                isSaved ? 'mdi-heart' : 'mdi-heart-outline'
              }}</v-icon>
            </v-btn>
          </template>
        </AppBar>

        <v-card class="accented-border">
          <v-card-title class="body-2 justify-center text-center">{{
            timetable.title
          }}</v-card-title>
          <v-card-text class="text-center pb-2">
            <v-chip pill class="mr-2">
              <v-icon left color="primary">mdi-school</v-icon>
              {{ timetable.college }}</v-chip
            >
            <v-chip pill @click="switchSemester"
              >Semester
              <v-avatar right color="primary">
                {{ parseInt(timetable.semester) + 1 }}
              </v-avatar>
            </v-chip>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" text>
              <v-icon left>mdi-share-variant</v-icon>
              Share
            </v-btn>
            <v-spacer />
            <v-btn color="primary" text @click="openStats">
              <v-icon left>mdi-chart-pie</v-icon>
              Stats
            </v-btn>
          </v-card-actions>
        </v-card>
        <Timetable :timetable="timetable.data"></Timetable>
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
    savedCourses: null
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
    ...mapActions(['fetchTimetable', 'setLastTimetableVisited']),
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
    }
  },
  computed: {
    ...mapState(['lastTimetableVisited']),
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
      return this.isSaved ? 'primary' : 'white';
    },
    courseOptions() {
      return Object.keys(this.$route.query).length > 0
        ? this.$route.query
        : JSON.parse(this.lastTimetableVisited);
    }
  }
};
</script>

<style scoped>
.accented-border {
  border: 0.5px solid var(--v-primary-base);
}
</style>
