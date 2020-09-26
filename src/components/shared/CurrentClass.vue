<template>
  <div>
    <v-card v-if="show" outlined @click="show = !show">
      <v-card-text class="text-center">
        <p class="primary--text overline">Ongoing Class</p>
        <p class="subtitle-1">{{ period.name }}</p>
        <p class="subtitle-1">{{ period.room }}</p>
      </v-card-text>
      <v-card-actions class="pt-0">
        <p class="caption grey--text">Started {{ started }}</p>
        <v-spacer></v-spacer>
        <p class="caption grey--text">Ends {{ ends }}</p>
      </v-card-actions>
    </v-card>
    <v-btn v-else text block color="primary" @click="show = !show">
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
