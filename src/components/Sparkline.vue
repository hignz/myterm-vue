<template>
  <v-sparkline
    :value="values"
    :gradient="gradient"
    :smooth="radius || false"
    :padding="padding"
    :stroke-linecap="lineCap"
    :gradient-direction="gradientDirection"
    :fill="fill"
    :type="type"
    :auto-line-width="autoLineWidth"
    auto-draw
    :color="labelColor"
    :labels="labels"
    :show-labels="true"
  ></v-sparkline>
</template>

<script>
import vuetify from '../plugins/vuetify';
import { mapState } from 'vuex';

const gradients = [
  vuetify.framework.theme.defaults.dark.primary,
  '#F0F',
  '#FF0'
];
export default {
  props: {
    values: {
      type: Array,
      required: true
    },
    labels: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      width: 2,
      radius: 10,
      padding: 16,
      lineCap: 'round',
      gradient: gradients,
      gradientDirection: 'left',
      gradients,
      fill: false,
      type: 'trend',
      autoLineWidth: false
    };
  },
  computed: {
    ...mapState(['darkMode']),
    labelColor() {
      return this.darkMode ? 'white' : 'black';
    }
  }
};
</script>

<style></style>
