<template>
  <v-app>
    <NavBar />
    <v-content>
      <v-progress-linear
        indeterminate
        :active="loading"
        :height="2"
        color="primary"
      ></v-progress-linear>
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
    ...mapState(['darkMode', 'loading'])
  },
  created() {
    vuetify.framework.theme.dark = this.darkMode;
  },
  methods: {}
};
</script>

<style>
.active-nav {
  border-top: thin solid var(--v-primary-base) !important;
}

.accented-border {
  border: thin solid var(--v-primary-base) !important;
}

.dark-border {
  border: thin solid rgba(255, 255, 255, 0.12) !important;
}

.light-border {
  border: thin solid rgba(220, 220, 220, 1) !important;
}

html,
body {
  overflow-y: auto;
}
</style>
