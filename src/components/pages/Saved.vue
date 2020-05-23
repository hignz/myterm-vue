<template>
  <v-container>
    <AppBar title="Saved" />
    <v-row justify="center">
      <v-col
        v-if="savedCourses && savedCourses.length"
        cols="12"
        sm="12"
        md="6"
      >
        <v-card :class="accentedBorder" flat>
          <v-list nav three-line dense>
            <v-subheader>COURSES</v-subheader>
            <v-list-item
              v-for="(course, index) in savedCourses"
              :key="index"
              @click="openTimetable(course)"
            >
              <v-list-item-content>
                <v-list-item-title>{{ course.title }}</v-list-item-title>
                <v-list-item-subtitle>
                  Semester:
                  {{ parseInt(course.sem, 10) + 1 }}
                </v-list-item-subtitle>
                <v-list-item-subtitle class="overline mt-1">
                  {{ course.college }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action class="mt-1">
                <v-btn icon @click="openDeleteDialog(course)" @click.stop>
                  <v-icon small>
                    mdi-delete
                  </v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col v-else class="text-center mt-4" cols="12" sm="12" md="6">
        <v-icon class="mb-4 grey--text" size="50">
          mdi-heart-broken
        </v-icon>
        <p class="grey--text">
          You have no saved courses.
        </p>
        <p class="grey--text">
          To save a course, navigate to a timetable and press the heart icon.
        </p>
      </v-col>
    </v-row>
    <v-dialog v-model="showDialog" :width="400">
      <v-card>
        <v-card-title>Remove course</v-card-title>
        <v-card-text>
          Are you sure you?
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="showDialog = !showDialog">
            Close
          </v-btn>
          <v-btn color="error" @click="deleteCourse()">
            Remove
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import AppBar from '@/components/shared/AppBar';
import genericMetaInfo from '@/mixins/genericMetaInfo';
import accentedBorder from '@/mixins/accentedBorder';
import { mapState, mapActions } from 'vuex';

export default {
  components: {
    AppBar
  },
  mixins: [accentedBorder, genericMetaInfo],
  data: () => ({
    showDialog: false,
    selectedCourse: null
  }),
  computed: {
    ...mapState(['savedCourses'])
  },
  methods: {
    ...mapActions(['removeTimetable']),
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
    deleteCourse() {
      this.removeTimetable(this.selectedCourse);

      this.showDialog = false;

      this.$toast.error('Removed from favourites', {
        timeout: 2000,
        position: 'bottom-center'
      });
    },
    openDeleteDialog(course) {
      this.showDialog = true;
      this.selectedCourse = course;
    }
  }
};
</script>
