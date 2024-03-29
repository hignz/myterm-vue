<template>
  <v-dialog v-model="dialog" width="400" @click:outside="close()">
    <template #activator="{ on, attrs }">
      <v-btn outlined small v-bind="attrs" v-on="on">
        New
        <v-icon small class="ml-2">{{ mdiPlus }}</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="headline">Add a date</v-card-title>
      <v-form ref="form" v-model="valid" @submit.prevent="submit()">
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
            <template #activator="{ on, attrs }">
              <v-text-field
                v-model="dueDate"
                label="Due Date"
                dense
                readonly
                outlined
                :rules="requiredRules"
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="dueDate" no-title color="primary">
              <v-spacer></v-spacer>
              <v-btn plain @click="menu = false">Cancel</v-btn>
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
            <template #activator="{ on, attrs }">
              <v-text-field
                v-model="time"
                label="Time"
                readonly
                :rules="requiredRules"
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
              <v-btn plain @click="timeDialog = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.timeDialog.save(time)">
                OK
              </v-btn>
            </v-time-picker>
          </v-dialog>
          <v-text-field
            v-model="title"
            label="Title"
            :rules="requiredRules"
            outlined
            dense
          ></v-text-field>
          <v-textarea v-model.trim="body" outlined dense clearable auto-grow>
            <template #label>
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
          <v-btn plain @click="close()">Close</v-btn>
          <v-btn color="primary" type="submit" text>Add</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiPlus } from '@mdi/js';
import { mapActions, mapGetters, mapState } from 'vuex';
import { v4 as uuidv4 } from 'uuid';

export default {
  data() {
    return {
      mdiPlus,
      dialog: false,
      timeDialog: false,
      title: '',
      body: '',
      time: '',
      dueDate: '',
      menu: null,
      tags: null,
      teacher: '',
      module: '',
      valid: false,
      requiredRules: [(v) => !!v || 'This field is required'],
    };
  },
  computed: {
    ...mapState(['assignments', 'currentTimetable', 'showWeekends']),
    ...mapGetters(['getTimetableByWeekdays']),
    teachers() {
      return [
        ...new Set(
          this.getTimetableByWeekdays
            .flat()
            .map((el) => el.teacher)
            .filter((e) => e)
        ),
      ];
    },
    modules() {
      return [
        ...new Set(
          this.getTimetableByWeekdays
            .flat()
            .map((el) => el.name)
            .filter((e) => e)
        ),
      ];
    },
  },
  methods: {
    ...mapActions(['addAssignment']),
    close() {
      this.$refs.form.reset();
      this.dialog = false;
    },
    submit() {
      const colors = ['#41D1AB', '#72DDF7', '#ef596f', '#009DF8', '#ff79c6'];

      if (this.$refs.form.validate()) {
        const assignment = {
          id: uuidv4(),
          name: this.title,
          start: `${this.dueDate} ${this.time}`,
          body: this.body || '',
          teacher: this.teacher || '',
          module: this.module || '',
          color: colors[this.rnd(0, colors.length - 1)],
        };

        this.addAssignment(assignment)
          .then(() => {
            this.close();
            this.$toast.success('Assignment added');
          })
          .catch(() => {
            this.$toast.error('Failed to add assignment');
          });
      }
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
  },
};
</script>

<style>
.theme--dark.v-picker__body {
  background-color: var(--v-background-darken) !important;
}
.theme--dark.v-time-picker-clock {
  background-color: var(--v-background-darken) !important;
}
.theme--light.v-picker__body {
  background-color: var(--v-background-base) !important;
}
.theme--light.v-time-picker-clock {
  background-color: var(--v-background-base) !important;
}
</style>
