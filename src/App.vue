<template>
  <v-app>
    <NavBar />
    <v-content>
      <v-progress-linear
        indeterminate
        :active="fetching"
        :height="2"
        color="primary"
      />
      <router-view :key="$route.fullPath" />
    </v-content>
    <BottomNav />
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import 'animate.css';

import BottomNav from '@/components/shared/BottomNav';
import NavBar from '@/components/shared/Navbar';
import vuetify from '@/plugins/vuetify';

export default {
  name: 'App',
  components: { BottomNav, NavBar },
  computed: {
    ...mapState(['darkMode', 'fetching'])
  },
  created() {
    vuetify.framework.theme.dark = this.darkMode;
  }
};
</script>

<style>
html,
body {
  overflow-y: auto;
}

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

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #21252b;
}

::-webkit-scrollbar-thumb {
  background: #282c34;
  border-radius: 3px;
}
</style>
