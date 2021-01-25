<template>
  <div
    class="text-center body-2 font-weight-medium"
    :class="{
      'text--disabled': isClassOver,
      'primary--text font-weight-bold': isClassNow,
      pointer: hasExtendedInfo,
    }"
    @click="showExtendedInfo = !showExtendedInfo"
  >
    <v-chip v-if="isElective" class="mt-4" small color="error" outlined label>
      <span>Elective</span>
    </v-chip>

    <p v-if="period.startTime" class="mt-4 mb-1">
      {{ period.startTime }} - {{ period.endTime }}
    </p>
    <p class="mb-1">
      {{ period.name ? period.name : period.activity }}
    </p>
    <p v-if="showExtendedInfo && hasExtendedInfo" class="mb-1">
      {{ period.activity }}
    </p>
    <p v-if="period.room" class="mb-1">
      {{ period.room.split(/ -|- /)[0] }}
    </p>
    <p v-if="!isElective" class="mb-1">
      {{ period.type }}
    </p>
    <p v-if="period.teacher" class="grey--text">
      {{ period.teacher }}
    </p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { isTimePassed, isTimeWithinRange } from '@/utils/date';

export default {
  props: {
    period: {
      type: Object,
      default: () => {},
    },
    isToday: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showExtendedInfo: false,
    };
  },
  computed: {
    currentTime() {
      return new Date().toLocaleTimeString('en-GB');
    },
    hasExtendedInfo() {
      return (
        this.period.name &&
        !this.period.name
          .toLowerCase()
          .includes(this.period.activity.toLowerCase())
      );
    },
    isElective() {
      return this.period.type === 'Elective';
    },
    isClassNow() {
      return (
        this.isToday &&
        isTimeWithinRange(this.currentTime, {
          start: this.period.startTime,
          end: this.period.endTime,
        })
      );
    },
    isClassOver() {
      return (
        this.isToday && isTimePassed(this.currentTime, this.period.endTime)
      );
    },
  },
  created() {
    if (this.isToday && this.isClassNow) {
      this.setCurrentClass(this.period);
    }
  },
  methods: {
    ...mapActions(['setCurrentClass']),
  },
};
</script>
