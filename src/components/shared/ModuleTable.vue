<template>
  <v-data-table
    :headers="headers"
    :items="moduleData"
    :items-per-page="15"
    class="elevation-0"
  >
  </v-data-table>
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
      {
        text: 'Module',
        align: 'left',
        sortable: true,
        value: 'name'
      },
      { text: 'Per week', value: 'count' }
    ]
  })
};
</script>
