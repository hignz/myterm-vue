<template>
  <v-autocomplete
    label="Courses"
    :items="courses"
    item-text="title"
    item-value="course"
    :loading="isLoading"
    prepend-inner-icon="mdi-magnify"
    autocomplete="off"
    clearable
    no-data-text="No courses found"
    dense
  ></v-autocomplete>
</template>

<script>
export default {
  data: () => ({}),
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

<style></style>
