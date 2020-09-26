<template>
  <v-card outlined style="position: relative">
    <v-card-title class="subtitle-1">Room - {{ roomId }}</v-card-title>
    <v-card-text style="height:100%">
      <p class="font-weight-bold mb-8">
        Chat with your classmates, post information about cancelled classes or
        ask about upcoming assignments
      </p>
      <v-form @submit.prevent="login()">
        <v-text-field
          v-model.trim="username"
          dense
          outlined
          label="Username"
        ></v-text-field>
        <v-card-actions class="px-0">
          <v-btn text @click="goBack()">Back</v-btn>
          <v-spacer />
          <v-btn color="primary" width="150" outlined @click="login()"
            >Join</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    roomId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      username: ''
    };
  },
  methods: {
    login() {
      if (!this.username) {
        return;
      }

      this.$socket.connect();

      this.$socket.emit('joinRoom', {
        username: this.username,
        room: this.roomId
      });

      this.$emit('logged-in');
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style></style>
