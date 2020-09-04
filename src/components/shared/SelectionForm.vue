<template>
  <v-form ref="form" v-model="valid" @submit.prevent="openTimetable()">
    <v-select
      v-model="selectedCollege"
      :items="colleges"
      label="College"
      dense
      outlined
      :disabled="isLoading"
      :rules="[rules.required]"
      @change="onCollegeChange()"
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
    <v-btn outlined block color="primary" type="submit" :disabled="!valid">
      Open
    </v-btn>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      colleges: ['IT Sligo'],
      courses: [],
      isLoading: false,
      rules: {
        required: value => !!value || 'Required'
      },
      selectedCollege: '',
      selectedCourse: null,
      valid: false
    };
  },
  computed: {
    selectedCollegeIndex() {
      return this.colleges.indexOf(this.selectedCollege);
    }
  },
  methods: {
    ...mapActions(['fetchCourses']),
    onCollegeChange() {
      this.fetchCourses(this.selectedCollegeIndex)
        .then(res => {
          this.courses = res;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    openTimetable() {
      if (!this.$refs.form.validate()) {
        return;
      }
      const today = new Date();
      const year = today.getFullYear();

      const sem =
        Date.parse(today) >= Date.parse(`${year}-07-20`) &&
        Date.parse(today) <= Date.parse(`${year}-12-19`)
          ? '0'
          : '1';

      this.$router.push({
        path: 'timetable',
        query: {
          code: decodeURIComponent(this.selectedCourse.course),
          college: this.selectedCollegeIndex,
          sem
        }
      });
    }
  }
};
</script>
