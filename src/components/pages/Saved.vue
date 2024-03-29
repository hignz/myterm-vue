<template>
  <v-container>
    <AppBar v-if="$vuetify.breakpoint.smAndDown" title="Saved" />
    <v-row justify="center">
      <v-col
        v-if="savedCourses && savedCourses.length"
        cols="12"
        sm="10"
        md="7"
        lg="7"
        xl="5"
        class="pt-0 pt-md-3"
      >
        <v-card :class="{ 'box-shadow': !darkMode }" :outlined="darkMode">
          <v-list two-line subheader dense nav>
            <v-subheader class="font-weight-bold caption mt-2">
              TIMETABLES
              <small v-if="savedCourses.length > 1" class="ml-3">
                ( {{ savedCourses.length }} )
              </small>
              <v-spacer></v-spacer>
            </v-subheader>

            <v-list-item
              v-for="(course, index) in savedCourses"
              :key="index"
              @click="openTimetable(course)"
            >
              <v-list-item-content>
                <v-list-item-title class="mb-2">{{
                  course.title
                }}</v-list-item-title>
                <v-list-item-subtitle
                  v-if="!course.multiple"
                  class="caption mb-2"
                >
                  {{ course.college }}
                  &#x25CF; Semester
                  <span>{{ parseInt(course.sem, 10) + 1 }}</span>
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn
                  icon
                  title="Delete"
                  @click.stop="openDeleteDialog(course)"
                >
                  <v-icon size="20" color="error">
                    {{ mdiDelete }}
                  </v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col v-else class="text-center mt-6" cols="12" sm="12" md="6">
        <v-img
          class="mx-auto mb-8"
          :src="require('@/assets/undraw_No_data_re_kwbl.svg')"
          max-height="200"
          max-width="200"
        >
        </v-img>
        <p class="grey--text font-weight-bold">
          Ummm... You have not saved any timetables yet
        </p>
        <p class="grey--text font-weight-medium">
          To save a course, open your timetable and press the
          <v-icon class="grey--text">
            {{ mdiHeartOutline }}
          </v-icon>
          icon
        </p>
      </v-col>
    </v-row>
    <v-dialog v-model="showDialog" :width="425">
      <v-card>
        <v-card-title class="subtitle-1 text-uppercase"
          >Remove course</v-card-title
        >
        <v-card-text class="mt-4 caption font-weight-medium">
          <p>
            Are you sure you want to remove
            <span
              v-if="selectedTimetable"
              class="white--text font-weight-bold"
              :class="{ 'primary--text': !darkMode }"
            >
              {{ selectedTimetable.title }}</span
            >?
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn class="mr-2" plain @click="showDialog = !showDialog">
            Cancel
          </v-btn>
          <v-btn color="error darken-1" @click="deleteCourse()"> Remove </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mdiDelete, mdiHeartBroken, mdiHeartOutline } from '@mdi/js';
import { mapState, mapActions } from 'vuex';
import AppBar from '@/components/shared/AppBar';
import genericMetaInfo from '@/mixins/genericMetaInfo';

export default {
  components: {
    AppBar,
  },
  mixins: [genericMetaInfo],
  data() {
    return {
      showDialog: false,
      selectedTimetable: null,
      mdiDelete,
      mdiHeartBroken,
      mdiHeartOutline,
    };
  },
  computed: {
    ...mapState(['savedCourses', 'darkMode']),
  },
  methods: {
    ...mapActions(['removeTimetable']),
    openTimetable(course) {
      this.$router.push({
        path: '/timetable',
        query: {
          code: course.code,
          college: course.collegeIndex,
          sem: course.sem,
        },
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
    },
  },
};
</script>

<style>
.v-list-item__title,
.v-list-item__subtitle {
  white-space: normal !important;
}
</style>
