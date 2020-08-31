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
import vuetify from '@/plugins/vuetify';

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
  data: () => ({
    gradient: [vuetify.framework.theme.defaults.dark.primary, '#F0F', '#FF0']
  }),
  computed: {
    ...mapState(['darkMode']),
    labelColor() {
      return this.darkMode ? 'white' : 'black';
    }
  }
};
</script>
