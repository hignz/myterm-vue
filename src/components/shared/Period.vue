<template>
  <div
    class="text-center body-2"
    :class="{
      'text--disabled': isClassOver,
      'primary--text font-weight-bold': isClassNow
    }"
    @click="showExtendedInfo = !showExtendedInfo"
  >
    <p v-if="period.startTime" class="mt-4 mb-1">
      {{ period.startTime }} - {{ period.endTime }}
    </p>
    <p class="mb-1">
      {{ period.name ? period.name : period.activity }}
    </p>
    <p
      v-if="
        showExtendedInfo &&
          period.name &&
          !period.name.includes(period.activity)
      "
      class="mb-1"
    >
      {{ period.activity }}
    </p>
    <p
      v-if="period.room"
      class="mb-1"
      :class="{
        'mb-4': !period.teacher
      }"
    >
      {{ period.room.split(/ -|- /)[0] }}
      <span v-if="showExtendedInfo"> - {{ period.type }}</span>
    </p>
    <p v-if="period.teacher" class="grey--text">
      {{ period.teacher }}
    </p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    period: {
      type: Object,
      default: () => {}
    },
    isToday: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showExtendedInfo: false
    };
  },
  computed: {
    currentTime() {
      return new Date().toLocaleTimeString('en-GB');
    },
    isClassNow() {
      return (
        this.isToday &&
        new Date(`01/01/1990 ${this.currentTime}`) >=
          new Date(`01/01/1990 ${this.period.startTime}`) &&
        new Date(`01/01/1990 ${this.currentTime}`) <=
          new Date(`01/01/1990 ${this.period.endTime}`)
      );
    },
    isClassOver() {
      return (
        this.isToday &&
        new Date(`01/01/1990 ${this.period.endTime}`) -
          new Date(`01/01/1990 ${this.currentTime}`) <
          0
      );
    }
  },
  created() {
    if (this.isToday && this.isClassNow) {
      this.setCurrentClass(this.period);
    }
    console.log(this.period);
  },
  methods: {
    ...mapActions(['setCurrentClass'])
  }
};
</script>
