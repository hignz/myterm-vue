<template>
  <div>
    <v-list-item @click="openLink(link.url)">
      <v-icon v-if="showIcon" class="ml-2 mr-6 my-4" color="primary">
        {{ link.icon }}
      </v-icon>
      <v-list-item-title>{{ link.title }}</v-list-item-title>
    </v-list-item>
  </div>
</template>

<script>
export default {
  props: {
    link: {
      type: Object,
      default: () => {},
    },
    showIcon: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
