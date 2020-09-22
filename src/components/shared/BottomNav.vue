<template>
  <v-bottom-navigation
    class="elevation-0"
    grow
    height="50"
    app
    active-class="active-nav"
  >
    <NavigationItem
      v-for="item in items"
      :key="item.text"
      :item="item"
      :show-icon="true"
    />
  </v-bottom-navigation>
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
.v-btn:not(.v-btn--text):not(.v-btn--outlined):hover:before {
  opacity: 0 !important;
}
</style>
