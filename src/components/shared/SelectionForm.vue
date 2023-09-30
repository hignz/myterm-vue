<template>
  <v-form ref="form" v-model="valid" @submit.prevent="openTimetable()">
    <v-autocomplete
      v-model="selectedCourse"
      label="Course"
      :items="courses"
      item-text="title"
      item-value="course"
      :loading="isLoading"
      autocomplete="off"
      :disabled="isLoading"
      spellcheck="false"
      clearable
      dense
      placeholder="You can type to find your course"
      outlined
      open-on-clear
      :rules="[rules.required]"
      return-object
    >
    </v-autocomplete>
    <v-btn class="mt-2" outlined block color="primary" type="submit"
      >Open</v-btn
    >
  </v-form>
</template>

<script>
import { mapActions } from 'vuex';
import { getCurrentSemester } from '@/utils/date';

export default {
  data() {
    return {
      colleges: ['IT Sligo'],
      courses: [],
      isLoading: false,
      rules: {
        // required: (value) => !!value || 'Please select a course from the list',
      },
      selectedCollege: '',
      selectedCourse: null,
      valid: false,
      getCurrentSemester,
    };
  },
  computed: {
    selectedCollegeIndex() {
      return this.colleges.indexOf(this.selectedCollege);
    },
  },
  created() {
    this.populateCourses(0);
  },
  methods: {
    ...mapActions(['fetchCourses']),
    populateCourses(collegeIndex) {
      this.isLoading = true;
      this.fetchCourses(collegeIndex)
        .then((res) => {
          this.courses = res;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    openTimetable() {
      if (this.$refs.form.validate()) {
        const semester = this.getCurrentSemester();
        this.$router.push({
          path: 'timetable',
          query: {
            code: decodeURIComponent(this.selectedCourse.course),
            college: 0,
            sem: semester,
          },
        });
      }
    },
  },
};
</script>

<style>
.v-list-item__title {
  white-space: normal !important;
}
</style>
