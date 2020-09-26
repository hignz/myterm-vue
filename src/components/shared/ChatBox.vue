<template>
  <div>
    <v-list
      ref="chatBox"
      dense
      two-line
      height="100vh"
      style="max-height: calc(100vh - 320px)"
      class="overflow-y-auto"
    >
      <template v-if="messages.length">
        <v-list-item v-for="(msg, i) in messages" :key="i">
          <v-list-item-content>
            <v-list-item-title
              v-if="!msg.isBot"
              class="body-2 mb-2"
              :class="{ 'primary--text': msg.self }"
              >{{ msg.username }}
              <span class="caption text--disabled ml-1">{{ msg.time }}</span>
            </v-list-item-title>
            <v-list-item-title class="text--secondary"
              >{{ msg.text }}
              <span v-if="msg.isBot" class="caption text--disabled ml-4">
                {{ msg.time }}
              </span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
    <v-form class="pa-2" @submit.prevent="sendMessage()">
      <v-text-field
        v-model.trim="message"
        :append-icon="mdiSend"
        dense
        outlined
        hide-details
        autofocus
        placeholder="Message"
        type="text"
        autocomplete="off"
        @click:append="sendMessage()"
      ></v-text-field>
      <p v-if="concatUsersTyping.length" class="mt-2 mb-0">
        {{ concatUsersTyping }} is typing...
      </p>
    </v-form>
  </div>
</template>

<script>
import { mdiSend } from '@mdi/js';

export default {
  data() {
    return {
      message: '',
      messages: [],
      mdiSend,
      usersTyping: [],
    };
  },
  sockets: {
    message(data) {
      this.messages.push(data);

      setTimeout(() => {
        const elm = this.$refs.chatBox.$el;
        elm.scrollTop = elm.scrollHeight;
      }, 10);
    },
    typing() {},
  },
  computed: {
    concatUsersTyping() {
      if (!this.usersTyping.length) {
        return [];
      }
      return this.usersTyping.join(', ');
    },
  },
  methods: {
    onTyping() {
      this.$socket.emit('isTyping');
    },
    sendMessage() {
      if (!this.message) {
        return;
      }
      this.$socket.emit('chatMessage', this.message);
      this.message = '';
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
.v-list-item__title,
.v-list-item__subtitle {
  white-space: normal !important;
}
</style>
