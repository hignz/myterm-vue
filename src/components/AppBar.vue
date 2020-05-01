<template>
  <v-app-bar fixed hide-on-scroll class="d-md-none">
    <v-btn icon @click="onBack">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>

    <v-toolbar-title @click="scrollTotop">
      {{ title }}
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <template>
      <slot name="icon"></slot>
    </template>

    <template v-slot:extension v-if="this.$slots.default">
      <slot></slot>
    </template>
  </v-app-bar>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    onBack() {
      this.$router.go(-1);
    },
    scrollTotop() {
      window.scrollTo(0, 0);
    }
  }
};
</script>

<style></style>
