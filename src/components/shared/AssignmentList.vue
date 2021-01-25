<template>
  <div>
    <v-list dense nav>
      <v-list-item
        v-for="(assignment, index) in assignments"
        :key="index"
        @click.stop="openEditDialog(assignment)"
      >
        <v-list-item-content>
          <v-list-item-title>{{ assignment.name }}</v-list-item-title>
          <v-list-item-title v-if="assignment.teacher">{{
            assignment.body
          }}</v-list-item-title>
          <v-list-item-subtitle v-if="assignment.teacher">{{
            assignment.teacher
          }}</v-list-item-subtitle>
          <v-list-item-subtitle
            >{{ format(assignment.start) }}
            &#x25CF;
            {{ assignment.start.split(' ')[1] }}
          </v-list-item-subtitle>
          <v-list-item-subtitle
            >{{ formatToNow(assignment.start, true) }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon @click.stop="openDeleteDialog(assignment)">
            <v-icon color="error" size="20">
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
        <v-card-text class="caption font-weight-medium">
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
    <!-- <v-dialog v-if="showEditDialog" v-model="showEditDialog" :width="425">
      <v-card>
        <v-card-title class="subtitle-1 text-uppercase"
          >Edit assignment</v-card-title
        >
        <v-card-text class="caption">
          <v-dialog
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="selectedAssignment.start"
            transition="scale-transition"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="selectedAssignment.start"
                label="Due Date"
                dense
                readonly
                outlined
                :rules="requiredRules"
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="selectedAssignment.start"
              no-title
              color="primary darken-2"
            >
              <v-spacer></v-spacer>
              <v-btn text @click="menu = false"> Cancel </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu.save(selectedAssignment.start)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
            plain
            class="mr-2"
            text
            @click="showEditDialog = !showEditDialog"
          >
            Cancel
          </v-btn>
          <v-btn color="error darken-1" @click="deleteCourse()">Edit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { mdiDelete } from '@mdi/js';
import { formatToNow, format } from '@/utils/date';

export default {
  data() {
    return {
      showDialog: false,
      showEditDialog: false,
      selectedAssignment: null,
      mdiDelete,
      formatToNow,
      format,
      menu: false,
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
    openEditDialog(assignment) {
      this.selectedAssignment = assignment;
      this.showEditDialog = true;
    },
  },
};
</script>

<style></style>
