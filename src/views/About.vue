<template>
  <v-container>
    <AppBar title="About"></AppBar>
    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
            <p class="grey--text text-center mt-4">v0.2.0</p>
            <p class="grey--text text-center">By: Aaron Higgins</p>
          </v-card-text>
          <v-card-actions>
            <v-btn block text @click="openGithub">Github</v-btn>
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
