<template>
  <v-dialog v-model="dialog" width="400">
    <template v-slot:activator="{ on, attrs }">
      <v-btn outlined small v-bind="attrs" v-on="on">
        New
        <v-icon small class="ml-2">{{ mdiPlus }}</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="headline">Add a date</v-card-title>
      <v-form @submit.prevent="submit()">
        <v-card-text>
          <v-dialog
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="dueDate"
            transition="scale-transition"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dueDate"
                label="Due Date"
                dense
                readonly
                outlined
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="dueDate" no-title color="primary darken-2">
              <v-spacer></v-spacer>
              <v-btn text @click="menu = false"> Cancel </v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(dueDate)">
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>

          <v-dialog
            ref="timeDialog"
            v-model="timeDialog"
            :return-value.sync="time"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="time"
                label="Time"
                readonly
                outlined
                dense
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="timeDialog"
              v-model="time"
              flat
              format="24hr"
              color="primary darken-2"
            >
              <v-spacer></v-spacer>
              <v-btn text @click="timeDialog = false"> Cancel </v-btn>
              <v-btn text color="primary" @click="$refs.timeDialog.save(time)">
                OK
              </v-btn>
            </v-time-picker>
          </v-dialog>
          <v-text-field
            v-model="title"
            label="Title"
            outlined
            dense
          ></v-text-field>
          <v-textarea v-model.trim="body" outlined dense clearable auto-grow>
            <template v-slot:label>
              <div>Body</div>
            </template>
          </v-textarea>

          <v-select
            v-model="teacher"
            :items="teachers"
            outlined
            dense
            label="Teacher"
          ></v-select>
          <v-select
            v-model="module"
            :items="modules"
            outlined
            dense
            label="Module"
          ></v-select>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">Close</v-btn>
          <v-btn color="primary" type="submit" text @click="dialog = false">
            Add
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiPlus } from '@mdi/js';

import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      mdiPlus,
      dialog: false,
      timeDialog: false,
      title: '',
      body: '',
      time: '',
      dueDate: null,
      menu: null,
      tags: null,
      teacher: null,
      module: null,
    };
  },
  computed: {
    ...mapState(['currentTimetable']),
    teachers() {
      return Array.from(
        new Set(
          this.currentTimetable.data
            .flat()
            .map((el) => el.teacher)
            .filter((el) => el !== undefined)
        )
      );
    },
    modules() {
      return Array.from(
        new Set(
          this.currentTimetable.data
            .flat()
            .map((el) => el.name)
            .filter((el) => el !== undefined)
        )
      );
    },
  },
  methods: {
    ...mapActions(['addAssignment']),
    submit() {
      const x = {
        name: this.title,
        start: `${this.dueDate} ${this.time}`,
        body: this.body,
        teacher: this.teacher,
        module: this.module,
        color: '#ef596f',
      };

      this.addAssignment(x)
        .then(() => {
          this.$toast.success('Assignment added');
        })
        .catch(() => {
          this.$toast.error('Failed to add assignment');
        });
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
  },
};
</script>

<style>
.theme--dark.v-picker__body {
  background-color: #161b22 !important;
}
.theme--dark.v-time-picker-clock {
  background-color: #474f57 !important;
}
</style>
