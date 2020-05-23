<template>
  <div
    class="text-center body-2"
    :class="{
      'text--disabled': isClassOver && isToday,
      'error--text': isClassNow && isToday
    }"
    @click="showExtendedInfo = !showExtendedInfo"
  >
    <p v-if="period.startTime" class="mt-4 mb-1">
      {{ period.startTime }} - {{ period.endTime }}
    </p>
    <p v-if="period.name && period.name.length > 1" class="mb-1">
      {{ period.name }}
    </p>
    <p
      v-if="period.room"
      class="mb-1"
      :class="{
        'mb-4': !(period.teacher && period.teacher.length > 1)
      }"
    >
      {{ period.room.split(' -')[0] }}
    </p>
    <p
      v-if="showExtendedInfo"
      class="mb-1 animate__animated animate__bounceIn animate__fast"
    >
      {{ period.room.split(' -')[1] }} - {{ period.type }}
    </p>
    <p v-if="period.teacher && period.teacher.length > 1" class="grey--text">
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
  data: () => ({
    showExtendedInfo: false
  }),
  computed: {
    currentTime() {
      return new Date().toLocaleTimeString('en-GB');
    },
    isClassNow() {
      return (
        new Date(`01/01/1990 ${this.currentTime}`) >=
          new Date(`01/01/1990 ${this.period.startTime}`) &&
        new Date(`01/01/1990 ${this.currentTime}`) <=
          new Date(`01/01/1990 ${this.period.endTime}`)
      );
    },
    isClassOver() {
      return (
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
  },
  methods: {
    ...mapActions(['setCurrentClass'])
  }
};
</script>
