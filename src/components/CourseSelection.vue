<template>
  <div data-test="true">
    <v-autocomplete
      label="Courses"
      :items="courses"
      item-text="title"
      item-value="course"
      :loading="isLoading"
      prepend-inner-icon="mdi-magnify"
      autocomplete="off"
      clearable
      data-test="true"
      no-data-text="No courses found"
      dense
    ></v-autocomplete>
  </div>
</template>

<script>
export default {
  props: {
    courses: {
      type: Array,
      default: () => [{}]
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  }
};
</script>
