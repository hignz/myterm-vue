<template>
  <div>
    <v-bottom-navigation
      class="d-md-none"
      grow
      app
      active-class="active-nav"
      shift
    >
      <v-btn :to="{ path: '/' }">
        <span>Search</span>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn :to="{ path: '/timetable' }" v-if="lastTimetableVisited">
        <span>Timetable</span>
        <v-icon>mdi-timetable</v-icon>
      </v-btn>

      <v-btn :to="{ path: '/saved' }">
        <span>Saved</span>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn :to="{ path: '/settings' }">
        <span>Settings</span>
        <v-icon>mdi-settings</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      activeBtn: null
    };
  },
  computed: {
    ...mapState(['lastTimetableVisited'])
  }
};
</script>

<style>
.v-item-group.v-bottom-navigation .v-btn.v-size--default {
  height: inherit;
}

.active-nav {
  border-top: 1px solid var(--v-primary-base);
}
</style>
