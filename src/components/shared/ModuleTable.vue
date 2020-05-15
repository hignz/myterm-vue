<template>
  <v-data-table
    :headers="headers"
    :items="moduleData"
    :items-per-page="15"
    class="elevation-0"
    :class="accentedBorder"
  />
</template>

<script>
import accentedBorder from '@/mixins/accentedBorder';

export default {
  mixins: [accentedBorder],
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
