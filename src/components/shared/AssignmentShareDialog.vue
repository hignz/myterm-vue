<template>
  <v-dialog v-model="dialog" :width="425" persistent>
    <template #activator="{ on, attrs }">
      <v-btn
        v-if="assignments.length && $vuetify.breakpoint.xlOnly"
        outlined
        small
        v-bind="attrs"
        v-on="on"
      >
        <v-icon left>{{ mdiShareAllOutline }}</v-icon>
        Share
      </v-btn>
      <v-btn
        v-if="assignments.length && $vuetify.breakpoint.lgAndDown"
        small
        icon
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>{{ mdiShareAllOutline }}</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="subtitle-1 text-uppercase"
        >Assignment Share</v-card-title
      >
      <v-card-text class="text-center">
        <!-- <v-img
          
          class="mx-auto mb-8"
          max-height="250"
          max-width="250"
          :src="require('@/assets/undraw_share_link_qtxe.svg')"
        ></v-img> -->
        <v-row justify="center">
          <ShareLink v-if="!shareLink" />
        </v-row>
        <p v-if="!shareLink">Share your assignment list with others!</p>
        <p v-if="!shareLink">
          Get a shareable link to send to your friends so they can import your
          assignment list!
        </p>
        <v-text-field
          v-if="shareLink"
          v-model="shareLink"
          class="mt-8"
          label="Share link"
          outlined
          dense
          read-only=""
        >
        </v-text-field>
        <p v-if="shareLink">
          Copy the link above and send it to your friends to allow them to
          import your assignments
        </p>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn plain @click="dialog = false">Close</v-btn>
        <v-btn
          v-if="!shareLink"
          text
          color="primary"
          :loading="shareLoading"
          @click="postAssignments()"
          >Get Link</v-btn
        >
        <v-btn v-else text color="primary" @click="shareLinkToClipboard()"
          >Copy</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { mdiShareAllOutline, mdiClipboard } from '@mdi/js';
import ShareLink from '@/components/shared/svg/ShareLink';

export default {
  components: { ShareLink },
  data() {
    return {
      dialog: false,
      shareLoading: false,
      shareLink: null,
      mdiShareAllOutline,
      mdiClipboard,
    };
  },
  computed: {
    ...mapState(['assignments']),
  },
  methods: {
    ...mapActions(['postAssignmentList']),
    shareLinkToClipboard() {
      navigator.clipboard.writeText(this.shareLink).then(() => {
        this.$toast.success('Link copied to clipboard!');
        this.showShareDialog = false;
      });
    },
    postAssignments() {
      this.shareLoading = true;
      this.postAssignmentList({ assignments: this.assignments })
        .then((res) => {
          this.shareLink = `https://myterm.me/import-assignments/${res}`;
          this.showShareDialog = true;
        })
        .catch((err) => {
          if (err.response.status === 429) {
            this.$toast.error(err.response.data);
          } else {
            this.$toast.error("We're not sure what just happened");
          }
        })
        .finally(() => (this.shareLoading = false));
    },
  },
};
</script>

<style></style>
