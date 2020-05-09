<template>
  <v-bottom-navigation class="d-md-none" grow shift app>
    <NavigationItem
      v-for="item in items"
      :key="item.text"
      :item="item"
      :show-icon="true"
      active-class="active-nav"
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
