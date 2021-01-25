<template>
  <div>
    <v-card flat>
      <v-row no-gutters>
        <v-col
          v-for="(label, i) in labels"
          :key="label"
          class="text-center mr-2"
        >
          <span
            class="caption"
            :class="{
              'primary--text font-weight-black': i === todaysIndex,
              'text--secondary font-weight-medium': i !== todaysIndex,
            }"
            >{{ label.substring(0, 3) }}</span
          >
        </v-col>
      </v-row>
      <v-card-text class="pa-0">
        <v-row v-for="(row, i) in times" :key="i" no-gutters class="mt-1">
          <v-tooltip
            v-for="(day, dayIndex) in filteredTimetable.length + 1"
            :key="day"
            :disabled="dayIndex === 0 || !checkForClass(row, day)"
            bottom
          >
            <template v-slot:activator="{ on, attrs }">
              <v-col
                class="text-center mr-1"
                :class="{
                  'period pointer': checkForClass(row, day),
                  'class-now': isClassNow(row, day),
                  'box-shadow': !darkMode && dayIndex !== 0,
                  'dark-border': darkMode && dayIndex !== 0,
                }"
                v-bind="attrs"
                v-on="on"
                @click="onPeriodSelected(row, day)"
              >
                <span v-if="day === 1" class="caption font-weight-medium">{{
                  row
                }}</span>
              </v-col>
            </template>
            <span>{{ row }} {{ labels[day - 1] }}</span>
          </v-tooltip>
        </v-row>
      </v-card-text>
    </v-card>
    <v-dialog v-if="detailsDialog" v-model="detailsDialog" :width="350">
      <v-card>
        <v-card-title class="subtitle-1 text-uppercase">Class</v-card-title>
        <v-card-text class="pt-4 pb-0 text-center font-weight-medium">
          <template v-if="selectedPeriod.type !== 'Elective'">
            <p class="mb-1">{{ selectedPeriod.day }}</p>
            <p class="mb-1">
              {{ selectedPeriod.startTime }} - {{ selectedPeriod.endTime }}
            </p>
            <p class="mb-1">
              {{ selectedPeriod.name || selectedPeriod.activity }}
            </p>
            <p class="mb-1">{{ selectedPeriod.room }}</p>
            <p class="grey--text">{{ selectedPeriod.teacher }}</p>
          </template>
          <template v-else>
            <v-chip class="mb-1" small color="error" outlined>
              <span>Elective</span>
            </v-chip>
            <p class="mb-1">{{ selectedPeriod.day }}</p>
            <p>{{ selectedPeriod.startTime }} - {{ selectedPeriod.endTime }}</p>
          </template>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn plain @click="detailsDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { isTimeWithinRange } from '@/utils/date';

export default {
  props: {
    timetable: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectedPeriod: null,
      detailsDialog: false,
      times: [],
      days: [
        '',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
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
      const index = new Date().getDay();
      return index === 0 ? 7 : index;
    },
    currentTime() {
      return new Date().toLocaleTimeString('en-GB');
    },
  },
  created() {
    for (let index = 9; index < 22; index++) {
      this.times.push(`${index}:00`);
      if (index < 21) {
        this.times.push(`${index}:30`);
      }
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
        (el) =>
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
      this.detailsDialog = true;
    },
    isClassNow(time, dayIndex) {
      if (dayIndex - 1 === this.todaysIndex) {
        const period = this.timetable[dayIndex - 2].find((el) =>
          isTimeWithinRange(time, {
            start: el.startTime,
            end: el.endTime,
          })
        );
        return (
          period &&
          isTimeWithinRange(this.currentTime, {
            start: period.startTime,
            end: period.endTime,
          })
        );
      }
    },
  },
};
</script>

<style scoped>
.period {
  background-color: var(--v-primary-base);
}
.period:hover {
  filter: brightness(75%);
}
.class-now {
  background-color: var(--v-primary-darken2);
}
</style>
