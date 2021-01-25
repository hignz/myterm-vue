<template>
  <v-card :class="{ 'box-shadow': !darkMode }" :outlined="darkMode">
    <v-data-table
      :headers="headers"
      :items="modules"
      :items-per-page="15"
      class="elevation-0"
      calculate-widths
    />
  </v-card>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    modules: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      headers: [
        { text: 'Module', value: 'name', align: 'left' },
        { text: 'Per week', value: 'count', align: 'center' },
      ],
    };
  },
  computed: {
    ...mapState(['darkMode']),
  },
};
</script>
