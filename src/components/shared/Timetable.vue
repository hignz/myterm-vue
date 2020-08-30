<template>
  <v-expansion-panels v-if="timetable" v-model="arr" multiple flat>
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
    arr: []
  }),
  computed: {
    ...mapState(['showWeekends', 'darkMode']),
    todaysIndex() {
      const index = new Date().getDay() - 1;
      return index === -1 ? 6 : index;
    },
    filteredTimetable() {
      return this.showWeekends ? this.timetable : this.timetable.slice(0, 5);
    }
  },
  created() {
    this.setExpandedDay();
  },
  methods: {
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
    }
  }
};
</script>
