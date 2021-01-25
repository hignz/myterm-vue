<template>
  <v-app>
    <NavBar v-if="$vuetify.breakpoint.mdAndUp" />
    <v-main>
      <router-view :key="$route.fullPath" />
    </v-main>
    <BottomNav v-if="$vuetify.breakpoint.smAndDown" />
  </v-app>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'App',
  components: {
    BottomNav: () =>
      import(
        /* webpackChunkName: "bottomNav" */ '@/components/shared/BottomNav'
      ),
    NavBar: () =>
      import(/* webpackChunkName: "navbar" */ '@/components/shared/Navbar'),
  },
  computed: {
    ...mapState(['darkMode']),
  },
  created() {
    this.$vuetify.theme.isDark = this.darkMode;
  },
};
</script>

<style>
html,
body {
  overflow-y: overlay;
}

.active-nav {
  border-top: 1px solid var(--v-primary-base) !important;
  -webkit-box-shadow: 0 -6px 7px -10px var(--v-primary-base) !important;
  -moz-box-shadow: 0 -6px 7px -10px var(--v-primary-base) !important;
  box-shadow: 0 -6px 7px -10px var(--v-primary-base) !important;
}

.box-shadow {
  box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px !important;
}

.dark-border {
  border: thin solid rgba(255, 255, 255, 0.12) !important;
}

.light-border {
  border: thin solid rgba(0, 0, 0, 0.12) !important;
}

.pointer {
  cursor: pointer;
}

::-webkit-scrollbar {
  width: 9px;
}

::-webkit-scrollbar-track {
  background: var(--v-background-base);
}

::-webkit-scrollbar-thumb {
  background: var(--v-scrollbar-base);
  border-radius: 8px;
}

::-webkit-scrollbar-thumb:hover {
  background: #474f57;
}

/* firefox workaround */
:root {
  scrollbar-color: #282c34 #0d1117 !important;
  scrollbar-width: thin !important;
}
</style>
