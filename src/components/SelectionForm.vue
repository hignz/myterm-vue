<template>
  <v-form v-model="isFormValid">
    <v-select
      v-model="selectedCollege"
      :items="colleges"
      label="Colleges"
      dense
      outlined
      :rules="[rules.required]"
      @change="onCollegeChange"
    >
      <template v-slot:prepend-inner>
        <!-- <v-icon>mdi-school</v-icon> -->
      </template>
    </v-select>
    <v-autocomplete
      v-model="selectedCourse"
      label="Courses"
      :items="courses"
      item-text="title"
      item-value="course"
      :loading="coursesLoading"
      autocomplete="off"
      spellcheck="false"
      clearable
      no-data-text="No courses found..."
      dense
      outlined
      :rules="[rules.required]"
      return-object
      :disabled="coursesLoading"
    >
      <template v-slot:prepend-inner>
        <!-- <v-icon>mdi-magnify</v-icon> -->
      </template>
    </v-autocomplete>
    <v-btn
      outlined
      block
      color="primary"
      @click="openTimetable"
      :disabled="!isFormValid"
    >
      <v-icon left>mdi-magnify</v-icon>
      Search
    </v-btn>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  components: {},
  data: () => ({
    isFormValid: false,
    selectedCollege: '',
    colleges: ['IT Sligo', 'Athlone IT', 'Limerick IT'],
    selectedCourse: null,
    courses: [],
    coursesLoading: false,
    rules: {
      required: value => !!value || 'Required.'
    }
  }),
  computed: {
    selectedCollegeIndex() {
      return this.colleges.indexOf(this.selectedCollege);
    }
  },
  created() {
    this.getCourses();
  },
  methods: {
    ...mapActions(['fetchModules', 'fetchCourses']),
    getCourses(collegeIndex) {
      this.coursesLoading = true;

      this.fetchCourses(collegeIndex)
        .then(res => {
          this.courses = res;
          this.coursesLoading = false;
        })
        .catch(err => console.log(err));
    },
    onCollegeChange() {
      this.getCourses(this.selectedCollegeIndex);
    },
    openTimetable() {
      console.log(this.selectedCourse);

      this.$router.push({
        path: 'timetable',
        query: {
          code: decodeURIComponent(this.selectedCourse.course).replace(),
          college: this.selectedCollegeIndex,
          sem: 0
        }
      });
    }
  }
};
</script>

<style></style>
