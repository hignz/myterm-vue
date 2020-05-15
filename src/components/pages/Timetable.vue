<template>
  <div>
    <v-container>
      <AppBar title="Timetable" class="d-md-none">
        <template v-slot:icon>
          <v-btn
            v-blur
            icon
            :class="{
              'animate__animated animate__heartBeat': isSaved
            }"
            @click="saveTimetable()"
          >
            <v-icon :color="heartIconColor">
              {{ isSaved ? 'mdi-heart' : 'mdi-heart-outline' }}
            </v-icon>
          </v-btn>
        </template>
      </AppBar>
      <v-row v-if="!isLoading" justify="center">
        <v-col sm="12" md="6" lg="5">
          <v-card v-if="timetable" class="mb-4" :class="accentedBorder" flat>
            <v-card-title
              style="word-break: keep-all;"
              class="subtitle-1 justify-center text-center"
            >
              {{ timetable.title }}
            </v-card-title>
            <v-card-text class="pb-2">
              <v-row>
                <v-col offset="2" offset-md="4" class="py-0">
                  <v-chip-group>
                    <v-menu offset-y>
                      <template
                        v-slot:activator="{ on }"
                        class="d-none d-md-flex"
                      >
                        <v-chip class="d-none d-md-flex" outlined v-on="on">
                          <v-icon left color="primary">
                            mdi-school
                          </v-icon>
                          {{ timetable.college }}
                        </v-chip>
                      </template>
                      <v-list dense>
                        <v-list-item
                          v-for="(link, index) in links[courseOptions.college]"
                          :key="index"
                          @click="openLink(link.url)"
                        >
                          <v-list-item-title>{{
                            link.title
                          }}</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>

                    <v-bottom-sheet v-model="sheet">
                      <template
                        v-slot:activator="{ on }"
                        class="d-sm-flex d-none"
                      >
                        <v-chip
                          class="d-xs-flex d-md-none mr-1"
                          outlined
                          v-on="on"
                        >
                          <v-icon left color="primary">
                            mdi-school
                          </v-icon>
                          {{ timetable.college }}
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
                          <v-list-item-title>{{
                            link.title
                          }}</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-bottom-sheet>

                    <v-chip class="ml-1" outlined @click="switchSemester()">
                      <span>Semester</span>
                      <v-avatar right light>
                        <span class="primary--text">{{
                          parseInt(timetable.semester, 10) + 1
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
                @click="
                  canUseNavigator ? openShareMenu() : copyUrlToClipboard()
                "
              >
                <v-icon left>
                  mdi-share-variant
                </v-icon>
                Share
              </v-btn>

              <v-spacer />

              <v-btn
                icon
                class="d-none d-md-flex"
                :class="{
                  'animate__animated animate__heartBeat': isSaved
                }"
                @click="saveTimetable()"
              >
                <v-icon :color="heartIconColor">
                  {{ isSaved ? 'mdi-heart' : 'mdi-heart-outline' }}
                </v-icon>
              </v-btn>

              <v-spacer />
              <v-btn color="primary" text @click="openStats()">
                <v-icon left>
                  mdi-chart-pie
                </v-icon>
                Stats
              </v-btn>
            </v-card-actions>
          </v-card>
          <Timetable
            v-if="timetable && !timetable.empty"
            :timetable="timetable.data"
          />

          <div v-else class="text-center">
            <v-icon class="my-4 grey--text" x-large>
              mdi-timetable
            </v-icon>
            <p class="grey--text">
              This timetable doesn't seem to have any classes.
            </p>
            <p class="grey--text">
              Are you sure you chose the correct course?
            </p>
            <v-btn x-large color="primary" text :to="{ path: '/' }">
              Try again
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <div column class="fab-container d-md-none">
      <v-speed-dial
        v-model="fab"
        bottom
        right
        transition="slide-y-reverse-transition"
      >
        <template v-slot:activator>
          <v-btn v-model="fab" color="primary darken-1" fab>
            <v-icon v-if="fab">mdi-close</v-icon>
            <v-icon v-else>mdi-chevron-up</v-icon>
          </v-btn>
        </template>
        <v-btn fab dark small color="primary darken-2" @click="saveTimetable()">
          <v-icon>{{ isSaved ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
        </v-btn>
        <v-btn fab dark small color="primary darken-3" @click="openShareMenu()">
          <v-icon>mdi-share-variant</v-icon>
        </v-btn>
        <v-btn fab dark small color="primary darken-4" @click="sheet = true">
          <v-icon>mdi-unfold-more-horizontal</v-icon>
        </v-btn>
      </v-speed-dial>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import AppBar from '@/components/shared/AppBar';
import Timetable from '@/components/shared/Timetable';
import timetableMetaInfo from '@/mixins/timetableMetaInfo';
import accentedBorder from '@/mixins/accentedBorder';

export default {
  components: { AppBar, Timetable },
  mixins: [timetableMetaInfo, accentedBorder],
  data: () => ({
    isLoading: false,
    timetable: null,
    courseData: null,
    savedCourses: [],
    sheet: false,
    fab: false,
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
          title: 'Room booking',
          url: 'https://libreserve.itsligo.ie/',
          icon: 'mdi-google-classroom'
        },
        {
          title: 'Virtual desktop',
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
    ...mapState(['lastTimetableVisited']),
    canUseNavigator() {
      return navigator.share;
    },
    filteredTimetable() {
      return this.timetable.data.filter(el => el.length);
    },
    isSaved() {
      return this.savedCourses
        ? this.savedCourses.filter(el => el.id === this.courseData.id).length >
            0
        : false;
    },
    heartIconColor() {
      if (!this.darkMode) {
        return this.isSaved ? 'primary' : '#666666';
      }

      return this.isSaved ? 'primary' : 'white';
    },
    courseOptions() {
      return Object.keys(this.$route.query).length > 0
        ? this.$route.query
        : JSON.parse(this.lastTimetableVisited);
    },
    timetableUrl() {
      return `https://myterm.me/timetable?code=${decodeURIComponent(
        this.courseOptions.code
      )}&college=${this.courseOptions.college}`;
    }
  },
  created() {
    this.isLoading = true;

    const { code, college, sem } = this.courseOptions;

    this.setLastTimetableVisited(JSON.stringify({ code, college, sem }));

    this.fetchTimetable({ code, collegeIndex: college, semester: sem })
      .then(res => {
        this.courseData = {
          title: res.title,
          code,
          collegeIndex: college,
          sem: res.semester,
          college: res.college,
          id: res._id
        };
        this.timetable = res;

        this.savedCourses =
          JSON.parse(localStorage.getItem('savedCourses')) || [];
      })
      .finally(() => {
        this.isLoading = false;
      });
  },
  methods: {
    ...mapActions([
      'fetchTimetable',
      'setLastTimetableVisited',
      'isDark',
      'setFetching'
    ]),
    openStats() {
      this.$router.push({
        path: '/stats',
        query: this.courseOptions
      });
    },
    saveTimetable() {
      if (this.isSaved) {
        this.savedCourses = this.savedCourses.filter(
          el => el.id !== this.courseData.id
        );
      } else {
        this.savedCourses.push(this.courseData);
      }

      localStorage.setItem('savedCourses', JSON.stringify(this.savedCourses));
    },
    switchSemester() {
      const newSemester = this.courseData.sem === '0' ? '1' : '0';

      this.$router.push({
        path: '/timetable',
        query: {
          code: this.courseData.code,
          college: this.courseData.collegeIndex,
          sem: newSemester
        }
      });
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
    openLink(link) {
      this.sheet = false;
      window.open(link);
    },
    copyUrlToClipboard() {
      navigator.clipboard.writeText(this.timetableUrl).then(() => {
        this.$toast.success('URL copied!', {
          timeout: 2000,
          position: 'bottom-center',
          closeButton: false
        });
      });
    }
  },
  beforeRouteLeave(to, from, next) {
    this.setFetching(false);
    next();
  }
};
</script>

<style>
.fab-container {
  position: fixed;
  bottom: 60px;
  right: 0;
  z-index: 1;
}

.v-btn:not(.v-btn--text):not(.v-btn--outlined):hover:before {
  opacity: 0 !important;
}
</style>
