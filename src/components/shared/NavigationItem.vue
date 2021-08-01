<template>
  <v-btn
    v-if="item.showOnFirstVisit || (!item.showOnFirstVisit && recentQuery)"
    :ripple="false"
    :to="{ path: item.route }"
    :title="item.text"
  >
    <span v-if="!showIcon">{{ item.text }}</span>
    <v-icon v-if="showIcon">
      {{ item.icon }}
    </v-icon>
  </v-btn>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    showIcon: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState(['recentQuery']),
  },
};
</script>

<style>
a.active-nav > span > span.v-icon {
  color: var(--v-primary-base) !important;
}
.v-btn:not(.v-btn--text):not(.v-btn--outlined):focus:before {
  opacity: 0;
}
.theme--dark.v-btn:focus::before {
  opacity: 0;
}
.theme--light.v-btn:focus::before {
  opacity: 0;
}
</style>
