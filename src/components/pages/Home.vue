<template>
  <div>
    <v-container>
      <AppBar v-if="$vuetify.breakpoint.smAndDown" :hide="true" />
      <v-row justify="center" class="main mt-24">
        <v-col sm="7" md="6" lg="6" xl="4">
          <p class="display-2 mb-12 text-center font-weight-medium">
            My<span class="primary--text">Term</span>
          </p>
          <SelectionForm />
        </v-col>
      </v-row>
    </v-container>
    <footer :class="footerTheme">
      <div class="text-center">
        <p class="display-1 font-weight-medium">
          My<span class="primary--text">Term</span>.me
        </p>
        <p class="pb-0 mb-0 subtitle-2 font-weight-medium">
          is a service for students of the IT Sligo and Limerick IT that
          provides access to student timetables, save functionality and quick
          access to useful resources such as student email, Moodle and room
          bookings.
        </p>
        <p class="mt-6 mb-0">
          Created by
          <a href="https://github.com/hignz" target="_blank" rel="noopener"
            >Aaron Higgins</a
          >
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import SelectionForm from '@/components/shared/SelectionForm';
import genericMetaInfo from '@/mixins/genericMetaInfo';

export default {
  name: 'Home',
  components: {
    SelectionForm,
    AppBar: () =>
      import(/* webpackChunkName: "appBar" */ '@/components/shared/AppBar'),
  },
  mixins: [genericMetaInfo],
  computed: {
    ...mapState(['darkMode']),
    footerTheme() {
      return this.darkMode ? 'dark' : 'light';
    },
  },
};
</script>

<style scoped>
.mt-24 {
  margin-top: 5rem;
}

.main {
  height: 100vh;
}

footer {
  padding: 30px;
}

footer > div {
  max-width: 400px;
  margin: auto;
}

footer.dark {
  background-color: #090d13;
  border-top: thin solid rgba(255, 255, 255, 0.12) !important;
}

footer.light {
  background-color: #fff;
  border-top: thin solid rgba(220, 220, 220, 1) !important;
}

footer.light > div > p {
  color: black;
}

footer > div > p > a {
  text-decoration: none;
}
</style>
