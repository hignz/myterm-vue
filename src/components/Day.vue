<template>
  <div>
    <div v-for="(period, i) in day" :key="i">
      <Break v-if="period.break" :period="period" />
      <Period :period="period" />
      <v-divider v-if="i !== day.length - 1" />
    </div>
  </div>
</template>

<script>
import Break from './Break';
import Period from './Period';

export default {
  components: {
    Break,
    Period
  },
  props: {
    day: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    showExtendedInfo: false
  })
};
</script>
