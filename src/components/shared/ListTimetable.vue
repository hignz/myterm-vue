<template>
  <v-expansion-panels v-if="timetable" v-model="arr" multiple flat hover>
    <template v-for="(day, index) in filteredTimetable">
      <v-expansion-panel
        v-if="day && day.length"
        :key="index"
        class="mb-2"
        :class="darkMode ? 'dark-border' : 'light-border'"
      >
        <v-expansion-panel-header
          class="subtitle-1"
          :class="{
            'primary--text font-weight-bold': isCurrentDay(index),
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
import { mapActions, mapState } from 'vuex';
import Day from '@/components/shared/Day';

export default {
  components: {
    Day,
  },
  props: {
    timetable: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      arr: [],
    };
  },
  computed: {
    ...mapState(['showWeekends', 'darkMode']),
    todaysIndex() {
      const index = new Date().getDay() - 1;
      return index === -1 ? 6 : index;
    },
    filteredTimetable() {
      const weekdays = this.timetable.slice(0, 5);
      if (!weekdays.flat().length && this.timetable.flat().length) {
        this.toggleShowWeekends(true);
        return this.timetable;
      }
      return this.showWeekends ? this.timetable : weekdays;
    },
  },
  created() {
    this.setExpandedDay();
  },
  methods: {
    ...mapActions(['toggleShowWeekends']),
    isCurrentDay(timetableIndex) {
      return this.todaysIndex === timetableIndex;
    },
    setExpandedDay() {
      let acc = 0;
      for (let i = 0; i < this.filteredTimetable.length; i++) {
        const day = this.filteredTimetable[i];
        if (day.length) {
          if (this.isCurrentDay(i)) {
            this.arr.push(acc);
            return;
          }
          acc += 1;
        }
      }
    },
  },
};
</script>
