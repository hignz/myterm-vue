<template>
  <v-btn
    v-if="item.showOnFirstVisit || (!item.showOnFirstVisit && recentQuery)"
    :to="{ path: item.route }"
    :active-class="activeClass"
  >
    <span>{{ item.text }}</span>
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
      required: true
    },
    showIcon: {
      type: Boolean,
      default: false
    },
    activeClass: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState(['recentQuery'])
  }
};
</script>

<style>
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
