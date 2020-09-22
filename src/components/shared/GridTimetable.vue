<template>
  <div>
    <v-row no-gutters justify="center">
      <v-col v-for="(label, i) in labels" :key="label" class="text-center">
        <span class="caption" :class="{ 'primary--text': i === todaysIndex }">{{
          label.substring(0, 3)
        }}</span>
      </v-col>
    </v-row>
    <v-row v-for="(row, i) in times" :key="i" no-gutters>
      <v-col
        v-for="day in filteredTimetable.length + 1"
        :key="day"
        :style="
          darkMode
            ? 'border: thin solid rgba(255, 255, 255, 0.12) !important'
            : 'border: thin solid rgba(220, 220, 220, 1) !important'
        "
        class="text-center"
        :class="{ 'period pointer': checkForClass(row, day) }"
        @click="onPeriodSelected(row, day)"
      >
        <span v-if="day === 1" class="caption">{{ row }}</span>
      </v-col>
    </v-row>
    <v-dialog v-if="dialog" v-model="dialog" :width="400">
      <v-card>
        <v-card-title class="subtitle-1 text-uppercase">Class</v-card-title>
        <v-card-text class="pt-4 pb-0 text-center">
          <p>{{ selectedPeriod.name || selectedPeriod.activity }}</p>
          <p>{{ selectedPeriod.day }}</p>
          <p>{{ selectedPeriod.startTime }} - {{ selectedPeriod.endTime }}</p>
          <p>{{ selectedPeriod.room }}</p>
          <p>{{ selectedPeriod.teacher }}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="dialog = !dialog">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { isTimeWithinRange } from '../../utils/dateHelper';

export default {
  props: {
    timetable: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selectedPeriod: null,
      dialog: false,
      isTimeWithinRange,
      times: [
        '9:00',
        '9:30',
        '10:00',
        '10:30',
        '11:00',
        '11:30',
        '12:00',
        '12:30',
        '13:00',
        '13:30',
        '14:00',
        '14:30',
        '15:00',
        '15:30',
        '16:00',
        '16:30',
        '17:00',
        '17:30',
        '18:00'
      ],
      days: [
        '',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ]
    };
  },
  computed: {
    ...mapState(['darkMode', 'showWeekends']),
    filteredTimetable() {
      const weekdays = this.timetable.slice(0, 5);
      if (!weekdays.flat().length && this.timetable.flat().length) {
        this.toggleShowWeekends(true);
        return this.timetable;
      }
      return this.showWeekends ? this.timetable : weekdays;
    },
    labels() {
      const weekdays = this.days.slice(0, 6);
      return this.showWeekends ? this.days : weekdays;
    },
    todaysIndex() {
      const index = new Date().getDay() - 1;
      return index === -1 ? 7 : index;
    }
  },
  methods: {
    checkForClass(time, dayIndex) {
      const period = this.getPeriod(time, dayIndex);
      return !!period;
    },
    getPeriod(time, dayIndex) {
      if (dayIndex - 2 < 0) {
        return;
      }

      const day = this.filteredTimetable[dayIndex - 2];

      if (!day || !day.length) {
        return;
      }

      const period = day.find(
        el =>
          el.startTime === time ||
          (el.startTime &&
            el.endTime &&
            isTimeWithinRange(time, { start: el.startTime, end: el.endTime }))
      );

      return period;
    },
    onPeriodSelected(time, dayIndex) {
      const period = this.getPeriod(time, dayIndex);

      if (!period) {
        return;
      }

      this.selectedPeriod = period;
      this.dialog = true;
    }
  }
};
</script>

<style scoped>
.period {
  background-color: var(--v-primary-base);
}
.period:hover {
  filter: brightness(75%);
}
</style>
