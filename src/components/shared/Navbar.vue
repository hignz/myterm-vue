<template>
  <v-app-bar class="d-none d-md-flex elevation-0" :color="themeColor" app dense>
    <v-toolbar-title class="mr-12 align-center">
      <span class="title">My<span class="primary--text">Term</span> </span>
    </v-toolbar-title>
    <v-btn-toggle group>
      <NavigationItem
        v-for="item in items"
        :key="item.text"
        :item="item"
        :show-icon="false"
        active-class="active"
      />
    </v-btn-toggle>
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex';
import NavigationItem from '@/components/shared/NavigationItem';
import navigationItems from '@/mixins/navigationItems';

export default {
  components: {
    NavigationItem
  },
  mixins: [navigationItems],
  computed: {
    ...mapState(['darkMode']),
    themeColor() {
      return this.darkMode ? '#21252b' : '#ffffff';
    }
  }
};
</script>

<style scoped>
.v-btn--active.active::before {
  opacity: 0 !important;
}
.v-btn--active.active {
  border-bottom: 1px solid var(--v-primary-base) !important;
}
</style>
