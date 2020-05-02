<template>
  <v-expansion-panels v-if="timetable" v-model="arr" multiple flat>
    <template v-for="(day, index) in timetableIndexes">
      <v-expansion-panel
        v-if="day && day.length"
        :key="index"
        class="mb-2"
        :class="{
          'accented-border': accentedBorders,
          'dark-border': !accentedBorders && darkMode,
          'light-border': !accentedBorders && !darkMode
        }"
      >
        <v-expansion-panel-header
          class="subtitle-1"
          :class="{
            'primary--text font-weight-bold': isCurrentDay(index)
          }"
        >
          {{ day[0].day }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <Day :day="day" :day-index="index" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </template>
  </v-expansion-panels>
</template>

<script>
import { getDay } from 'date-fns';
import { mapState } from 'vuex';

import Day from './Day';

export default {
  components: {
    Day
  },
  props: {
    timetable: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    arr: null
  }),
  computed: {
    ...mapState(['accentedBorders', 'darkMode']),
    currentDayIndex() {
      return getDay(Date.now()) - 1;
    },
    currentDayOnTimetable() {
      return this.timetable[this.currentDayIndex]
        ? this.timetable[this.currentDayIndex].length > 0
        : false;
    },
    timetableIndexes() {
      const weekDayCount = this.timetable.slice(0, 4).flat().length;
      const weekendCount = this.timetable.slice(5, 8).flat().length;

      return !weekDayCount && weekendCount
        ? this.timetable.slice(5, 8)
        : this.timetable.slice(0, 5);
    }
  },
  created() {
    this.arr = [this.currentDayOnTimetable ? this.currentDayIndex : null];
  },
  methods: {
    isCurrentDay(dayIndex) {
      return this.currentDayIndex === dayIndex;
    }
  }
};
</script>

<style scoped>
.primary--text {
  color: var(--v-primary-base);
}
</style>
