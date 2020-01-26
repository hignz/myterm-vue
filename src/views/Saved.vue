<template>
  <v-container>
    <AppBar title="Saved"></AppBar>
    <v-row justify="center">
      <v-col cols="12" sm="12" md="6">
        <v-list dense nav three-line v-if="savedCourses && savedCourses.length">
          <v-list-item-group>
            <v-list-item
              v-for="(course, index) in savedCourses"
              :key="index"
              @click="openTimetable(course)"
            >
              <v-list-item-content>
                <v-list-item-title>{{ course.title }}</v-list-item-title>
                <v-list-item-subtitle
                  >Semester:
                  {{ parseInt(course.sem, 10) + 1 }}</v-list-item-subtitle
                >
                <v-list-item-subtitle>{{
                  course.college
                }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action class="mt-0">
                <v-btn icon @click="deleteCourse(course)" @click.stop>
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <div v-else>
          <p>
            You have no saved courses.
          </p>
          <p>
            To save a course, navigate to a timetable and press the heart icon.
          </p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AppBar from '../components/AppBar';

export default {
  components: {
    AppBar
  },
  data() {
    return {
      savedCourses: null
    };
  },
  mounted() {
    this.savedCourses = JSON.parse(localStorage.getItem('savedCourses'));
    console.log(!this.savedCourses || !this.savedCourses.length);
    console.log(this.savedCourses);
  },
  methods: {
    openTimetable(course) {
      this.$router.push({
        path: '/timetable',
        query: {
          code: course.code,
          college: course.collegeIndex,
          sem: course.sem
        }
      });
    },
    deleteCourse(course) {
      this.savedCourses = this.savedCourses.filter(el => el !== course);
      localStorage.setItem('savedCourses', JSON.stringify(this.savedCourses));
    }
  }
};
</script>

<style></style>
