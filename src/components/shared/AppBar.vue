<template>
  <v-app-bar hide-on-scroll flat app>
    <v-row justify="center" align="center">
      <v-btn text class="font-weight-bold" @click="onBack()">
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
      required: true
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
