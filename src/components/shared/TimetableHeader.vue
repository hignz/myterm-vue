<template>
  <v-card v-if="currentTimetable" class="mb-4" :class="accentedBorder" flat>
    <v-card-title
      style="word-break: keep-all;"
      class="subtitle-1 justify-center text-center"
    >
      {{ currentTimetable.title }}
    </v-card-title>
    <v-card-text class="pb-2">
      <v-row>
        <v-col offset="2" offset-md="4" class="py-0">
          <v-chip-group>
            <v-menu offset-y>
              <template v-slot:activator="{ on }" class="d-none d-md-flex">
                <v-chip class="d-none d-md-flex" outlined v-on="on">
                  <v-icon left color="primary">
                    mdi-school
                  </v-icon>
                  {{ currentTimetable.college }}
                </v-chip>
              </template>
              <v-list dense>
                <v-list-item
                  v-for="(link, index) in links[courseOptions.college]"
                  :key="index"
                  @click="openLink(link.url)"
                >
                  <v-list-item-title>{{ link.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <v-bottom-sheet v-model="sheet">
              <template v-slot:activator="{ on }" class="d-sm-flex d-none">
                <v-chip class="d-xs-flex d-md-none mr-1" outlined v-on="on">
                  <v-icon left color="primary">
                    mdi-school
                  </v-icon>
                  {{ currentTimetable.college }}
                </v-chip>
              </template>
              <v-list>
                <v-subheader>Open</v-subheader>
                <v-list-item
                  v-for="(link, index) in links[courseOptions.college]"
                  :key="index"
                  @click="openLink(link.url)"
                >
                  <v-list-item-avatar>
                    <v-avatar>
                      <v-icon color="primary">
                        {{ link.icon }}
                      </v-icon>
                    </v-avatar>
                  </v-list-item-avatar>
                  <v-list-item-title>{{ link.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-bottom-sheet>

            <v-chip class="ml-1" outlined @click="switchSemester()">
              <span>Semester</span>
              <v-avatar right light>
                <span class="primary--text">{{
                  parseInt(currentTimetable.semester, 10) + 1
                }}</span>
              </v-avatar>
            </v-chip>
          </v-chip-group>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions class="mt-4">
      <v-btn
        color="primary"
        text
        @click="canUseNavigator ? openShareMenu() : copyUrlToClipboard()"
      >
        <v-icon left>
          mdi-share-variant
        </v-icon>
        Share
      </v-btn>
      <v-spacer />
      <SaveBtn class="d-none d-md-flex" />
      <v-spacer />
      <v-btn
        color="primary"
        text
        :to="{
          path: '/stats',
          query: {
            code: courseOptions.code,
            college: courseOptions.college,
            sem: courseOptions.sem
          }
        }"
      >
        <v-icon left>
          mdi-chart-pie
        </v-icon>
        Stats
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import accentedBorder from '@/mixins/accentedBorder';
import { mapState } from 'vuex';
import SaveBtn from '@/components/shared/SaveBtn';

export default {
  components: { SaveBtn },
  mixins: [accentedBorder],
  data: () => ({
    sheet: false,
    links: [
      [
        {
          title: 'Email',
          url: 'http://outlook.com/mail.itsligo.ie',
          icon: 'mdi-mail'
        },
        {
          title: 'Moodle',
          url: 'https://vle.itsligo.ie/my/index.php',
          icon: 'mdi-school'
        },
        {
          title: 'Room Booking',
          url: 'https://libreserve.itsligo.ie/',
          icon: 'mdi-google-classroom'
        },
        {
          title: 'Virtual Desktop',
          url: 'https://vdesktop.itsligo.ie/Citrix/SligoWeb/',
          icon: 'mdi-desktop-classic'
        },
        {
          title: 'Library',
          url: 'https://library.itsligo.ie/',
          icon: 'mdi-library-shelves'
        }
      ],
      [],
      [
        {
          title: 'Moodle',
          url: 'https://moodle.lit.ie/'
        }
      ]
    ]
  }),
  computed: {
    ...mapState(['currentTimetable', 'recentQuery']),
    canUseNavigator() {
      return navigator.share;
    },
    courseOptions() {
      return Object.keys(this.$route.query).length > 0
        ? this.$route.query
        : this.recentQuery;
    },
    timetableUrl() {
      return `https://myterm.me/timetable?code=${decodeURIComponent(
        this.courseOptions.code
      )}&college=${this.courseOptions.college}`;
    }
  },
  methods: {
    copyUrlToClipboard() {
      navigator.clipboard.writeText(this.timetableUrl).then(() => {
        this.$toast.success('URL copied!', {
          timeout: 2000,
          position: 'bottom-center',
          closeButton: false
        });
      });
    },
    openLink(link) {
      this.sheet = false;
      window.open(link);
    },
    openShareMenu() {
      if (navigator.share) {
        navigator.share({
          title: 'MyTerm',
          text: 'Your timetable at a glance.',
          url: this.timetableUrl
        });
      }
    },
    switchSemester() {
      this.$router.push({
        path: '/timetable',
        query: {
          code: this.courseOptions.code,
          college: this.courseOptions.college,
          sem: this.courseOptions.sem === '0' ? '1' : '0'
        }
      });
    }
  }
};
</script>

<style></style>
