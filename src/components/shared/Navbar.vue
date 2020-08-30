<template>
  <v-app-bar class="d-none d-md-flex elevation-0" app dense>
    <v-toolbar-title class="mr-12 title">
      <span>My<span class="primary--text">Term</span></span>
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
import NavigationItem from '@/components/shared/NavigationItem';
import navigationItems from '@/mixins/navigationItems';

export default {
  components: {
    NavigationItem
  },
  mixins: [navigationItems]
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
