<template>
  <div>
    <v-row no-gutters justify="center">
      <v-col v-for="x in labels" :key="x" class="text-center">
        <span class="caption">{{ x.substring(0, 3) }}</span>
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
          <p>{{ selectedPeriod.startTime }} - {{ selectedPeriod.endTime }}</p>
          <p>{{ selectedPeriod.room }}</p>
          <p>{{ selectedPeriod.teacher }}</p>
        </v-card-text>
        <v-card-actions class="">
          <v-spacer />
          <v-btn class="" text @click="dialog = !dialog">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';

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
    }
  },
  methods: {
    checkForClass(time, dayIndex) {
      if (dayIndex - 2 < 0) {
        return;
      }

      const day = this.filteredTimetable[dayIndex - 2];
      if (day && day.length) {
        const period = day.find(
          el =>
            el.startTime === time ||
            (new Date(`01/01/1990 ${time}`) >=
              new Date(`01/01/1990 ${el.startTime}`) &&
              new Date(`01/01/1990 ${time}`) <
                new Date(`01/01/1990 ${el.endTime}`))
        );

        if (!period) {
          return false;
        }

        return true;
      }
    },
    onPeriodSelected(time, dayIndex) {
      if (dayIndex - 2 < 0) {
        return;
      }

      const day = this.filteredTimetable[dayIndex - 2];

      if (day && day.length) {
        const period = day.find(
          el =>
            el.startTime === time ||
            (new Date(`01/01/1990 ${time}`) >=
              new Date(`01/01/1990 ${el.startTime}`) &&
              new Date(`01/01/1990 ${time}`) <
                new Date(`01/01/1990 ${el.endTime}`))
        );
        if (!period) {
          return;
        }

        this.selectedPeriod = period;
        this.dialog = true;
      }
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
