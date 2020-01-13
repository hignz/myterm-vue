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
    :labels="labels"
    :show-labels="true"
  ></v-sparkline>
</template>

<script>
const gradients = [
  ['#56b6c2', '#F0F', '#FF0'],
  ['#f72047', '#ffd200', '#1feaea']
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
      gradient: gradients[0],
      gradientDirection: 'right',
      gradients,
      fill: false,
      type: 'trend',
      autoLineWidth: false
    };
  }
};
</script>

<style></style>
