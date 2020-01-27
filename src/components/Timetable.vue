<template>
  <v-expansion-panels v-if="timetable" multiple v-model="arr">
    <template v-for="(day, index) in timetable.slice(0, 5)">
      <v-expansion-panel
        v-bind:class="{
          'accented-border': accentedBorders
        }"
        v-if="day && day.length"
        :key="index"
      >
        <v-expansion-panel-header
          class="subtitle-1"
          v-bind:class="{
            'primary--text font-weight-bold': isCurrentDay(index)
          }"
        >
          {{ day[0].day }}
        </v-expansion-panel-header>
        <v-divider v-if="index !== day.length" />
        <v-expansion-panel-content>
          <TimetableItem :day="day" :dayIndex="index"></TimetableItem>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </template>
  </v-expansion-panels>
</template>

<script>
import TimetableItem from './TimetableItem';
import { getDay } from 'date-fns';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      arr: null
    };
  },
  created() {
    this.arr = [this.currentDayOnTimetable ? this.currentDayIndex : null];
  },
  components: {
    TimetableItem
  },
  props: {
    timetable: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    isCurrentDay(dayIndex) {
      return this.currentDayIndex === dayIndex;
    }
  },
  computed: {
    ...mapState(['accentedBorders']),
    currentDayIndex() {
      return getDay(Date.now()) - 1;
    },
    currentDayOnTimetable() {
      return this.timetable[this.currentDayIndex].length > 0;
    }
  }
};
</script>

<style scoped>
.accented-border {
  border: 0.5px solid var(--v-primary-base);
}

.primary--text {
  color: var(--v-primary-base);
}
</style>
