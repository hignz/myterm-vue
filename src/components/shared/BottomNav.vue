<template>
  <v-bottom-navigation
    class="elevation-0"
    :class="{ 'safe-area': isIos }"
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
    NavigationItem,
  },
  mixins: [navigationItems],
  computed: {
    isIos() {
      console.log(navigator.platform);
      return /iPad|iPhone|iPod/.test(navigator.platform);
    },
  },
};
</script>

<style scoped>
.v-btn:not(.v-btn--text):not(.v-btn--outlined):hover:before {
  opacity: 0 !important;
}

.safe-area.v-bottom-navigation {
  height: auto !important;
}

.safe-area >>> .v-btn__content {
  padding-top: 10px !important;
  padding-bottom: 10px !important;
  margin-bottom: constant(
    safe-area-inset-bottom
  ) !important; /* move footer up on iPhone X - iOS 11.0 */
  margin-bottom: env(
    safe-area-inset-bottom
  ) !important; /* move footer up on iPhone X - iOS 11.2 */
}
</style>
