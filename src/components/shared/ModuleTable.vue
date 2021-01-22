<template>
  <v-card outlined>
    <v-data-table
      :headers="headers"
      :items="modules"
      :items-per-page="10"
      class="elevation-0"
    />
  </v-card>
</template>

<script>
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
        { text: 'Module', value: 'name', align: 'left', width: '70%' },
        { text: 'Per week', value: 'count', align: 'center', width: '30%' },
      ],
    };
  },
};
</script>
