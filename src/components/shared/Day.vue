<template>
  <div>
    <div v-for="(period, i) in day" :key="i">
      <Break v-if="period.break" :period="period" />
      <Period :period="period" :is-today="isToday" />
      <v-divider v-if="i !== day.length - 1" />
    </div>
  </div>
</template>

<script>
import Break from '@/components/shared/Break';
import Period from '@/components/shared/Period';

export default {
  components: {
    Break,
    Period,
  },
  props: {
    day: {
      type: Array,
      default: () => [],
    },
    isToday: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
