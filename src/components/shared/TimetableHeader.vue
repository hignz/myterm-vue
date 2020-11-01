<template>
  <v-card v-if="currentTimetable" outlined flat>
    <v-card-title style="word-break: keep-all" class="subtitle-1">
      {{ currentTimetable.title }}
    </v-card-title>
    <v-card-subtitle>
      <v-menu v-if="$vuetify.breakpoint.mdAndUp" offset-y max-width="200">
        <template v-slot:activator="{ on }">
          <p class="pointer caption" v-on="on">
            {{ currentTimetable.college }}
            <v-icon size="16" color="grey" class="">{{
              mdiChevronDown
            }}</v-icon>
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
        <template v-slot:activator="{ on }">
          <p class="caption" v-on="on">
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
      <v-chip class="mr-2" outlined @click="switchSemester()">
        Semester
        <v-avatar right>
          <span class="primary--text">{{
            parseInt(currentTimetable.semester, 10) + 1
          }}</span>
        </v-avatar>
      </v-chip>
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
      <HistoryDialog v-if="hasChanged" :timetable="currentTimetable" />
      <v-spacer />
      <SaveBtn />
      <ShareBtn v-if="$vuetify.breakpoint.mdAndUp" />
      <v-btn
        v-if="$vuetify.breakpoint.mdAndUp"
        icon
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
} from '@mdi/js';
import { formatToNow } from '@/utils/date';
import ShareBtn from './ShareBtn';
import quickLinks from '@/mixins/quickLinks';

export default {
  components: {
    HistoryDialog: () =>
      import(
        /* webpackChunkName: "historyDialog" */ '@/components/shared/HistoryDialog'
      ),
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
      formatToNow,
    };
  },
  computed: {
    ...mapState(['currentTimetable', 'recentQuery', 'showBottomSheet']),
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
  methods: {
    ...mapActions(['toggleBottomSheet']),
    openLink(link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    },
    switchSemester() {
      this.$router
        .push({
          path: '/timetable',
          query: {
            code: this.courseOptions.code,
            college: this.courseOptions.college,
            sem: this.courseOptions.sem === '0' ? '1' : '0',
          },
        })
        .catch(() => {});
    },
  },
};
</script>
