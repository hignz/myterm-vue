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
          <!-- <v-card-text> </v-card-text> -->
          <v-subheader>Courses</v-subheader>
          <v-list nav two-line subheader dense>
            <v-list-item-group>
              <v-list-item
                v-for="(course, index) in savedCourses"
                :key="index"
                @click="openTimetable(course)"
              >
                <v-list-item-content>
                  <v-list-item-title>{{ course.title }}</v-list-item-title>
                  <v-list-item-subtitle class="mt-1">
                    Semester:
                    {{ parseInt(course.sem, 10) + 1 }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle class="overline mt-2">
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
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
      <v-col v-else class="text-center mt-4" cols="12" sm="12" md="6">
        <v-icon class="mb-4 grey--text" x-large>
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

export default {
  components: {
    AppBar
  },
  mixins: [genericMetaInfo, accentedBorder],
  data: () => ({
    savedCourses: null,
    showDialog: false,
    selectedCourse: null
  }),
  mounted() {
    this.savedCourses = JSON.parse(localStorage.getItem('savedCourses'));
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
    deleteCourse() {
      this.savedCourses = this.savedCourses.filter(
        el => el !== this.selectedCourse
      );
      localStorage.setItem('savedCourses', JSON.stringify(this.savedCourses));

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
