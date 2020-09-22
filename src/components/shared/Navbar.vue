<template>
  <v-app-bar class="elevation-0" app dense extended extension-height="7">
    <v-toolbar-title class="mr-14 title">
      <span>My<span class="primary--text">Term</span></span>
    </v-toolbar-title>
    <v-btn-toggle group active-class="active">
      <NavigationItem
        v-for="item in items"
        :key="item.text"
        :item="item"
        :show-icon="false"
      />
    </v-btn-toggle>
    <template v-slot:extension>
      <ProgressBar style="top: -4px;" />
    </template>
  </v-app-bar>
</template>

<script>
import NavigationItem from '@/components/shared/NavigationItem';
import navigationItems from '@/mixins/navigationItems';
import ProgressBar from '@/components/shared/ProgressBar';

export default {
  components: {
    NavigationItem,
    ProgressBar
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
.v-toolbar__extension {
  padding: 0px !important;
}
</style>
