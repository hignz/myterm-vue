<template>
  <v-dialog v-model="dialog" :width="425">
    <template v-slot:activator="{ on }">
      <v-btn class="ml-2" color="primary" icon v-on="on">
        <v-icon>
          {{ mdiBell }}
        </v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="subtitle-1 text-uppercase">History</v-card-title>
      <v-card-text class="mt-4 caption">
        <p>
          Your timetable changed {{ formatToNow(timetable.updatedAt, true) }}
        </p>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn class="mr-2" text @click="dialog = !dialog">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { formatToNow } from '@/utils/dateFormatter';
import { mdiBell } from '@mdi/js';

export default {
  props: {
    timetable: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dialog: false,
      formatToNow,
      mdiBell
    };
  }
};
</script>

<style></style>
