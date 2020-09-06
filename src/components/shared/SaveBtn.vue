<template>
  <v-btn
    :fab="isFab"
    :icon="isIcon"
    :small="isSmall"
    dark
    :class="{
      heartbeat: isSaved && !isFab,
      'primary darken-2': isFab
    }"
    @click="save()"
  >
    <v-icon :color="iconColor">{{
      isSaved ? mdiHeart : mdiHeartOutline
    }}</v-icon>
  </v-btn>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { mdiHeart, mdiHeartOutline } from '@mdi/js';

export default {
  props: {
    isFab: {
      type: Boolean,
      default: false
    },
    isIcon: {
      type: Boolean,
      default: true
    },
    isSmall: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      mdiHeart,
      mdiHeartOutline
    };
  },
  computed: {
    ...mapState(['darkMode', 'currentTimetable', 'savedCourses']),
    iconColor() {
      if (this.isFab) {
        return;
      }
      return this.isSaved ? 'primary' : this.darkMode ? 'white' : '#737373';
    },
    isSaved() {
      return this.savedCourses.some(
        el =>
          el.title === this.currentTimetable.title &&
          el.sem === this.currentTimetable.semester
      );
    }
  },
  methods: {
    ...mapActions(['saveTimetable', 'removeTimetable']),
    save() {
      this.isSaved
        ? this.removeTimetable(this.currentTimetable)
        : this.saveTimetable(this.currentTimetable);
    }
  }
};
</script>

<style>
.heartbeat {
  animation-name: heartBeat;
  animation-duration: 1.3s;
  animation-timing-function: ease-in-out;
}

@keyframes heartBeat {
  0% {
    transform: scale(1);
  }

  14% {
    transform: scale(1.3);
  }

  28% {
    transform: scale(1);
  }

  42% {
    transform: scale(1.3);
  }

  70% {
    transform: scale(1);
  }
}
</style>
