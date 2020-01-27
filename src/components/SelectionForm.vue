<template>
  <v-form v-model="isFormValid" @submit.prevent="openTimetable">
    <v-select
      v-model="selectedCollege"
      :items="colleges"
      label="College"
      dense
      outlined
      :rules="[rules.required]"
      @change="onCollegeChange"
      cache-items
    >
    </v-select>
    <v-autocomplete
      v-model="selectedCourse"
      label="Course"
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
      cache-items
      open-on-clear
      :rules="[rules.required]"
      return-object
      :disabled="coursesLoading"
    >
    </v-autocomplete>
    <v-btn
      outlined
      block
      color="primary"
      :disabled="!isFormValid"
      type="submit"
    >
      <v-icon left>mdi-magnify</v-icon>
      Find
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
    selectedCourse: {},
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
        .catch(() => {});
    },
    onCollegeChange() {
      this.getCourses(this.selectedCollegeIndex);
    },
    openTimetable() {
      this.$router.push({
        path: 'timetable',
        query: {
          code: decodeURIComponent(this.selectedCourse.course),
          college: this.selectedCollegeIndex
        }
      });
    }
  }
};
</script>

<style></style>
