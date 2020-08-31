<template>
  <v-app-bar hide-on-scroll flat app>
    <v-row justify="center" align="center">
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
  </v-app-bar>
</template>

<script>
import { mdiArrowLeft } from '@mdi/js';

export default {
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
