<template>
  <v-menu bottom origin="center center" transition="scale-transition" absolute>
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
        <v-list-item-icon>
          <v-icon color="primary">mdi-google-classroom</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
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
        title: 'Room Booking',
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
