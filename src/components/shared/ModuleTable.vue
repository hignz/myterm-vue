<template>
  <v-card outlined>
    <v-data-table
      :headers="headers"
      :items="moduleData"
      :items-per-page="10"
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
      { text: 'Module', value: 'name', align: 'left', width: '70%' },
      { text: 'Per week', value: 'count', align: 'center', width: '30%' }
    ]
  })
};
</script>
