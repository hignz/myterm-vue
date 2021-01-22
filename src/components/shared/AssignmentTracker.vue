<template>
  <div>
    <div v-if="!assignments.length && !getStarted" outlined>
      <v-card-text class="text-center">
        <v-img
          class="mx-auto"
          max-height="250"
          max-width="250"
          :src="require('@/assets/undraw_completed_tasks_vs6q.svg')"
        ></v-img>
        <p class="text-h5 mt-4">Assignment Tracker</p>
        <p class="mt-4">Never forget another important date!</p>
        <p>
          Keep track of upcoming projects, assignments or other important dates.
        </p>
        <v-btn outlined color="primary" @click="getStarted = true"
          >Get Started</v-btn
        >
      </v-card-text>
    </div>
    <div v-else outlined>
      <v-tabs v-model="tab">
        <v-tab>Tracker</v-tab>
        <v-tab v-if="assignments.length">Assignments</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-sheet>
            <v-toolbar flat>
              <AssignmentShareDialog v-if="assignments.length" />
              <v-spacer></v-spacer>
              <AddAssignmentDialog />
              <v-menu offset-y bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn small outlined v-bind="attrs" class="ml-2" v-on="on">
                    <span>{{ typeToLabel[type] }}</span>
                    <v-icon right>{{ mdiMenuDown }}</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="type = 'day'">
                    <v-list-item-title>Day</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = 'week'">
                    <v-list-item-title>Week</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = 'month'">
                    <v-list-item-title>Month</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-toolbar>
            <v-toolbar flat dense>
              <v-btn fab text small color="grey darken-2" @click="prev">
                <v-icon>{{ mdiChevronLeft }}</v-icon>
              </v-btn>
              <v-toolbar-title class="mx-2 font-weight-medium">
                {{ currentDate }}
              </v-toolbar-title>
              <v-btn fab text small color="grey darken-2" @click="next">
                <v-icon>{{ mdiChevronRight }}</v-icon>
              </v-btn>
            </v-toolbar>
          </v-sheet>
          <v-sheet height="350" class="ma-4">
            <v-calendar
              ref="calendar"
              v-model="focus"
              color="primary darken-2"
              :events="assignments"
              :type="type"
              first-time="01:00"
              :weekdays="[1, 2, 3, 4, 5, 6, 0]"
              @click:event="showEvent"
              @click:more="viewDay"
              @click:date="viewDay"
              @change="updateRange"
            >
            </v-calendar>
            <v-menu
              v-model="selectedOpen"
              :close-on-content-click="false"
              :activator="selectedElement"
              left
            >
              <v-card min-width="350px" max-width="500" flat>
                <v-toolbar dense flat>
                  <v-toolbar-title>{{ selectedEvent.name }}</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <p v-if="selectedEvent.start">
                    Due {{ selectedEvent.start }}
                  </p>

                  <p v-if="selectedEvent.start">
                    {{ formatToNow(selectedEvent.start, true) }}
                  </p>
                  <p>
                    {{ selectedEvent.module }}
                  </p>
                  <p>
                    {{ selectedEvent.teacher }}
                  </p>
                  <p>
                    {{ selectedEvent.body }}
                  </p>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    :color="selectedEvent.color"
                    @click="selectedOpen = false"
                  >
                    Close
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
          </v-sheet>
        </v-tab-item>
        <v-tab-item>
          <AssignmentList />
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
import { mdiMenuDown, mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import { mapState } from 'vuex';
import AddAssignmentDialog from '@/components/shared/AddAssignmentDialog';
import AssignmentList from '@/components/shared/AssignmentList';
import AssignmentShareDialog from '@/components/shared/AssignmentShareDialog';
import { formatToNow, format } from '@/utils/date';

export default {
  components: { AddAssignmentDialog, AssignmentShareDialog, AssignmentList },
  data() {
    return {
      currentDate: null,
      focus: '',
      format,
      formatToNow,
      mdiMenuDown,
      mdiChevronLeft,
      mdiChevronRight,
      showShareDialog: false,
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      getStarted: false,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      type: 'month',
      typeToLabel: {
        month: 'Month',
        week: 'Week',
        day: 'Day',
      },
      tab: null,
    };
  },
  computed: {
    ...mapState(['assignments']),
  },
  methods: {
    updateRange({ start }) {
      this.currentDate = `${this.months[start.month - 1]} ${start.year}`;
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = 'day';
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = '';
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;

        setTimeout(() => {
          this.selectedOpen = true;
        }, 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
  },
};
</script>

<style scoped>
::v-deep.theme--dark.v-calendar-weekly {
  background-color: #161b22 !important;
}
::v-deep.theme--dark.v-calendar-weekly .v-calendar-weekly__day.v-outside {
  background-color: #0d1117 !important;
}
::v-deep.theme--dark.v-calendar-weekly
  .v-calendar-weekly__head-weekday.v-outside {
  background-color: #0d1117 !important;
}
::v-deep.theme--dark.v-calendar-daily {
  background-color: #161b22 !important;
}
::v-deep.theme--dark.v-toolbar.v-sheet {
  background-color: #161b22 !important;
}
::v-deep.theme--light.v-toolbar.v-sheet {
  background-color: #fff !important;
}
</style>
