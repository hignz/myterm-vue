<template>
  <div column class="fab-container d-md-none">
    <v-speed-dial
      v-model="fab"
      bottom
      right
      transition="slide-y-reverse-transition"
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="primary darken-1" fab>
          <v-icon>{{ fab ? 'mdi-close' : 'mdi-chevron-up' }}</v-icon>
        </v-btn>
      </template>
      <SaveBtn :is-fab="true" :is-small="true" :is-icon="false" />
      <v-btn fab dark small color="primary darken-3" @click="openShareMenu()">
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
      <v-btn fab dark small color="primary darken-4" @click="openBottomSheet()">
        <v-icon>mdi-unfold-more-horizontal</v-icon>
      </v-btn>
    </v-speed-dial>
  </div>
</template>

<script>
import SaveBtn from './SaveBtn';

export default {
  components: {
    SaveBtn
  },
  data: () => ({
    fab: false
  }),
  methods: {
    openShareMenu() {
      if (navigator.share) {
        navigator.share({
          title: 'MyTerm',
          text: 'Your timetable at a glance.',
          url: this.timetableUrl
        });
      }
    },
    openBottomSheet() {
      this.$emit('onBottomSheetClick');
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
