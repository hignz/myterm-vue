<template>
  <v-app-bar app hide-on-scroll="">
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

    <v-btn icon @click="share">
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>

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
    },
    share() {
      console.log('asdsad');
      if (navigator.share) {
        navigator.share({
          title: 'MDN',
          text: 'Learn web development on MDN!',
          url: 'https://developer.mozilla.org'
        });
      }
    }
  }
};
</script>

<style></style>
