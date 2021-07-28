<template>
  <v-bottom-sheet v-model="bottomSheet">
    <template #activator="{ on }">
      <v-btn v-on="on">
        <v-icon>{{ mdiHeart }}</v-icon>
      </v-btn>
    </template>
    <div>
      <div class="text-center"></div>
      <v-list dense nav>
        <v-subheader>Saved</v-subheader>
        <div class="text-center">
          <v-chip
            v-if="bottomSheet"
            color="white"
            style="height: 6px; top: -75px"
          ></v-chip>
        </div>
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
            <v-btn icon>
              <v-icon size="20">
                {{ mdiDotsVertical }}
              </v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </div>
  </v-bottom-sheet>
</template>

<script>
import { mdiHeart, mdiDotsVertical } from '@mdi/js';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      mdiHeart,
      mdiDotsVertical,
      bottomSheet: false,
    };
  },
  computed: {
    ...mapState(['savedCourses']),
  },
  methods: {
    openTimetable(course) {
      this.bottomSheet = false;
      this.$router
        .push({
          path: '/timetable',
          query: {
            code: course.code,
            college: course.collegeIndex,
            sem: course.sem,
          },
        })
        .catch(() => {});
    },
  },
};
</script>

<style></style>
