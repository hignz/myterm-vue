<template>
  <v-sparkline
    :value="values"
    :gradient="gradient"
    smooth="10"
    padding="16"
    stroke-linecap="round"
    gradient-direction="left"
    type="trend"
    :auto-line-width="false"
    auto-draw
    :color="labelColor"
    :labels="labels"
    :show-labels="true"
  />
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    values: {
      type: Array,
      required: true,
    },
    labels: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapState(['darkMode']),
    labelColor() {
      return this.darkMode ? 'white' : 'black';
    },
    primaryColor() {
      return this.$vuetify.theme.defaults.dark.primary;
    },
    gradient() {
      return [this.$vuetify.theme.defaults.dark.primary, '#F0F'];
    },
  },
};
</script>
