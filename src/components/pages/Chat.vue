<template>
  <v-container>
    <AppBar v-if="$vuetify.breakpoint.smAndDown" title="Chat">
      <template v-if="loggedIn" #icon>
        <v-btn class="mr-1" icon @click="logout()">
          <v-icon>{{ mdiLogout }}</v-icon>
        </v-btn>
      </template>
    </AppBar>

    <v-row v-if="!loggedIn" justify="center">
      <v-col cols="11" sm="11" md="3">
        <v-row align="center" justify="center" style="height: 300px">
          <v-alert outlined dense>
            This feature is experimental. Chat messages currently DO NOT
            persist.
          </v-alert>
          <ChatLogin
            v-if="!loggedIn"
            :room-id="roomId"
            @logged-in="loggedIn = true"
          />
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
                <ChatBox />
              </v-col>
              <v-col v-if="$vuetify.breakpoint.mdAndUp" md="2" class="pl-0">
                <v-list
                  dense
                  height="100%"
                  style="max-height: 80vh; border-left: 1px solid #3b3e44"
                  class="overflow-y-auto"
                >
                  <ChatUserListItem
                    v-for="(user, i) in users"
                    :key="i"
                    :user="user"
                  />
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
        <v-toolbar flat outlined color="transparent">
          <v-btn icon @click="dialog = false">
            <v-icon>{{ mdiClose }}</v-icon>
          </v-btn>
          <v-toolbar-title>Users</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-list two-line subheader>
          <v-subheader>Online</v-subheader>
          <ChatUserListItem v-for="(user, i) in users" :key="i" :user="user" />
        </v-list>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mdiAccountGroup, mdiLogout, mdiClose } from '@mdi/js';
import ChatUserListItem from '@/components/shared/ChatUserListItem';
import ChatBox from '@/components/shared/ChatBox';
import ChatLogin from '@/components/shared/ChatLogin';

export default {
  components: {
    AppBar: () =>
      import(/* webpackChunkName: "bottomNav" */ '@/components/shared/AppBar'),
    ChatBox,
    ChatLogin,
    ChatUserListItem,
  },
  data() {
    return {
      mdiAccountGroup,
      mdiClose,
      mdiLogout,
      roomId: '',
      loggedIn: false,
      users: [],
      dialog: false,
    };
  },
  created() {
    this.roomId = this.$route.params.id;
  },
  sockets: {
    roomUsers(data) {
      this.users = data.users;
    },
    disconnect(data) {
      this.users = data.users;
    },
  },
  beforeDestroy() {
    this.$socket.disconnect();
  },
  methods: {
    logout() {
      this.$socket.disconnect();
      this.loggedIn = false;
      this.username = '';
    },
  },
};
</script>
