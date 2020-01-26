<template>
  <v-app>
    <NavBar />
    <v-content>
      <router-view :key="$route.fullPath"></router-view>
    </v-content>
    <BottomNav />
  </v-app>
</template>

<script>
import BottomNav from './components/BottomNav';
import NavBar from './components/Navbar';
import vuetify from './plugins/vuetify';
import { mapState } from 'vuex';

export default {
  name: 'App',
  components: { BottomNav, NavBar },
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

<style>
.active-nav {
  border-top: 1px solid var(--v-primary-base);
}

html,
body {
  overflow-y: auto;
}
</style>
