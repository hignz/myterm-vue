<template>
  <v-form ref="form" v-model="isFormValid" @submit.prevent="openTimetable()">
    <v-select
      v-model="selectedCollege"
      :items="colleges"
      label="College"
      dense
      outlined
      :disabled="isLoading"
      :rules="[rules.required]"
      @change="onCollegeChange"
    />
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
      no-data-text="Select a college first..."
      dense
      outlined
      open-on-clear
      :rules="[rules.required]"
      return-object
    />
    <v-btn
      outlined
      block
      color="primary"
      type="submit"
      :disabled="!isFormValid"
    >
      <v-icon left>
        mdi-magnify
      </v-icon>
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
    colleges: ['IT Sligo'],
    selectedCourse: null,
    courses: [],
    isLoading: false,
    rules: {
      required: value => !!value || ''
    }
  }),
  computed: {
    selectedCollegeIndex() {
      return this.colleges.indexOf(this.selectedCollege);
    }
  },
  methods: {
    ...mapActions(['fetchModules', 'fetchCourses']),
    getCourses(collegeIndex) {
      this.isLoading = true;

      this.fetchCourses(collegeIndex)
        .then(res => {
          this.courses = res;
          this.isLoading = false;
        })
        .catch(() => {});
    },
    onCollegeChange() {
      this.getCourses(this.selectedCollegeIndex);
    },
    openTimetable() {
      if (!this.$refs.form.validate()) {
        return;
      }

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
