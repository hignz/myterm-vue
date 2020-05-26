<template>
  <v-expansion-panels v-if="timetable" v-model="arr" multiple flat>
    <template v-for="(day, index) in filteredTimetable">
      <v-expansion-panel
        v-if="day && day.length"
        :key="index"
        class="mb-2"
        :class="accentedBorder"
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
          <Day :day="day" :is-today="isCurrentDay(index)" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </template>
  </v-expansion-panels>
</template>

<script>
import accentedBorder from '@/mixins/accentedBorder';
import Day from './Day';
import { mapState } from 'vuex';

export default {
  components: {
    Day
  },
  mixins: [accentedBorder],
  props: {
    timetable: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    arr: null,
    days: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ]
  }),
  computed: {
    ...mapState(['showWeekends']),
    todaysIndex() {
      return new Date().getDay() - 1;
    },
    filteredTimetable() {
      return this.showWeekends ? this.timetable : this.timetable.slice(0, 5);
    }
  },
  created() {
    const today = this.getToday();

    // Find the index of the current day
    this.arr = this.filteredTimetable.map((el, i) =>
      el.length && el[0].day === today ? i : null
    );

    // If the current day is not on the timetable, open every timetable entry
    if (this.arr.every(el => el === null)) {
      const arrLength = this.arr.length;
      this.arr = [];

      for (let index = 0; index < arrLength; index++) {
        this.arr.push(index);
      }
    }
  },
  methods: {
    isCurrentDay(timetableIndex) {
      return this.todaysIndex === timetableIndex;
    },
    getToday() {
      return this.days[this.todaysIndex];
    }
  }
};
</script>
