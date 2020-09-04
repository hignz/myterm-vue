<template>
  <v-app-bar hide-on-scroll flat app extended extension-height="7">
    <v-row align="center">
      <v-btn
        v-if="showBackButton"
        text
        class="font-weight-bold"
        @click="onBack()"
      >
        <v-icon class="mr-2">{{ mdiArrowLeft }}</v-icon>
        {{ title }}
      </v-btn>
      <v-spacer />
      <template>
        <slot name="icon" />
      </template>
    </v-row>
    <template v-if="this.$slots.default" v-slot:extension>
      <slot />
    </template>

    <template v-slot:extension>
      <ProgressBar style="top: -2px;" />
    </template>
  </v-app-bar>
</template>

<script>
import { mdiArrowLeft } from '@mdi/js';
import ProgressBar from '@/components/shared/ProgressBar';

export default {
  components: {
    ProgressBar
  },
  props: {
    title: {
      type: String,
      default: 'MyTerm'
    },
    showBackButton: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      mdiArrowLeft
    };
  },
  methods: {
    onBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style>
.v-toolbar__extension {
  padding: 0px !important;
}
</style>
