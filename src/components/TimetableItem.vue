<template>
  <div>
    <div v-for="(period, i) in day" :key="i" class="text-center">
      <p class="mt-4 mb-1 body-2">
        {{ period.startTime }} - {{ period.endTime }}
      </p>
      <p class="mb-1 body-2" v-if="period.name.length > 1">
        {{ period.name }}
      </p>
      <p class="mb-1 body-2">{{ period.room.split(' -')[0] }}</p>
      <p class="body-2 grey--text" v-if="period.teacher.length">
        {{ period.teacher }}
      </p>
      <v-divider v-if="i !== day.length - 1" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    day: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style></style>
