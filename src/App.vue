<template>
  <v-app>
    <v-content>
      <router-view :key="$route.fullPath"></router-view>
    </v-content>
    <BottomNav />
  </v-app>
</template>

<script>
import BottomNav from './components/BottomNav';
import vuetify from './plugins/vuetify';
import { mapState } from 'vuex';

export default {
  name: 'App',
  components: { BottomNav },
  data: () => ({}),
  computed: {
    ...mapState(['darkMode'])
  },
  created() {
    vuetify.framework.theme.dark = this.darkMode;
  },
  methods: {}
};
</script>

<style></style>
