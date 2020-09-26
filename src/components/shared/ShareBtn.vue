<template>
  <v-btn
    :fab="isFab"
    :icon="isIcon"
    :small="isSmall"
    :class="{
      'primary darken-2': isFab,
    }"
    @click="canUseNavigator ? openShareMenu() : copyUrlToClipboard()"
  >
    <v-icon>
      {{ mdiShareVariant }}
    </v-icon>
  </v-btn>
</template>

<script>
import { mdiShareVariant } from '@mdi/js';
import { mapState } from 'vuex';

export default {
  props: {
    isFab: {
      type: Boolean,
      default: false,
    },
    isIcon: {
      type: Boolean,
      default: true,
    },
    isSmall: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      mdiShareVariant,
    };
  },
  computed: {
    ...mapState(['recentQuery']),
    canUseNavigator() {
      return navigator.share;
    },
    timetableUrl() {
      return `https://myterm.me/timetable?code=${decodeURIComponent(
        this.recentQuery.code
      )}&college=${this.recentQuery.college}&sem=${this.recentQuery.sem}`;
    },
  },
  methods: {
    copyUrlToClipboard() {
      navigator.clipboard.writeText(this.timetableUrl).then(() => {
        this.$toast.success('URL copied to clipboard!');
      });
    },
    openShareMenu() {
      if (navigator.share) {
        navigator.share({
          title: 'MyTerm',
          text: 'Your timetable at a glance.',
          url: this.timetableUrl,
        });
      }
    },
  },
};
</script>
