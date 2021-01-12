<template>
  <v-container>
    <AppBar v-if="$vuetify.breakpoint.smAndDown" title="Import Assignments" />
    <v-row justify="center" align="center">
      <v-col sm="12" md="4">
        <v-card :loading="!isLoaded" outlined>
          <v-card-title v-if="isLoaded">Import assignment list </v-card-title>
          <v-card-title v-else
            >Trying to find the assignment list...
          </v-card-title>
          <v-card-subtitle v-if="isLoaded && assignmentList"
            >Shared:
            {{ formatToNow(assignmentList.createdAt, true) }}
          </v-card-subtitle>

          <v-row>
            <v-col sm="12" md="6">
              <v-list v-if="isLoaded && assignmentList" dense subheader>
                <v-subheader>Your list</v-subheader>
                <v-list-item
                  v-for="(assignment, index) in assignments"
                  :key="index"
                >
                  <v-list-item-content>
                    <v-list-item-title>{{ assignment.name }}</v-list-item-title>
                    <v-list-item-subtitle v-if="assignment.body">{{
                      assignment.body
                    }}</v-list-item-subtitle>
                    <v-list-item-subtitle v-if="assignment.teacher">{{
                      assignment.teacher
                    }}</v-list-item-subtitle>
                    <v-list-item-subtitle v-if="assignment.module">{{
                      assignment.module
                    }}</v-list-item-subtitle>
                    <v-list-item-subtitle
                      >{{ format(assignment.start) }} at
                      {{ assignment.start.split(' ')[1] }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle
                      >{{ formatToNow(assignment.start, true) }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>

              <v-card-text v-if="isLoaded && !assignments.length">
                <p>You do not have any assignments added</p>
              </v-card-text>
            </v-col>
            <v-col sm="12" md="6">
              <v-list v-if="isLoaded && assignmentList" dense subheader>
                <v-subheader>List to import</v-subheader>
                <v-list-item
                  v-for="(assignment, index) in assignmentList.assignments"
                  :key="index"
                >
                  <v-list-item-content>
                    <v-list-item-title>{{ assignment.name }}</v-list-item-title>
                    <v-list-item-subtitle v-if="assignment.body">{{
                      assignment.body
                    }}</v-list-item-subtitle>
                    <v-list-item-subtitle v-if="assignment.teacher">{{
                      assignment.teacher
                    }}</v-list-item-subtitle>
                    <v-list-item-subtitle v-if="assignment.module">{{
                      assignment.module
                    }}</v-list-item-subtitle>
                    <v-list-item-subtitle
                      >{{ format(assignment.start) }} at
                      {{ assignment.start.split(' ')[1] }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle
                      >{{ formatToNow(assignment.start, true) }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>

            <v-card-text v-if="isLoaded && !assignmentList">
              <p>
                Something went wrong. Are you sure the share link is correct?
              </p>
            </v-card-text>
          </v-row>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-dialog v-model="overwriteDialog" :width="425">
              <template v-slot:activator="{ on, attrs }">
                <v-btn text color="error" v-bind="attrs" v-on="on"
                  >Overwrite</v-btn
                >
              </template>

              <v-card>
                <v-card-title class="subtitle-1 text-uppercase"
                  >Overwrite</v-card-title
                >
                <v-card-text>
                  <p>
                    Overwriting will
                    <span class="error--text">replace</span> your current
                    assignments with the imported ones.
                  </p>
                  <p>
                    You will the assignments that you created. Are you sure you
                    want to do this?
                  </p>
                </v-card-text>

                <v-card-actions>
                  <v-spacer />
                  <v-btn text @click="overwriteDialog = false">Cancel</v-btn>
                  <v-btn text color="error" @click="overwrite()"
                    >Overwrite</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog v-model="mergeDialog" :width="425">
              <template v-slot:activator="{ on, attrs }">
                <v-btn text color="primary" v-bind="attrs" v-on="on"
                  >Merge</v-btn
                >
              </template>

              <v-card>
                <v-card-title class="subtitle-1 text-uppercase"
                  >Merge</v-card-title
                >
                <v-card-text>
                  <p>
                    This will
                    <span class="primary--text">merge</span> your current
                    assignments with the shared assignment list.
                  </p>
                  <p>
                    It will combine both lists. Are you sure you want to do
                    this?
                  </p>
                </v-card-text>

                <v-card-actions>
                  <v-spacer />
                  <v-btn text @click="mergeDialog = false">Cancel</v-btn>
                  <v-btn text color="primary" @click="merge()">Merge</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { formatToNow, format } from '@/utils/date';
import genericMetaInfo from '@/mixins/genericMetaInfo';

export default {
  components: {
    AppBar: () =>
      import(/* webpackChunkName: "appbar" */ '@/components/shared/AppBar'),
  },
  mixins: [genericMetaInfo],
  data() {
    return {
      assignmentList: null,
      overwriteDialog: false,
      mergeDialog: false,
      isLoaded: false,
      formatToNow,
      format,
    };
  },
  computed: {
    ...mapState(['assignments']),
  },
  created() {
    this.fetchAssignmentList(this.$route.params.id)
      .then((res) => {
        this.assignmentList = res;
      })
      .catch(() => {
        this.$toast.error('Invalid share code');
      })
      .finally(() => {
        this.isLoaded = true;
      });
  },
  methods: {
    ...mapActions([
      'fetchAssignmentList',
      'mergeAssignments',
      'overwriteAssignments',
    ]),
    overwrite() {
      this.overwriteAssignments(this.assignmentList.assignments)
        .then(() => {
          this.overwriteDialog = false;
          this.$toast.success('Assignments overwritten');
        })
        .catch(() => {
          this.$toast.error('Overwrite failed');
        });
    },
    merge() {
      this.mergeAssignments(this.assignmentList.assignments)
        .then(() => {
          this.mergeDialog = false;
          this.$toast.success('Assignments merged');
        })
        .catch(() => {
          this.$toast.error('Merge failed');
        });
    },
  },
};
</script>

<style></style>
