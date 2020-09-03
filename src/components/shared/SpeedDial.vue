<template>
  <div column class="fab-container">
    <v-speed-dial
      v-model="fab"
      bottom
      right
      transition="slide-y-reverse-transition"
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="primary darken-2" fab>
          <v-icon>{{ fab ? mdiClose : mdiUnfoldMoreHorizontal }}</v-icon>
        </v-btn>
      </template>
      <SaveBtn :is-fab="true" :is-small="true" :is-icon="false" />
      <ShareBtn
        :is-fab="true"
        :is-small="true"
        :is-icon="false"
        color="primary darken-2"
      />
      <v-btn fab dark small color="primary darken-2" @click="openBottomSheet()">
        <v-icon>{{ mdiViewList }}</v-icon>
      </v-btn>
      <v-btn
        v-if="isScrolledDown"
        fab
        dark
        small
        color="primary darken-2"
        @click="scrollTotop()"
      >
        <v-icon>{{ mdiChevronUp }}</v-icon>
      </v-btn>
    </v-speed-dial>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import SaveBtn from '@/components/shared/SaveBtn';
import ShareBtn from '@/components/shared/ShareBtn';
import {
  mdiShareVariant,
  mdiDotsVertical,
  mdiClose,
  mdiUnfoldMoreHorizontal,
  mdiChevronUp,
  mdiFingerprint,
  mdiGestureDoubleTap,
  mdiViewList
} from '@mdi/js';

export default {
  components: {
    SaveBtn,
    ShareBtn
  },
  data: () => ({
    fab: false,
    scroll: 0,
    mdiShareVariant,
    mdiDotsVertical,
    mdiClose,
    mdiUnfoldMoreHorizontal,
    mdiChevronUp,
    mdiFingerprint,
    mdiGestureDoubleTap,
    mdiViewList
  }),
  computed: {
    isScrolledDown() {
      return this.scroll > 0;
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    ...mapActions(['toggleBottomSheet']),
    onScroll() {
      this.scroll = window.scrollY;
    },
    openBottomSheet() {
      this.toggleBottomSheet(true);
    },
    scrollTotop() {
      window.scrollTo(0, 0);
    }
  }
};
</script>

<style>
.fab-container {
  position: fixed;
  bottom: 60px;
  right: 0;
  z-index: 1;
}
</style>
