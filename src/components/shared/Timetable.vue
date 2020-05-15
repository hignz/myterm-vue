<template>
  <v-expansion-panels v-if="timetable" v-model="arr" multiple flat>
    <template v-for="(day, index) in timetableIndexes">
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
          <Day :day="day" :day-index="index" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </template>
  </v-expansion-panels>
</template>

<script>
import accentedBorder from '@/mixins/accentedBorder';
import Day from './Day';

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
    arr: null
  }),
  computed: {
    currentDayIndex() {
      return new Date().getDay() - 1;
    },
    currentDayOnTimetable() {
      return this.timetable[this.currentDayIndex]
        ? this.timetable[this.currentDayIndex].length > 0
        : false;
    },
    timetableIndexes() {
      const weekDayCount = this.timetable.slice(0, 5).flat().length;
      const weekendCount = this.timetable.slice(5, 8).flat().length;

      return !weekDayCount && weekendCount
        ? this.timetable.slice(5, 8)
        : this.timetable.slice(0, 5);
    }
  },
  created() {
    const emptyDays = this.timetable.slice(0, 5).filter(el => el.length === 0)
      .length;

    this.arr = [
      this.currentDayOnTimetable ? this.currentDayIndex - emptyDays : null
    ];
  },
  methods: {
    isCurrentDay(timetableIndex) {
      return this.currentDayIndex === timetableIndex;
    }
  }
};
</script>
