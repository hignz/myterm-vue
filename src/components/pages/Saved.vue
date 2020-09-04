<template>
  <v-container>
    <AppBar v-if="$vuetify.breakpoint.smAndDown" title="Saved" />
    <v-row justify="center">
      <v-col
        v-if="savedCourses && savedCourses.length"
        cols="12"
        sm="12"
        md="6"
        lg="6"
        class="pt-0 pt-md-3"
      >
        <v-card outlined flat>
          <v-list three-line subheader dense nav>
            <v-subheader class="font-weight-bold caption mt-2"
              >TIMETABLES <v-spacer></v-spacer
              ><span v-if="savedCourses.length > 1" class="mr-3">{{
                savedCourses.length
              }}</span></v-subheader
            >

            <v-list-item
              v-for="(course, index) in savedCourses"
              :key="index"
              @click="openTimetable(course)"
            >
              <v-list-item-content>
                <v-list-item-title class="mb-1 mb-md-0">{{
                  course.title
                }}</v-list-item-title>
                <v-list-item-subtitle
                  v-if="!course.multiple"
                  class="caption mb-2 mb-md-0"
                >
                  Semester:
                  <span class="font-weight-bold">{{
                    parseInt(course.sem, 10) + 1
                  }}</span>
                </v-list-item-subtitle>
                <v-list-item-subtitle class="caption">
                  {{ course.college }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon @click.stop="openDeleteDialog(course)">
                  <v-icon size="20">
                    {{ mdiDelete }}
                  </v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col v-else class="text-center mt-4" cols="12" sm="12" md="6">
        <v-icon class="mb-4 grey--text" size="50">
          {{ mdiHeartBroken }}
        </v-icon>
        <p class="grey--text">
          You have no saved courses.
        </p>
        <p class="grey--text">
          To save a course, navigate to a timetable and press the heart icon.
        </p>
      </v-col>
    </v-row>
    <v-dialog v-model="showDialog" :width="425">
      <v-card>
        <v-card-title class="subtitle-1 text-uppercase"
          >Remove course</v-card-title
        >
        <v-card-text class="mt-4 caption">
          <p>
            Are you sure you want to remove
            <span v-if="selectedTimetable" class="white--text font-weight-bold">
              {{ selectedTimetable.title }} </span
            >?
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn class="mr-2" text @click="showDialog = !showDialog">
            Cancel
          </v-btn>
          <v-btn color="error darken-1" @click="deleteCourse()">
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
import { mapState, mapActions } from 'vuex';
import { mdiDelete, mdiHeartBroken } from '@mdi/js';

export default {
  components: {
    AppBar
  },
  mixins: [genericMetaInfo],
  data() {
    return {
      showDialog: false,
      selectedTimetable: null,
      mdiDelete,
      mdiHeartBroken
    };
  },
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
      this.removeTimetable(this.selectedTimetable).then(() => {
        this.showDialog = false;

        this.$toast.error('Timetable removed');
      });
    },
    openDeleteDialog(course) {
      this.selectedTimetable = course;
      this.showDialog = true;
    }
  }
};
</script>

<style>
.v-list-item__title,
.v-list-item__subtitle {
  white-space: normal;
}
</style>
