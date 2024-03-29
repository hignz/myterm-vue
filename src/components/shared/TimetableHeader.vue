<template>
  <v-card
    v-if="currentTimetable"
    :class="{ 'box-shadow': !darkMode }"
    :outlined="darkMode"
  >
    <v-card-title
      style="word-break: keep-all"
      class="subtitle-1 font-weight-medium"
    >
      {{ currentTimetable.title }}
    </v-card-title>
    <v-card-subtitle>
      <v-menu v-if="$vuetify.breakpoint.mdAndUp" offset-y max-width="200">
        <template #activator="{ on }">
          <p class="pointer caption font-weight-medium" v-on="on">
            {{ currentTimetable.college }}
            <v-icon size="16" color="grey">{{ mdiChevronDown }}</v-icon>
          </p>
        </template>
        <v-list dense>
          <QuickLinkItem
            v-for="(link, index) in links[courseOptions.college]"
            :key="index"
            :link="link"
          />
        </v-list>
      </v-menu>
      <v-bottom-sheet
        v-if="$vuetify.breakpoint.smAndDown"
        v-model="bottomSheet"
      >
        <template #activator="{ on }">
          <p class="caption font-weight-medium" v-on="on">
            {{ currentTimetable.college }}
          </p>
        </template>
        <v-list>
          <v-subheader>Open</v-subheader>
          <QuickLinkItem
            v-for="(link, index) in links[courseOptions.college]"
            :key="index"
            :link="link"
            :show-icon="true"
          />
        </v-list>
      </v-bottom-sheet>
    </v-card-subtitle>
    <v-card-actions>
      <span class="ml-2 font-weight-medium text--secondary caption"
        >Semester</span
      >
      <v-chip-group v-model="semester" mandatory class="ml-3">
        <v-chip
          v-for="(n, i) in 2"
          :key="i"
          outlined
          filter
          :color="semester === i ? 'primary' : ''"
          :filter-icon="mdiSchool"
          @click="switchSemester(i)"
          >{{ n }}</v-chip
        >
      </v-chip-group>
      <v-btn
        icon
        :to="{
          name: 'Chat',
          params: {
            id: courseOptions.code,
          },
        }"
      >
        <v-icon>{{ mdiChatOutline }}</v-icon>
      </v-btn>

      <v-spacer />
      <v-dialog
        v-if="$vuetify.breakpoint.mdAndDown"
        v-model="assignmentDialog"
        width="450"
      >
        <template #activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            title="Assignment Tracker"
            aria-label="Assignment Tracker"
            v-on="on"
          >
            <v-icon>{{ mdiCalendarMonth }}</v-icon>
          </v-btn>
        </template>
        <v-card>
          <AssignmentTracker />
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn plain @click="assignmentDialog = !assignmentDialog"
              >Close</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <SaveBtn />
      <ShareBtn v-if="$vuetify.breakpoint.mdAndUp" />
      <v-btn
        v-if="$vuetify.breakpoint.mdAndUp"
        icon
        title="Stats"
        :to="{
          path: '/timetable/stats',
          query: {
            code: courseOptions.code,
            college: courseOptions.college,
            sem: courseOptions.sem,
          },
        }"
      >
        <v-icon>
          {{ mdiChartBoxOutline }}
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import SaveBtn from '@/components/shared/SaveBtn';
import QuickLinkItem from '@/components/shared/QuickLinkItem';
import {
  mdiChartPie,
  mdiShareVariant,
  mdiChevronDown,
  mdiBell,
  mdiChatOutline,
  mdiChartBoxOutline,
  mdiCalendarMonth,
  mdiSchool,
} from '@mdi/js';
import { formatToNow } from '@/utils/date';
import ShareBtn from './ShareBtn';
import quickLinks from '@/mixins/quickLinks';
import AssignmentTracker from '@/components/shared/AssignmentTracker';

export default {
  components: {
    AssignmentTracker,
    SaveBtn,
    ShareBtn,
    QuickLinkItem,
  },
  mixins: [quickLinks],
  data() {
    return {
      mdiChartPie,
      mdiShareVariant,
      mdiChevronDown,
      mdiBell,
      mdiChatOutline,
      mdiChartBoxOutline,
      mdiCalendarMonth,
      assignmentDialog: false,
      formatToNow,
      semester: null,
      mdiSchool,
    };
  },
  computed: {
    ...mapState([
      'currentTimetable',
      'recentQuery',
      'showBottomSheet',
      'darkMode',
    ]),
    bottomSheet: {
      get() {
        return this.showBottomSheet;
      },
      set(value) {
        this.toggleBottomSheet(value);
      },
    },
    courseOptions() {
      return Object.keys(this.$route.query).length > 0
        ? this.$route.query
        : this.recentQuery;
    },
    hasChanged() {
      return (
        this.currentTimetable.createdAt !== this.currentTimetable.updatedAt
      );
    },
  },
  created() {
    this.semester = parseInt(this.currentTimetable.semester);
  },
  methods: {
    ...mapActions(['toggleBottomSheet']),
    switchSemester(index) {
      this.semester = index;
      this.$router
        .push({
          path: '/timetable',
          query: {
            code: this.courseOptions.code,
            college: this.courseOptions.college,
            sem: index,
          },
        })
        .catch(() => {});
    },
  },
};
</script>
