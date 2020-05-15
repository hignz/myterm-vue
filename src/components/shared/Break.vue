<template>
  <v-menu offset-x offset-y absolute>
    <template v-slot:activator="{ on }">
      <p class="text-center primary--text pt-4" v-on="on">
        Break: {{ breakFormatted(period.breakLength) }}
      </p>
    </template>
    <v-list dense>
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        @click="navigateTo(item.url)"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
        <v-list-item-icon>
          <v-icon>mdi-library</v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  props: {
    period: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    items: [
      {
        title: 'Room booking',
        url: 'https://libreserve.itsligo.ie/'
      }
    ]
  }),
  methods: {
    breakFormatted(length) {
      const hours = length / 60;

      return length >= 60
        ? `${hours} hour${hours === 1 ? '' : 's'}`
        : `${length} minutes`;
    },
    navigateTo(url) {
      window.open(url);
    }
  }
};
</script>
