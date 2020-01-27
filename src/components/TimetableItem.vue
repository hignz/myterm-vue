<template>
  <div>
    <div v-for="(period, i) in day" :key="i" class="text-center">
      <Break v-if="period.break" :period="period" />
      <div v-else>
        <p class="mt-4 mb-1 body-2">
          {{ period.startTime }} - {{ period.endTime }}
        </p>
        <p class="mb-1 body-2" v-if="period.name && period.name.length > 1">
          {{ period.name }}
        </p>
        <p
          class="mb-1 body-2"
          :class="{ 'mb-4': !(period.teacher && period.teacher.length > 1) }"
        >
          {{ period.room.split(' -')[0] }}
        </p>
        <p
          class="body-2 grey--text"
          v-if="period.teacher && period.teacher.length > 1"
        >
          {{ period.teacher }}
        </p>
      </div>
      <v-divider v-if="i !== day.length - 1" />
    </div>
  </div>
</template>

<script>
import Break from './Break';

export default {
  components: {
    Break
  },
  props: {
    day: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style></style>
