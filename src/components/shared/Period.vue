<template>
  <div class="text-center" @click="showExtendedInfo = !showExtendedInfo">
    <p v-if="period.startTime" class="mt-4 mb-1 body-2">
      {{ period.startTime }} - {{ period.endTime }}
    </p>
    <p v-if="period.name && period.name.length > 1" class="mb-1 body-2">
      {{ period.name }}
    </p>
    <p
      v-if="period.room"
      class="mb-1 body-2"
      :class="{ 'mb-4': !(period.teacher && period.teacher.length > 1) }"
    >
      {{ period.room.split(' -')[0] }}
    </p>
    <p
      v-if="showExtendedInfo"
      class="mb-1 body-2 animate__animated animate__bounceIn animate__fast"
    >
      {{ period.room.split(' -')[1] }} - {{ period.type }}
    </p>
    <p
      v-if="period.teacher && period.teacher.length > 1"
      class="body-2 grey--text"
    >
      {{ period.teacher }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    period: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    showExtendedInfo: false
  })
};
</script>
