<template>
  <v-container>
    <AppBar v-if="$vuetify.breakpoint.smAndDown" title="Chat">
      <template v-if="loggedIn" v-slot:icon>
        <v-btn class="mr-1" icon @click="logout()">
          <v-icon>{{ mdiLogout }}</v-icon>
        </v-btn>
      </template>
    </AppBar>

    <v-row v-if="!loggedIn" justify="center">
      <v-col cols="11" sm="11" md="3">
        <v-row align="center" justify="center" style="height: 300px;">
          <v-alert outlined dense>
            This feature is experimental. Chat messages currently DO NOT
            persist.
          </v-alert>
          <v-card v-if="!loggedIn" outlined style="position: relative">
            <!-- <v-card-title class="subtitle-1">Join - {{ roomId }}</v-card-title> -->
            <v-card-text style="height:100%">
              <p class="font-weight-bold mb-8">
                Chat with your class mates, post information about cancelled
                classes or ask about upcoming assignments
              </p>
              <v-form @submit.prevent="login()">
                <v-text-field
                  v-model.trim="username"
                  dense
                  outlined
                  label="Username"
                ></v-text-field>
                <v-btn color="primary" outlined block @click="login()"
                  >Login</v-btn
                >
              </v-form>
            </v-card-text>
          </v-card>
        </v-row>
      </v-col>
    </v-row>

    <v-row v-else justify="center">
      <v-col cols="12" sm="12" md="8" class="pt-0">
        <v-card outlined>
          <v-card-title class="subtitle-2 font-weight-bold py-2">
            {{ roomId }}
            <v-spacer />
            <v-btn
              v-if="$vuetify.breakpoint.smAndDown"
              icon
              @click="dialog = true"
            >
              <v-icon>{{ mdiAccountGroup }}</v-icon>
            </v-btn>
            <v-btn v-if="$vuetify.breakpoint.mdAndUp" icon @click="logout()">
              <v-icon>{{ mdiLogout }}</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pa-0">
            <v-row>
              <v-col md="10">
                <v-list
                  ref="chatBox"
                  dense
                  two-line
                  height="100vh"
                  style="max-height: calc(100vh - 320px);"
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
                          <span class="caption text--disabled ml-1">{{
                            msg.time
                          }}</span></v-list-item-title
                        >
                        <v-list-item-title class="text--secondary"
                          >{{ msg.text
                          }}<span
                            v-if="msg.isBot"
                            class="caption text--disabled ml-4"
                            >{{ msg.time }}</span
                          ></v-list-item-title
                        >
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
              </v-col>
              <v-col
                v-if="$vuetify.breakpoint.mdAndUp"
                md="2"
                class="pl-0"
                style="border-left: 1px solid #3b3e44"
              >
                <v-list
                  dense
                  height="70vh"
                  style="max-height: 60vh"
                  class="overflow-y-auto"
                >
                  <v-subheader>USERS</v-subheader>

                  <v-list-item v-for="(user, i) in users" :key="i" dense>
                    <v-list-item-content>
                      <v-list-item-title
                        >{{ user.username }}
                      </v-list-item-title>
                      <v-list-item-subtitle class="caption"
                        >joined {{ formatToNow(user.joinedAt, true) }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar flat outlined>
          <v-btn icon @click="dialog = false">
            <v-icon>{{ mdiClose }}</v-icon>
          </v-btn>
          <v-toolbar-title>Users</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-list two-line subheader>
          <v-subheader>Online</v-subheader>
          <v-list-item v-for="(user, i) in users" :key="i" dense>
            <v-list-item-content>
              <v-list-item-title>{{ user.username }} </v-list-item-title>
              <v-list-item-subtitle
                >joined {{ formatToNow(user.joinedAt, true) }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { formatToNow } from '../../utils/dateFormatter';
import { mdiSend, mdiAccountGroup, mdiLogout, mdiClose } from '@mdi/js';

export default {
  components: {
    AppBar: () =>
      import(/* webpackChunkName: "bottomNav" */ '@/components/shared/AppBar')
  },
  data() {
    return {
      username: '',
      message: '',
      welcomeMessage: null,
      messages: [],
      formatToNow,
      mdiSend,
      mdiAccountGroup,
      mdiClose,
      mdiLogout,
      roomId: '',
      loggedIn: false,
      users: [],
      dialog: false,
      usersTyping: []
    };
  },
  computed: {
    concatUsersTyping() {
      if (!this.usersTyping.length) {
        return [];
      }
      return this.usersTyping.join(', ');
    }
  },
  created() {
    this.roomId = this.$route.params.id;
  },
  sockets: {
    welcome(data) {
      this.welcomeMessage = data;
    },
    message(data) {
      this.messages.push(data);

      setTimeout(() => {
        const elm = this.$refs.chatBox.$el;
        elm.scrollTop = elm.scrollHeight;
      }, 10);
    },
    roomUsers(data) {
      this.users = data.users;
    },
    disconnect(data) {
      this.users = data.users;
    },
    typing() {}
  },
  beforeDestroy() {
    this.$socket.disconnect();
  },
  methods: {
    onTyping() {
      this.$socket.emit('isTyping');
    },
    login() {
      if (!this.username) {
        return;
      }

      this.$socket.connect();

      this.$socket.emit('joinRoom', {
        username: this.username,
        room: this.roomId
      });
      this.loggedIn = true;
    },
    logout() {
      this.$socket.disconnect();
      this.loggedIn = false;
      this.username = '';
    },
    sendMessage() {
      if (!this.message) {
        return;
      }
      this.$socket.emit('chatMessage', this.message);
      this.message = '';
    }
  }
};
</script>

<style>
.v-list-item__title,
.v-list-item__subtitle {
  white-space: normal !important;
}
</style>
