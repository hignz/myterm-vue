<template>
  <v-container>
    <AppBar title="About"></AppBar>
    <v-row justify="center">
      <v-col cols="12" sm="6">
        <v-card
          v-bind:class="{
            'accented-border': accentedBorders,
            'dark-border': !accentedBorders
          }"
          flat
        >
          <v-card-text>
            <p class="grey--text text-center mt-6">v0.2.1</p>
            <p class="grey--text text-center">By: Aaron Higgins</p>
          </v-card-text>
          <v-card-actions>
            <v-btn block text color="primary" @click="openGithub()"
              >Github</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AppBar from '../components/AppBar';

export default {
  components: {
    AppBar
  },
  methods: {
    openGithub() {
      window.open('https://github.com/hignz');
    }
  }
};
</script>

<style></style>
