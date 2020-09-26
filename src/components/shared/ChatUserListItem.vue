<template>
  <v-list-item dense>
    <v-list-item-content>
      <v-list-item-title>{{ user.username }}</v-list-item-title>
      <v-list-item-subtitle class="caption"
        >joined {{ formatToNow(user.joinedAt, true) }}
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import { formatToNow } from '@/utils/date';

export default {
  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      formatToNow,
    };
  },
};
</script>

<style></style>
