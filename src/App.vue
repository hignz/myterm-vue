<template>
  <v-app>
    <NavBar v-if="$vuetify.breakpoint.mdAndUp" />
    <v-main>
      <v-progress-linear
        class="mt-2"
        indeterminate
        :height="2"
        :active="fetching"
        color="primary"
      />
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
      import(/* webpackChunkName: "navbar" */ '@/components/shared/Navbar')
  },
  computed: {
    ...mapState(['darkMode', 'fetching', 'accentColor'])
  },
  mounted() {
    this.$vuetify.theme.isDark = this.darkMode;
  }
};
</script>

<style>
html,
body {
  overflow-y: auto;
}

.active-nav {
  border-top: 1px solid var(--v-primary-base) !important;
  -webkit-box-shadow: 0 -8px 5px -10px var(--v-primary-base) !important;
  -moz-box-shadow: 0 -8px 5px -10px var(--v-primary-base) !important;
  box-shadow: 0 -8px 5px -10px var(--v-primary-base) !important;
}

.dark-border {
  border: thin solid rgba(255, 255, 255, 0.12) !important;
}

.light-border {
  border: thin solid rgba(220, 220, 220, 1) !important;
}

.pointer {
  cursor: pointer;
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
