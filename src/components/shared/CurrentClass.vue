<template>
  <div class="mb-4">
    <v-card v-if="show" outlined @click="show = !show">
      <v-card-title class="primary--text justify-center"
        >Current class</v-card-title
      >
      <v-card-text class="text-center pb-0">
        <p>{{ period.name }}</p>
        <p>{{ period.room }}</p>
      </v-card-text>
      <v-card-actions>
        <p class="caption text--secondary">Started {{ started }}</p>
        <v-spacer></v-spacer>
        <p class="caption text--secondary">Ends {{ ends }}</p>
      </v-card-actions>
    </v-card>
    <v-btn v-else text block large color="primary" @click="show = !show">
      Show Current Class
    </v-btn>
  </div>
</template>

<script>
import { formatDistanceToNow } from 'date-fns';

export default {
  props: {
    period: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      formatDistanceToNow,
      show: true,
    };
  },
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
    },
  },
};
</script>

<style></style>
