<template>
  <div>
    <v-card v-if="show" outlined :class="accentedBorder" @click="show = !show">
      <v-card-text class="text-center">
        <p class="body-1 error--text">Current Class</p>
        <p class="body-1">{{ period.name }}</p>
        <span class="subtitle-2">Started {{ started }}</span>
        <p class="">Ends {{ ends }}</p>
        <p class="subtitle-2 mb-0">{{ period.room }}</p>
      </v-card-text>
    </v-card>
    <v-btn v-else text block color="primary" @click="show = !show">
      Show Current Class
    </v-btn>
  </div>
</template>

<script>
import { formatDistanceToNow } from 'date-fns';
import accentedBorder from '@/mixins/accentedBorder';

export default {
  mixins: [accentedBorder],
  props: {
    period: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    formatDistanceToNow,
    show: true
  }),
  computed: {
    started() {
      const todaysDate = new Date().toLocaleDateString('en-US');

      return formatDistanceToNow(
        new Date(`${todaysDate} ${this.period.startTime}`),
        { addSuffix: true }
      );
    },
    ends() {
      const todaysDate = new Date().toLocaleDateString('en-US');

      return formatDistanceToNow(
        new Date(`${todaysDate} ${this.period.endTime}`),
        { addSuffix: true }
      );
    }
  }
};
</script>

<style></style>
