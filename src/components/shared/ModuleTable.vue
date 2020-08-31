<template>
  <v-card outlined>
    <v-data-table
      :headers="headers"
      :items="moduleData"
      :items-per-page="15"
      class="elevation-0"
    />
  </v-card>
</template>

<script>
export default {
  props: {
    moduleData: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    headers: [
      { text: 'Module', align: 'left', value: 'name' },
      { text: 'Per week', value: 'count' }
    ]
  })
};
</script>
