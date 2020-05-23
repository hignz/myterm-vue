<template>
  <v-btn
    :fab="isFab"
    :icon="isIcon"
    :small="isSmall"
    dark
    :class="{
      'animate__animated animate__heartBeat': isSaved && !isFab,
      'primary darken-2': isFab
    }"
    @click="save()"
  >
    <v-icon :color="iconColor">{{
      isSaved ? 'mdi-heart' : 'mdi-heart-outline'
    }}</v-icon>
  </v-btn>
</template>

<script>
import { mapActions, mapState } from 'vuex';

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
  computed: {
    ...mapState(['darkMode', 'currentTimetable', 'savedCourses']),
    iconColor() {
      if (this.isFab) {
        return;
      }
      return this.isSaved ? 'primary' : this.darkMode ? 'white' : '#666666';
    },
    isSaved() {
      return this.savedCourses.some(el => el.id === this.currentTimetable._id);
    }
  },
  methods: {
    ...mapActions(['saveTimetable', 'removeTimetable']),
    save() {
      if (this.isSaved) {
        this.removeTimetable(this.currentTimetable);
      } else {
        this.saveTimetable(this.currentTimetable);
      }
    }
  }
};
</script>

<style></style>
