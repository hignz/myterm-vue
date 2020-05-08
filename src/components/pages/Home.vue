<template>
  <div>
    <v-container>
      <main class="main">
        <v-row justify="center" class="mt-24">
          <v-col sm="8" md="6" lg="4">
            <p class="display-2 mb-12 text-center">
              My<span class="primary--text">Term</span>
            </p>
            <SelectionForm></SelectionForm>
          </v-col>
        </v-row>
      </main>
    </v-container>
    <footer>
      <div class="footer text-center">
        <p class="display-1 mb-4 text-center">
          MyTerm.me
        </p>
        <p class="pb-0 mb-0 subtitle-2">
          is a service for students of the IT Sligo and Limerick IT that
          provides access to student timetables, save functionality and quick
          access to useful resourses such as student email, Moodle and room
          bookings.
        </p>
        <p class="mt-6 mb-0">
          Created by
          <a href="https://github.com/hignz" target="_blank">Aaron Higgins</a>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import SelectionForm from '@/components/shared/SelectionForm';
import genericMetaInfo from '@/mixins/genericMetaInfo';

export default {
  name: 'Home',
  components: { SelectionForm },
  mixins: [genericMetaInfo]
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
  width: 100%;
  background-color: #111316;
  padding: 30px;
}

.footer {
  max-width: 400px;
  margin: auto;
  text-align: center;
}

a {
  text-decoration: none;
}
</style>
