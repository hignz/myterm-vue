<template>
  <div>
    <v-list dense three-line nav>
      <v-list-item
        v-for="assignment in assignments"
        :key="assignment.id"
        @click.stop="openDeleteDialog(assignment)"
      >
        <v-list-item-content>
          <v-list-item-title>{{ assignment.name }}</v-list-item-title>
          <v-list-item-subtitle v-if="assignment.teacher">{{
            assignment.teacher
          }}</v-list-item-subtitle>
          <v-list-item-subtitle>{{ assignment.start }} </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon @click.stop="openDeleteDialog(assignment)">
            <v-icon size="20">
              {{ mdiDelete }}
            </v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-dialog v-if="showDialog" v-model="showDialog" :width="425">
      <v-card>
        <v-card-title class="subtitle-1 text-uppercase"
          >Remove assignment</v-card-title
        >
        <v-card-text class="caption">
          <p class="mt-6">Are you sure you want to remove this assignment?</p>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn plain class="mr-2" text @click="showDialog = !showDialog">
            Cancel
          </v-btn>
          <v-btn color="error darken-1" @click="deleteCourse()">Remove</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { mdiDelete, mdiHeartBroken, mdiHeartOutline } from '@mdi/js';

export default {
  data() {
    return {
      showDialog: false,
      selectedAssignment: null,
      mdiDelete,
      mdiHeartBroken,
      mdiHeartOutline,
    };
  },
  computed: {
    ...mapState(['assignments']),
  },
  methods: {
    ...mapActions(['removeAssignment']),
    deleteCourse() {
      this.removeAssignment(this.selectedAssignment).then(() => {
        this.showDialog = false;
        this.$toast.error('Assignment removed');
      });
    },
    openDeleteDialog(assignment) {
      this.selectedAssignment = assignment;
      this.showDialog = true;
    },
  },
};
</script>

<style></style>
