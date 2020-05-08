<template>
  <v-app-bar elevation="0" class="d-none d-md-flex" app :color="themeColor">
    <v-toolbar-title class="mr-12 align-center">
      <span class="title">My<span class="primary--text">Term</span> </span>
    </v-toolbar-title>
    <v-btn-toggle group>
      <v-btn text :to="{ path: '/' }" active-class="active">
        <span>Search</span>
      </v-btn>

      <v-btn
        v-if="lastTimetableVisited"
        text
        :to="{ path: '/timetable' }"
        active-class="active"
      >
        <span>Timetable</span>
      </v-btn>

      <v-btn text :to="{ path: '/saved' }" active-class="active">
        <span>Saved</span>
      </v-btn>

      <v-btn text :to="{ path: '/settings' }" active-class="active">
        <span>Settings</span>
      </v-btn>
    </v-btn-toggle>
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['lastTimetableVisited', 'darkMode']),
    themeColor() {
      return this.darkMode ? '#21252b' : '#ffffff';
    }
  }
};
</script>

<style scoped>
.v-btn--active.active::before {
  opacity: 0 !important;
}
.v-btn--active.active {
  border-bottom: 1px solid var(--v-primary-base) !important;
}
</style>
