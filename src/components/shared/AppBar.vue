<template>
  <v-app-bar fixed hide-on-scroll class="d-md-none elevation-2">
    <v-row justify="center" align="center">
      <v-col class="text-left">
        <v-btn icon large @click="onBack()">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-col>
      <v-col class="text-center mr-2">
        <v-toolbar-title @click="scrollTotop()">
          {{ title }}
        </v-toolbar-title>
      </v-col>
      <v-col class="text-right">
        <v-spacer></v-spacer>
        <template>
          <slot name="icon"></slot>
        </template>
      </v-col>
    </v-row>
    <template v-if="this.$slots.default" v-slot:extension>
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
