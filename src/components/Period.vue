<template>
  <div @click="showExtendedInfo = !showExtendedInfo" class="text-center">
    <p class="mt-4 mb-1 body-2" v-if="period.startTime">
      {{ period.startTime }} - {{ period.endTime }}
    </p>
    <p class="mb-1 body-2" v-if="period.name && period.name.length > 1">
      {{ period.name }}
    </p>
    <p
      class="mb-1 body-2"
      v-if="period.room"
      :class="{ 'mb-4': !(period.teacher && period.teacher.length > 1) }"
    >
      {{ period.room.split(' -')[0] }}
    </p>
    <p class="mb-1 body-2" v-if="showExtendedInfo">
      {{ period.room.split(' -')[1] }} - {{ period.type }}
    </p>
    <p
      class="body-2 grey--text"
      v-if="period.teacher && period.teacher.length > 1"
    >
      {{ period.teacher }}
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showExtendedInfo: false
    };
  },
  props: {
    period: {
      type: Object,
      default: () => {}
    }
  }
};
</script>

<style></style>
