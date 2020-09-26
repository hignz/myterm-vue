<template>
  <v-menu bottom origin="center center" transition="scale-transition" absolute>
    <template v-slot:activator="{ on }">
      <p class="text-center primary--text pt-4" v-on="on">
        Break {{ period.breakLength | toHoursMinutes }}
      </p>
    </template>
    <v-list dense>
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        @click="navigateTo(item.url)"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  filters: {
    toHoursMinutes(value) {
      const hours = value / 60;

      return value >= 60
        ? `${hours} hour${hours === 1 ? '' : 's'}`
        : `${value} minutes`;
    },
  },
  props: {
    period: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      items: [
        {
          title: 'Room Booking',
          url: 'https://libreserve.itsligo.ie/',
        },
      ],
    };
  },
  methods: {
    navigateTo(url) {
      window.open(url);
    },
  },
};
</script>
