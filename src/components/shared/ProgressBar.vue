<template>
  <v-progress-linear
    v-if="fetching"
    indeterminate
    :height="height"
    :active="fetching"
    :color="color"
  />
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    height: {
      type: Number,
      default: 1,
    },
    color: {
      type: String,
      default: 'primary',
    },
  },
  computed: {
    ...mapState(['fetching']),
  },
};
</script>

<style>
.v-progress-linear {
  -moz-transform: scale(1, -1);
  -webkit-transform: scale(1, -1);
  -o-transform: scale(1, -1);
  -ms-transform: scale(1, -1);
  transform: scale(1, -1);
}
</style>
